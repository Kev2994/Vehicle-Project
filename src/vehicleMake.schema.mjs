import { gql } from "apollo-server-express";

const TypeDefs = gql`
  type Vehicle {
    Make_ID: [ID!]!
    Make_Name: [String!]!
    vehicleTypes: [VehicleType]
  }

  type VehicleType {
    typeId: [ID]
    typeName: [String]
  }

  type Query {
    getVehicles(limit: Int, offset: Int): [Vehicle]
  }
`;

export { TypeDefs };
