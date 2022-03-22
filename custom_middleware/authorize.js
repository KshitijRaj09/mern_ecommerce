const jwt = require('jsonwebtoken');
const config = require('config');
const { access_denied, invalid_token } = require('../constants/constantMsg');

const authorize = (req, res, next) => {
  console.log('inside authorize', req.user);
  const token = req.header('x-auth-token');

  //check for token
  if (!token) {
    return res.status(401).json({
      success: false,
      error: true,
      message: access_denied,
    });
  }

  //verify and decode token
  try {
    const decodeToken = jwt.verify(token, process.env.jwtSecretCode);
    req.user = decodedToken;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      error: true,
      message: invalid_token,
    });
  }
};

module.exports = authorize;
