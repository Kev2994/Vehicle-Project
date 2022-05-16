import express from "express";
import { ApolloServer } from "apollo-server-express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cron from "node-cron";
import { getProcessedData } from "./scheduleTask.mjs";
import { TypeDefs } from "./vehicleMake.schema.mjs";
import { Resolvers } from "./vehicleMake.resolver.mjs";

dotenv.config();

const main = async () => {
  let today = new Date();

// Set cron scheduler to run every 24 hours to fetch and parse data and insert/update data in DB

  const task = cron.schedule(
    `${today.getMinutes() + 1} ${today.getHours()} * * *`,
    getProcessedData
  );
  task.start();

  // DB Connection

  mongoose.connect(process.env.Mongo_URL,{
    useNewUrlParser: "true",
  });

  mongoose.connection.on("connected", (err, res) => {
    console.log("mongoose is connected")
  });


  const server = express();

  // apolloServer connection

  const apolloServer = new ApolloServer({
    typeDefs: TypeDefs,
    resolvers: Resolvers,
  });
  await apolloServer.start();
  apolloServer.applyMiddleware({ app: server });

  server.listen(process.env.PORT, () =>
    console.log(`listening at http://localhost:${process.env.PORT}/graphql`)
  );
};


main();
