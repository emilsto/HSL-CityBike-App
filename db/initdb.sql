CREATE DATABASE bikedata;

\connect bikedata;

CREATE SCHEMA hsl_schema;

CREATE TABLE hsl_schema.trips (
    id SERIAL PRIMARY KEY,
    departure TIMESTAMP NOT NULL,
    return TIMESTAMP NOT NULL,
    departure_station_id INT NOT NULL,
    departure_station_name VARCHAR(255) NOT NULL,
    return_station_id INT NOT NULL,
    return_station_name VARCHAR(255) NOT NULL,
    distance_m FLOAT NOT NULL,
    duration_sec INT NOT NULL
);

ALTER DATABASE bikedata OWNER TO postgres;
GRANT ALL PRIVILEGES ON DATABASE bikedata TO postgres;

COPY hsl_schema.trips (departure, return, departure_station_id, departure_station_name, return_station_id, return_station_name, distance_m, duration_sec) FROM '/bikedata.csv' DELIMITER ',' CSV HEADER;

select * from hsl_schema.trips limit 10;

\dt;