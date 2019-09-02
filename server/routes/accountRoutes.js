import { Router } from 'express';
import accountCtrl from '../controllers/accountController';

// @Bring in our custom middlewares
import isAuth from '../middlewares/isAuth';
import isAdmin from '../middlewares/isAdmin';

const router = Router();

router.post('/', isAuth, accountCtrl.createAccount);

//@Staff/Admin can view all active bank accounts.
//router.get('/accounts', isAuth, isAdmin, accountCtrl.getActiveAccounts);

//@Staff/Admin can view all dormant bank accounts.
//router.get('/account', isAuth, isAdmin, accountCtrl.getDormantAccounts);

//@Staff/Admin can view all bank accounts
router.get('/', isAuth, accountCtrl.getAllAccount);

//@Admin/staff can view a list of accounts owned by a specific user.
router.get('/:email/accounts', isAuth, isAdmin, accountCtrl.getAccountByEmail);

//@User can view account details.
router.get('/:number', isAuth, accountCtrl.getOneAccount);

//@User can view account transaction history.
router.get('/:number/transactions', isAuth, accountCtrl.getTransactions);

router.get('/user/:id', accountCtrl.getAccounts);

//@Admin create a staff
router.post('/staff', isAuth, isAdmin, accountCtrl.createStaffs);

router.patch('/:number', isAuth, isAdmin, accountCtrl.updateAccount);

router.delete('/:number', isAuth, isAdmin, accountCtrl.deleteAccount);

export default router;
