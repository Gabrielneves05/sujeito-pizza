import { Router } from 'express';

import { CreateUserController } from './controllers/user/CreateUserController';
import { AuthUserController } from './controllers/user/AuthUserController';
import { DetailUserController } from './controllers/user/DetailUserController';

import { isAuthenticated } from './middlewares/isAuthenticated';

const router = Router();

// Routers user
router.post('/users', new CreateUserController().handle);

router.post('/login', new AuthUserController().handle);

router.get('/me', isAuthenticated, new DetailUserController().handle);

export { router };