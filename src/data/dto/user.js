class User {
  constructor ({ id, username, password, status } = {}) {
    this.id = id;
    this.username = username;
    this.password = password;
    this.status = status;
  }
}

module.exports = User;
