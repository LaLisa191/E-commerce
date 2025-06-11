import React from 'react';
import './CSS/LoginSignup.css'; // Puedes reutilizar los estilos
import { useNavigate } from 'react-router-dom';

const LoginAdmin = () => {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Aquí deberías validar con backend
    // Por ahora solo redirige a /admin
    navigate('/api');
  };

  return (
    <div className='loginsignup'>
      <div className="loginsignup-container">
        <h1>Iniciar Sesión como Administrador</h1>
        <form onSubmit={handleLogin}>
          <div className="loginignup-fields">
            <input type="email" placeholder='Correo electrónico' required />
            <input type="password" placeholder='Contraseña' required />
          </div>
          <button type="submit">Iniciar Sesión</button>
        </form>
      </div>
    </div>
  );
};

export default LoginAdmin;
