const WildlifeObservation = require("../models/wildlifeObservation");
const cloudinary = require("../utils/cloudinary-config");

//create new observation
exports.createObservation = async (req, res, next) => {
  const {
    animalName,
    image,
    taxonGroup,
    location,
    observationDate,
    observationTime,
    dayNight,
    climateType,
    observationRoad,
    roadCondition,
    trafficType,
  } = req.body;
  try {
    const result = await cloudinary.uploader.upload(image, {
      folder: "wildLifeAnimls",
      //width:300,
      //crop:"scale"
    });

    const observation = await WildlifeObservation.create({
      animalName,
      // image: {
      //   public_id: result.public_id,
      //   url: result.secure_url,
      // },
      image,
      taxonGroup,
      location,
      observationDate,
      observationTime,
      dayNight,
      climateType,
      observationRoad,
      roadCondition,
      trafficType,
    });
    res.status(201).json({
      success: true,
      observation,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

//Retrive a list of observations
exports.getObservations = async (req, res, next) => {
  try {
    const observations = await WildlifeObservation.find();
    res.send(observations);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

//Retrive a single observation by ID
exports.getObservation = async (req, res, next) => {
  try {
    const observation = await WildlifeObservation.findById(req.params.id);
    if (!observation) {
      return res.status(404).send();
    }
    res.send(observation);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

//updating an exsisting observation
exports.updateObservation = async (req, res, next) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = [
    "animalName",
    "image",
    "taxonGroup",
    "location",
    "observationDate",
    "observationTime",
    "dayNight",
    "climateType",
    "observationRoad",
    "roadCondition",
    "trafficType",
  ];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );
  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }
  try {
    const observation = await WildlifeObservation.findById(req.params.id);

    if (!observation) {
      res.status(404).send();
      return;
    }

    // Update fields from request body
    updates.forEach((update) => {
      observation[update] = req.body[update];
    });

    // Upload new image if present in the request body
    if (req.body.image) {
      const result = await cloudinary.uploader.upload(req.body.image, {
        folder: "wildLifeAnimls",
        //width:300,
        //crop:"scale"
      });

      observation.image = {
        public_id: result.public_id,
        url: result.secure_url,
      };
    }

    await observation.save();

    res.json(observation);
  } catch (error) {
    console.log(error);
    next(error);
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
    console.log(error);
    next(error);
  }
};

exports.observationSummary = async (req, res, next) => {
  try {
    const lastCreated = await WildlifeObservation.aggregate([
      { $sort: { createdAt: -1 } },
      { $limit: 1 },
    ]);
    const lastCreatedFormatted = {
      ...lastCreated[0]._doc,
      createdAt: lastCreated[0].createdAt.toLocaleString(),
    };

    res.send(lastCreatedFormatted);
  } catch (err) {
    console.log(err);
    next(err);
  }
};
