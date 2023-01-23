package main

import (
	"net/http"

	"github.com/emilsto/HSL-CityBike-App/pkg/config"
	"github.com/emilsto/HSL-CityBike-App/pkg/handlers"
	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/go-chi/cors"
)

func routes(app *config.AppConfig) http.Handler {
	// create a new mux router
	mux := chi.NewRouter()

	// recover from panics
	mux.Use(middleware.Recoverer)

	// set up CORS
	cors := cors.New(cors.Options{
		AllowedOrigins:   []string{"http://localhost:3000"},
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"Accept", "Authorization", "Content-Type", "X-CSRF-Token"},
		ExposedHeaders:   []string{"Link"},
		AllowCredentials: true,
		MaxAge:           300, // Maximum value not ignored by any of major browsers
	})
	mux.Use(cors.Handler)

	// set up the routes under /api
	mux.Route("/api/v1", func(mux chi.Router) {
		mux.Get("/", handlers.Repo.Home)
		mux.Get("/stations", handlers.Repo.AllStations)                // get all stations
		mux.Get("/stations_page", handlers.Repo.FindStationByPage)     // get stations by page and offset
		mux.Get("/stations/{id}", handlers.Repo.Station)               // get station by id
		mux.Get("/stations_objid/{id}", handlers.Repo.StationByObjID)  // get station by obj_id (id in the HSL database)
		mux.Get("/stationsStats/{id}", handlers.Repo.StationTripStats) // get stations stats")
		mux.Get("/trips", handlers.Repo.FindTripsByPage)               // get trips by page and offset
	})

	return mux
}
