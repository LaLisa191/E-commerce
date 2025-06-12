// ConnectionApi.js (en Pages)
import React, { useState, useEffect } from 'react';
import ProductApi from '../Components/ProductApi/ProductApi'
import ProductCreateForm from '../Components/ProductCreateForm/ProductCreateForm';
import './CSS/ConnectionApi.css';

const ConnectionApi = () => {
    const [product, setProduct] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [editingProduct, setEditingProduct] = useState(null);
    const [newProduct, setNewProduct] = useState({
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
            console.log('Productos recibidos:', data);
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
            setNewProduct({
                category: '',
                name: '',
                new_price: '',
                old_price: ''
            });
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

    // Actualizar producto
    const updateProduct = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        try {
            console.log('Actualizando producto:', editingProduct);
            
            const productToUpdate = {
                category: editingProduct.category,
                name: editingProduct.name,
                new_price: Number(editingProduct.new_price),
                old_price: Number(editingProduct.old_price)
            };
            
            const response = await fetch(`${API_BASE_URL}/actualizar/${editingProduct._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(productToUpdate),
            });
            
            if (!response.ok) {
                const errorData = await response.text();
                throw new Error(`HTTP ${response.status}: ${errorData}`);
            }
            
            const result = await response.json();
            console.log('Producto actualizado:', result);
            setEditingProduct(null);
            await fetchProduct();
            setError('');
            alert('Producto actualizado exitosamente!');
            
        } catch (err) {
            console.error('Update error:', err);
            setError('Error al actualizar producto: ' + err.message);
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

    // Iniciar edición de producto
    const startEdit = (prod) => {
        setEditingProduct({
            _id: prod._id,
            category: prod.category,
            name: prod.name,
            new_price: prod.new_price,
            old_price: prod.old_price
        });
    };

    // Cancelar edición
    const cancelEdit = () => {
        setEditingProduct(null);
    };

    // Cargar datos al montar el componente
    useEffect(() => {
        fetchProduct();
    }, []);

    // Manejar cambios en formulario de nuevo producto
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewProduct(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Manejar cambios en formulario de edición
    const handleEditInputChange = (e) => {
        const { name, value } = e.target;
        setEditingProduct(prev => ({
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
                alert('Conexión exitosa con la API!');
                setError('');
            } else {
                throw new Error(`HTTP ${response.status}`);
            }
        } catch (err) {
            console.error('Connection test failed:', err);
            alert('Error de conexión: ' + err.message);
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
                            {loading ? 'Cargando...' : 'Actualizar Datos'}
                        </button>
                        <button
                            onClick={testConnection}
                            className="btn btn-test"
                            disabled={loading}
                        >
                            Probar Conexión
                        </button>
                    </div>
                </div>

                {/* Formulario para crear nuevo producto */}
                {!editingProduct && (
                    <ProductCreateForm 
                        newProduct={newProduct}
                        onInputChange={handleInputChange}
                        onSubmit={createProduct}
                        loading={loading}
                    />
                )}

                {/* Formulario para editar producto */}
                {editingProduct && (
                    <div className="form-container edit-form">
                        <h3>Editar Producto</h3>
                        <form onSubmit={updateProduct}>
                            <div className="form-row">
                                <div className="form-group">
                                    <select
                                        name="category"
                                        value={editingProduct.category}
                                        onChange={handleEditInputChange}
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
                                        onChange={handleEditInputChange}
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
                                        onChange={handleEditInputChange}
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
                                        onChange={handleEditInputChange}
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
                                    onClick={cancelEdit} 
                                    className="btn btn-cancel"
                                    disabled={loading}
                                >
                                    Cancelar
                                </button>
                            </div>
                        </form>
                    </div>
                )}

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

                {/* Componente de lista de productos separado */}
                <ProductApi 
                    products={product}
                    loading={loading}
                    onEdit={startEdit}
                    onDelete={deleteProduct}
                    editingProduct={editingProduct}
                />
            </div>
        </section>
    );
};

export default ConnectionApi;