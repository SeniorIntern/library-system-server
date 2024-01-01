import mongoose from 'mongoose'

const returnSchema = new mongoose.Schema({
  rental: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Rental'
  },
  dateReturned: {
    type: Date,
    required: true,
    default: Date.now
  }
})

const Returns = mongoose.model('Return', returnSchema)

export default Returns
