import { Router } from 'express';
import transactionCtrl from '../controllers/transactionController';

// @Bring in our custom Middlewares
import isAuth from '../middlewares/isAuth';
import isCashier from '../middlewares/isCashier';
import balanceCheck from '../middlewares/checkBalance';

const router = Router();

//@User can view a specific account transaction.
router.get('/:id', isAuth, transactionCtrl.getOneTransaction);

router.post('/:number/credit', isAuth, isCashier, transactionCtrl.creditTransaction);

router.post('/:number/debit', isAuth, isCashier, balanceCheck, transactionCtrl.debitTransaction);

export default router;
