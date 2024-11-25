import express from 'express';
import { actionsRouter } from './actions.routes';
import { welcomeRouter } from './welcome.routes';

export const routes = express.Router();

routes.use('/welcome', welcomeRouter);
routes.use('/actions', actionsRouter);