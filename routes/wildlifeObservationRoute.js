const express = require("express");
const router = express.Router();
const wildlifeObservationController = require("../controllers/wildlifeObservationController");

// Create a new wildlife observation
router.post("/observations", wildlifeObservationController.createObservation);

// Get all wildlife observations
router.get("/observations", wildlifeObservationController.getObservations);

// Get a single wildlife observation by ID
router.get("/observations/:id", wildlifeObservationController.getObservation);

// Update a single wildlife observation by ID
router.patch(
  "/observations/:id",
  wildlifeObservationController.updateObservation
);

// Delete a single wildlife observation by ID
router.delete(
  "/observations/:id",
  wildlifeObservationController.deleteObservation
);

module.exports = router;
