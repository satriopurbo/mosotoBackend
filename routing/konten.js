const Controller = require("../controller/kontenController");
const router = require("express").Router();
const authentification = require("../middleware/authentification");
const upload = require("../helper/upload");

router.post("/register", authentification, upload, Controller.register);
router.get("/list", Controller.list);

module.exports = router;
