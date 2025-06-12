import React from 'react';
import './ProductEditForm.css';

const ProductEditForm = ({ 
    editingProduct, 
    onInputChange, 
    onSubmit, 
    onCancel, 
    loading 
}) => {
    return (
        <div className="form-container edit-form">
            <h3>Editar Producto</h3>
            <form onSubmit={onSubmit}>
                <div className="form-row">
                    <div className="form-group">
                        <select
                            name="category"
                            value={editingProduct.category}
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
                            value={editingProduct.name}
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
                            value={editingProduct.new_price}
                            onChange={onInputChange}
                            placeholder="Precio nuevo"
                            min="0"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="number"
                            name="old_price"
                            value={editingProduct.old_price}
                            onChange={onInputChange}
                            placeholder="Precio anterior"
                            min="0"
                            required
                        />
                    </div>
                </div>
                <div className="button-group">
                    <button type="submit" className="btn btn-update" disabled={loading}>
                        {loading ? 'Actualizando...' : 'Actualizar Producto'}
                    </button>
                    <button 
                        type="button" 
                        onClick={onCancel} 
                        className="btn btn-cancel"
                        disabled={loading}
                    >
                        Cancelar
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ProductEditForm;