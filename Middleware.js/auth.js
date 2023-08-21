const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    try {
      const decoded = jwt.verify(token.split(" ")[1], "lokendra");
      if (decoded) {
        req.body.userID = decoded.userID;
        req.body.user = decoded.user;
        next();
      } else {
        res.send({ msg: "Please Login ..." });
      }
    } catch (error) {
      console.log(error);
      res.send({ err: error.message });
    }
  } else {
    res.send({ msg: "Please Login ..." });
  }
};

module.exports = {
  auth,
};
