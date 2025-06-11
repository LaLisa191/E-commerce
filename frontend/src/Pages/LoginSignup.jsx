import React from 'react'
import './CSS/LoginSignup.css'
import { useNavigate } from 'react-router-dom'

const LoginSignup = () => {
  const navigate = useNavigate();

  const handleRedirectToLogin = () => {
    navigate('/loginadmin');
  };

  return (
    <div className='loginsignup'>
      <div className="loginsignup-container">
        <h1>Registrarse</h1>
        <div className="loginignup-fields">
          <input type="text" placeholder='Tu nombre' />
          <input type="email" placeholder='Dirección de correo electrónico' />
          <input type="password" placeholder='Contraseña' />
        </div>
        <button>Continuar</button>
        <p className='loginsignup-login'>
          ¿Ya tienes una cuenta? <span onClick={handleRedirectToLogin} style={{ color: '#007bff', cursor: 'pointer' }}>Inicia sesión aquí</span>
        </p>
        <div className="loginsignup-agree">
          <input type="checkbox" />
          <p>Al continuar, acepto los términos de uso y las políticas de privacidad</p>
        </div>
      </div>
    </div>
  )
}

export default LoginSignup
