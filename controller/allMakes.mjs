import { Vehicle } from "../model/vehicleModel.mjs";

const getVehicleData = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  try {
    const vehicles = await Vehicle.find({}, { _id: 0, __v: 0 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();
    res.json(vehicles);
  } catch (err) {
    console.error(err);
  }
};

export { getVehicleData };
