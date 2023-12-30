import express, { Request, Response } from 'express'
const router = express.Router()
import User from '../models/user'
import bcrypt from 'bcrypt'

router.post("/", async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body

    //check if user already exists
    const user = await User.findOne({ email })

    if (user) {
      return res.status(400).send({ error: "User already exists" })
    }

    //hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const newUser = new User({
      username,
      email,
      password: hashedPassword
    })

    const savedUser = await newUser.save()
    console.log(savedUser);

    return res.send({
      message: "User created successfully",
      success: true,
      savedUser
    })
  } catch (error: any) {
    return res.status(500).send({ error: error.message })
  }
})

export default router
