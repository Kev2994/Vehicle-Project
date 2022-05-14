import { fetchAllMakes, fetchMake } from "../services/allVehicleMake.mjs";

const getProcessedData = async (req, res) => {
  try {
    let makes = await fetchAllMakes();
    //const filterMakes = makes.filter((make) => (make.Make_ID.length = 1));
    makes = makes.slice(0, 2000);
    //const processedData = [];

    const batchOperation = async () => {
      try {
        let position = 0;
        let results = [];
        while (position < makes.length) {
          const itemsForBatch = makes.slice(position, position + 10);
          results = [
            ...results,
            ...(await Promise.all(
              itemsForBatch.map(async (make) => {
                make.vehicleTypes = await fetchMake(make.Make_ID[0]);
                return make;
              })
            )),
          ];
          position += 10;
        }
        return results;
      } catch (err) {
        console.error(err);
      }
    };

    let processedData = await batchOperation();
    /* let processedData = await Promise.all(
      makes.map(async (make) => {
        make.vehicleTypes = await fetchMake(make.Make_ID[0]);
        return make;
      })
    );
    for (let make of makes) {
      const vehicleTypes = await fetchMake(make.Make_ID[0]);
      make.vehicleTypes = vehicleTypes;
      processedData.push(make);
    }*/
    //console.log({ processedData });
    res.send(processedData);
  } catch (err) {
    console.error(err);
  }
};

export { getProcessedData };
