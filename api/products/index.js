const express = require("express");
const router = express.Router();
const controller = require("./controller");
const helpers = require("../helpers");

router.get("/", helpers.isAuthenticated, controller.getAll);

router.post("/", controller.post);

router.delete("/:id", controller.delete);

module.exports = router;
