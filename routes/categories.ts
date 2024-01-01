import express from 'express'
const router = express.Router()
import Category from '../models/category'

router.get('/', async (req, res) => {
  const categories = await Category.find()
  res.status(200).send(categories)
})

router.post('/', async (req, res) => {
  const { name, description } = req.body
  const categories = await Category.create({
    name, description
  })
  res.status(200).send(categories)
})


export default router
