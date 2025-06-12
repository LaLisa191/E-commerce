// ProductList.js (crear en: src/Components/ProductList/ProductList.js)
import React from 'react';
import './ProductApi.css'

const ProductList = ({ 
    products, 
    loading, 
    onEdit, 
    onDelete, 
    editingProduct 
}) => {
    return (
        <div className="products-container">
            <h3>Productos guardados ({products.length})</h3>
            
            {/* Estado de carga */}
            {loading && <div className="loading">Cargando datos...</div>}
            
            {/* Estado vacío cuando no hay productos */}
            {!loading && products.length === 0 && (
                <div className="empty-state">
                    <p>No hay productos registrados en la base de datos</p>
                    <p>¡Agrega el primer producto usando el formulario!</p>
                </div>
            )}
            
            {/* Grid de productos */}
            <div className="products-grid">
                {products.map((prod) => (
                    <ProductCard
                        key={prod._id}
                        product={prod}
                        onEdit={onEdit}
                        onDelete={onDelete}
                        loading={loading}
                        editingProduct={editingProduct}
                    />
                ))}
            </div>
        </div>
    );
};

// Componente para cada tarjeta individual de producto
const ProductCard = ({ 
    product, 
    onEdit, 
    onDelete, 
    loading, 
    editingProduct 
}) => {
    return (
        <div className="product-card">
            <div className="card-header">
                <h4>{product.name}</h4>
                <div className="card-actions">
                    <button
                        onClick={() => onEdit(product)}
                        className="btn-edit"
                        title="Editar"
                        disabled={loading || editingProduct}
                    >
                        Editar
                    </button>
                    <button
                        onClick={() => onDelete(product._id)}
                        className="btn-delete"
                        title="Eliminar"
                        disabled={loading}
                    >
                        Eliminar
                    </button>
                </div>
            </div>
            <div className="card-body">
                <p className="category">
                    <strong>Categoria: {product.category}</strong>
                </p>
                <p className="name">Nombre: {product.name}</p>
                <p className="new_price">
                    Precio nuevo: ${product.new_price?.toLocaleString()}
                </p>
                <p className="old_price">
                    Precio anterior: ${product.old_price?.toLocaleString()}
                </p>
            </div>
        </div>
    );
};

export default ProductList;