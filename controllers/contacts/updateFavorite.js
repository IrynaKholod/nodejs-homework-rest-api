const { Contact } = require("../../models/contact");
const createError = require("http-errors");

const updateFavorite = async (req, res) => {
  const { contactId } = req.params;
  const { _id } = req.user;
  const result = await Contact.findByIdAndUpdate( { _id: contactId, owner: _id }, req.body, { new: true });
  if (!result) {
    throw createError(404, "Not found");
  }
  res.json(result);
};

module.exports = updateFavorite;
