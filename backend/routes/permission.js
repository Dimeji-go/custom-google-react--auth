const express = require("express");
const router = express.Router();
const rolesController = require("../controllers/rolesController.js");

// Upgrade Permission Route
router.put("/upgrade", rolesController.upgrade);

// Remove Permission Route
router.put("/remove", rolesController.remove);
module.exports = router;
