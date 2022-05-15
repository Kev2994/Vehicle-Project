import mongoose from "mongoose";
const Schema = mongoose.Schema;

const subSchema = new Schema(
  {
    typeId: [
      {
        type: String,
      },
    ],
    typeName: [
      {
        type: String,
      },
    ],
  },
  { _id: false }
);

const VehicleSchema = new Schema({
  Make_ID: [
    {
      type: String,
    },
  ],
  Make_Name: [
    {
      type: String,
    },
  ],
  vehicleTypes: {
    type: [subSchema],
    required: false,
  },
});

const Model = mongoose.model;
const Vehicle = Model("Vehicles", VehicleSchema);

export { Vehicle };
