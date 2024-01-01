import express from "express";
import Rental from "../models/rental";
import Book from "../models/book";
const router = express.Router();

router.get("/", async (req, res) => {
  const rentals = await Rental.find().sort("-dateOut").populate('customer').populate('book');
  res.send(rentals);
});

router.get("/:id", async (req, res) => {
  const rentals = await Rental.findById(req.params.id).populate('customer').populate('book');
  res.send(rentals);
});

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

router.delete('/:id', async (req, res) => {
  const rental = await Rental.findByIdAndDelete(req.params.id)
  res.status(200).send(rental)
})

export default router
