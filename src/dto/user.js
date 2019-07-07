class User {
  constructor ({ id = null, username = null, password = null, status = null } = {}) {
    this.id = id;
    this.username = username;
    this.password = password;
    this.status = status;
  }
}

module.exports = User;
