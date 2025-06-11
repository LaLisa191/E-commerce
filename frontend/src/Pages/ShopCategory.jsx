import React, { useContext } from 'react';
import './CSS/ShopCategory.css';
import { ShopContext } from '../Context/ShopContext';
import abajo_icono from '../Components/Assets/abajo_icono.png';
import Item from '../Components/Item/Item';

const ShopCategory = (props) => {
  const { all_product } = useContext(ShopContext);

  return (
    <div className='shop-category'>
      {/* Banner */}
      <img className='shopcategory-banner' src={props.banner} alt="" />

      {/* Contenedor principal */}
      <div className="shopcategory-container">
        {/* Ordenar por */}
        <div className="shopcategory-indexSort">
          <p>
            <span>Mostrando 1-16</span> de 48 productos
          </p>
          <div className="shopCategory-sort">
            Ordenar por <img src={abajo_icono} alt="" />
          </div>
        </div>

        {/* Productos */}
        <div className="shopcategory-products">
          {all_product.map((item, i) => {
            if (props.category === item.category) {
              return (
                <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
              );
            }
            return null;
          })}
        </div>
        <div className="shopcategory-loadmore">
          Explorar mas
        </div>
      </div>
    </div>
  );
};

export default ShopCategory;
