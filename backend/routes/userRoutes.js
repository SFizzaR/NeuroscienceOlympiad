const {login, savescore} = require("../controller/userController");
const express = require("express");
const router = express.Router();

router.post("/login", login);
router.post("/savescore", savescore);

module.exports = router;