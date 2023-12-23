import express from 'express'
const router = express.Router()
import { Book } from '../models/book'

router.get('/', async (req, res) => {
  const books = await Book.find().populate('category').populate('language').populate('authors')
  res.status(200).send(books)
})

router.post('/', async (req, res) => {
  const { title, description, image_url, thumbnail_url, authors, category, language } = req.body
  const book = await Book.create({
    title, description, image_url, thumbnail_url, authors, category, language
  })
  return res.status(200).send(book)
})

export default router
