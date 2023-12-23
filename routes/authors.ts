import express from 'express'
const router = express.Router()
import { Author } from '../models/author'

router.get('/', async (req, res) => {
  const authors = await Author.find()
  res.status(200).send(authors)
})

router.post('/', async (req, res) => {
  const { name } = req.body
  const author = await Author.create({ name })
  res.status(200).send(author)
})

export default router
