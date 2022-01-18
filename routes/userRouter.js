const { Router } = require('express');
const router = Router();
const { signUp, login, authUser } = require("../controllers/userController");
const authorize = require("../custom_middleware/authorize");

router.post("/register", signUp);
router.post("/login", login);
router.get("/user", authorize, authUser);

module.exports = router;