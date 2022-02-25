const router = require('express').Router();
const homeCtrl = require('../controller/home.ctrl');

const authenticateToken = require('../middlewares/verifyToken');

router.get('/', homeCtrl.view.index);

router.post('/check-auth', authenticateToken, homeCtrl.process.checkAuth);
router.post('/login', homeCtrl.process.login);
router.post('/logout', homeCtrl.process.logout);

module.exports = router;
