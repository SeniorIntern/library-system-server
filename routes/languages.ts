import express from 'express'
import { Language } from '../models/language'
const router = express.Router()

router.get('/', async (req, res) => {
  const languages = await Language.find()
  res.status(200).send(languages)
})

router.post('/', async (req, res) => {
  const { name } = req.body
  const language = await Language.create({
    name
  })
  return res.status(200).send(language)
})

export default router
