import React from 'react'
import './Breadcrums.css'
import derecha_icono from '../Assets/derecha_icono.png'

const Breadcrums = (props) => {
    const {product} = props;
  return (
    <div className='breadcrums'>
        Tienda <img src={derecha_icono} alt='' />
        Inicio <img src={derecha_icono} alt='' />
        {product.category}<img src={derecha_icono} alt='' />
        {product.name}
    </div>
  )
}

export default Breadcrums