import express from 'express';
import morgan from 'morgan';
import cors from 'cors'; // Importa el paquete cors
import authRoutes from './routes/auth.routes.js';
import { createProduct, getProducts } from './controllers/products.controller.js';

const app = express();

// Configurar CORS
const corsOptions = {
  origin: '*', // Dirección de tu frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
  allowedHeaders: ['Content-Type', 'Authorization'], // Cabeceras permitidas
};
app.use(cors(corsOptions)); // Agregar middleware de CORS

// Middleware de Morgan para registrar las peticiones
app.use(morgan('dev'));
app.use(express.json());

// Ruta para subir productos
app.post('/api/products', createProduct);
app.get('/api/products', getProducts);

// Rutas de autenticación
app.use("/api", authRoutes); 

export default app;
