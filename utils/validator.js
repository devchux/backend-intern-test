const Joi = require("joi");

exports.registerUserValidator = (body) => {
  const schema = Joi.object({
    first_name: Joi.string(),
    last_name: Joi.string(),
    password: Joi.string()
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
      .required(),
    email_address: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      })
      .required(),
    phone_number: Joi.string(),
    confirm_password: Joi.string().valid(Joi.ref("password")).required(),
  });

  const { error } = schema.validate(body);

  return { error };
};

exports.loginUserValidator = (body) => {
  const schema = Joi.object({
    password: Joi.string()
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
      .required(),
    email_address: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      })
      .required(),
  });

  const { error } = schema.validate(body);

  return { error };
}