package main

import (
	"net/http"

	"github.com/emilsto/HSL-CityBike-App/pkg/config"
	"github.com/emilsto/HSL-CityBike-App/pkg/handlers"
	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
)

func routes(app *config.AppConfig) http.Handler {
	mux := chi.NewRouter()

	// recover from panics
	mux.Use(middleware.Recoverer)

	// set up the routes under /api
	mux.Route("/api/v1", func(mux chi.Router) {
		mux.Get("/", handlers.Repo.Home)
		mux.Get("/stations", handlers.Repo.AllStations)               // get all stations
		mux.Get("/stations/{id}", handlers.Repo.Station)              // get station by id
		mux.Get("/stations_objid/{id}", handlers.Repo.StationByObjID) // get station by obj_id (id in the HSL database)
	})

	return mux
}
