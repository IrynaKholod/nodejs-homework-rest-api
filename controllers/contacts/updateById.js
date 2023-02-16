const contactsOperations = require("../../models/contacts");
const createError = require("http-errors");
const Joi = require("joi");

const updateSchema = Joi.object({
  name: Joi.string().min(3),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net", "org"] },
  }),
  phone: Joi.string().min(6),
});

const updateById = async (req, res) => {
  const { error } = updateSchema.validate(req.body);
  if (error) {
    throw createError(400, `missing fields`);
  }
  const { contactId } = req.params;
  const result = await contactsOperations.updateContact(contactId, req.body);

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
