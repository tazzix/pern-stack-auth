const jwt = require('jsonwebtoken');
require('dotenv').config();

function jwtGenerator(userId) {
  const payload = {
    user: {
      id: userId,
    },
  };

  // the code below was the code written from the tutorial
  // Look at file server/routes/dashboard.js to see the change code for this code

  //   function jwtGenerator(user_id) {
  //   const payload = {
  //     user: user_id
  //   };

  return jwt.sign(payload, process.env.jwtSecret, { expiresIn: '1h' });
}

module.exports = jwtGenerator;
