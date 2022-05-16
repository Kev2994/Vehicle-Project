
This project fetches all vehicle makes in XML format then parse it to JSON format and fetches all vehicle types per vehicle make
in XML format and parse it to JSON format. 

All the data is stored in Mongo DB after parsing.

Here batching approach is used to fetch vehicle types per make and insert/update it to DB to limit concurrent requests and avoid timeouts. Hete batch size is decided 10. 

Job is scheduled with Cron to fetch all the data at every 24 hours and parse it and insert/update the DB.

GraphQL endpoint is created for GraphQL queries. Limit and offset arguments to query the db to avoid fetching approx 11000 documents at once.


Local Setup

Create a .env file in main directory and add following details.

Mongo_URL = mongodb://localhost:27017/<DB-name>
PORT=<Port_number>


install dependencies with following command
   npm i

Running the Application Locally

In terminal please run following command

npm run start (to start the server)
npm run dev (to start server for development)

NOTES: 
you need to use following url to Run graphql queries

http://localhost:${process.env.PORT}/graphql