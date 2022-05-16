import { fetchAllMakes, fetchMake } from "./services/allVehicleMake.mjs";
import { Vehicle } from "./model/vehicleModel.mjs";

//@desc - Scheduled to run this function to parse xml data amd insert/update data in MongoDB

const getProcessedData = async (req, res) => {
  try {
    console.log("cron started running");
    let makes = await fetchAllMakes();  //fetch all vehicle makes and parsing it

    let position = 0;

  /*
  @desc- looping to perform batch operation to fetch the xml data of vehicleMake and insert/update it to MongoDB
  @param - batch size is 10
  */


    while (position < makes.length) {
      const itemsForBatch = makes.slice(position, position + 10);
      let fetchedData = await Promise.all(
        itemsForBatch.map(async (make) => {
          make.vehicleTypes = await fetchMake(make.Make_ID[0]);
          return make;
        })
      );

      await Vehicle.bulkWrite(
        fetchedData.map((data) => ({
          updateOne: {
            filter: { Make_ID: data.Make_ID },
            update: data,
            upsert: true,
          },
        }))
      );
      position += 10;
    }
  } catch (err) {
    console.error(err);
  }
};

export { getProcessedData };
