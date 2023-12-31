import express from 'express'
import mongoose from 'mongoose'
import auth from './routes/auth'
import users from './routes/user'
import languages from './routes/languages'
import authors from './routes/authors'
import categories from './routes/categories'
import books from './routes/books'
import rentals from './routes/rentals'
import cors from 'cors'
import 'dotenv/config'

const app = express()
app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api/auth', auth)
app.use('/api/users', users)
app.use('/api/authors', authors)
app.use('/api/categories', categories)
app.use('/api/languages', languages)
app.use('/api/books', books)
app.use('/api/rentals', rentals)

mongoose.connect(process.env.URI!)
  .then(() => console.log('Connected!'))
  .catch(err => console.log(err.message))

const port = 3001
app.listen(port, async () => {
  console.log('URI=', process.env.URI);
  console.log('JWT=', process.env.jwtPrivateKey);
  console.log(`listening on port: ${port}...`);
})
