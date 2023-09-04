var jwt = require('jsonwebtoken');

function generateToken(user) {
    if(!user) return null;
    var u = {
      userId: user.id,
      name: user.name,
      username: user.username
    }
    return jwt.sign(u, 'ABCDEF$123', {
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
  

module.exports.generateToken = generateToken
module.exports.getCleanUser = getCleanUser