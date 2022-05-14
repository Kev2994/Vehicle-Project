import fetch from "node-fetch";
import xml2js from "xml2js";
const parser = new xml2js.Parser({ mergeAttrs: true });

const fetchAllMakes = async () => {
  try {
    const rawData = await fetch(
      `https://vpic.nhtsa.dot.gov/api/vehicles/getallmakes?format=XML`
    );
    const parsedData = await parser.parseStringPromise(await rawData.text());
    return parsedData.Response.Results.pop()?.AllVehicleMakes;
  } catch (err) {
    console.error(err);
  }
};
const fetchMake = async (id) => {
  try {
    const rawData = await fetch(
      `https://vpic.nhtsa.dot.gov/api/vehicles/GetVehicleTypesForMakeId/${id}?format=xml`
    );
    const parsedData = await parser.parseStringPromise(await rawData.text());
    const processedData =
      parsedData.Response.Results[0]?.VehicleTypesForMakeIds?.map(
        (vehicleType) => {
          return {
            typeId: vehicleType.VehicleTypeId,
            typeName: vehicleType.VehicleTypeName,
          };
        }
      );
    // console.log(processedData);
    // return data.Response.Results[0].VehicleTypesForMakeIds;
    return processedData;
  } catch (err) {
    console.error(err);
  }
};
export { fetchAllMakes, fetchMake };
