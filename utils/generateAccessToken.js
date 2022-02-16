const jwt = require('jsonwebtoken');
require('dotenv').config({ path: `${__dirname}/../.env`});

exports.generateAccessToken = (user) => {
  const token = jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: '1h' });
  return token
}