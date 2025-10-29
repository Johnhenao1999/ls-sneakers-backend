import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    cliente: {
      nombre: { type: String, required: true },
      celular: { type: String, required: true },
      departamento: { type: String, required: true },
      ciudad: { type: String, required: true },
      direccion: { type: String, required: true },
      formaPago: {
        type: String,
        enum: ["Contra entrega", "Transferencia", "Nequi / Daviplata"],
        required: true,
      },
      observaciones: { type: String, default: "" },
    },

    productos: [
      {
        id: { type: String, required: true }, // ID del producto en tu colección
        nombre: { type: String, required: true },
        talla: { type: String, required: true },
        cantidad: { type: Number, required: true },
        precio: { type: Number, required: true },
        imagen: { type: String, required: true }, // Imagen seleccionada por el usuario
      },
    ],

    total: { type: Number, required: true },

    estado: {
      type: String,
      enum: [
        "Recibido",
        "En preparación",
        "En camino",
        "Entregado",
        "Cancelado",
      ],
      default: "Recibido",
    },

    fecha: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.model('Order', orderSchema);
