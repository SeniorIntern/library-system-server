import mongoose from "mongoose";

const rentalSchema = new mongoose.Schema({
  customer: {
    type: new mongoose.Schema({
      name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
      },
      address: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
      },
      email: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
      },
    }),
    required: true
  },
  book: {
    type: new mongoose.Schema({
      title: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 255
      }
    }),
    required: true
  },
  dateOut: {
    type: Date,
    required: true,
    default: Date.now
  },
  hasReturned: {
    type: Boolean,
    default: false
  }
});

const Rental = mongoose.model('Rental', rentalSchema);

export default Rental
