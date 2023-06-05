const mongoose = require("mongoose");
const category = require("../config/catedb");

const categorySchema = mongoose.Schema({
  categoryTitle: {
    type: String,
  },
  categoryDescription: {
    type: String,
  },
  categoryLabel: {
    type: String,
  },
});

const CategorySchema =
  category.models.CATEGORYJSON ||
  category.model("CATEGORYJSON", categorySchema);

module.exports = CategorySchema;
