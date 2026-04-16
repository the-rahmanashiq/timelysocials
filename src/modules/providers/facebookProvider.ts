import express from "express";
import config from "../../config";
import User from "../user/user.model";
import { jwtHelpers } from "../../helpers/jwtHelpers";

// If using Node.js < 18, install `node-fetch` and import it instead
const provider = express.Router();

const FACEBOOK_APP_ID = config.facebook.facebook_app_id;
const FACEBOOK_APP_SECRET = config.facebook.facebook_app_secret;
const REDIRECT_URI =
  config.node_env === "production"
    ? `${config.backend_url}/providers/auth/facebook/callback`
    : "http://localhost:5000/providers/auth/facebook/callback";

const getFacebookAuthURL = () => {
  const rootUrl = "https://www.facebook.com/v17.0/dialog/oauth";

  const params = new URLSearchParams({
    client_id: FACEBOOK_APP_ID || "",
    redirect_uri: REDIRECT_URI,
    state: "random_csrf_token", // Consider generating a real CSRF token
    scope: "email,public_profile",
    response_type: "code",
    auth_type: "rerequest",
  });

  return `${rootUrl}?${params.toString()}`;
};

provider.get("/facebook", (req, res) => {
  res.send(`<a href="${getFacebookAuthURL()}">Login with Facebook</a>`);
});

provider.get("/auth/facebook", (req, res) => {
  res.redirect(getFacebookAuthURL());
});

provider.get("/auth/facebook/callback", async (req, res) => {
  const code = req.query.code as string;
  if (!code) return res.redirect("/");

  try {
    // 1. Exchange code for access token
    const tokenRes = await fetch(
      `https://graph.facebook.com/v17.0/oauth/access_token?` +
        new URLSearchParams({
          client_id: FACEBOOK_APP_ID || "",
          client_secret: FACEBOOK_APP_SECRET || "",
          redirect_uri: REDIRECT_URI,
          code,
        }).toString(),
      {
        method: "GET",
      }
    );

    if (!tokenRes.ok) {
      const err = await tokenRes.text();
      throw new Error(`Token exchange failed: ${err}`);
    }

    const tokenData = (await tokenRes.json()) as {
      access_token: string;
    };
    const accessToken = tokenData.access_token;

    // 2. Use access token to fetch user info
    const profileRes = await fetch(
      `https://graph.facebook.com/me?fields=id,name,email,picture&access_token=${accessToken}`
    );

    if (!profileRes.ok) {
      const err = await profileRes.text();
      throw new Error(`Failed to fetch user profile: ${err}`);
    }

    const profile = (await profileRes.json()) as {
      email: string;
      name: string;
      picture?: {
        data?: {
          url?: string;
        };
      };
    };

    // 3. Store or find user
    let userData = await User.findOne({ email: profile.email });
    if (!userData) {
      userData = await User.create({
        name: profile.name,
        email: profile.email,
        avatar: profile.picture?.data?.url,
      });
    }

    // 4. Create JWT token
    const jwt = jwtHelpers.generateToken(
      {
        _id: userData._id,
        name: userData.name,
        email: userData.email,
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
    console.error("Facebook OAuth error:", error);
    res.redirect("/");
  }
});

export const facebookRoutes = provider;
