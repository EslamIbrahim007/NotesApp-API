import Joi from "joi";
// Common Joi options
const joiOptions = {

  abortEarly: false, // Do not stop at the first validation error
  stripUnknown: true // Remove unknown keys from the validated data
};
export const registerValidation = (data) => {
  const schema = Joi.object({
    username: Joi.string().min(3).max(30).required().messages({
      'string.min': 'Username must be at least 3 characters long',
      'string.max': 'Username must not exceed 30 characters',
      'string.empty': 'Username cannot be empty'
    }),
    email: Joi.string().email().required().messages({
      'string.email': 'Email must be a valid email address',
      'string.empty': 'Email cannot be empty'
    }),
    password: Joi.string().min(6).required().messages({
      'string.min': 'Password must be at least 6 characters long',
      'string.empty': 'Password cannot be empty'
    })
  });
  return schema.validate(data, joiOptions);
};
export const loginValidation = (data) => {
  const schema = Joi.object({
    username: Joi.string().min(3).max(30).required().messages({
      'string.min': 'Username must be at least 3 characters long',
      'string.max': 'Username must not exceed 30 characters',
      'string.empty': 'Username cannot be empty'
    }),
    password: Joi.string().min(6).required().messages({
      'string.min': 'Password must be at least 6 characters long',
      'string.empty': 'Password cannot be empty'
    })
  });
  return schema.validate(data, joiOptions);
};

export const resetPasswordValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    newPassword: Joi.string().min(6).required(),
    resetToken: Joi.string().required()
  });
  return schema.validate(data, joiOptions);
};