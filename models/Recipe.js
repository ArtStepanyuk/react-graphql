const mongoose = require("mongoose");

const { Schema } = mongoose;

const RecipeSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  instructions: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  createdDate: {
    type: Date,
    default: new Date()
  },
  likes: {
    type: Array
  },
  username: {
    type: String,
    required: false
  }
});

RecipeSchema.index({
  "$**": "text"
});

module.exports = mongoose.model("Recipe", RecipeSchema);
