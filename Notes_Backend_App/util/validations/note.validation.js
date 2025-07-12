import Joi from "joi";
// Common Joi options
const joiOptions = {

  abortEarly: false, // Do not stop at the first validation error
  stripUnknown: true // Remove unknown keys from the validated data
};
export const createNoteValidation = (data) => {
  const schema = Joi.object({
    title: Joi.string().min(3).max(30).required().messages({
      'string.min': 'title must be at least 3 characters long',
      'string.max': 'title must not exceed 30 characters',
      'string.empty': 'title cannot be empty'
    }),
    content: Joi.string().min(5).max(30).messages({
      'string.min': 'content must be at least 5 characters long',
      'string.max': 'title must not exceed 30 characters',
      'string.empty': 'content cannot be empty'
    }),
    
  });
  return schema.validate(data, joiOptions);
};
export const updateNoteValidation = (data) => {
  const schema = Joi.object({
    title: Joi.string().min(3).max(30).optional().messages({
      'string.min': 'title must be at least 3 characters long',
      'string.max': 'title must not exceed 30 characters',
      'string.empty': 'title cannot be empty'
    }),
    content: Joi.string().min(5).max(30).optional().messages({
      'string.min': 'content must be at least 5 characters long',
      'string.max': 'content must not exceed 30 characters',
      'string.empty': 'content cannot be empty'
    }),
  });
  return schema.validate(data, joiOptions);
};


