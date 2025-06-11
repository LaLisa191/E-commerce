import ProductosTienda from "../models/product.model.js";

// GET - Primer dato
export const imprimirPrimerDato = async (req, res) => {
  try {
    const primerDato = await ProductosTienda.findOne().sort({ _id: 1 });
    if (!primerDato) {
      console.log('No se encontró ningún dato en la colección.');
      return res.status(404).json({ mensaje: 'No se encontró ningún dato.' });
    }
    console.log('Primer dato encontrado:', primerDato);
    res.json(primerDato);
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: error.message });
  }
};

// GET - Todos los datos
export const obtenerTodos = async (req, res) => {
  try {
    const datos = await ProductosTienda.find();
    res.json(datos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// POST - Crear nuevo
export const crearProducto = async (req, res) => {
  try {
    const nuevoProducto = new ProductosTienda(req.body);
    const guardado = await nuevoProducto.save();
    res.status(201).json(guardado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// PUT - Actualizar por ID
export const actualizarProducto = async (req, res) => {
  try {
    const actualizado = await ProductosTienda.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!actualizado) return res.status(404).json({ mensaje: 'No encontrado' });
    res.json(actualizado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// DELETE - Eliminar por ID
export const eliminarProducto = async (req, res) => {
  try {
    const eliminado = await ProductosTienda.findByIdAndDelete(req.params.id);
    if (!eliminado) return res.status(404).json({ mensaje: 'No encontrado' });
    res.json({ mensaje: 'Eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
