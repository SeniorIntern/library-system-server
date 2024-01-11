import express, { Application } from 'express'
import error from '../middleware/error'
import auth from '../routes/auth'
import users from '../routes/user'
import authors from '../routes/authors'
import categories from '../routes/categories'
import languages from '../routes/languages'
import books from '../routes/books'
import rentals from '../routes/rentals'
import returns from '../routes/returns'

export default function(app: Application) {
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))
  app.use('/api/auth', auth)
  app.use('/api/users', users)
  app.use('/api/authors', authors)
  app.use('/api/categories', categories)
  app.use('/api/languages', languages)
  app.use('/api/books', books)
  app.use('/api/rentals', rentals)
  app.use('/api/returns', returns)
  app.use(error)
}
