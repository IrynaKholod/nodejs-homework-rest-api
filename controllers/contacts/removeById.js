const { Contact } = require("../../models/contact");
const createError = require("http-errors");

const removeById = async (req, res) => {
  const { contactId } = req.params;
  const { _id } = req.user;
  const result = await Contact.findOneAndDelete({ _id: contactId, owner: _id });
  if (!result) {
    throw createError(404, `Not found`);
  }
  res.status(200).json({
    status: "success",
    code: 200,
    message: "Contact deleted",
    data: result,
  });
};

module.exports = removeById;
