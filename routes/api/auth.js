const express = require("express");
const {auth, validateBody} = require("../../middlewares");
const ctrl = require("../../controllers/auth");
const { ctrlWrapper } = require("../../helpers");
const {schemas} = require('../../models/user');

const router = express.Router();

router.post("/signup", validateBody(schemas.registerSchema), ctrlWrapper(ctrl.signup));
router.post("/login", validateBody(schemas.loginSchema), ctrlWrapper(ctrl.login));
router.post("/logout", auth, ctrlWrapper(ctrl.logout));

module.exports = router;