import { Vehicle } from "./model/vehicleModel.mjs";

//@desc- Resolver function extract data from DB with args - limit and offset

const Resolvers = {
  Query: {
    getVehicles: async (parent, args) => {
      const vehicles = await Vehicle.find({},{ _id: 0, __v: 0 }).limit((args.limit) *1).skip((args.offset -1) * args.limit).exec();
      return vehicles;
    },
  },
};

export { Resolvers };