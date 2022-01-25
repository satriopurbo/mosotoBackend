const Controller = require("../controller/kontenController");
const router = require("express").Router();
const authentification = require("../middleware/authentification");
const upload = require("../helper/upload");

router.post("/register", authentification, upload, Controller.register);
router.post("/update", authentification, upload, Controller.update);
router.get("/list", Controller.list);
router.post("/listByJudul", Controller.listByJudul)
router.post("/listByTags", Controller.listByTags)

module.exports = router;
