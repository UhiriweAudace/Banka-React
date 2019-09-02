import { Router } from 'express';
import authCtrl from '../controllers/authController';

// @Bring in our custom middlewares
import isAuth from '../middlewares/isAuth';
import isAdmin from '../middlewares/isAdmin';

const router = Router();

router.patch('/user/:email', isAuth, isAdmin, authCtrl.changeUserType)

/**
 * @route         POST api/v1/auth/signup
 * @description   Users signup or Users registration
 * @access        Public
 */
router.post('/signup', authCtrl.signup);

/**
 * @route         POST api/v1/auth/login
 * @description   Users Login
 * @access        Public
 */
router.post('/signin', authCtrl.login);

export default router;
