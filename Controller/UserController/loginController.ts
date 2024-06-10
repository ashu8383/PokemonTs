import bcrypt from "bcrypt";
import { Request, Response } from "express";
import User from "../../model/UserModal";
import generateToken from "../../utils/genarates_token";

const loginController = async (req: Request, res: Response) => {
  try {
    const { email, password }: { email: string; password: string } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid Email" });
    }

    const isPasswordCorrect =
      password && (await bcrypt.compare(password, user.password));

    if (!isPasswordCorrect) {
      return res.status(401).json({ error: "Invalid Password" });
    }

    if (email && password) {
      const userWithToken = user.toObject();
      userWithToken.token = generateToken(user.id);

      // @ts-ignore
      delete userWithToken.password;

      return res.json(userWithToken);
    } else {
      return res.status(401).json({ error: "Please add all details" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Server error" });
  }
};

export default loginController;
