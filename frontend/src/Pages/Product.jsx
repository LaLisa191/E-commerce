import React, { useContext } from 'react'
import {ShopContext} from '../Context/ShopContext'
import { useParams } from 'react-router-dom'
import Breadcrums from '../Components/Breadcrums/Breadcrums';
import ProductDisplay from '../Components/ProductDisplay/ProductDisplay';
import RelatedProducts from '../Components/RelatedProducts/RelatedProducts';

const Product = () => {
    // Obtiene todos los productos del contexto global
    const  {all_product} = useContext(ShopContext);
    // Extrae el ID del producto desde la URL
    const {productId} = useParams();
    // Busca el producto específico por ID
    const product = all_product.find((e) => e.id === Number (productId));
    
  return (
    <div>
      <Breadcrums product={product} />
      <ProductDisplay product={product} />
      <RelatedProducts />
    </div>
  )
}

export default Product