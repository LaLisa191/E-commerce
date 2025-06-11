import React, { useContext} from 'react'
import './ProductDisplay.css'


import estrella_icono from '../Assets/estrella_icono.png'
import estrella_mala_icono from '../Assets/estrella_mala_icono.png'
import { ShopContext } from '../../Context/ShopContext'

const ProductDisplay = (props) => {
    const {product} = props;
    const {addToCart} = useContext(ShopContext);
  return (
    <div className='productdisplay'>
        <div className="productdisplay-left">
            <div className="productdisplay-img-list">
                <img src={product.image} alt="" />
                <img src={product.image} alt="" />
                <img src={product.image} alt="" />
                <img src={product.image} alt="" />
            </div>
            <div className="productdisplay-img">
                <img className='productdisplay-main-img' src={product.image} alt="" />
            </div>
        </div>
        <div className="productdisplay-right">
            <h1>{product.name}</h1>
            <div className="productdisplay-right-star">
                <img src={estrella_icono} alt="" />
                <img src={estrella_icono} alt="" />
                <img src={estrella_icono} alt="" />
                <img src={estrella_icono} alt="" />
                <img src={estrella_mala_icono} alt="" />
                <p>(122)</p>
            </div>
            <div className="productdisplay-right-prices">
                <div className="productdisplay-right-price-old">
                    ${product.old_price}
                </div>
                <div className="productdisplay-right-price-new">
                    ${product.new_price}
                </div>
            </div>
            <div className="productdisplay-description">
                aca va la descripcion del producto
            </div>
            <div className="productdisplay-right-size">
                <h1>Selecciona la talla</h1>
                <div className="productdisplay-right-sizes">
                    <div>S</div>
                    <div>M</div>
                    <div>L</div>
                    <div>XL</div>
                    <div>XXL</div>
                </div>
            </div>
            <button onClick={()=>{addToCart(product.id)}}>Agregar al carrito</button>
            <p className='productdisplay-right-category' >
                <span>Categoria : <span>Mujer, Blusas, Vestidos, faldas, Chaquetas</span></span>
            </p>
            <p className='productdisplay-right-category' >
                <span>Etiquetas : <span>Moderno, ultimos </span></span>
            </p>
        </div>
    </div>
  )
}

export default ProductDisplay