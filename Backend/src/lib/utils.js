import jwt from "jsonwebtoken";

export const generateToken = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("token", token, {
    httpOnly: true,      // prevent access via JS
    secure: process.env.NODE_ENV === "production", // only over HTTPS
    sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax", 
    maxAge: 1000 * 60 * 60 * 24, // 1 day
  });

  return token;
};
