import fetch from "node-fetch";
import xml2js from "xml2js";
const parser = new xml2js.Parser({ mergeAttrs: true });


//@desc- fetchAllMakes fetches all vehicle makes and parse it and returns allVehicleMakes

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


// @desc- fetchMake fetches vehicle types per Make and pase it and return all vehicle types with typeID and typeName Property

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
    return processedData;
  } catch (err) {
    console.error(err);
  }
};


export { fetchAllMakes, fetchMake };
