const router = require('express').Router();
const {
  getSingleUser,
  getAllUsers,
  createUser,
  updateUser,
  deleteUser
} = require('../../controllers/userController');

router.route('/').get(getAllUsers).post(createUser).put(updateUser).delete(deleteUser);

router.route('/:userId').get(getSingleUser);

module.exports = router;
