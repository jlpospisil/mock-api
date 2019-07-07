class JWT {
  constructor ({ token = null, refreshToken = null } = {}) {
    this.token = token;
    this.refreshToken = refreshToken;
  }
}

module.exports = JWT;
