const { Router } = require("express");

const routes = Router();

const SodiumController = require("../../controllers/sodium");

routes.post("/encrypt", SodiumController.encrypt);
routes.get("/teste", SodiumController.teste);

module.exports = routes;
