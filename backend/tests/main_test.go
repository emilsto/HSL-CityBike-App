//API ENDPOINT TESTS

package main

import (
	"log"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/emilsto/HSL-CityBike-App/internal/driver"
	"github.com/emilsto/HSL-CityBike-App/pkg/config"

	"github.com/emilsto/HSL-CityBike-App/pkg/handlers"
	"github.com/go-chi/chi/v5"
)

const BASE_URL = "localhost:5000/api/v1"

func init() {
	// create a new config
	var app config.AppConfig

	//set production to false
	app.Production = false

	db, err := driver.ConnectSQL("host=localhost port=5432 user=postgres password=postgres dbname=bikedata sslmode=disable")
	if err != nil {
		log.Fatal(err)
	}
	log.Println("Successfully connected to database!")
	defer db.SQL.Close()

	// create a new repo, and set it as the global repo
	repo := handlers.NewRepo(&app, db)
	handlers.NewHandlers(repo)
}

func TestHomeRoute(t *testing.T) {

	// Create a request to pass to our handler
	req, err := http.NewRequest("GET", BASE_URL, nil)
	if err != nil {
		t.Fatal(err)
	}

	// Create a new router for testing
	mux := chi.NewRouter()
	mux.Get("/", handlers.Repo.Home)

	// Create a ResponseRecorder to record the response
	rr := httptest.NewRecorder()

	// Serve the request
	mux.ServeHTTP(rr, req)

	// Check the status code is what we expect
	if status := rr.Code; status != http.StatusOK {
		t.Errorf("handler returned wrong status code: got %v want %v",
			status, http.StatusOK)
	}

	// Check the response body is what we expect
	expected := `API is online 💻⚡ get to coding!`
	if rr.Body.String() != expected {
		t.Errorf("handler returned unexpected body: got %v want %v",
			rr.Body.String(), expected)
	}
}
