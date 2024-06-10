import jwt from "jsonwebtoken";

const generateToken = (_id: string) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET as string, {
    expiresIn: "15d",
  });
};

export default generateToken;
