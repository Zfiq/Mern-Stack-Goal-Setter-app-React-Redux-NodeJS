const express = require("express");
const router = express.Router();
const {
  getGoal,
  setGoal,
  updateGoal,
  deleteGoal,
} = require("../controllers/goalController"); // Import getGoal from goalController

const { protect } = require("../middleware/authMiddleware");

// GET ,POST and Delete Update in a Single line combine
router.route("/").get(protect, getGoal).post(protect, setGoal);
router.route("/:id").delete(protect, deleteGoal).put(protect, updateGoal);

module.exports = router;
