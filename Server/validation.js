const Joi = require('@hapi/joi');

const productValidation = (data) => {
    const schema = Joi.object({
        title: Joi.string().min(6).required(),
        description: Joi.string().min(6).required(),
        price: Joi.number().required()
    });
    return schema.validate(data);
}

const bookValidation = (data) => {
    const schema = Joi.object({
        title: Joi.string().required(),
        author: Joi.string().required(),
        price: Joi.number().required()
    });
    return schema.validate(data);
}

module.exports.productValidation = productValidation;
module.exports.bookValidation = bookValidation;