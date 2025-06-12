import mongoose from 'mongoose';
import mongooseSequence from 'mongoose-sequence';

const AutoIncrement = mongooseSequence(mongoose);

const productosTiendaSchema = new mongoose.Schema({
  id: { type: Number, unique: true },
  category: { type: String, required: true, enum: ['mujer', 'hombre', 'deportivo'], lowercase: true },
  name: { type: String, required: true, trim: true },
  new_price: { type: Number, required: true, min: 0 },
  old_price: { type: Number, required: true, min: 0 }
}, {
  timestamps: true,
  collection: 'productos' // ¡Especifica el nombre exacto de la colección!
});

productosTiendaSchema.plugin(AutoIncrement, { inc_field: 'id' });

const ProductosTienda = mongoose.model('ProductosTienda', productosTiendaSchema);

export default ProductosTienda;