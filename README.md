# HSL-CityBike-App

## Table of contents

- [General info](#general-info)
- [Project status](#project-status)
- [Technologies used](#technologies-used)
- [How to run](#how-to-run)
- [Techical documentation](#technical-documentation)
    - [General info](#general-info-1)
    - [Project structure](#project-structure)
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
    - [x] The view displays total number of journeys starting from the station.
    - [x] The view displays total number of journeys ending at the station
    - [x] The view displays the station's name and address.
    - [x] The view displays a map with the station's location.
    - [x] The view displays the station's average trip distance 
    - [x] The view displays the station's average trip duration
    - [x] The view is able to filter trips by date
- [x] The application displays a list of trips.
    - [x] The list is paginated.
    - [x] The list can be searched by trip start and end station.

### Missing features:

- The application displays more information about single station view, such as:
    - [ ] Top 5 most popular return stations for starting the from given station
    - [ ] Top 5 most popular starting stations for returning to given station
- The application jorney list has the ability to:
    - [ ] Order the list by columns
    - [ ] Filter the list
- Misc
    - [ ] Add tests
    - [ ] Add more styling
    - [ ] Add more documentation
    - [ ] Deploy the app somewhere

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

- Note: Instructions are for Linux, and they have been tested on Fedora 37 and macOS Ventura 13.0.1. I don't know if they work on Windows, but I don't see why they wouldn't. If you have probelms running the app, be in touch!

### Pre-requisites:

To run this project you need to have the following installed:

- Docker
- GoLang
- npm
- Python with pandas (for parsing the data)
    - In the future I might provide a download link for the parsed data, so that the user doesn't have to parse the data themselves.

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

- move to the `db` directory
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

- move to the `backend` directory
- run command `go mod download` to download the dependencies
- run command `go run cmd/API/*.go` 
- the backend should now be running on port 5000

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



### Project structure

The project is organized into four main directories:
- `backend` - contains the backend code
- `frontend` - contains the frontend code
- `data` - contains the data files and the python script for parsing the data
- `db` - contains the PostgreSQL Dockerfile and the init.sql file

Here is a simplified view of the project structure:

```
📦 
├─ .gitignore
├─ README.md
├─ backend
│  ├─ cmd
│  │  └─ API
│  │     ├─ main.go
│  │     └─ routes.go
│  ├─ go.mod
│  ├─ go.sum
│  ├─ internal
│  │  ├─ driver
│  │  │  └─ driver.go
│  │  └─ repository
│  │     ├─ dbrepo
│  │     │  ├─ dbrepo.go
│  │     │  └─ postgres.go
│  │     └─ repository.go
│  ├─ models
│  │  └─ models.go
│  └─ pkg
│     ├─ config
│     │  └─ config.go
│     └─ handlers
│        ├─ handlers.go
│        ├─ station_handlers.go
│        └─ trip_handels.go
├─ data
│  ├─ analyzedata.py
│  └─ parse_data.py
├─ db
│  ├─ dockerfile
│  └─ initdb.sql
└─ frontend
   ├─ src
   │  ├─ App.css
   │  ├─ App.tsx
   │  ├─ api
   │  │  └─ axios.tsx
   │  ├─ components
   │  │  ├─ StationCard.tsx
   │  │  └─ TripCard.tsx
   │  ├─ index.css
   │  ├─ index.tsx
   │  ├─ interfaces
   │  │  ├─ station_interface.tsx
   │  │  └─ trip_interface.tsx
   │  ├─ pages
   │  │  ├─ Home.tsx
   │  │  ├─ Journeys.tsx
   │  │  ├─ SingleStation.tsx
   │  │  └─ Stations.tsx
   │  ├─ react-app-env.d.ts
   │  ├─ reportWebVitals.ts
   │  ├─ setupTests.ts
   │  └─ styles
   │     ├─ journeys.css
   │     └─ stations.css
   └─ tsconfig.json
```

### Frontend

The frontend is split into four main pages:

- `Home` - contains the home page of the application
- `Stations` - contains the list of all stations
- `SingleStation` - contains the details of a single station
- `Journeys` - contains the list of all journeys

The code structure has been split into four main directories:

- 'api' - contains the axios.tsx file which is used to make HTTP requests to the backend
- 'components' - contains the StationCard and TripCard components which are used to display the data from the backend
- 'pages' - contains the Home, Stations, SingleStation and Journeys pages
- 'interfaces' - contains the interfaces used to define the data types of the data fetched from the backend
- 'styles' - contains the CSS files used to style the pages


### Backend

The backend API is split into five Go packages:

- `main` - contains the main.go and routes.go files which are used to initialize the router and the database connection
- `driver` - contains the repository and driver packages
- `models` - contains the models used in the application (Station and Trip)
- `handlers` - contains the config and handlers packages
- `dbrepo` - contains the repository implementation for database access

The backend of the application is designed using the repository pattern, which is used to abstract the data access layer from the rest of the application. This pattern provides a clean separation of concerns and makes it easy to change the data source in the future. The repository pattern is implemented by creating a repository interface and a repository implementation for each entity. The repository interface defines the methods used to fetch data from the database, and the repository implementation contains the actual SQL queries used to fetch the data.

HTTP requests are handled by handlers, which are located in the pkg/handlers directory. The handlers are split into two files, one for stations and one for trips. These handlers call the appropriate repository methods to fetch data from the database. The router, defined in the routes.go file, is used to handle HTTP requests and call the appropriate handlers. It is initialized in the main.go file.

The database connection is defined in the db.go file and is also initialized in the main.go file. This allows for easy management of the database connection throughout the application. 

Im not using ORM in this project, mainly because i didn't want to and I wanted to refresh my SQL skills. Also, the database is not that complex, so it's not really needed and perhaps it keeps the code base smaller and easier to understand.

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


### Stations

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

If the station with the specified id is not found, the response is:

```
{
   "message":"Station not found"
   "code":404
}
```

- GET /api/v1/stations_page?searchTerm=&limit=20&page=1

Returns a json array, with a maximum length of user specified limit, of stations that match the search term. Pagination is implemented with the "page" query, which specifies the page number (aka offset in SQL).

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

- GET /api/v1/stations/4/statistics?startTime=2021-05-01&endTime=2021-06-30

Returns statistics for a single station. Does not include ID of the station, because it's already in the URL and the usage of the endpoint is to get statistics for a specific station. Query also takes two parameters, startTime and endTime, which specify the time period for which the statistics are calculated. The times are formatted as YYYY-MM-DD.

Here is an example JSON response:

```
{
  "AvgDistanceDeparturesM": 2253.987524731183,
  "AvgDistanceReturnsM": 2249.5903598525906,
  "DeparturesCount": 4650,
  "ReturnsCount": 4613,
  "TopFiveDepartures": null,
  "TopFiveReturns": null
}
```

Sometimes station has no trips, and in that case the statistics are null. The endpoint returns an 404 error if the station is not found, like this:

```
{
   "message":"station 178 has no trip data",
   "code":404
}
```


### Trips

- GET /api/v1/trips?q=&limit=20&page=0

Returns a json array, with a maximum length of user specified limit, of trips that match the search term. The array is paginated, and the user can specify which page to return. Page = offset parameter in the SQL query. q (search query) is optional, and if it's not specified, all trips are returned (according to limit and page). If the q is specified, the query will search for the term in the name of the station or address of the station. The query is case insensitive and queries both return and departure stations.

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

