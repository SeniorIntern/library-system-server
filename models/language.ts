import mongoose from 'mongoose'

const languageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  }
})

export const Language = mongoose.model('Language', languageSchema)
