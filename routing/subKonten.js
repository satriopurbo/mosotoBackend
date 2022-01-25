const Controller = require("../controller/subKontenController");
const router = require("express").Router();
const authentification = require("../middleware/authentification");
const upload = require("../helper/upload");

router.post("/register", authentification, upload, Controller.register);
router.post("/update", authentification, upload, Controller.update);
router.get("/listByKontenId/:kontenId", Controller.listByKontenId);
router.post("/delete", Controller.delete)

module.exports = router;
