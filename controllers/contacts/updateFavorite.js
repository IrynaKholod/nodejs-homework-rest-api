const { Contact } = require("../../models/contact");
const createError = require("http-errors");

const updateFavorite = async (req, res) => {
  const { contactId } = req.params;
  const { favorite } = req.body;
  const { _id } = req.user;
  const result = await Contact.findOneAndUpdate({_id: contactId, owner: _id,}, { favorite }, { new: true });
  if (!result) {
    throw createError(404, "Not found");
  }
  res.json(result);
};

module.exports = updateFavorite;
