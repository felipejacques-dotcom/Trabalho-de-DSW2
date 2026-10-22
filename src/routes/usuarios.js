const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/", async (req, res) => {
  try {
      const r = await db.query("SELECT * FROM usuarios");

      return res.status(200).json(r.rows);
  } catch (error) {
      return res.status(500).json({ msg: error.message });
  }
});

module.exports = router;
