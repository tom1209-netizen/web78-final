import express from 'express';
import connectDB from './config/db.js';
import bodyParser from 'body-parser';
import authRoutes from './routes/authRoutes.js';
import movieRoutes from './routes/movieRoutes.js';
import cors from 'cors';

const app = express();

const corsOptions = {
  origin: "http://localhost:5173",
};

// Connect Database
connectDB();

// Init Middleware
app.use(cors(corsOptions));
app.use(bodyParser.json());

app.get('/', (req, res) => res.send('API Running'));

// Define Routes
app.use('/api/auth', authRoutes);
app.use('/api/movies', movieRoutes);

const PORT = process.env.PORT || 3003;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
