const express = require("express");
const UsersController = require("../controllers/users_controller");
const checkAuth = require("../middlewares/check_auth");

const router = express.Router();

router.get("/user/:id", checkAuth, UsersController.getUserProfile);

router.get("/search", checkAuth, UsersController.searchUsers);

router.get("/relationships/:id", checkAuth, UsersController.getUserRelationships);

router.post("/following/:id", checkAuth, UsersController.followUser);

router.delete("/following/:id", checkAuth, UsersController.unFollowUser);

module.exports = router;
