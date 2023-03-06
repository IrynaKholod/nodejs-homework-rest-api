const { Contact } = require("../../models/contact");
const createError = require("http-errors");

const updateById = async (req, res) => {
  const { contactId } = req.params;
  const { _id } = req.user;
  const result = await Contact.findOneAndUpdate({ _id: contactId, owner: _id }, req.body, {
    new: true,
  });

  if (!result) {
    throw createError(404, `Contact with id=${contactId} not found`);
  }
  res.status(200).json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
};

module.exports = updateById;
