import Products from "../models/products.model.js";
import slugify from "slugify";

/**
 * 🧩 Crear un nuevo producto
 */
export const createProduct = async (req, res) => {
  try {
    const {
      name,
      price,
      discountPrice,
      onSale,
      imageUrls,
      branch,
      gender,
      sizes,
    } = req.body;

    // 🧠 Validación básica
    if (
      !name ||
      !price ||
      !Array.isArray(imageUrls) ||
      imageUrls.length === 0 ||
      !branch ||
      !gender ||
      !Array.isArray(sizes) ||
      sizes.length === 0
    ) {
      return res.status(400).json({
        error:
          "Todos los campos obligatorios deben ser proporcionados correctamente.",
      });
    }

    // 🚀 Crear producto
    const newProduct = new Products({
      name,
      price,
      discountPrice,
      onSale,
      imageUrls,
      branch,
      gender,
      sizes,
    });

    await newProduct.save();

    return res.status(201).json({
      message: "Producto creado exitosamente",
      product: newProduct,
    });
  } catch (error) {
    console.error("❌ Error al crear producto:", error);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
};

/**
 * 📦 Obtener todos los productos
 */
export const getProducts = async (req, res) => {
  try {
    const products = await Products.find().sort({ createdAt: -1 });

    if (!products.length) {
      return res
        .status(404)
        .json({ message: "No se encontraron productos registrados." });
    }

    return res.status(200).json(products);
  } catch (error) {
    console.error("❌ Error al obtener productos:", error);
    return res.status(500).json({ error: "Error al obtener los productos" });
  }
};

/**
 * 🔍 Obtener un producto por su slug
 */
export const getProductBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const product = await Products.findOne({ slug });

    if (!product) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    return res.status(200).json(product);
  } catch (error) {
    console.error("❌ Error al obtener producto por slug:", error);
    return res.status(500).json({ error: "Error al obtener el producto" });
  }
};

/**
 * ✏️ Actualizar un producto por ID
 */
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      price,
      discountPrice,
      onSale,
      imageUrls,
      branch,
      gender,
      sizes,
    } = req.body;

    const existingProduct = await Products.findById(id);
    if (!existingProduct) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    const updatedProduct = await Products.findByIdAndUpdate(
      id,
      { name, price, discountPrice, onSale, imageUrls, branch, gender, sizes },
      { new: true, runValidators: true }
    );

    return res.status(200).json({
      message: "Producto actualizado exitosamente",
      product: updatedProduct,
    });
  } catch (error) {
    console.error("❌ Error al actualizar producto:", error);
    return res.status(500).json({ error: "Error al actualizar el producto" });
  }
};

/**
 * 🗑️ Eliminar un producto por ID
 */
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Products.findById(id);
    if (!product) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    await Products.findByIdAndDelete(id);

    return res
      .status(200)
      .json({ message: "Producto eliminado correctamente" });
  } catch (error) {
    console.error("❌ Error al eliminar producto:", error);
    return res.status(500).json({ error: "Error al eliminar el producto" });
  }
};

export const generateSlugsForExistingProducts = async (req, res) => {
  try {
    const products = await Products.find({
      $or: [{ slug: { $exists: false } }, { slug: "" }],
    });

    if (products.length === 0) {
      return res.status(200).json({ message: "Todos los productos ya tienen slug" });
    }

    for (const product of products) {
      product.slug = slugify(product.name, { lower: true, strict: true });
      await product.save();
    }

    return res.status(200).json({
      message: `Slugs generados correctamente para ${products.length} productos.`,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error al generar los slugs" });
  }
};

export const applyGlobalSale = async (req, res) => {
  try {
    const { discountPercentage } = req.body;

    // Validar que se proporcione el porcentaje de descuento
    if (discountPercentage === undefined || discountPercentage === null) {
      return res.status(400).json({ 
        error: "El porcentaje de descuento es requerido.",
        example: { discountPercentage: 20 }
      });
    }

    const percentage = Number(discountPercentage);

    // Validar que sea un número válido entre 0 y 100
    if (isNaN(percentage) || percentage < 0 || percentage > 100) {
      return res.status(400).json({ 
        error: "El porcentaje de descuento debe ser un número entre 0 y 100." 
      });
    }

    // Obtener todos los productos
    const products = await Products.find();

    if (!products.length) {
      return res.status(404).json({ error: "No hay productos para actualizar." });
    }

    // Calcular descuento y actualizar cada producto
    for (const product of products) {
      const priceNum = Number(product.price);

      // Calcular descuento con el porcentaje recibido
      const discount = Math.round(priceNum * (percentage / 100));
      const newPrice = priceNum - discount;

      product.onSale = percentage > 0;
      product.discountPrice = newPrice.toString();

      await product.save();
    }

    return res.status(200).json({
      message: `Descuento del ${percentage}% aplicado exitosamente a todos los productos.`,
      totalUpdated: products.length,
      discountApplied: percentage,
    });
  } catch (error) {
    console.error("❌ Error al aplicar descuentos:", error);
    return res.status(500).json({ error: "Error al aplicar los descuentos" });
  }
};