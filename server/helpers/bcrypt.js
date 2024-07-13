const bcrypt = require('bcryptjs');

const hashPass = (password) => {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
};

const comparePass = (password, passwordDb) => {
  return bcrypt.compareSync(password, passwordDb);
};

module.exports = { hashPass, comparePass };
