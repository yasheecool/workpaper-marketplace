import express from 'express';
//middleware
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import { authMiddleware } from './middleware/authMiddleware';
import errorMiddleware from './middleware/errorMiddleware';

//routes
import {
  firmRoutes,
  userRoutes,
  listingRoutes,
  baseRoutes,
  adminRoutes,
  savedListingRoutes,
  installRoutes,
  requestRoutes,
} from './routes';

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(helmet());
app.use(authMiddleware);

// Register routes
app.use('/api', baseRoutes);
app.use('/api/user', userRoutes);
app.use('/api/firm', firmRoutes);
app.use('/api/listings', listingRoutes);
app.use('/api/installed-listings', installRoutes);
app.use('/api/saved-listings', savedListingRoutes);
app.use('/api', requestRoutes); //for the vendor firm to approve or reject listing requests

// TODO: Add middlware to check if the user is an admin
app.use('/api/admin', adminRoutes);

app.use(errorMiddleware);

export default app;
