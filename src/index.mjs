import express from "express";
import { ApolloServer } from "apollo-server-express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cron from "node-cron";
import { getProcessedData } from "./scheduleTask.mjs";
import { TypeDefs } from "./vehicleMake.schema.mjs";
import { Resolvers } from "./vehicleMake.resolver.mjs";
const PORT = 3000;
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

  mongoose.connect(process.env.Mongo_URL).then(() => {
    console.log("connected");
  });

  const server = express();

  // apolloServer connection

  const apolloServer = new ApolloServer({
    typeDefs: TypeDefs,
    resolvers: Resolvers,
  });
  await apolloServer.start();
  apolloServer.applyMiddleware({ app: server });

  server.listen(PORT, () =>
    console.log(`listening at http://localhost:${PORT}`)
  );
};


main();
