import Joi from 'joi';

export default {
  createAccount(value) {
    const schema = {
      type: Joi.string().valid(['saving', 'current']).required(),
      status: Joi.string().valid(['active', 'dormant']),
    };

    const options = {
      language: {
        key: '{{key}} ',
      },
    };
    return Joi.validate(value, schema,options);
  },
  updateAccount(reqBody) {
    const schemaData = {
      type: Joi.string().valid(['saving', 'current']),
      status: Joi.string().valid(['active', 'dormant']),
    };

    const options = {
      language: {
        key: '{{key}} ',
      },
    };
    return Joi.validate(reqBody, schemaData,options);
  },
};
