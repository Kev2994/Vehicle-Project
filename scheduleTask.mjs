import { fetchAllMakes, fetchMake } from "./services/allVehicleMake.mjs";
import { Vehicle } from "./model/vehicleModel.mjs";

const getProcessedData = async (req, res) => {
  try {
    console.log("cron started running");
    let makes = await fetchAllMakes();
    makes = makes.slice(0, 50);
    let position = 0;
    // let results = [];
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
      //results = [...results, ...fetchedData];
      position += 10;
    }
  } catch (err) {
    console.error(err);
  }
};

export { getProcessedData };
