import mongoose from 'mongoose'

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    requried: true
  },
  image_url: {
    type: String,
    required: true
  },
  thumbnail_url: {
    type: String,
    required: true
  },
  authors: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Author'
  }],
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  },
  language: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Language'
  }
})

export const Book = mongoose.model('Book', bookSchema)
