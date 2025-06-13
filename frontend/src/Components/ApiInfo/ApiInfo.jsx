import React from 'react';
import './ApiInfo.css';

const ApiInfo = ({ 
    apiBaseUrl, 
    onRefresh, 
    onTestConnection, 
    loading 
}) => {
    return (
        <div className="api-info">
            <p><strong>API Endpoint:</strong> {apiBaseUrl}</p>
            <div className="button-group">
                <button
                    onClick={onRefresh}
                    className="btn btn-refresh"
                    disabled={loading}
                >
                    {loading ? 'Cargando...' : 'Actualizar Datos'}
                </button>
                <button
                    onClick={onTestConnection}
                    className="btn btn-test"
                    disabled={loading}
                >
                    Probar Conexión
                </button>
            </div>
        </div>
    );
};

export default ApiInfo;