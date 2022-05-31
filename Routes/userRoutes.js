const express = require("express");
const router = express.Router();
const userController = require("../Controllers/userController");
const userMiddleWares = require("../middleWares/userMiddleware");

router.post("/signup", userController.signup);

router.post("/login", userController.login);

router.get(
  "/user/:userId",
  userMiddleWares.allowIfLoggedin,
  userController.getUser
);

router.get(
  "/users",
  userController.getUsers
);

router.put('/user/:userId', userMiddleWares.allowIfLoggedin, userMiddleWares.grantAccess('updateAny', 'profile'), userController.updateUser);

router.delete(
  "/user/:userId",
  userMiddleWares.allowIfLoggedin,
  userMiddleWares.grantAccess("deleteAny", "profile"),
  userController.deleteUser
);



module.exports = router;
