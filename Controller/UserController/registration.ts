import { Request, Response } from "express";
import generateToken from "../../utils/genarates_token";
import bcrypt from "bcrypt";

import { Iuser } from "../../type/types";
import User from "../../model/UserModal";

const registration = async (req: Request, res: Response) => {
  try {
    const user: Iuser = req.body;

    const isExist = await User.findOne({ email: user.email.toLowerCase() });
    if (isExist) {
      return res.status(401).json({ error: "User already exists" });
    }

    if (user.password && user.name && user.email) {
      const salt = await bcrypt.genSalt(10);
      const newPassword = await bcrypt.hash(user.password, salt);

      const userToCreate = await User.create({
        ...user,
        password: newPassword,
      });

      console.log(userToCreate.id);

      // @ts-ignore
      delete userToCreate.password;
      const token = generateToken(userToCreate._id);

      console.log(userToCreate);

      return res.status(201).json({
        id: userToCreate.id,
        username: userToCreate.name,
        email: userToCreate.email,
        token,
      });
    } else {
      return res
        .status(400)
        .json({ error: "Please provide all required fields" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};

export default registration;
