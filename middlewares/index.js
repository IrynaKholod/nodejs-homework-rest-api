const validateBody = require("./validateBody");
const isValidId = require("./isValid");
const auth = require('./auth');
const upload = require("./upload")

module.exports = {
    validateBody,
    isValidId,
    auth,
    upload
}