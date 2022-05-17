import { Vehicle } from "./model/vehicleModel.mjs";

//@desc- Resolver function extract data from DB with args - limit and offset

const Resolvers = {
  Query: {
    getVehicles: async (parent, args) => {
      const { limit = 100, offset = 0 } = args;
      const vehicles = await Vehicle.find({}, { _id: 0, __v: 0 })
        .limit(limit * 1)
        .skip(offset)
        .exec();
      return vehicles;
    },
  },
};

export { Resolvers };
