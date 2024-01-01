import express from 'express'
import Book from '../models/book'
const router = express.Router()

router.get('/', async (req, res) => {
  const books = await Book.find()
  res.status(200).send(books)
})

router.get('/:id', async (req, res) => {
  const book = await Book.findById(req.params.id).populate('category').populate('language')
  if (!book) return res.status(404).send('The book with the given id was not found!')

  res.status(200).send(book)
})

router.post('/', async (req, res) => {
  const {
    title, description, image_url, thumbnail_url, author, category, language
  } = req.body
  const book = await Book.create({
    title, description, image_url, thumbnail_url, author, category, language
  })
  return res.status(200).send(book)
})

router.patch('/:id', async (req, res) => {
  const {
    title, description, image_url, thumbnail_url, author, category, language
  } = req.body
  const book = await Book.findByIdAndUpdate(req.params.id,
    {
      $set: { title, description, image_url, thumbnail_url, author, category, language }
    },
    { new: true }
  )
  return res.status(200).send(book)
})

router.delete('/:id', async (req, res) => {
  const book = await Book.findByIdAndDelete(req.params.id)
  res.status(200).send(book)
})

export default router
