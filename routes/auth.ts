import express, { Request, Response } from 'express'
const router = express.Router()
import User from '../models/user'
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";

router.post("/", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body

    //check if user exists
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).send({ error: "User does not exist" })
    }
    console.log("user exists");

    //check if password is correct
    /*
    const validPassword = bcrypt.compare(password, user.password)
    if (!validPassword) {
      return res.status(400).send({ error: "Invalid password" })
    }
    console.log(user);
    */

    //create token data
    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email
    }

    //create token
    const token = jwt.sign(tokenData, process.env.jwtPrivateKey!, { expiresIn: "1d" })

    return res.status(200).cookie("token", token, {
      httpOnly: true,
    }).send({
      message: "Login successful",
      success: true,
    })
  } catch (error: any) {
    return res.status(500).send({ error: error.message })
  }
})

export default router
