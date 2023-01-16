package models

import "time"

// Station for the stations table
type Station struct {
	ID         int
	Name       string
	Name_fi    string
	Name_se    string
	Address    string
	Address_se string
	City       string
	Capacity   int
	Latitude   float64
	Longitude  float64
}

// TripData for the trips table
type TripData struct {
	ID             int
	DepartureTime  time.Time
	ReturnTime     time.Time
	DepStationId   int
	DepStationName string
	RetStationId   int
	RetStationName string
	DistanceMeters float64
	DurationSec    int
	DepStation     Station
	RetStation     Station
}
