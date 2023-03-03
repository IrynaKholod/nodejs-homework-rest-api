const express = require("express");
const {validateBody, isValidId} = require("../../middlewares");
const ctrl = require("../../controllers/auth");
const { ctrlWrapper } = require("../../helpers");
const {schemas} = require('../../models/user');

const router = express.Router();

router.post("/signup", validateBody(schemas.registerSchema), ctrlWrapper(ctrl.signup));
router.post("/login", validateBody(schemas.loginSchema), ctrlWrapper(ctrl.login));
module.exports = router;