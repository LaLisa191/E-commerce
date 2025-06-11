import React, {useState, useEffect, useContext} from 'react'
import './Navbar.css'

import nuevo_logo from '../Assets/nuevo-logo.png'
import carrito_pag from '../Assets/carrito-pag.png'
import { href, Link, useLocation } from 'react-router-dom';
import { ShopContext } from '../../Context/ShopContext';


export const Navbar = () => {

  const {getTotalCartItems} = useContext (ShopContext);
  const location = useLocation();

  const [menu, setMenu] = useState (() => {
    const storedMenu = localStorage.getItem('activeMenu');
    return storedMenu || 'shop';
  });

  const handleMenuClick = (menuItem) => {
    setMenu(menuItem);

  };

  // Logica del carrito 
  const handleCartClick = () => {
    setMenu('')
    
  };

  useEffect(() => {
    localStorage.setItem('activeMenu', menu);
  }, [menu]);

  const isSpecialPage = location.pathname === '/login' || location.pathname ==='/cart';

  return (
    <div className='navbar'>
        <div className='nav-logo'>
            <img src={nuevo_logo} alt="" />
        </div>
        <ul className='nav-menu'>  
            <li onClick={() => handleMenuClick("inicio")}>
              <Link style={{ textDecoration: 'none'}} to='/'>Inicio</Link>
              {!isSpecialPage && menu === "inicio" ? <hr/> : null}
            </li>
            <li onClick={() => handleMenuClick("mujeres")}>
              <Link style={{ textDecoration: 'none'}} to='/mujeres'>Mujer</Link>
              {!isSpecialPage && menu === "mujeres" ? <hr/> : null}
            </li>
            <li onClick={() => handleMenuClick("hombres")}>
              <Link style={{ textDecoration: 'none'}} to='/hombres'>Hombre</Link>
              {!isSpecialPage && menu === "hombres" ? <hr/> : null}
            </li>
            <li onClick={() => handleMenuClick("deportivo")}>
              <Link style={{ textDecoration: 'none'}} to='/deportivo'>Deportivo</Link>
              {!isSpecialPage && menu === "deportivo" ? <hr/> : null}
            </li>
        </ul>
        <div className='nav-login-cart'>
          <Link to='/login' onClick={handleCartClick}><button>Login</button></Link>
          
          <Link to='/cart' onClick={handleCartClick}>
            <div className="nav-cart-icon">
              <img src={carrito_pag} alt="carrito" />
              <div className='nav-cart-count'>{getTotalCartItems()}</div>
            </div>
          </Link>   {/*la parte incrementable del carrito*/}
        </div>
    </div>
  )
}

export default Navbar