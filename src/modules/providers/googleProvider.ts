import express from "express";
import config from "../../config";
import User from "../user/user.model";
import { jwtHelpers } from "../../helpers/jwtHelpers";

// For native fetch API in Node.js v18+. If you're on Node v16 or lower, install `node-fetch`
const provider = express.Router();

const GOOGLE_CLIENT_ID = config.google.google_client_id;
const GOOGLE_CLIENT_SECRET = config.google.google_client_secret;
const REDIRECT_URI =
  config.node_env === "production"
    ? `${config.backend_url}/providers/google/auth/google/callback`
    : "http://localhost:5000/providers/google/auth/google/callback";

const getGoogleAuthURL = () => {
  const rootUrl = "https://accounts.google.com/o/oauth2/v2/auth";

  const options = new URLSearchParams({
    redirect_uri: REDIRECT_URI,
    client_id: GOOGLE_CLIENT_ID || "",
    access_type: "offline",
    response_type: "code",
    prompt: "consent",
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ].join(" "),
  });

  return `${rootUrl}?${options.toString()}`;
};

provider.get("/auth/google", (req, res) => {
  res.redirect(getGoogleAuthURL());
});

provider.get("/auth/google/callback", async (req, res) => {
  const code = req.query.code as string;
  if (!code) return res.redirect("/");

  try {
    // Exchange code for access token
    const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        code,
        client_id: GOOGLE_CLIENT_ID || "",
        client_secret: GOOGLE_CLIENT_SECRET || "",
        redirect_uri: REDIRECT_URI,
        grant_type: "authorization_code",
      }),
    });

    if (!tokenResponse.ok) {
      const err = await tokenResponse.text();
      throw new Error(`Token exchange failed: ${err}`);
    }

    const tokenData = (await tokenResponse.json()) as {
      access_token: string;
    };
    const accessToken = tokenData.access_token;

    // Fetch user profile using access token
    const profileResponse = await fetch(
      "https://www.googleapis.com/oauth2/v2/userinfo",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!profileResponse.ok) {
      const err = await profileResponse.text();
      throw new Error(`Failed to fetch user profile: ${err}`);
    }

    const profile = (await profileResponse.json()) as {
      email: string;
      name: string;
      picture?: string;
    };
    console.log("profile: ", profile);

    let userData = await User.findOne({ email: profile.email });
    if (!userData) {
      userData = await User.create({
        name: profile.name,
        email: profile.email,
        avatar: profile.picture,
      });
    }

    const jwt = jwtHelpers.generateToken(
      {
        _id: userData._id,
        name: userData.name,
        email: userData.email,
      },
      config.jwt.jwt_access_secret as string,
      config.jwt.jwt_access_expires_in as string
    );

    res.redirect(
      `${
        config.node_env === "production"
          ? `${config.frontend_url}/auth`
          : "http://localhost:3000/auth"
      }?accessToken=${jwt}`
    );
  } catch (error) {
    console.error("Google OAuth error:", error);
    res.redirect("/");
  }
});

export const googleRoutes = provider;
