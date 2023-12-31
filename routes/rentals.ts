import express from "express";
import Rental from "../models/rental";
import { Book } from '../models/book'
const router = express.Router();

router.get("/", async (req, res) => {
  const rentals = await Rental.find().sort("-dateOut");
  res.send(rentals);
});

router.post("/", async (req, res) => {
  const book = await Book.findById(req.body.bookId);
  if (!book) return res.status(400).send('Book not found!')

  const { name, address, email, dailyRentalRate } = req.body
  const rental = new Rental({
    customer: {
      name: name,
      address: address,
      email: email,
    },
    book: {
      _id: book._id,
      title: book.title,
      dailyRentalRate: parseInt(dailyRentalRate)
    }
  });

  await rental.save()

  res.send(rental);
});

router.get("/:id", async (req, res) => {
  const rental = await Rental.findById(req.params.id);

  if (!rental)
    return res.status(404).send("The rental with the given ID was not found.");

  res.send(rental);
});

export default router
