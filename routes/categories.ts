import express from 'express'
const router = express.Router()
import { Cateogry } from '../models/category'

router.get('/', async (req, res) => {
  const categories = await Cateogry.find()
  res.status(200).send(categories)
})

router.post('/', async (req, res) => {
  const { name, description } = req.body
  const categories = await Cateogry.create({
    name, description
  })
  res.status(200).send(categories)
})


export default router
