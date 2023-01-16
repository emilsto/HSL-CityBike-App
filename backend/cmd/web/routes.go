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

	mux.Get("/", handlers.Repo.Home)

	return mux
}
