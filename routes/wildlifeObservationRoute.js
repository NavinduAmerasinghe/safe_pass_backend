const express = require("express");
const router = express.Router();
const {
  createObservation,
  getObservations,
  getObservation,
  updateObservation,
  deleteObservation,
  observationSummary,
} = require("../controllers/wildlifeObservationController");

// Create a new wildlife observation
router.post("/observations", createObservation);

// Get all wildlife observations
router.get("/observations", getObservations);

// Get a single wildlife observation by ID
router.get("/observations/:id", getObservation);

// Update a single wildlife observation by ID
router.patch("/observations/:id", updateObservation);

// Delete a single wildlife observation by ID
router.delete("/observations/:id", deleteObservation);

// Get onservation summary
router.get("/observation/summary", observationSummary);

module.exports = router;
