const contactsOperations = require("../../models/contacts");
const createError = require("http-errors");
const Joi = require("joi");

const contactSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "org"] },
    })
    .required(),
  phone: Joi.string().min(6).required(),
});

const add = async (req, res) => {
  const { error } = contactSchema.validate(req.body);
  if (error) {
    throw createError(400, `Missing required name field`);
  }
  const result = await contactsOperations.addContact(req.body);
  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      result,
    },
  });
};

module.exports = add;
