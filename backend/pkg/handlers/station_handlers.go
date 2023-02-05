package handlers

import (
	"encoding/json"
	"log"
	"net/http"
	"strings"

	"github.com/go-chi/chi/v5"

	//postgres driver
	_ "github.com/jackc/pgconn"
	_ "github.com/jackc/pgx/v4"
	_ "github.com/jackc/pgx/v4/stdlib"
)

// Get station by id
func (m *Repository) Station(w http.ResponseWriter, r *http.Request) {
	stationId := chi.URLParam(r, "id")
	if stationId == "" {
		sendError(w, "Missing id parameter", http.StatusBadRequest)
		return
	}
	station, err := m.DB.FindStationByID(stationId)
	if err != nil {
		if strings.Contains(err.Error(), "not found") {
			sendError(w, "Station not found", http.StatusNotFound)
			return
		}
		sendError(w, "Error retrieving station", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	if err := json.NewEncoder(w).Encode(station); err != nil {
		log.Println(err)
		sendError(w, "Error encoding station", http.StatusInternalServerError)
		return
	}
	//close response body after writing to it
	defer r.Body.Close()
}

// Get station by obj id
func (m *Repository) StationByObjID(w http.ResponseWriter, r *http.Request) {
	stationId := chi.URLParam(r, "id")
	if stationId == "" {
		sendError(w, "Missing id parameter", http.StatusBadRequest)
		return
	}
	station, err := m.DB.FindStationByObjID(stationId)
	if err != nil {
		log.Println(err)
		sendError(w, "Error retrieving station", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	if err := json.NewEncoder(w).Encode(station); err != nil {
		log.Println(err)
		sendError(w, "Error encoding station", http.StatusInternalServerError)
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
		sendError(w, "Error retrieving stations", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	if err := json.NewEncoder(w).Encode(stations); err != nil {
		log.Println(err)
		sendError(w, "Error encoding stations", http.StatusInternalServerError)
		return
	}
	//close response body after writing to it
	defer r.Body.Close()
}

// Get station by page and offset (limit) for pagination
func (m *Repository) FindStationByPage(w http.ResponseWriter, r *http.Request) {
	page := r.URL.Query().Get("page") //using r.URL.Query().Get() instead of chi.URLParam() because of the ?page=1&offset=10 => chi router doesn't work with query params
	offset := r.URL.Query().Get("limit")
	q := r.URL.Query().Get("q")
	if page == "" || offset == "" {
		//allow empty search term, but not page or offset
		sendError(w, "Missing page or offset parameter", http.StatusBadRequest)
		return
	}
	stations, err := m.DB.StationsByPage(q, page, offset)
	if err != nil {
		log.Println(err)
		sendError(w, "Error retrieving stations", http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	if err := json.NewEncoder(w).Encode(stations); err != nil {
		log.Println(err)
		sendError(w, "Error encoding stations", http.StatusInternalServerError)
		return
	}
	//close response body after writing to it
	defer r.Body.Close()
}
