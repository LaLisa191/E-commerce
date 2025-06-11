import React, { useContext } from 'react'
import './CartItems.css'
import { ShopContext } from '../../Context/ShopContext'
import eliminar_icono from '../Assets/eliminar-icono.png'

const CartItems = () => {

    const {getTotalCartAmount, all_product, cartItems, removeFromCart} = useContext(ShopContext);
  return (
    <div className='cartitems'>
        <div className='cartitems-format-main'>
            <p>Productos</p>
            <p>Titulo</p>
            <p>Precio</p>
            <p>Cantidad</p>
            <p>Total</p>
            <p>Eliminar</p>
        </div>
        <hr />
        {all_product.map((e) => {
            if(cartItems[e.id] > 0) {
                return (
                    <div key={e.id}>
                        <div className='cartItems-format cartitems-format-main'>
                            <img className='carticon-product-icon' src={e.image} alt="" />
                            <p>{e.name}</p>
                            <p>${e.new_price}</p>
                            <button className='cartitems-quantify'>{cartItems[e.id]}</button>
                            <p>${e.new_price * cartItems[e.id]}</p>
                            <img className='caritems-remove-icon' src={eliminar_icono} onClick={() => removeFromCart(e.id)} alt="" />
                        </div>
                        <hr />
                    </div>
        )
            }
            return null;
        })}
        <div className="cartitems-down">
            <div className="cartitems-total">
                <h1>Total carrito</h1>
                <div>
                    <div className="cartitems-total-item">
                        <p>Subtotal</p>
                        <p>${getTotalCartAmount()}</p>
                    </div>
                    <hr />
                    <div className="cartitems-total-item">
                        <p>Envio</p>
                        <p>Gratis</p>
                    </div>
                    <hr />
                    <div className="cartitems-total-item">
                        <h3>Total</h3>
                        <h3>${getTotalCartAmount()}</h3>
                    </div>
                </div>
                <button>PROCEDER AL PAGO</button>
            </div>
            <div className="cartitems-promocode">
                <p>Si tienes un código promocional, ingrésalo aquí</p>
                <div className="cartitems-promobox">
                    <input type="text" placeholder='código promocional' />
                    <button>Aplicar</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default CartItems