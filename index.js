import express from 'express';
import morgan from 'morgan';
import mongoose from 'mongoose';
import cors from 'cors'; 
import authRoutes from './src/routes/auth.routes.js';

const app = express();

// Configurar CORS
const corsOptions = {
  origin: ['http://localhost:5174', 'https://lsneakers-backend.vercel.app'],
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
const connectDB = async () => {
  try {
    await mongoose.connect(
      'mongodb+srv://lsneakers:r3DcgZw42iE6t2Ef@lsneakers.pg47i.mongodb.net/?retryWrites=true&w=majority&appName=lsneakers'
    );
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error(error);
  }
};

// ⚠️ IMPORTANTE: No uses app.listen() directamente
connectDB();

// 🔥 Exporta `app` para que Vercel lo reconozca
export default app;
