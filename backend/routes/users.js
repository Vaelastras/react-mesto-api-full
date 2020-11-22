const router = require('express').Router();
const { getAllUsers, getUserById, getUserInfo } = require('../controllers/users');

router.get('/users', getAllUsers);
router.get('/users/me', getUserInfo)
router.get('/users/:userId', getUserById);

module.exports = router;
