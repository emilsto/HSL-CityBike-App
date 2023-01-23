package models

// Models for the database

import "time"

// Station for the stations table
type Station struct {
	ID        int     `json:"id"`
	ObjId     string  `json:"objId"`
	NameFi    string  `json:"nameFi"`
	NameSe    string  `json:"nameSe"`
	Name      string  `json:"name"`
	Address   string  `json:"address"`
	AddressFi string  `json:"addressFi"`
	AddressSe string  `json:"addressSe"`
	City      string  `json:"city"`
	Capacity  int     `json:"capacity"`
	Latitude  float64 `json:"latitude"`
	Longitude float64 `json:"longitude"`
}

// TripData for the trips table
type TripData struct {
	ID             int       `json:"id"`
	DepartureTime  time.Time `json:"departureTime"`
	ReturnTime     time.Time `json:"returnTime"`
	DepStationId   int       `json:"depStationId"`
	DepStationName string    `json:"depStationName"`
	RetStationId   int       `json:"retStationId"`
	RetStationName string    `json:"retStationName"`
	DistanceMeters float64   `json:"distanceMeters"`
	DurationSec    int       `json:"durationSec"`
}

// Models for the API

// Stationstatistics for returning statistics about a station and its trips
type StationStatistics struct {
	AvgDistanceDeparturesM float64 `json:"AvgDistanceDeparturesM"`
	AvgDistanceReturnsM    float64 `json:"AvgDistanceReturnsM"`
	DeparturesCount        int     `json:"DeparturesCount"`
	ReturnsCount           int     `json:"ReturnsCount"`
	TopFiveDepartures      []struct {
		DepStationName string `json:"depStationName"`
		Count          int    `json:"count"`
	} `json:"TopFiveDepartures"`
	TopFiveReturns []struct {
		RetStationName string `json:"retStationName"`
		Count          int    `json:"count"`
	} `json:"TopFiveReturns"`
}
