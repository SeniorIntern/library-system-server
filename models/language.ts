import mongoose from 'mongoose'

const languageSchema = new mongoose.Schema({
  language: {
    type: String,
    required: true
  }
})

export const Language = mongoose.model('Language', languageSchema)
