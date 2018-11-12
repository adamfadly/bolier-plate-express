const models = require("../models");

module.exports.getAll = (req, res) => {
  models.products
    .findAll()
    .then(products => res.send(products))
    .catch(err => console.log(err));
};

module.exports.post = (req, res) => {
  models.products
    .create(req.body)
    .then(product => res.send(product))
    .catch(err => res.send(err));
};
