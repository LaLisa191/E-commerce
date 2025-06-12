import React, { useState, useEffect } from 'react';
import './CSS/ConnectionApi.css';

const ConnectionApi = () => {
    const [product, setProduct] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [newProduct, setNewProduct] = useState({
        // Removido el campo 'id' para evitar conflictos con MongoDB
        category: '',
        name: '',
        new_price: '',
        old_price: ''
    });

    const API_BASE_URL = 'http://localhost:3001';

    // Obtener todos los productos
    const fetchProduct = async () => {
        setLoading(true);
        try {
            console.log('Fetching products from:', `${API_BASE_URL}/todas`);
            const response = await fetch(`${API_BASE_URL}/todas`);
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            
            const data = await response.json();
            console.log('Products received:', data);
            setProduct(data);
            setError('');
        } catch (err) {
            console.error('Fetch error:', err);
            setError('Error al conectar con la API: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    // Crear nuevo producto
    const createProduct = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        try {
            console.log('Enviando producto:', newProduct);
            
            // Convertir precios a números
            const productToSend = {
                ...newProduct,
                new_price: Number(newProduct.new_price),
                old_price: Number(newProduct.old_price)
            };

            const response = await fetch(`${API_BASE_URL}/crear`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(productToSend),
            });

            if (!response.ok) {
                const errorData = await response.text();
                throw new Error(`HTTP ${response.status}: ${errorData}`);
            }

            const result = await response.json();
            console.log('Producto creado:', result);

            // Limpiar formulario
            setNewProduct({
                category: '',
                name: '',
                new_price: '',
                old_price: ''
            });

            // Recargar datos
            await fetchProduct();
            setError('');
            alert('Producto creado exitosamente!');
            
        } catch (err) {
            console.error('Create error:', err);
            setError('Error al crear producto: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    // Eliminar producto
    const deleteProduct = async (id) => {
        if (!window.confirm('¿Estás seguro de eliminar este producto?')) return;

        setLoading(true);
        try {
            console.log('Eliminando producto con ID:', id);
            
            const response = await fetch(`${API_BASE_URL}/eliminar/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                const errorData = await response.text();
                throw new Error(`HTTP ${response.status}: ${errorData}`);
            }

            console.log('Producto eliminado exitosamente');
            
            // Recargar datos
            await fetchProduct();
            setError('');
            alert('Producto eliminado exitosamente!');
            
        } catch (err) {
            console.error('Delete error:', err);
            setError('Error al eliminar producto: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    // Cargar datos al montar el componente
    useEffect(() => {
        fetchProduct();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewProduct(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Función para probar la conexión
    const testConnection = async () => {
        try {
            console.log('Probando conexión...');
            const response = await fetch(`${API_BASE_URL}/todas`);
            if (response.ok) {
                alert('✅ Conexión exitosa con la API!');
                setError('');
            } else {
                throw new Error(`HTTP ${response.status}`);
            }
        } catch (err) {
            console.error('Connection test failed:', err);
            alert('❌ Error de conexión: ' + err.message);
            setError('Error de conexión: ' + err.message);
        }
    };

    return (
        <section id="connection-api" className="connection-api-section">
            <div className="container">
                <h2>Gestión de Productos</h2>

                {/* Información de la API */}
                <div className="api-info">
                    <p><strong>API Endpoint:</strong> {API_BASE_URL}</p>
                    <div className="button-group">
                        <button
                            onClick={fetchProduct}
                            className="btn btn-refresh"
                            disabled={loading}
                        >
                            {loading ? 'Cargando...' : '🔄 Actualizar Datos'}
                        </button>
                        <button
                            onClick={testConnection}
                            className="btn btn-test"
                            disabled={loading}
                        >
                            🔗 Probar Conexión
                        </button>
                    </div>
                </div>

                {/* Formulario para crear nuevo producto */}
                <div className="form-container">
                    <h3>Agregar Nuevo Producto</h3>
                    <form onSubmit={createProduct}>
                        <div className="form-row">
                            <div className="form-group">
                                <input
                                    type="text"
                                    name="category"
                                    value={newProduct.category}
                                    onChange={handleInputChange}
                                    placeholder="Categoría (ej: deportivo, mujer, hombre)"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type="text"
                                    name="name"
                                    value={newProduct.name}
                                    onChange={handleInputChange}
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
                                    onChange={handleInputChange}
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
                                    onChange={handleInputChange}
                                    placeholder="Precio anterior (ej: 60000)"
                                    min="0"
                                    required
                                />
                            </div>
                        </div>
                        <button type="submit" className="btn btn-create" disabled={loading}>
                            {loading ? 'Creando...' : '➕ Agregar Producto'}
                        </button>
                    </form>
                </div>

                {/* Mostrar errores */}
                {error && (
                    <div className="alert alert-error">
                        <strong>Error:</strong> {error}
                        <button 
                            onClick={() => setError('')} 
                            className="btn-close"
                            style={{marginLeft: '10px', background: 'none', border: 'none', color: 'white'}}
                        >
                            ✕
                        </button>
                    </div>
                )}

                {/* Lista de productos */}
                <div className="products-container">
                    <h3>Productos desde la API ({product.length})</h3>

                    {loading && <div className="loading">Cargando datos...</div>}

                    {!loading && product.length === 0 && (
                        <div className="empty-state">
                            <p>No hay productos registrados en la API.</p>
                            <p>¡Agrega el primer producto usando el formulario!</p>
                        </div>
                    )}

                    <div className="products-grid">
                        {product.map((prod) => (
                            <div key={prod._id} className="product-card">
                                <div className="card-header">
                                    <h4>{prod.name}</h4>
                                    <button
                                        onClick={() => deleteProduct(prod._id)}
                                        className="btn-delete"
                                        title="Eliminar"
                                        disabled={loading}
                                    >
                                        🗑️
                                    </button>
                                </div>
                                <div className="card-body">
                                    <p className="category"><strong>📂 {prod.category}</strong></p>
                                    <p className="name">📝 {prod.name}</p>
                                    <p className="new_price">💰 Precio nuevo: ${prod.new_price?.toLocaleString()}</p>
                                    <p className="old_price">💸 Precio anterior: ${prod.old_price?.toLocaleString()}</p>
                                    {prod._id && <small className="product-id">ID: {prod._id}</small>}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ConnectionApi;