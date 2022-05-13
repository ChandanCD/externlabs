const auth = (req, res, next) => {

  // check for basic auth header
  if (!req.headers.authorization || req.headers.authorization.indexOf('Basic ') === -1) {
    return res.status(401).json({ message: 'Missing Authorization Header' });
  }
  /**
   * Authentication can be done with passport token as well
   * by default set isAuthorized to false
   * after validating set to true
   * */ 
  let isAuthorized = false;

  // Check if username and password is provided
  const base64Credentials = req.headers.authorization.split(' ')[1];
  const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
  const [username, password] = credentials.split(':');
  if(username === 'admin' && password === 'admin'){
    isAuthorized = true;
  }else {
    return res.status(400).json({ message: 'Username or Password not present', error: "User not found" });
  }

  // if is not authorised send message
  if (!isAuthorized) {
      return res.status(401).send("User Not Authorised");
  }

  next();
}

module.exports = auth;