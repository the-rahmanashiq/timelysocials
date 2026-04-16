import express from "express";
import config from "../../config";
import User from "../user/user.model";
import { jwtHelpers } from "../../helpers/jwtHelpers";

// native fetch (Node.js 18+) or use `node-fetch` if older
const provider = express.Router();

const INSTAGRAM_CLIENT_ID = config.instagram.instagram_client_id;
const INSTAGRAM_CLIENT_SECRET = config.instagram.instagram_client_secret;
const REDIRECT_URI =
  config.node_env === "production"
    ? `${config.backend_url}/providers/auth/instagram/callback`
    : "http://localhost:5000/providers/auth/instagram/callback";

const getInstagramAuthURL = () => {
  const rootUrl = "https://api.instagram.com/oauth/authorize";

  const params = new URLSearchParams({
    client_id: INSTAGRAM_CLIENT_ID || "",
    redirect_uri: REDIRECT_URI,
    scope: "user_profile",
    response_type: "code",
  });

  return `${rootUrl}?${params.toString()}`;
};

provider.get("/instagram", (req, res) => {
  res.send(`<a href="${getInstagramAuthURL()}">Login with Instagram</a>`);
});

provider.get("/auth/instagram", (req, res) => {
  res.redirect(getInstagramAuthURL());
});

provider.get("/auth/instagram/callback", async (req, res) => {
  const code = req.query.code as string;
  if (!code) return res.redirect("/");

  try {
    // 1. Exchange code for access token (short-lived)
    const tokenRes = await fetch(
      "https://api.instagram.com/oauth/access_token",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          client_id: INSTAGRAM_CLIENT_ID || "",
          client_secret: INSTAGRAM_CLIENT_SECRET || "",
          grant_type: "authorization_code",
          redirect_uri: REDIRECT_URI,
          code,
        }),
      }
    );

    if (!tokenRes.ok) {
      const err = await tokenRes.text();
      throw new Error(`Token exchange failed: ${err}`);
    }

    const tokenData = (await tokenRes.json()) as {
      access_token: string;
      user_id: string;
    };
    const accessToken = tokenData.access_token;
    const userId = tokenData.user_id;

    // 2. Get user profile
    const profileRes = await fetch(
      `https://graph.instagram.com/${userId}?fields=id,username,account_type&access_token=${accessToken}`
    );

    if (!profileRes.ok) {
      const err = await profileRes.text();
      throw new Error(`Failed to fetch user profile: ${err}`);
    }

    const profile = (await profileRes.json()) as {
      id: string;
      username: string;
    };

    // 3. Store or find user (email is not provided by Instagram)
    let userData = await User.findOne({ instagramId: profile.id });
    if (!userData) {
      userData = await User.create({
        name: profile.username,
        instagramId: profile.id,
        avatar: null, // optional, requires Graph API access
      });
    }

    // 4. Create JWT token
    const jwt = jwtHelpers.generateToken(
      {
        _id: userData._id,
        name: userData.name,
      },
      config.jwt.jwt_access_secret as string,
      config.jwt.jwt_access_expires_in as string
    );

    // 5. Redirect to frontend with token
    res.redirect(
      `${
        config.node_env === "production"
          ? `${config.frontend_url}/auth`
          : "http://localhost:3000/auth"
      }?accessToken=${jwt}`
    );
  } catch (error) {
    console.error("Instagram OAuth error:", error);
    res.redirect("/");
  }
});

export const instagramRoutes = provider;
