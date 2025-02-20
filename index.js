import express from 'express';
import morgan from 'morgan';
import mongoose from 'mongoose';
import cors from 'cors'; 
import authRoutes from './src/routes/auth.routes.js';

const app = express();

// Configurar CORS
const corsOptions = {
  origin: ['*', 'https://lsneakers-backend.vercel.app'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};
app.use(cors(corsOptions));

app.use(morgan('dev'));
app.use(express.json());

app.use('/api', authRoutes);

// Ruta raíz
app.get('/', (req, res) => {
  res.send('Hello from Vercel!');
});

// Conexión a la base de datos
const connectDb = async () => {
  try {
      await mongoose.connect('mongodb+srv://lsneakers:r3DcgZw42iE6t2Ef@lsneakers.pg47i.mongodb.net/?retryWrites=true&w=majority&appName=lsneakers');
      console.log('Conectado correctamente a la base de datos');
  } catch (error) {
      console.error('Error al conectar a la base de datos:', error);
      process.exit(1); // Termina el proceso si no puede conectar a la base de datos
  }
};

// ⚠️ IMPORTANTE: No uses app.listen() directamente

const startServer = async () => {
  await connectDb();
  app.listen(3000, () => {
      console.log("Server on port 3000");
  });
};

startServer();

// 🔥 Exporta `app` para que Vercel lo reconozca
export default app;
