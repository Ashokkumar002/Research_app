const errorHandler = (err, req, res, next) => {
  // Log the error details (you can enhance this to log to a file or monitoring service)
  console.error(err.stack);

  // Check for known error types and respond accordingly
  if (err.name === "ValidationError") {
    // Handle Mongoose validation errors
    return res.status(400).json({ message: err.message, errors: err.errors });
  }

  if (err.name === "MongoError" && err.code === 11000) {
    // Handle MongoDB duplicate key errors (e.g., unique index violations)
    return res.status(409).json({
      message: `Duplicate key error: ${Object.keys(
        err.keyValue
      )} already exists.`,
    });
  }

  // Check if the error is a custom error with a status code
  if (err.statusCode) {
    return res.status(err.statusCode).json({
      message: err.message || "An error occurred",
    });
  }

  // Generic server error
  return res.status(500).json({
    message: "Something went wrong. Please try again later.",
    error: err.message || "Internal Server Error",
  });
};

module.exports = errorHandler;
