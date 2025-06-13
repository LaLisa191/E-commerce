// Components/ErrorAlert/ErrorAlert.js
import React from 'react';
import './ErrorAlert.css';

const ErrorAlert = ({ error, onClose }) => {
    if (!error) return null;

    return (
        <div className="alert alert-error">
            <strong>Error:</strong> {error}
            <button 
                onClick={onClose} 
                className="btn-close"
                style={{
                    marginLeft: '10px', 
                    background: 'none', 
                    border: 'none', 
                    color: 'white'
                }}
            >
                ✕
            </button>
        </div>
    );
};

export default ErrorAlert;