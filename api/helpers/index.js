const jwt = require("jsonwebtoken");
const models = require("../models");

module.exports.isAuthenticated = (req, res, next) => {
  console.log("this is middleware");
  const token =
    req.body.token ||
    req.query.token ||
    (req.headers.authorization && req.headers.authorization.split(" ")[1]) ||
    undefined;

  if (token === undefined) {
    return res.send("token not found");
  }

  const decoded = jwt.verify(token, process.env.JTW_SECRET);
  models.accounts
    .findOne({ where: { id: decoded.id } })
    .then(account => {
      if (account === null) {
        return res.send("account not found");
      }
      req.decoded = decoded;
      next();
    })
    .catch(err => res.send(err));
};
