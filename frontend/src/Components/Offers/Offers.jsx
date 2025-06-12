import React from 'react'
import { useNavigate } from 'react-router-dom'
import './Offers.css'
import oferta_img from '../Assets/oferta_img.png'

const Offers = () => {
  const navigate = useNavigate()

  const handleVerOfertas = () => {
    navigate('/mujeres') // Navega a la página de mujeres
  }

  return (
    <div className='offers'>
        <div className="offers-left">
            <h1>Ofertas</h1>
            <h1>exclusivas para ti</h1>
            <p>SOLO EN PRODUCTOS MAS VENDIDOS</p>
            <button onClick={handleVerOfertas}>Ver Ofertas</button>
        </div>
        <div className="offers-right">
           <img src={oferta_img} alt="" />
        </div>
    </div>
  )
}

export default Offers