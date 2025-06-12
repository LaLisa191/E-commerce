// Components/ProductCreateForm/ProductCreateForm.js
import React from 'react';
import './ProductCreateForm.css';

const ProductCreateForm = ({ 
    newProduct, 
    onInputChange, 
    onSubmit, 
    loading 
}) => {
    return (
        <div className="form-container">
            <h3>Agregar Nuevo Producto</h3>
            <form onSubmit={onSubmit}>
                <div className="form-row">
                    <div className="form-group">
                        <select
                            name="category"
                            value={newProduct.category}
                            onChange={onInputChange}
                            required
                        >
                            <option value="">Seleccionar categoría</option>
                            <option value="mujer">Mujer</option>
                            <option value="hombre">Hombre</option>
                            <option value="deportivo">Deportivo</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            name="name"
                            value={newProduct.name}
                            onChange={onInputChange}
                            placeholder="Nombre del producto"
                            required
                        />
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group">
                        <input
                            type="number"
                            name="new_price"
                            value={newProduct.new_price}
                            onChange={onInputChange}
                            placeholder="Precio nuevo (ej: 40000)"
                            min="0"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="number"
                            name="old_price"
                            value={newProduct.old_price}
                            onChange={onInputChange}
                            placeholder="Precio anterior (ej: 60000)"
                            min="0"
                            required
                        />
                    </div>
                </div>
                <button type="submit" className="btn btn-create" disabled={loading}>
                    {loading ? 'Creando...' : 'Agregar Producto'}
                </button>
            </form>
        </div>
    );
};

export default ProductCreateForm;