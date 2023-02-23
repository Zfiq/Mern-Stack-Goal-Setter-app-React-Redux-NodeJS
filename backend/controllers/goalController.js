// Install npm i express-async-handler
const asyncHandler = require("express-async-handler");

const Goal = require("../models/goalModel"); // goalModel contain bunch of mongoose methods for CRUD
const User = require("../models/userModel");
// Put the entire function in aysncHandler

// GET or POST  to /api/goals/
const getGoal = asyncHandler(async (req, res) => {
  const goals = await Goal.find({ user: req.user.id });

  res.status(200).json(goals);
});

// POST  to /api/goals/
const setGoal = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    // Handle error
    res.status(400);
    throw new Error("Please add a text field"); // Add middleware file to handle errors
  } // If no error then

  const goal = await Goal.create({
    text: req.body.text,
    user: req.user.id,
  });

  res.status(200).json(goal);
});

//UPDAT  req to  /api/goals/:id
const updateGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);

  if (!goal) {
    res.status(400);
    throw new Error("Goal not found");
  }
  const user = await User.findById(req.user.id);
  // Check for user
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }
  // Make sure only logged in user matches to it's goals
  if (goal.user.toString() !== user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedGoal);
});

// DELETE req to /api/goals/:id
const deleteGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);
  if (!goal) {
    res.status(400);
    throw new Error("Goal ID not found ");
  } // If mo Error then procced to delete
  const user = await User.findById(req.user.id);
  // Check for user
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }
  // Make sure only logged in user matches to it's goals
  if (goal.user.toString() !== user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }
  await goal.remove();
  res.status(200).json({ id: req.params.id });
});

module.exports = {
  // export functions
  getGoal,
  setGoal,
  updateGoal,
  deleteGoal,
};
