const express = require("express");
const router = express.Router();
const bicycleController = require("../controller/bicycleCotroller")

router.get("/", bicycleController.getAllBicycles);

router.get("/create", (req, res) => {
    res.render("bicycle/create_bicycle");
});
router.post("/create", bicycleController.createBicycle);

router.get("/edit/:id", bicycleController.editBicycle);
router.post("/edit", bicycleController.editBicycle);

module.exports = router;