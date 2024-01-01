import express from "express";
import Rental from "../models/rental";
import Book from "../models/book";
const router = express.Router();

router.post("/", async (req, res) => {
  const book = await Book.findById(req.body.bookId);
  if (!book) return res.status(400).send('Book not found!')

  const { name, address, email } = req.body
  const rental = new Rental({
    customer: {
      name: name,
      address: address,
      email: email,
    },
    book: {
      _id: book._id,
      title: book.title,
    }
  });

  await rental.save()
  res.send(rental);
});

export default router
