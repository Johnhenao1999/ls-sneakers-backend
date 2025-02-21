import Products from '../models/products.model.js';

// Endpoint para crear un producto (sin manejo de imágenes)
export const createProduct = async (req, res) => {
  try {
    const { name, price, imageUrl, branch, gender , sizes } = req.body;

    // Validar si falta algún dato necesario
    if (!name || !price || !imageUrl || !branch || !gender || !sizes || !Array.isArray(sizes)) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios, y las tallas deben ser un arreglo' });
    }

    // Crear y guardar el producto en la base de datos
    const newProduct = new Products({
      name,
      price,
      imageUrl,
      branch,
      gender,
      sizes
    });

    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) { 
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};


// Endpoint para obtener todos los productos
export const getProducts = async (req, res) => {
  try {
    // Recuperar todos los productos de la base de datos
    const products = await Products.find(); // Si usas MongoDB, `find()` obtiene todos los documentos

    // Si no hay productos, devuelve un mensaje vacío
    if (products.length === 0) {
      return res.status(404).json({ message: 'No se encontraron productos' });
    }

    // Enviar los productos como respuesta
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los productos' });
  }
};
