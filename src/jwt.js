const jsonServer = require('json-server');
const jwt = require('jsonwebtoken');
const config = require('./config');
const users = require('./data/users');
const JWT = require('./dto/jwt');

// JWT settings
const {
  jwt: {
    secret = 'ABC12345678',
    ttl = '1h',
    loginUrl = '/auth/login',
  } = {}
} = config;

// Import data
const getData = require('./data');

// Create server
const { port = 3000 } = config || {};
const server = jsonServer.create();
const middlewares = jsonServer.defaults();
const router = jsonServer.router(getData());

server.use(middlewares);
server.use(jsonServer.bodyParser)

// JWT setup
const getAuthenticatedUser = ({ username, password }) =>  users.find(user => username === user.username && password === user.password);
const createToken = (payload) => jwt.sign(payload, secret, { expiresIn: ttl });
const verifyToken = (token) => jwt.verify(token, secret, (err, decode) => {
  if (decode === undefined) throw err;
  return decode;
});

// Create auth route
server.post(loginUrl, (req, res) => {
  const { body: credentials = {} } = req;
  const { password, ...user } = getAuthenticatedUser(credentials);

  if (!!user) {
    const jwt = new JWT({ token: createToken(credentials) });
    res.status(200).jsonp({ user, jwt });
  } else {
    res.status(401).send();
  }
});

// Add JWT auth middleware
server.use((req, res, next) => {
  const {
    headers: {
      authorization = '',
    } = {}
  } = req;
  const [authType, authToken] = authorization.split(' ');

  if (authType === 'Bearer') {
    try {
      verifyToken(authToken);
      next();
      return;
    } catch (err) { }
  }

  res.status(401).send();
});

// Start server
server.use(router)
  .listen(port, () => {
    console.log(`Mock API started on port ${port}.`);
  });
