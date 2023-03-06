const express = require("express");
const {auth, validateBody, isValidId} = require("../../middlewares");
const router = express.Router();
const { contacts: ctrl } = require("../../controllers");
const {ctrlWrapper} = require('../../helpers')

const {schemas} = require("../../models/contact")

router.get("/", auth, ctrlWrapper(ctrl.getAll));

router.get("/:contactId", auth, isValidId, ctrlWrapper(ctrl.getById));

router.post("/", auth, validateBody(schemas.addSchema), ctrlWrapper(ctrl.add));

router.put("/:contactId", auth, isValidId, validateBody(schemas.updateSchema), ctrlWrapper(ctrl.updateById));

router.patch("/:id/favorite", auth, isValidId, validateBody(schemas.updateFavoriteSchema), ctrlWrapper(ctrl.updateFavorite));

router.delete("/:contactId",  auth, isValidId,  ctrlWrapper(ctrl.removeById));



module.exports = router;
