import express from 'express'
import mongoose from 'mongoose'
import languages from './routes/languages'
import authors from './routes/authors'
import categories from './routes/categories'
import books from './routes/books'

const app = express()

app.use(express.json())
app.use(express.urlencoded())
app.use('/api/languages', languages)
app.use('/api/authors', authors)
app.use('/api/categories', categories)
app.use('/api/books', books)

mongoose.connect('mongodb://127.0.0.1:27017/library')
  .then(() => console.log('Connected!'));

const port = 3000
app.listen(port, async () => {
  console.log(`listening on port: ${port}...`);
})
