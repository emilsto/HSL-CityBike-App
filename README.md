# HSL-CityBike-App

## Table of contents

- [General info](#general-info)
- [Project status](#project-status)
- [Technologies used](#technologies-used)
- [How to run](#how-to-run)
- [Techical documentation](#technical-documentation)
   - [Database overview](#database)
   - [API documentation](#api-documentation)


## General info

- A web application for visualizing the usage of HSL's city bikes in Helsinki.


## What is this?

- This is my solution for the Solita Dev Academy pre-assignment. https://github.com/solita/dev-academy-2023-exercise

## Project status

### Completed features:

- [x] The application displays stations in a list.
    - [x] The list is paginated.
    - [x] The list can be filtered by station name and address.
- [x] The application displays single station view.
    - [x] The view displays the station's name and address.
    - [x] The view displays a map with the station's location.
- [x] The application displays a list of trips.
    - [x] The list is paginated.
    - [x] The list can be searched by trip start and end station.

### Missing features:

- The application displays more information about single station view, such as:
    - [ ] Average trip distance
    - [ ] Average trip duration
    - [ ] Top 5 most popular return stations for starting the from given station
    - [ ] Top 5 most popular starting stations for returning to given station
    - [ ] Ability to filter trips by date
- The application jorney list has the ability to:
    - [ ] Order the list by columns
    - [ ] Filter the list
- Misc
    - [ ] Add tests
    - [ ] Add more styling
    - [ ] Add more documentation

## Technologies used

### Frontend

- React
- TypeScript
- TailwindCSS (maybe)


<img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB"> <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white"> <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white">



### Backend

- GoLang
- PostgreSQL
- Docker

<img src="https://img.shields.io/badge/Go-00ADD8?style=for-the-badge&logo=go&logoColor=white"> <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white"> <img src="https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white">


## How to run

- Note: This project is still in development, so some things might not work as intended, and the instructions below might not be complete.

### Pre-requisites:

To run this project you need to have the following installed:

- Docker
- GoLang
- npm

### Running the app

- Clone the repo and cd into the root directory

#### Downloading the data

Download following files:

- https://dev.hsl.fi/citybikes/od-trips-2021/2021-05.csv
- https://dev.hsl.fi/citybikes/od-trips-2021/2021-06.csv
- https://dev.hsl.fi/citybikes/od-trips-2021/2021-07.csv
- https://opendata.arcgis.com/datasets/726277c507ef4914b0aec3cbcfcbfafc_0.csv 

and place them in the `data` directory of the project. After that run the python script `parse_data.py` from data directory to parse the data into a format that the backend can use. First 3 files contain trip data and the last one is station data.


#### Starting the database

- run command `cd db`
- run command `docker build -t hsl-bikeapp-db .`
- run command `docker run -d -p 5432:5432 hsl-bikeapp-db`
- The database should now be running on port 5432, you can check this by running `docker ps` and test the connection by telnetting to the port `telnet localhost 5432` , for example. You should see something like this:

```
Trying ::1...
Connected to localhost.
Escape character is '^]'.
```

- Good to go!

#### Starting the backend

- run command `cd backend`
- run command `go build`
- run command `go run .`

#### Starting the frontend

- run command `cd frontend`
- run command `npm install`
- run command `npm start`
- the app should now be running on port 3000

# Technical documentation

The technical documentation section provides an overview of the application's architecture and technologies used. It also contains information about the database schema and the API documentation.

## General info

- The backend of the application is built using the Go programming language. It utilizes the Chi router for handling HTTP requests and the pgx library for connecting to the PostgreSQL database. The database is running in a Docker container and it's populated with data from various CSV files through a python script. The script combines and cleans the data from the source files before inserting it into the database.

- The frontend of the application is built using React and TypeScript. It communicates with the backend to fetch and display the data from the PostgreSQL database. The user interface is built using React components, and the application is organized using a component-based architecture. TypeScript is used to provide type safety and better developer experience while writing the frontend code.

## Database

The posgtgressql database is running in a Docker container, and it's populated with data from the downloaded sources, that is combined and cleaned by a python script. When starting the container, the database is initialized via init.sql, which creates the tables and inserts the data into the database. The database is running on port 5432. The database contains tables for stations and trips.

Relevant files for database are contained in the `db` directory. 

 Content of the table is following:

## Stations

The stations table contains information about the stations. It contains the following columns:

| Column name | Type | Description |
| ----------- | ---- | ----------- |
| id | SERIAL | The id of the station |
| obj_id | VARCHAR(255) | The id of the station as it is in the source data |
| name_fi | VARCHAR(255) | The finnish name of the station |
| name_sv | VARCHAR(255) | The swedish name of the station |
| name | VARCHAR(255) | The english name of the station |
| address | VARCHAR(255) | The finnish address of the station |
| address_sv | VARCHAR(255) | The swedish address of the station |
| city | VARCHAR(255) | The city where the station is located |
| capacity | INTEGER | The capacity of the station |
| latitude | FLOAT | The latitude of the station |
| longitude | FLOAT | The longitude of the station |

## Trips

The trips table contains information about the trips. It contains the following columns:

| Column name | Type | Description |
| ----------- | ---- | ----------- |
| id | SERIAL | The id of the trip |
| departure | TIMESTAMP | The start time of the trip |
| return | INTEGER | The end time of the trip |
| departure_station_id | INTEGER | The id of the departure station |
| departure_station_name | VARCHAR(255) | The name of the departure station |
| return_station_id | INTEGER | The id of the return station |
| return_station_name | VARCHAR(255) | The name of the return station |
| distance_m | INTEGER | The distance of the trip in meters |
| duration_sec | INTEGER | The duration of the trip in seconds |


## API documentation

Here is documentation for the endpoints that the backend provides. All endpoints return JSON data.


## Stations

- GET /api/v1/stations/:id

Returns a single station with the specified id. Here is an example JSON response:

```
{
   "id":22,
   "objId":"539",
   "nameFi":"Aalto-yliopisto (M), Tietot",
   "nameSe":"Aalto-universitetet (M),",
   "name":"Aalto University (M), Tietotie",
   "address":"Tietotie 4",
   "addressFi":"",
   "addressSe":"Datavägen 4",
   "city":"Espoo",
   "capacity":20,
   "latitude":24.820099,
   "longitude":60.184987
}
```

- GET /api/v1/stations_page?searchTerm=&limit=20&page=1

Returns a list, with a maximum length of user specified limit, of stations that match the search term. The list is paginated, and the user can specify which page to return. Page = offset parameter in the SQL query. SearchTerm is optional, and if it's not specified, all stations are returned. If the searchTerm is specified, the query will search for the term in the name of the station or address of the station. The query is case insensitive and queries both return and departure stations.

Here is an example JSON response:

```
[
   {
      "id":22,
      "objId":"539",
      "nameFi":"Aalto-yliopisto (M), Tietot",
      "nameSe":"Aalto-universitetet (M),",
      "name":"Aalto University (M), Tietotie",
      "address":"Tietotie 4",
      "addressFi":"",
      "addressSe":"Datavägen 4",
      "city":"Espoo",
      "capacity":20,
      "latitude":24.820099,
      "longitude":60.184987
   },
   {
      "id":320,
      "objId":"258",
      "nameFi":"Abraham Wetterin tie",
      "nameSe":"Abraham Wetters väg",
      "name":"Abraham Wetterin tie",
      "address":"Sorvaajankatu 1",
      "addressFi":"",
      "addressSe":"Svarvaregatan 1",
      "city":"Helsinki",
      "capacity":16,
      "latitude":25.0426533906378,
      "longitude":60.1927661994999
   },
   ...
]
```
## Trips

- /api/v1/trips?q=&limit=20&page=0

Returns a list, with a maximum length of user specified limit, of trips that match the search term. The list is paginated, and the user can specify which page to return. Page = offset parameter in the SQL query. SearchTerm is optional, and if it's not specified, all trips are returned (according to page limit). If the searchTerm is specified, the query will search for the term in the name of the station or address of the station. The query is case insensitive and queries both return and departure stations.

Here is an example JSON response:

```
[
   {
      "id":392397,
      "departureTime":"2021-05-01T00:00:11Z",
      "returnTime":"2021-05-01T00:04:34Z",
      "depStationId":138,
      "depStationName":"Arabiankatu",
      "retStationId":138,
      "retStationName":"Arabiankatu",
      "distanceMeters":1057,
      "durationSec":259
   },
   {
      "id":392396,
      "departureTime":"2021-05-01T00:00:30Z",
      "returnTime":"2021-05-01T00:09:53Z",
      "depStationId":17,
      "depStationName":"Varsapuistikko",
      "retStationId":45,
      "retStationName":"Brahen kenttä",
      "distanceMeters":1688,
      "durationSec":558
   }
   ...
]
```