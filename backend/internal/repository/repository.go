package repository

import "github.com/emilsto/HSL-CityBike-App/models"

type DatabaseRepo interface {
	AllStations() bool
	StationCount() (int, error)
	FindStationByID(stationID string) (models.Station, error)
	FindStationByObjID(stationObjID string) (models.Station, error)
	FindAllStations() ([]models.Station, error)
	StationsByPage(q string, offset string, limit string) ([]models.Station, error)
	TripsByPage(q string, offset string, limit string) ([]models.TripData, error)
}
