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

module.exports.delete = (req, res) => {
  models.products

    .findOne({ where: { id: req.params.id } })

    .then(products => products.destroy().then(product => res.send("success")))
    .catch(rr => console.log(err))
    .catch(err => console.log(err));
};
