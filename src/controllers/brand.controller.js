import Brand from "../models/brand.model.js";

// 🟢 Obtener todas las marcas
export const getBrands = async (req, res) => {
  try {
    const brands = await Brand.find().sort({ name: 1 });
    res.json(brands);
  } catch (error) {
    console.error("❌ Error al obtener marcas:", error);
    res.status(500).json({ error: "Error al obtener las marcas" });
  }
};

// 🔵 Crear nueva marca
export const createBrand = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: "El nombre de la marca es obligatorio" });
    }

    const existe = await Brand.findOne({ name });
    if (existe) {
      return res.status(400).json({ error: "La marca ya existe" });
    }

    const nuevaMarca = new Brand({ name });
    await nuevaMarca.save();

    res.status(201).json({ mensaje: "Marca creada correctamente", brand: nuevaMarca });
  } catch (error) {
    console.error("❌ Error al crear marca:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

// 🟠 Eliminar una marca (opcional)
export const deleteBrand = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Brand.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ error: "Marca no encontrada" });
    }

    res.json({ mensaje: "Marca eliminada correctamente" });
  } catch (error) {
    console.error("❌ Error al eliminar marca:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};
