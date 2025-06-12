import React from 'react'
import './Hero.css'
import modelopag from '../Assets/hero-img.png'

const Hero = () => {
  const handleUltimaColeccion = () => {
    // Hacer scroll a la sección de nueva colección en la misma página
    const newCollectionSection = document.querySelector('.new-collection')
    if (newCollectionSection) {
      newCollectionSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      })
    }
  }

  return (
    <div className='hero'>
        <div className='hero-left'>
          <h2>Bienvenido a nuestra tienda</h2>
             <p>Nueva</p>
             <p>colección para todos</p>
               <div className='hero-latest-btn' onClick={handleUltimaColeccion}>
                  <div>Última Colección</div>
                  <i className="bi bi-arrow-right" style={{fontSize: '32px'}}></i>
              </div>
            </div>
         <div className='hero-right'>
        <img src={modelopag} alt="" />
        </div>
    </div>
  )
}

export default Hero