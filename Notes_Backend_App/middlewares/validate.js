import { registerValidation, loginValidation, resetPasswordValidation } from '../util/validations/auth.validation.js';

// Middleware to validate requests based on the route
const routeSchemas = {
  'POST:/register': registerValidation,
  'POST:/login': loginValidation,
  'POST:/reset-password': resetPasswordValidation
};
//
export const validateRequest = (req, res, next) => {
  const method = `${req.method}:${req.path}`;
  let validation = routeSchemas[method];

  if (!validation) {
    return res.status(400).json({ error: 'Invalid validation route' });
  }
  const { error, value } = validation(req.body);
  if (error) {
    const formattedErrors = error.details.map((err) => ({
      field: err.context.key,
      message: err.message
    }));
    return res.status(400).json({ error: formattedErrors });
  }
  req.body = value; // Update the request body with the validated data
  next();
};
