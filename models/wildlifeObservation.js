const mongoose = require("mongoose");

const wildlifeObservationSchema = new mongoose.Schema({
  animal_location: {
    type: String,
    required: true,
  },
  observation_time: {
    type: Date,
    required: true,
  },
  observed_date: {
    type: String,
    enum: ["Spring", "Summer", "Fall", "Winter"],
    required: true,
  },
  climate: {
    type: String,
    required: true,
  },
  taxon_group: {
    type: String,
    required: true,
  },
  road_condition: {
    type: String,
    required: true,
  },
  habitat_surrounding: {
    type: String,
    required: true,
  },
  type_of_road: {
    type: String,
    required: true,
  },
  traffic: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

const WildlifeObservation = mongoose.model(
  "WildlifeObservation",
  wildlifeObservationSchema
);

module.exports = WildlifeObservation;
