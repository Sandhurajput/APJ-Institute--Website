import jwt from "jsonwebtoken";

export const generateToken = (payload) => {
  const tokenPayload =
    typeof payload === "object" && payload !== null
      ? payload
      : { id: payload };

  return jwt.sign(tokenPayload, process.env.JWT_SECRET || "apj-secret", {
    expiresIn: "7d",
  });
};

export const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET || "apj-secret");
};
