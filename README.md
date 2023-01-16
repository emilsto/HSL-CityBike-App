# HSL-CityBike-App

## What is this?

- This is my solution for the Solita Dev Academy pre-assignment. https://github.com/solita/dev-academy-2023-exercise

## Project status

- Tiukasti kesken.

## Technologies used

### Frontend

- React
- TypeScript
- TailwindCSS


<img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB"> <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white"> <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white">



### Backend

- GoLang
- PostgreSQL
- Docker

<img src="https://img.shields.io/badge/Go-00ADD8?style=for-the-badge&logo=go&logoColor=white"> <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white"> <img src="https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white">


## How to run

### Pre-requisites

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

and place them in the `data` directory of the project. After that run the python script `data/parse_data.py` to parse the data into a format that the backend can use.


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

- to be continued...


