// This file is used to set up the test environment
package main__test

import (
	"log"
	"net/http"

	"github.com/emilsto/HSL-CityBike-App/internal/driver"
	"github.com/emilsto/HSL-CityBike-App/pkg/config"

	"github.com/emilsto/HSL-CityBike-App/pkg/handlers"
	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
)

// create a new config
var app config.AppConfig

func getRoutes() http.Handler {

	//set production to false
	app.Production = false

	log.Println("Trying to connect to database...")
	// connect to the database
	db, err := driver.ConnectSQL("host=localhost port=5432 user=postgres password=postgres dbname=bikedata sslmode=disable")
	if err != nil {
		log.Fatal(err)
	}
	log.Println("Successfully connected to database!")

	// create a new repo, and set it as the global repo
	repo := handlers.NewRepo(&app, db)
	handlers.NewHandlers(repo)

	mux := chi.NewRouter()

	mux.Use(middleware.Recoverer)

	mux.Get("/", handlers.Repo.Home)
	mux.Get("/stations", handlers.Repo.AllStations)                      // get all stations
	mux.Get("/stations_page", handlers.Repo.FindStationByPage)           // get stations by page and offset and optional search query
	mux.Get("/stations/{id}", handlers.Repo.Station)                     // get station by id
	mux.Get("/stations_objid/{id}", handlers.Repo.StationByObjID)        // get station by obj_id (id in the HSL database)
	mux.Get("/stations/{id}/statistics", handlers.Repo.StationTripStats) // get stations stats by id
	mux.Get("/trips", handlers.Repo.FindTripsByPage)                     // get trips by page and offset

	return mux
}
