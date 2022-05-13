const auth = (req, res, next) => {

  const { username, password } = req.body;
  /**
   * Authentication can be done with passport token as well
   * by default set isAuthorized to false
   * after validating set to true
   * */ 
  let isAuthorized = false;

  // Check if username and password is provided
  if (!username || !password) {
    return res.status(400).json({
      message: "Username or Password not present",
      error: "User not found",
    });
  }else{
    if(username === 'admin' && password === 'admin'){
      isAuthorized = true;
      res.status(200).json({
        message: "User is Authorised"
      });
    }
  }

  // if is not authorised send message
  if (!isAuthorized) {
      return res.status(401).send("User Not Authorised");
  }

  next();
}

module.exports = auth;