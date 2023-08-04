var jwt = require('jsonwebtoken');

function generateToken(user) {
  if(!user) return null;
  var u = {
    userId: user.id,
    name: user.name,
    username: user.username
  }
  return jwt.sign(u, '1234abcd', {
    expiresIn: 60 * 60 * 24 // expires in 24 hours
  });
}

function getCleanUser(user) {
  if (!user) return null;
  return {
    userId: user.id,
    name: user.name,
    username: user.username
  };
}

// function decodeToken (token) {
//   const base64Url = token.split('.')[1];
//   const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
//   const buff =  Buffer(base64, 'base64');
//   const payloadinit = buff.toString('ascii');
//   const payload = JSON.parse(payloadinit);
//   return payload
// }

module.exports.generateToken = generateToken
module.exports.getCleanUser = getCleanUser
// module.exports.decodeToken = decodeToken