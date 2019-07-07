const config = require('../config');
const User = require('./dto/user');

const {
  user: {
    username = 'user',
    password = 'user',
  } = {}
} = config;

module.exports = [
  new User({
    id: 1,
    username,
    password,
    status: 'ACTIVE',
  })
];
