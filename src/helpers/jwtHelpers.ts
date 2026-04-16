import jwt, { JwtPayload, Secret, SignOptions } from "jsonwebtoken";

const generateToken = (
  payload: Record<string, unknown>,
  secret: Secret,
  expiresIn: string | number
): string => {
  if (!secret) throw new Error("JWT_SECRET is not set");
  const token = jwt.sign(payload, secret, {
    algorithm: "HS256",
    expiresIn: expiresIn as SignOptions["expiresIn"],
  } as SignOptions);
  return token;
};

const verifyToken = (token: string, secret: jwt.Secret) => {
  return jwt.verify(token, secret) as JwtPayload;
};

export const jwtHelpers = {
  generateToken,
  verifyToken,
};
