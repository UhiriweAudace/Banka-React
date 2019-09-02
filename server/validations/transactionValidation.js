import Joi from 'joi';

export default {
  transactionAmount(value) {
    const schema = {
      amount: Joi.number().required()
    };

    const options = {
      language: {
        key: '{{key}} ',
      },
    };
    return Joi.validate(value, schema, options);
  }
};
