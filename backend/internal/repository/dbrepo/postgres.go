package dbrepo

import "github.com/emilsto/HSL-CityBike-App/models"

func (m *postgresDBRepo) AllStations() bool {
	return true
}

func (m *postgresDBRepo) StationCount() (int, error) {
	query := `SELECT COUNT(*) FROM hsl_schema.stations`
	var count int
	err := m.DB.QueryRow(query).Scan(&count)
	if err != nil {
		return 0, err
	}
	return count, nil
}

func (m *postgresDBRepo) FindStationByID(stationID string) (models.Station, error) {
	query := `SELECT * FROM hsl_schema.stations WHERE id = $1`
	var station models.Station
	err := m.DB.QueryRow(query, stationID).Scan(&station.ID, &station.Name, &station.Name_fi, &station.Name_se, &station.Address, &station.Address_se, &station.City, &station.Capacity, &station.Latitude, &station.Longitude)
	if err != nil {
		return models.Station{}, err
	}
	return station, nil
}
