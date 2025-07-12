import { ApiError } from '../util/ApiError.js';

export const apiErrorHandler = (err, req, res, next) => {
    if (err instanceof ApiError) {
        return res.status(err.statusCode).json({
            status: 'error',
            message: err.message,
            details: err.details || {}
        });
    }

    console.error(err); // Log the error for debugging

  next(err);
}
