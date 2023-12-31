import express from 'express'
const router = express.Router()
import { User, validateUser } from '../models/user';
import bcrypt from 'bcrypt'
import { admin } from '../middleware/admin'
import _ from 'lodash'

router.get('/', async (req, res) => {
  const users = await User.find().select(['-password'])
  res.status(200).send(users)
})

router.post('/isAdmin', admin, async (req, res) => {
  res.status(200).send({
    //@ts-ignore
    status: req.user.isAdmin
  })
})

router.post('/', async (req, res) => {
  const { success } = validateUser(req.body);
  if (!success) return res.status(400).send('Invalid values');

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already registered.");

  user = new User(_.pick(req.body, ["name", "email", "password"]));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();

  // @ts-ignore
  const token = user.generateAuthToken();
  res
    .header("x-auth-token", token)
    .send(_.pick(user, ["_id", "name", "email"]));
});


export default router;
