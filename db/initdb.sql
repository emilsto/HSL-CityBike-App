CREATE DATABASE bikedata;

CREATE TABLE trips (
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

GRANT ALL PRIVILEGES ON TABLE trips TO postgres;

COPY trips (departure, return, departure_station_id, departure_station_name, return_station_id, return_station_name, distance_m, duration_sec) FROM '/bikedata.csv' DELIMITER ',' CSV HEADER;

select * from trips limit 10;