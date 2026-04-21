import express from 'express';
import logger from '#config/logger.js';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.routes.js';
import userRoute from './routes/users.routes.js';
import { securityMiddleware } from '#middleware/security.middleware.js';
const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  morgan('combined', { stream: { write: msg => logger.info(msg.trim()) } })
);
app.use(cookieParser());
// app.use(securityMiddleware);

app.get('/', (req, res) => {
  logger.info('hello from here');
  res.status(200).send('Hello from acquisitions');
});

app.get('/api', (req, res) => {
  res.status(200).send({ message: 'Acqusitions API is running' });
});

app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timeStamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoute);
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

export default app;
