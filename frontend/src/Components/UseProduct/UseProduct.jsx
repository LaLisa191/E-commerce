import { useState, useEffect, useCallback } from 'react';

const useProducts = (apiBaseUrl = 'http://localhost:3001') => {
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

    // Obtener todos los productos
    const fetchProduct = useCallback(async () => {
        setLoading(true);
        try {
            console.log('Fetching products from:', `${apiBaseUrl}/todas`);
            const response = await fetch(`${apiBaseUrl}/todas`);
            
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
    }, [apiBaseUrl]); // Solo se recrea si cambia apiBaseUrl

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
            
            const response = await fetch(`${apiBaseUrl}/crear`, {
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
            
            const response = await fetch(`${apiBaseUrl}/actualizar/${editingProduct._id}`, {
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
            
            const response = await fetch(`${apiBaseUrl}/eliminar/${id}`, {
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
            const response = await fetch(`${apiBaseUrl}/todas`);
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

        // Cargar datos al montar
    useEffect(() => {
        fetchProduct();
    }, [fetchProduct]); // Ahora incluimos fetchProduct como dependencia

    return {
        // Estado
        product,
        loading,
        error,
        editingProduct,
        newProduct,
        // Acciones
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
    };
};

export default useProducts;