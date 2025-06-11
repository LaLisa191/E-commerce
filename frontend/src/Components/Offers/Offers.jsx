import React from 'react'
import './Offers.css'

import oferta_img from '../Assets/oferta_img.png'

const Offers = () => {
  return (
    <div className='offers'>
        <div className="offers-left">
            <h1>Ofertas</h1>
            <h1>exclusivas para ti</h1>
            <p>SOLO EN PRODUCTOS MAS VENDIDOS</p>
            <button>Ver Ofertas</button>
        </div>
        <div className="offers-right">
           <img src={oferta_img} alt="" />
        </div>
    </div>
  )
}

export default Offers