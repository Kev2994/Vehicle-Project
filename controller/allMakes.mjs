import { fetchAllMakes, fetchMake } from "../services/allVehicleMake.mjs";

const getProcessedData = async (req, res) => {
  try {
    let makes = await fetchAllMakes();
    //const filterMakes = makes.filter((make) => (make.Make_ID.length = 1));
    makes = makes.slice(0, 5);
    //const processedData = [];
    let processedData = await Promise.all(
      makes.map(async (make) => {
        make.vehicleTypes = await fetchMake(make.Make_ID[0]);
        return make;
      })
    );
    /*for (let make of makes) {
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
