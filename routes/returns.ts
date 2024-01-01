import express from 'express'
const router = express.Router()
import Rental from '../models/rental';
import Returns from '../models/returns'

router.get('/', async (req, res) => {
  const returns = await Returns.find().populate('rental')
  res.status(200).send(returns)
})

router.get('/:id', async (req, res) => {
  const returns = await Returns.findById(req.params.id).populate('rental')
  res.status(200).send(returns)
})

router.post("/", async (req, res) => {
  const { rentalId } = req.body

  const rental = await Rental.findById(rentalId)
  if (!rental) return res.status(200).send('Invalid rental Id')

  const returns = await Returns.create({ rental: rentalId })
  res.status(200).send(returns)
});

export default router
