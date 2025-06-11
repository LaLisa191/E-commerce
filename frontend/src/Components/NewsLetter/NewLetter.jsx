import React from 'react'
import './NewLetter.css'

const NewLetter = () => {
  return (
    <div className='newsletter'>
      <h1>Recibe ofertas exclusivas!</h1>
      <p>Suscríbete y mantente actualizado</p>
      <div>
        <input type="email" placeholder='Correo Electrónico' />
        <button>Subscribe</button>
      </div>
    </div>
  )
}

export default NewLetter