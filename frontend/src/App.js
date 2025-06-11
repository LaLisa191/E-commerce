import './App.css';
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Shop from './Pages/Shop';
import ShopCategory from './Pages/ShopCategory';
import LoginSignup from './Pages/LoginSignup';
import Cart from './Pages/Cart';
import Product from './Pages/Product';
import mujer_banner from './Components/Assets/mujer_banner.png';
import hombre_banner from './Components/Assets/hombre_banner.png';
import deportivo_banner from './Components/Assets/deportivo_banner.png';
import Footer from './Components/Footer/Footer';
import LoginAdmin from './Pages/LoginAdmin.jsx';
import ConnectionApi from './Pages/ConnectionApi.jsx';

function App() {
  return (
    <div> 
      <BrowserRouter>
        <Navbar />
        {/* 
          Aquí se define la estructura de las rutas de la aplicación.
          Cada ruta corresponde a una página específica de la tienda.
        */}
        <Routes>
          <Route path='/' element={<Shop />} />
          <Route path='/hombres' element={<ShopCategory category="hombre" banner={hombre_banner} />} />
          <Route path='/mujeres' element={<ShopCategory category="mujer" banner={mujer_banner} />} />
          <Route path='/deportivo' element={<ShopCategory category="deportivo" banner={deportivo_banner} />} />
          <Route path='/product' element={<Product />}>
          <Route path=':productId' element={<Product />} />
          </Route>
          <Route path='/cart' element={<Cart />} />
          <Route path='/login' element={<LoginSignup />} />
          <Route path="/loginadmin" element={<LoginAdmin />} />
          <Route path='/api' element={<ConnectionApi />} />
        </Routes>
        <Footer />
        

      </BrowserRouter>
    </div>

  );
}

export default App;
