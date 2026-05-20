export const errorHandler = (err, req, res, next) => {
  const status = err.status || 400;
  const message = err.message || 'Internal Server Error';
  
  res.status(status).json({
    success: false,
    error: message,
    status,
    timestamp: new Date().toISOString()
  });
};

export default errorHandler;