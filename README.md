# Dockerize Mongo-graphql app

This project fetches vehicle makes in XML format then parse it to JSON format and fetches all individual vehicle types per vehicle make.
Project also save vehicle makes along with vehicle types in mongoDB and data can be fetched from mongoDB by performing this graphql query:

```
query getVehicles($limit: Int, $offset: Int) {
  getVehicles(limit: $limit, offset: $offset) {
    Make_ID
    Make_Name
    vehicleTypes {
      typeId
      typeName
    }
  }
}
```

## pre-requisite

node version greater than 13 & above
docker should be installed to run dockerize app

## local setup

Clone this repo:
`git clone https://github.com/Kev2994/Vehicle-Project`
`cd Vehicle-Project`

install all dependencies:
`npm install`

copy example env file and setup required env var, use DB-name: vehicledb
`cp .example.env .env`

start project by running this:
`npm run start:dev`

You can find graphql playground here:
`http://localhost:${PORT}/graphql`

Example Query:

```
query getVehicles($limit: Int, $offset: Int) {
  getVehicles(limit: $limit, offset: $offset) {
    Make_ID
    Make_Name
    vehicleTypes {
      typeId
      typeName
    }
  }
}

// Variables
{
  "limit": 50,
  "offset": 0
}
```

## Start dockerize app:

Make sure docker desktop is running on your machine

Start mongo-app docker container by running this command:
`docker compose up --build`

## Project Details:

### Schedule task:

Schedule task will be start executing after starting the server and it will execute after every 24 hours.
Task will basically fetch vehicles makes with vehicle types and save/update in mongoDB.
Data will be stored in Mongo DB after parsing.
Here batching approach is used to fetch vehicle types per make and insert/update it to DB to limit concurrent requests and avoid timeouts.
Here batch size is decided 10.
This task will take approx 30 min to fetch & upload all the data in mongodb.

### GraphQl Endpoint:

getVehicles GraphQL query is provided to fetch data from MongoDB.
limit(default=100) & offset(default=0) query arguments to the db to avoid fetching approx 11000 documents at once.
