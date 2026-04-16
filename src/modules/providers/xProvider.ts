import express from "express";
import crypto from "crypto";
import OAuth from "oauth-1.0a";
import config from "../../config";
import User from "../user/user.model";
import { jwtHelpers } from "../../helpers/jwtHelpers";

const provider = express.Router();

const TWITTER_CLIENT_ID = config.twitter.consumer_key;
const TWITTER_CLIENT_SECRET = config.twitter.consumer_secret;
const CALLBACK_URL =
  config.node_env === "production"
    ? `${config.backend_url}/providers/auth/twitter/callback`
    : "http://localhost:5000/providers/auth/twitter/callback";

// Set up OAuth1.0a signing
const oauth = new OAuth({
  consumer: {
    key: TWITTER_CLIENT_ID as string,
    secret: TWITTER_CLIENT_SECRET as string,
  },
  signature_method: "HMAC-SHA1",
  hash_function(base_string: string, key: string) {
    return crypto.createHmac("sha1", key).update(base_string).digest("base64");
  },
});

// Step 1: Request token and redirect user to Twitter
provider.get("/twitter", async (req, res) => {
  const request_data = {
    url: "https://api.twitter.com/oauth/request_token",
    method: "POST",
    data: { oauth_callback: CALLBACK_URL },
  };

  const headers = oauth.toHeader(oauth.authorize(request_data));

  const tokenRes = await fetch(request_data.url, {
    method: request_data.method,
    headers: {
      Authorization: headers.Authorization,
    },
  });

  const responseText = await tokenRes.text();
  const params = new URLSearchParams(responseText);
  const oauth_token = params.get("oauth_token");

  res.redirect(
    `https://api.twitter.com/oauth/authenticate?oauth_token=${oauth_token}`
  );
});

// Step 2: Handle Twitter callback
provider.get("/auth/twitter/callback", async (req, res) => {
  const { oauth_token, oauth_verifier } = req.query;
  if (!oauth_token || !oauth_verifier) return res.redirect("/");

  // Exchange request token for access token
  const tokenRes = await fetch("https://api.twitter.com/oauth/access_token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      oauth_token: oauth_token as string,
      oauth_verifier: oauth_verifier as string,
    }),
  });

  const responseText = await tokenRes.text();
  const params = new URLSearchParams(responseText);

  const accessToken = params.get("oauth_token");
  const accessTokenSecret = params.get("oauth_token_secret");
  const screen_name = params.get("screen_name");
  // Fetch user profile from Twitter
  const profileReq = {
    url: "https://api.twitter.com/1.1/account/verify_credentials.json?include_email=true",
    method: "GET",
  };

  const authHeader = oauth.toHeader(
    oauth.authorize(profileReq, {
      key: accessToken as string,
      secret: accessTokenSecret as string,
    })
  );

  const profileRes = await fetch(profileReq.url, {
    method: profileReq.method,
    headers: {
      Authorization: authHeader.Authorization,
    },
  });

  const profile = (await profileRes.json()) as {
    id_str: string;
    name?: string;
    email?: string | null;
    profile_image_url_https?: string;
  };

  // Find or create user in your DB
  let userData = await User.findOne({ twitterId: profile.id_str });
  if (!userData) {
    userData = await User.create({
      name: profile.name || screen_name,
      twitterId: profile.id_str,
      email: profile.email || null,
      avatar: profile.profile_image_url_https,
    });
  }

  // Generate JWT and redirect to frontend
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
});

export const twitterRoutes = provider;
