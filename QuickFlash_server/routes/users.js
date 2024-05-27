var express = require('express');
var router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Get users listing
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// ====================== REGISTER ======================
router.post("/register", (req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;

  if (!username || !email || !password) {
    res.status(400).json({
      error: true,
      message: "Request body incomplete - email and password needed"
    });
  }

  const queryUsers = req.db.from("user").select("username").where("username", "=", username);
  // **** check if user already exists in database ****
  queryUsers.then(users => {
    if (users.length > 0) {
      res.status(400).json({
        error: true,
        message: "User already exists"
      });
      return
    }
    // **** if user is new, hash their password
    const saltRounds = 10;
    const hash = bcrypt.hashSync(password, saltRounds);
    return req.db.from("user").insert({ username, email, hash });

  }).then(() => {
    res.status(201).json({
      error: false,
      message: "User created"
    })
  })
});


// ====================== LOGIN ======================
// Verifying user details for login and generating a JWT token
router.post("/login", (req, res) => {
  const emailOrUsername = req.body.emailOrUsername;
  const password = req.body.password;

  if (!emailOrUsername || !password) {
    return res.status(400).json({
      error: true,
      message: "Request body incomplete - username and password needed"
    });
  }

  const queryUsers = req.db.from("user")
    .select("username", "hash")
    .where("email", "=", emailOrUsername)
    .orWhere("username", "=", emailOrUsername);

  queryUsers.then(users => {
    if (users.length == 0) {
      return res.status(401).json({
        error: true,
        message: "User does not exist"
      });
    }
    else{
      return res.status(200).json({
        error: false,
        message: "Successful login"
      });
    }
  });
})
//     const user = users[0];
//     return bcrypt.compare(password, user.hash).then(match => {
//       if (!match) {
//         return res.status(401).json({
//           error: true,
//           message: "Wrong password"
//         });
//       }

//       const secretKey = "secretKey" // Secret key should be stored in .env
//       const expires_in = 60 * 60 * 24; // 24 hours

//       const exp = Math.floor(Date.now() / 1000) + expires_in; // JWT expiration time in seconds
//       const token = jwt.sign({ username, exp }, secretKey);

//       return res.json({ token_type: "Bearer", token, expires_in });
//     });
//   })
//   .catch(error => {
//     return res.status(500).json({
//       error: true,
//       message: "Internal server error"
//     });
//   });
// });

// // Middleware for authorization
// const authorize = (req, res, next) => {
//   const authorization = req.headers.authorization;
//   let token = null;

//   if (authorization && authorization.split(" ").length === 2) {
//     token = authorization.split(" ")[1];
//     console.log("Token: ", token);
//   } else {
//     return res.status(401).json({
//       error: true,
//       message: "Authorization failed, no token"
//     });
//   }

//   try {
//     const secretKey = "secretKey"; // Secret key should be stored in .env
//     const decoded = jwt.verify(token, secretKey);

//     if (decoded.exp < Math.floor(Date.now() / 1000)) {
//       console.log("Token has expired");
//       return res.status(401).json({
//         error: true,
//         message: "Expired token"
//       });
//     }

//     req.username = decoded.username;
//     next();
//   } catch (err) {
//     return res.status(401).json({
//       error: true,
//       message: "Token invalid",
//       err
//     });
//   }
// };

// // Authorization middleware is executed inside the router
// router.post("/downloadcard", authorize, function(req, res) {
//   res.json({ doSomething: req.username });
// });

module.exports = router;