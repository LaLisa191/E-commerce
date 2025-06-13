import React from 'react';
import ProductApi from '../Components/ProductApi/ProductApi'
import ProductCreateForm from '../Components/ProductCreateForm/ProductCreateForm';
import ProductEditForm from '../Components/ProductEditForm/ProductEditform';
import ApiInfo from '../Components/ApiInfo/ApiInfo';
import ErrorAlert from '../Components/ErrorAlert/ErrorAlert';
import useProduct from '../Components/UseProduct/UseProduct';
import './CSS/ConnectionApi.css';

const ConnectionApi = () => {
    const API_BASE_URL = 'http://localhost:3001';
    
    const {
        product,
        loading,
        error,
        editingProduct,
        newProduct,
        fetchProduct,
        createProduct,
        updateProduct,
        deleteProduct,
        startEdit,
        cancelEdit,
        handleInputChange,
        handleEditInputChange,
        testConnection,
        setError
    } = useProduct(API_BASE_URL);

    return (
        <section id="connection-api" className="connection-api-section">
            <div className="container">
                <h2>Gestión de Productos</h2>
                
                {/* Información de la API */}
                <ApiInfo 
                    apiBaseUrl={API_BASE_URL}
                    onRefresh={fetchProduct}
                    onTestConnection={testConnection}
                    loading={loading}
                />

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
                    <ProductEditForm 
                        editingProduct={editingProduct}
                        onInputChange={handleEditInputChange}
                        onSubmit={updateProduct}
                        onCancel={cancelEdit}
                        loading={loading}
                    />
                )}

                {/* Mostrar errores */}
                <ErrorAlert 
                    error={error}
                    onClose={() => setError('')}
                />

                {/* Componente de lista de productos */}
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