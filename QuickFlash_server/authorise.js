const jwt = require("jsonwebtoken");

// Middleware for authorisation
const authorise = (req, res, next) => {

    const AUTHORISATION_SECRET_KEY = process.env.AUTHORISATION_SECRET_KEY;

    const authorisation = req.headers.authorisation;
    let token = null;
  
    if (authorisation && authorisation.split(" ").length === 2) {
      token = authorisation.split(" ")[1];
      console.log("Token: ", token);
    } else {
      return res.status(401).json({
        error: true,
        message: "Authorisation failed, no token"
      });
    }
  
    try {
      const secretKey = AUTHORISATION_SECRET_KEY; // Secret key should be stored in .env
      const decoded = jwt.verify(token, secretKey);
  
      if (decoded.exp < Math.floor(Date.now() / 1000)) {
        console.log("Token has expired");
        return res.status(401).json({
          error: true,
          message: "Expired token"
        });
      }
  
      req.emailOrUsername = decoded.emailOrUsername;
      next();
    } catch (err) {
      return res.status(401).json({
        error: true,
        message: "Token invalid",
        err
      });
    }
  };

module.exports = authorise;