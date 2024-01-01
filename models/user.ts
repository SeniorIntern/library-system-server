import mongoose from 'mongoose';
import jwt from 'jsonwebtoken'
import 'dotenv/config'
import { z } from 'zod'

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024
  },
  isAdmin: {
    type: Boolean,
    default: false
  }
});


userSchema.methods.generateAuthToken = function() {
  const token = jwt.sign(
    {
      _id: this._id,
      name: this.name,
      email: this.email,
      isAdmin: this.isAdmin
    },
    process.env.jwtPrivateKey!
  );
  return token;
};

const User = mongoose.model("User", userSchema);

const schema = z.object({
  name: z.string()
    .min(3)
    .max(50),
  email: z.string()
    .min(5)
    .max(255)
    .email(),
  password: z.string()
    .min(5)
    .max(255)
})

function validateUser(user: z.infer<typeof schema>) {
  return schema.safeParse(user);
}

export { User, validateUser }
