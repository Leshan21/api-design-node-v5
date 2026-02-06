import express from 'express';
import { fa } from 'zod/locales';
import userRoutes from './routes/userRoutes.ts';
import authRoutes from './routes/authRoutes.ts';
import habitRoutes from './routes/habitRoutes.ts';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { isTest } from '../env.ts'


const app = express();
app.use(helmet()); // for securing HTTP headers
app.use(cors()); // to enable CORS for example frontend-backend communication
app.use(express.json()); // to parse JSON bodies
app.use(express.urlencoded({ extended: true})); // to parse URL-encoded bodies
app.use(morgan('dev', {  
  skip: () => isTest(),  
}))


app.get('/health', (req, res) => { // req is what the client sends, res is what we send back from the server
  res.send("<button>click</button>").status(200); // Corrected order of method calls
})

// mounting the routes
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/habits', habitRoutes);



export { app }; // Export the app for use in other modules

export default app; // Default export for convenience means we can import without curly braces