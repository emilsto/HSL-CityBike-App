package dbrepo

import (
	"log"

	"github.com/emilsto/HSL-CityBike-App/models"
)

// Why is this seperate from the repository.go file? -> If I want to make the db work with say MySQL, I can just make a new file and implement the same interface

// Database access layer

// Test function
func (m *postgresDBRepo) AllStations() bool {
	return true
}

// Testing the database, get the number of stations
func (m *postgresDBRepo) StationCount() (int, error) {
	query := `SELECT COUNT(*) FROM hsl_schema.stations`
	var count int
	err := m.DB.QueryRow(query).Scan(&count)
	if err != nil {
		return 0, err
	}
	return count, nil
}

// Find a station by ID, return a station struct
func (m *postgresDBRepo) FindStationByID(stationID string) (models.Station, error) {
	// Query the database
	query := `SELECT * FROM hsl_schema.stations WHERE id = $1`
	var station models.Station
	err := m.DB.QueryRow(query, stationID).Scan(&station.ID, &station.ObjId, &station.NameFi, &station.NameSe, &station.Name, &station.Address, &station.AddressSe, &station.City, &station.Capacity, &station.Latitude, &station.Longitude)
	if err != nil {
		return models.Station{}, err
	}
	return station, nil
}

// Find station by Obj_id, return a station struct (obj_id is the unique ID of the station in the HSL API also used in trip data)
func (m *postgresDBRepo) FindStationByObjID(stationObjID string) (models.Station, error) {
	// Query the database
	query := `SELECT * FROM hsl_schema.stations WHERE obj_id = $1`
	var station models.Station
	err := m.DB.QueryRow(query, stationObjID).Scan(&station.ID, &station.ObjId, &station.NameFi, &station.NameSe, &station.Name, &station.Address, &station.AddressSe, &station.City, &station.Capacity, &station.Latitude, &station.Longitude)
	if err != nil {
		return models.Station{}, err
	}
	return station, nil
}

// Find all stations, return a slice of station structs, with Obj_id, Name_fi, Name_se, Name, Address, Address_se, City, Capacity, Latitude, Longitude
func (m *postgresDBRepo) FindAllStations() ([]models.Station, error) {
	// Query the database
	query := `SELECT * FROM hsl_schema.stations`
	log.Println(query)

	var stations []models.Station
	rows, err := m.DB.Query(query)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	// Loop through the rows and append them to the slice
	for rows.Next() {
		var station models.Station
		err := rows.Scan(&station.ID, &station.ObjId, &station.NameFi, &station.NameSe, &station.Name, &station.Address, &station.AddressSe, &station.City, &station.Capacity, &station.Latitude, &station.Longitude)
		if err != nil {
			return nil, err
		}
		stations = append(stations, station)
	}
	return stations, nil
}

// Find stations by page (offset and limit), return a slice of station structs, with Obj_id, Name_fi, Name_se, Name, Address, Address_se, City, Capacity, Latitude, Longitude
func (m *postgresDBRepo) StationsByPage(q string, offset string, limit string) ([]models.Station, error) {
	// Query the database
	query := `SELECT * FROM hsl_schema.stations `
	// create a slice of arguments to pass to the query
	var args []interface{}
	if q != "" {
		q = "%" + q + "%"
		query += `WHERE city ILIKE $1 OR name_fi ILIKE $1 OR address ILIKE $1 `
		args = append(args, q)
		query += `ORDER BY name OFFSET $2 LIMIT $3`
	} else {
		query += `ORDER BY name OFFSET $1 LIMIT $2`
	}
	// append the offset and limit to the args slice, as they are always passed
	args = append(args, offset, limit)

	var stations []models.Station
	rows, err := m.DB.Query(query, args...)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	// Loop through the rows and append them to the slice
	for rows.Next() {
		var station models.Station
		err := rows.Scan(&station.ID, &station.ObjId, &station.NameFi, &station.NameSe, &station.Name, &station.Address, &station.AddressSe, &station.City, &station.Capacity, &station.Latitude, &station.Longitude)
		if err != nil {
			return nil, err
		}
		stations = append(stations, station)
	}
	return stations, nil
}

// Find trips by page (offset and limit), return a slice of trip structs
func (m *postgresDBRepo) TripsByPage(offset string, limit string) ([]models.TripData, error) {
	// Query the database
	query := `SELECT * FROM hsl_schema.trips ORDER BY Departure OFFSET $1 LIMIT $2`
	var trips []models.TripData
	rows, err := m.DB.Query(query, offset, limit)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	// Loop through the rows and append them to the slice
	for rows.Next() {
		var trip models.TripData
		err := rows.Scan(&trip.ID, &trip.DepartureTime, &trip.ReturnTime, &trip.DepStationId, &trip.DepStationName, &trip.RetStationId, &trip.RetStationName, &trip.DistanceMeters, &trip.DurationSec)
		if err != nil {
			return nil, err
		}
		trips = append(trips, trip)
	}
	return trips, nil
}
