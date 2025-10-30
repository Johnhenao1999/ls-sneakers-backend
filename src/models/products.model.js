import mongoose from "mongoose";
import slugify from "slugify"; // 👈 instala con: npm i slugify

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    slug: {
      type: String,
      unique: true,
      index: true
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
      default: null
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
  },
  {
    timestamps: true
  }
);

// ✅ Middleware para generar slug automáticamente antes de guardar
productSchema.pre("save", function (next) {
  if (this.isModified("name")) {
    this.slug = slugify(this.name, { lower: true, strict: true });
  }
  next();
});

// ✅ Middleware también al actualizar con findOneAndUpdate
productSchema.pre("findOneAndUpdate", function (next) {
  const update = this.getUpdate();
  if (update.name) {
    update.slug = slugify(update.name, { lower: true, strict: true });
    this.setUpdate(update);
  }
  next();
});

export default mongoose.model("Productos", productSchema);
