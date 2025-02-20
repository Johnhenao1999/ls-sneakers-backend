import express from 'express';
import morgan from 'morgan';
import mongoose from 'mongoose';
import cors from 'cors';
import authRoutes from './routes/auth.routes.js';

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

// Conexión a MongoDB antes de exportar `app`
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb+srv://lsneakers:r3DcgZw42iE6t2Ef@lsneakers.pg47i.mongodb.net/?retryWrites=true&w=majority&appName=lsneakers', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Connected to MongoDB');
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error);
  }
};

// Conéctate a MongoDB antes de exportar `app`
await connectDB();

export default app;
 