const express = require("express");
const { testController } = require("../controllers/testController");

//router object
const router = express.Router();

//routes xdd
router.get("/", testController);

//export
module.exports = router;
//Nessie