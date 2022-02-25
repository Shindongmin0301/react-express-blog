const router = require('express').Router();
const blogCtrl = require('../controller/blog.ctrl');

const authenticateToken = require('../middlewares/verifyToken');

router.get('/', blogCtrl.view.loadPosts);
router.get('/find-one/:id', blogCtrl.view.loadPostOne);

router.post('/create', authenticateToken, blogCtrl.process.insertPost);
router.put('/update', blogCtrl.process.updatePost);
router.delete('/delete', authenticateToken, blogCtrl.process.deletePost);

module.exports = router;
