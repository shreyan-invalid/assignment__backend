const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  userid: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  reviews: {
    type: String,
    required: true,
  },
  rating: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
    trim: true,
  },
  productId: {
    type: String,
    required: false,
  }
});

const Review = mongoose.model("review", reviewSchema);

module.exports = Review;