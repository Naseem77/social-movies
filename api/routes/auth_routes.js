const express = require("express");

const AuthController = require("../controllers/auth_controller");
const checkAuth = require("../middlewares/check_auth");

const router = express.Router();

router.post("/login", AuthController.login);

router.post("/register", AuthController.register);

router.put("/refreshToken", AuthController.refreshToken);

router.delete("/logout", checkAuth, AuthController.logout);

router.get("/getUserData", checkAuth, AuthController.getUserData);

module.exports = router;
