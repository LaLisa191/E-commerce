import express from "express";
import product_router from "./routers/product.router.js"
import connectDB from "./db/db.js";

const startServer = async () => {
  await connectDB();
  
  const app = express();
  app.use(express.json());
  
  // Montar las rutas de productos (tal como las tienes definidas)
  app.use('/', product_router);
  
  const PORT = 3001;
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });
};

export default startServer;