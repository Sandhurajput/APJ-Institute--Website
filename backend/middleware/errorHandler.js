export const notFound = (req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
};

export const errorHandler = (error, req, res, next) => {
  const statusCode = res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode).json({
    success: false,
    message: error.message || 'Internal server error',
  });
};
