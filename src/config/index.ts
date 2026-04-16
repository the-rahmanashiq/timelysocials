import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

const config = {
  port: process.env.PORT || 3000,
  database_url: process.env.MONGODB_URI,
  bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
  node_env: process.env.NODE_ENV || "development",
  jwt: {
    jwt_access_secret: process.env.JWT_ACCESS_SECRET,
    jwt_access_expires_in: process.env.JWT_ACCESS_EXPIRES_IN || "1h",
    jwt_refresh_secret: process.env.JWT_REFRESH_SECRET,
    jwt_refresh_expires_in: process.env.JWT_REFRESH_EXPIRES_IN || "30d",
  },
  google: {
    google_client_id: process.env.AUTH_GOOGLE_ID,
    google_client_secret: process.env.AUTH_GOOGLE_SECRET,
  },
  facebook: {
    facebook_app_id: process.env.AUTH_FACEBOOK_ID,
    facebook_app_secret: process.env.AUTH_FACEBOOK_SECRET,
  },
  instagram: {
    instagram_client_id: process.env.AUTH_INSTAGRAM_ID,
    instagram_client_secret: process.env.AUTH_INSTAGRAM_SECRET,
  },
  linkedin: {
    linkedin_client_id: process.env.AUTH_LINKEDIN_ID,
    linkedin_client_secret: process.env.AUTH_LINKEDIN_SECRET,
  },
  twitter: {
    consumer_key: process.env.AUTH_TWITTER_ID,
    consumer_secret: process.env.AUTH_TWITTER_SECRET,
  },
  frontend_url: process.env.FRONTEND_URL,
  backend_url: process.env.BACKEND_URL,
};

export default config;
