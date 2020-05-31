const { Router } = require("express");
const UserController = require("./app/controllers/UserController");
const FileController = require("./app/controllers/FileController");

const multer = require("multer");
const multerConfig = require("./config/multer");
const SessionController = require("./app/controllers/SessionController");

const upload = multer(multerConfig);

const routes = new Router();

routes.post("/users", UserController.store);

routes.get("/users", UserController.index);

routes.delete("/users/:id", UserController.destroy);

routes.put("/users/:id", UserController.update);

//files
routes.post("/files", upload.single("file"), FileController.store);

//criar uma sessao
routes.post("/sessions", SessionController.store);
module.exports = routes;
