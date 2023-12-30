import express from 'express'
import { User } from '../models/user';
import bcrypt from 'bcrypt'
import { z } from 'zod'
const router = express.Router()

router.post('/', async (req, res) => {
  const { success } = validate(req.body);
  if (!success) return res.status(400).send('Invalid values');

  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send('Invalid email or password.');

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send('Invalid email or password.');

  //@ts-ignore
  const token = user.generateAuthToken();
  res.send(token);
});

const schema = z.object({
  email: z.string()
    .min(5)
    .max(255)
    .email(),
  password: z.string()
    .min(5)
    .max(255)
})

function validate(req: z.infer<typeof schema>) {
  return schema.safeParse(req);
}

export default router; 
