import express from "express";
import cors from "cors";
import product_router from "./routers/product.router.js";
import connectDB from "./db/db.js";

const startServer = async () => {
  try {
    // Conectar a la base de datos
    await connectDB();
    console.log("✅ Base de datos conectada");
 
    const app = express();
    
    // Configurar CORS - DEBE ir antes de express.json()
    app.use(cors({
      origin: [
        'http://localhost:3000',
        'http://127.0.0.1:3000',
        'http://localhost:5173', // Para Vite
        'http://localhost:8080'  // Para otros puertos
      ],
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
      allowedHeaders: ['Content-Type', 'Authorization'],
      credentials: true
    }));
    
    // Middleware para parsear JSON
    app.use(express.json());
    
    // Ruta de prueba para verificar que la API funciona
    app.get('/api/test', (req, res) => {
      res.json({ 
        message: 'API funcionando correctamente',
        timestamp: new Date().toISOString(),
        port: 3001
      });
    });
 
    // Montar las rutas de productos
    app.use('/', product_router);
 
    const PORT = 3001;
    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
      console.log(`📡 API disponible en http://localhost:${PORT}/api`);
    });
    
  } catch (error) {
    console.error("❌ Error al iniciar el servidor:", error);
    process.exit(1);
  }
};

// Ejecutar el servidor
startServer();

export default startServer;