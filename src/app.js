import express from 'express';
import morgan from 'morgan';
import cors from 'cors'; // Importa el paquete cors
import authRoutes from './routes/auth.routes.js';

const app = express();

// Configurar CORS
const corsOptions = {
  origin: ['http://localhost:5174', 'https://lsneakers-backend.vercel.app'], // Permite ambas direcciones
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};
app.use(cors(corsOptions));

 
// Middleware de Morgan para registrar las peticiones
app.use(morgan('dev'));    
app.use(express.json()); 

// Rutas de autenticación
app.use("/api", authRoutes); 

export default app;
