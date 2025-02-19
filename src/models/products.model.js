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
  imageUrl: {
    type: String,
    required: true
  },
  category: {
    type: String, // La categoría puede ser un string o un ID relacionado a otra colección
    required: true
  },
  sizes: {
    type: [String], // Arreglo de strings que representan las tallas
    required: true
  }
}, {
  timestamps: true
});

export default mongoose.model('Productos', productSchema);
