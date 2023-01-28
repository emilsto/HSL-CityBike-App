//API ENDPOINT TESTS

package main__test

import (
	"encoding/json"
	"fmt"
	"net/http"
	"net/http/httptest"
	"reflect"
	"testing"

	"github.com/emilsto/HSL-CityBike-App/models"
)

type stationData struct {
	key  string
	data string
}

var apiTests = []struct {
	name                 string
	url                  string
	method               string
	params               []stationData
	expectedResponseCode int
}{
	{"Home", "/", "GET", []stationData{}, http.StatusOK},                          // good request
	{"Stations", "/stations", "GET", []stationData{}, http.StatusOK},              // good request
	{"Stations", "/stations/323232", "GET", []stationData{}, http.StatusNotFound}, // bad request, invalid station id
	{"Stations", "/stations/32", "GET", []stationData{}, http.StatusOK},           // good request

}

// run simple tests for the API endpoints, to check if they return the correct status codes
func TestRoutes(t *testing.T) {
	routes := getRoutes()
	ts := httptest.NewTLSServer(routes)
	defer ts.Close()

	for _, test := range apiTests {
		if test.method == "GET" {
			res, err := ts.Client().Get(ts.URL + test.url)
			if err != nil {
				t.Log(err)
				t.Fatal()
			}
			if res.StatusCode != test.expectedResponseCode {
				t.Errorf("Expected status code %d, got %d", test.expectedResponseCode, res.StatusCode)
			}
		} else {
			t.Errorf("Unsupported method %s", test.method)
		}
	}
}

func TestStationById(t *testing.T) {
	//example station
	expectedStation := models.Station{
		ID:        1,
		ObjId:     "501",
		NameFi:    "Hanasaari",
		NameSe:    "Hanaholmen",
		Name:      "Hanasaari",
		Address:   "Hanasaarenranta 1",
		AddressFi: "",
		AddressSe: "Hanaholmsstranden 1",
		City:      "Espoo",
		Capacity:  10,
		Latitude:  24.840319,
		Longitude: 60.16582,
	}

	routes := getRoutes()
	ts := httptest.NewTLSServer(routes)
	defer ts.Close()

	url := fmt.Sprintf("%s/stations/%s", ts.URL, "1")
	res, err := ts.Client().Get(url)
	if err != nil {
		t.Log(err)
		t.Fatal()
	}

	//check if the response status code is 200
	if res.StatusCode != http.StatusOK {
		t.Errorf("Expected status code %d, got %d", http.StatusOK, res.StatusCode)
	}

	// check if the response is a JSON
	if res.Header.Get("Content-Type") != "application/json" {
		t.Errorf("Expected Content-Type to be application/json, got %s", res.Header.Get("Content-Type"))
	}

	// check if the response body is not empty
	if res.ContentLength == 0 {
		t.Errorf("Expected Content-Length to be greater than 0, got %d", res.ContentLength)
	}

	// Create a new station
	var station models.Station

	// check if the response body is a valid JSON
	err = json.NewDecoder(res.Body).Decode(&station)
	if err != nil {
		t.Log(err)
		t.Fatal()
	}

	if !reflect.DeepEqual(station, expectedStation) {
		t.Errorf("Expected response to be %+v, got %+v", expectedStation, station)
	}

}
