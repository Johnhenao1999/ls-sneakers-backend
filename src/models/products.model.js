import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  price: {
    type: String,
    required: true
  },
  discountPrice: {
    type: String,
    defauult: null
  },
  onSale: {
    type: Boolean,
    default: false
  },
  imageUrls: {
    type: [String],
    required: true
  },
  branch: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  sizes: {
    type: [String],
    required: true
  }
}, {
  timestamps: true
});

export default mongoose.model('Productos', productSchema);
