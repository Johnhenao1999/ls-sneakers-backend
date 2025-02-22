import Products from '../models/products.model.js';

// Endpoint para crear un producto (sin manejo de imágenes)
export const createProduct = async (req, res) => {
  try {
    const { name, price, discountPrice, onSale , imageUrl, branch, gender , sizes } = req.body;

    // Validar si falta algún dato necesario
    if (!name || !price || !discountPrice || !onSale  || !imageUrl || !branch || !gender || !sizes || !Array.isArray(sizes)) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios, y las tallas deben ser un arreglo' });
    }

    // Crear y guardar el producto en la base de datos
    const newProduct = new Products({
      name,
      price,
      discountPrice,
      onSale,
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

// Endpoint para actualizar un producto por ID
export const updateProduct = async (req, res) => {
  try {
    console.log(req.params)
    const { id } = req.params; // Obtener el ID del producto desde los parámetros de la URL
    const { name, price, discountPrice, onSale, imageUrl, branch, gender, sizes } = req.body;
    console.log(req.body)

    // Verificar si el producto existe
    const existingProduct = await Products.findById(id);
    if (!existingProduct) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    // Actualizar el producto con los nuevos datos
    const updatedProduct = await Products.findByIdAndUpdate(
      id,
      { name, price, discountPrice, onSale, imageUrl, branch, gender, sizes },
      { new: true, runValidators: true } // new: true devuelve el producto actualizado
    );

    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar el producto' });
  }
};

