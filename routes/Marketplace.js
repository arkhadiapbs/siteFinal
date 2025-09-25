const express = require("express");
const router = express.Router();

router.get("/", (req, res) => 
    res.render("pages/marketplace"));

module.exports = router;
