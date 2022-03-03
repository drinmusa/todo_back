const jwt = require("jsonwebtoken");
const configSecretKey = require("../config");
    

module.exports = {
  async createJwt(payload) {
    return new Promise((resolve, reject) => {
      jwt.sign(
        payload,
        configSecretKey.secretKey,
        {
          expiresIn: 86400,
        },
        (err, token) => {
          if (err) {
            reject(err);
            return;
          }

          resolve(token);
        }
      );
    });
  },
};
