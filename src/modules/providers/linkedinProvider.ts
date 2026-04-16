import express from "express";
import config from "../../config";
import User from "../user/user.model";
import { jwtHelpers } from "../../helpers/jwtHelpers";

const provider = express.Router();

const LINKEDIN_CLIENT_ID = config.linkedin.linkedin_client_id;
const LINKEDIN_CLIENT_SECRET = config.linkedin.linkedin_client_secret;
const REDIRECT_URI =
  config.node_env === "production"
    ? `${config.backend_url}/providers/auth/linkedin/callback`
    : "http://localhost:5000/providers/auth/linkedin/callback";

const getLinkedInAuthURL = () => {
  const rootUrl = "https://www.linkedin.com/oauth/v2/authorization";

  const params = new URLSearchParams({
    response_type: "code",
    client_id: LINKEDIN_CLIENT_ID || "",
    redirect_uri: REDIRECT_URI,
    scope: "r_liteprofile r_emailaddress",
    state: "linkedin_csrf_protection_token", // Replace with real CSRF protection in prod
  });

  return `${rootUrl}?${params.toString()}`;
};

provider.get("/linkedin", (req, res) => {
  res.send(`<a href="${getLinkedInAuthURL()}">Login with LinkedIn</a>`);
});

provider.get("/auth/linkedin", (req, res) => {
  res.redirect(getLinkedInAuthURL());
});

provider.get("/auth/linkedin/callback", async (req, res) => {
  const code = req.query.code as string;
  if (!code) return res.redirect("/");

  try {
    // 1. Exchange code for access token
    const tokenRes = await fetch(
      "https://www.linkedin.com/oauth/v2/accessToken",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          grant_type: "authorization_code",
          code,
          redirect_uri: REDIRECT_URI,
          client_id: LINKEDIN_CLIENT_ID || "",
          client_secret: LINKEDIN_CLIENT_SECRET || "",
        }),
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

    // 2. Get user's basic profile
    const profileRes = await fetch("https://api.linkedin.com/v2/me", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!profileRes.ok) {
      const err = await profileRes.text();
      throw new Error(`Profile fetch failed: ${err}`);
    }

    const profile = (await profileRes.json()) as {
      localizedFirstName: string;
      localizedLastName: string;
    };
    const fullName = `${profile.localizedFirstName} ${profile.localizedLastName}`;

    // 3. Get user's email address
    const emailRes = await fetch(
      "https://api.linkedin.com/v2/emailAddress?q=members&projection=(elements*(handle~))",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!emailRes.ok) {
      const err = await emailRes.text();
      throw new Error(`Email fetch failed: ${err}`);
    }

    const emailData = (await emailRes.json()) as {
      elements: Array<{
        "handle~": {
          emailAddress: string;
        };
      }>;
    };
    const email = emailData.elements[0]["handle~"].emailAddress;

    // 4. Find or create user
    let userData = await User.findOne({ email });
    if (!userData) {
      userData = await User.create({
        name: fullName,
        email,
        avatar: null, // LinkedIn requires extra API access for profile image
      });
    }

    // 5. Generate JWT
    const jwt = jwtHelpers.generateToken(
      {
        _id: userData._id,
        name: userData.name,
        email: userData.email,
      },
      config.jwt.jwt_access_secret as string,
      config.jwt.jwt_access_expires_in as string
    );

    // 6. Redirect to frontend with token
    res.redirect(
      `${
        config.node_env === "production"
          ? `${config.frontend_url}/auth`
          : "http://localhost:3000/auth"
      }?accessToken=${jwt}`
    );
  } catch (error) {
    console.error("LinkedIn OAuth error:", error);
    res.redirect("/");
  }
});

export const linkedinRoutes = provider;
