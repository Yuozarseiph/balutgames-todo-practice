// Step 1
const {Router} = require('express');
const { signup, login, testJWT } = require('../controllers/authController.js');
const { authenticateJWT } = require('../middlewares/authMiddleware.js');

const router = Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/test-jwt', authenticateJWT, testJWT);

module.exports = router;