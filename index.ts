import express from 'express'
import mongoose from 'mongoose'

const app = express()

app.use(express.json())
app.use(express.urlencoded())

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
  }
})

const Book = mongoose.model('book', bookSchema)

const port = 3000
app.listen(port, async () => {
  console.log(`listening on port: ${port}...`);
})
