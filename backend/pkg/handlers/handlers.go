package handlers

// Business logic

import (
	"encoding/json"
	"log"
	"net/http"

	"github.com/go-chi/chi/v5"

	//my packages
	"github.com/emilsto/HSL-CityBike-App/internal/driver"
	"github.com/emilsto/HSL-CityBike-App/internal/repository"
	"github.com/emilsto/HSL-CityBike-App/internal/repository/dbrepo"
	"github.com/emilsto/HSL-CityBike-App/pkg/config"

	//postgres driver
	_ "github.com/jackc/pgconn"
	_ "github.com/jackc/pgx/v4"
	_ "github.com/jackc/pgx/v4/stdlib"
)

// repo used by handlers
var Repo *Repository

// repo type
type Repository struct {
	App *config.AppConfig
	DB  repository.DatabaseRepo
}

// create new repo
func NewRepo(a *config.AppConfig, db *driver.DB) *Repository {
	return &Repository{
		App: a,
		DB:  dbrepo.NewPostgresRepo(a, db.SQL),
	}
}

// set repo for handlers
func NewHandlers(r *Repository) {
	Repo = r
}

// Test route
func (m *Repository) Home(w http.ResponseWriter, r *http.Request) {
	m.DB.AllStations()
	w.Write([]byte("API is online 💻⚡ get to coding!"))
}

// Get station by id
func (m *Repository) Station(w http.ResponseWriter, r *http.Request) {
	stationId := chi.URLParam(r, "id")
	if stationId == "" {
		http.Error(w, "Missing id parameter", http.StatusBadRequest)
		return
	}
	station, err := m.DB.FindStationByID(stationId)
	if err != nil {
		log.Println(err)
		http.Error(w, "Error retrieving station", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	if err := json.NewEncoder(w).Encode(station); err != nil {
		log.Println(err)
		http.Error(w, "Error encoding station", http.StatusInternalServerError)
		return
	}
	//close response body after writing to it
	defer r.Body.Close()
}

// Get station by obj id
func (m *Repository) StationByObjID(w http.ResponseWriter, r *http.Request) {
	stationId := chi.URLParam(r, "id")
	if stationId == "" {
		http.Error(w, "Missing id parameter", http.StatusBadRequest)
		return
	}
	station, err := m.DB.FindStationByObjID(stationId)
	if err != nil {
		log.Println(err)
		http.Error(w, "Error retrieving station", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	if err := json.NewEncoder(w).Encode(station); err != nil {
		log.Println(err)
		http.Error(w, "Error encoding station", http.StatusInternalServerError)
		return
	}
	//close response body after writing to it
	defer r.Body.Close()
}

// Get all stations
func (m *Repository) AllStations(w http.ResponseWriter, r *http.Request) {
	stations, err := m.DB.FindAllStations()
	if err != nil {
		log.Println(err)
		http.Error(w, "Error retrieving stations", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	if err := json.NewEncoder(w).Encode(stations); err != nil {
		log.Println(err)
		http.Error(w, "Error encoding stations", http.StatusInternalServerError)
		return
	}
	//close response body after writing to it
	defer r.Body.Close()
}
