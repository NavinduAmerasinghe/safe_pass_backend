const WildlifeObservation = require("../models/wildlifeObservation");

exports.createObservation = async (req, res) => {
  try {
    const observation = new WildlifeObservation(req.body);
    await observation.save();
    res.status(201).send(observation);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.getObservations = async (req, res) => {
  try {
    const observations = await WildlifeObservation.find({});
    res.send(observations);
  } catch (error) {
    res.status(500).send();
  }
};

exports.getObservation = async (req, res) => {
  try {
    const observation = await WildlifeObservation.findById(req.params.id);
    if (!observation) {
      return res.status(404).send();
    }
    res.send(observation);
  } catch (error) {
    res.status(500).send();
  }
};

exports.updateObservation = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = [
    "animal_location",
    "observation_time",
    "observed_date",
    "climate",
    "taxon_group",
    "road_condition",
    "habitat_surrounding",
    "type_of_road",
    "traffic",
    "image",
  ];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );
  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }
  try {
    const observation = await WildlifeObservation.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!observation) {
      return res.status(404).send();
    }
    res.send(observation);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.deleteObservation = async (req, res) => {
  try {
    const observation = await WildlifeObservation.findByIdAndDelete(
      req.params.id
    );
    if (!observation) {
      return res.status(404).send();
    }
    res.send(observation);
  } catch (error) {
    res.status(500).send();
  }
};
