import jwt from "jsonwebtoken";

export const generateToken = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // HTTPS only in prod
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", // cross-site cookies in prod
    path: "/", // 👈 ensures cookie is valid for the whole app
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  return token;
};
