const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const collectionSchema = new Schema({
  user: {
    email: {
      type: String,
      required: true,
      trim: true,
    },
    id: {
        type: String,
        required: true,
        trim: true
    }
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    trim: true,
  },
  products: [{
    type: String,
    required: false,
  }]
});

const Collection = mongoose.model("collection", collectionSchema);

module.exports = Collection;
