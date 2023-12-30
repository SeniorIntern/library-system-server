import express from 'express'
import { Language } from '../models/language'
const router = express.Router()

router.get('/', async (req, res) => {
  const languages = await Language.find()
  res.status(200).send(languages)
})

router.post('/', async (req, res) => {
  const { language } = req.body
  await Language.create({ language })
  res.status(200).send(language)
});

export default router
