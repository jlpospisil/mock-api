module.exports = {
  port: 4000,
  user: {
    username: 'user',
    password: 'user'
  },
  jwt: {
    secret: 'ABC12345678',
    ttl: '1h',
    loginUrl: '/auth/login',
  }
};
