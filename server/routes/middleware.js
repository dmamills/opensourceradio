const multipart = require('connect-multiparty');
const { RTMP_HTTP_PASS } = process.env;

const multipartMiddleware = multipart({
  maxFieldsSize: 50 * (1024 * 1024)
});

const authMiddleware = (req, res, next) => {
  const { authorization } = req.headers;
  if(!authorization || authorization !== `Bearer ${RTMP_HTTP_PASS}`) {
    return res.status(401).json({ error: 'Invalid API KEY' });
  } else {
    return next();
  }
};

const errorHandler = response => {
  return error => {
    console.log('error:', error);
    response.status(400).json({
      error
    });
  };
};

module.exports = {
  errorHandler,
  multipartMiddleware,
  authMiddleware
};
