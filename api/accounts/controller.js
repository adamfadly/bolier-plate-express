const models = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports.getAll = (req, res) => {
  models.accounts
    .findAll()
    .then(accounts => res.send(accounts))
    .catch(err => console.log(err));
};

module.exports.post = (req, res) => {
  const SALT_WORK_FACTOR = 7;
  const salt = bcrypt.genSaltSync(SALT_WORK_FACTOR);
  req.body.password = bcrypt.hashSync(req.body.password, salt);

  models.accounts
    .create(req.body)
    .then(accounts => res.send(accounts))
    .catch(err => res.send(err));
};

module.exports.delete = (req, res) => {
  models.accounts

    .findOne({ where: { id: req.params.id } })

    .then(accounts => accounts.destroy().then(accounts => res.send("success")))
    .catch(rr => console.log(err))
    .catch(err => console.log(err));
};

exports.login = (req, res) => {
  models.accounts
    .findOne({ where: { email: req.body.email } })
    .then(account => {
      if (account === null) {
        return res.send("account not found");
      }
      const validPassword = bcrypt.compareSync(
        req.body.password,
        account.password
      );
      if (validPassword === false) {
        return res.send("Password is not valid");
      }

      const token_data = {
        payload: {
          id: account.id,
          name: account.name
        },
        secret: process.env.JWT_SECRET,
        option: {
          expiresIn: "7d"
        }
      };
      const token = jwt.sign(
        token_data.payload,
        token_data.secret,
        token_data.options
      );
      res.send({
        message: "yo are logged in",
        id: account.id,
        token: token
      });
    })
    .catch(err => res.send(err));
};

//
// const models = require("../models")

// exports.getAll = (req, res) => {
//     models.products
//         .findAll()
//         .then(products => {
//             if (products === []) {
//                 res.send("data not fund")
//             } else {
//                 res.send(products)
//             }
//         })
//         .catch(err => res.send(err))
// }

// exports.post = (req, res) => {
//     models.products
//         .create(req.body)
//         .then(product => res.send({
//             message: "insert data success",
//             data: product
//         }))
//         .catch(err => res.send(err))
// }

// exports.deleteOne = (req, res) => {
//     models.products.findOne({ where: { id: req.params.id } })
//         .then(product =>
//             product.destroy()
//                 .then(result => res.send(result))
//                 .catch(err => res.send(err)))
//         .catch(err => res.send(err))

//     // models.products.destroy({
//     //     where: { id: req.params.id }
//     // }).then(result => {
//     //     if (result === 1) {
//     //         res.send("success")
//     //     } else {
//     //         res.send("failed")
//     //     }
//     // }).catch(err => res.send(err))
// }

// exports.deleteAll = (req, res) => {

//     models.products.destroy({
//         where: {},
//         truncate: true
//     }).then(result => {
//         res.send("success")
//     }).catch(err => res.send(err))
// }

// exports.search = (req, res) => {
//     console.log(req.query)
//     models.products.findAll({ where: req.query })
//         .then(products => res.send(products))
//         .catch(err => res.send(err))
// }

// exports.update = (req, res) => {
//     models.products.update(req.body, {
//         where: {
//             id: req.params.id
//         }
//     }).then(result => res.send(result))
//         .catch(err => res.send(err))
// }
// //
