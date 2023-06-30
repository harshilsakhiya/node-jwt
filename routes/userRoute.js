const { register, login } = require("../controller/userController");

const router = require("express").Router();
router.post("/register", register);
router.post("/login", login);

router.use((err, req, res, next) => next(err))

module.exports = router;
