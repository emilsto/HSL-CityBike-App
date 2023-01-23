package handlers

import (
	"encoding/json"
	"log"
	"net/http"
	"strings"

	//postgres driver
	_ "github.com/jackc/pgconn"
	_ "github.com/jackc/pgx/v4"
	_ "github.com/jackc/pgx/v4/stdlib"

	//chi router
	"github.com/go-chi/chi/v5"
)

// Get trips by page and offset (limit) for pagination
func (m *Repository) FindTripsByPage(w http.ResponseWriter, r *http.Request) {
	page := r.URL.Query().Get("page") //using r.URL.Query().Get() instead of chi.URLParam() because of the ?page=1&offset=10 => chi router doesn't work with query params
	offset := r.URL.Query().Get("limit")
	q := r.URL.Query().Get("q")
	if offset == "" || page == "" {
		http.Error(w, "Missing offset or limit parameter", http.StatusBadRequest)
		return
	}
	trips, err := m.DB.TripsByPage(q, page, offset)
	if err != nil {
		log.Println(err)
		http.Error(w, "Error retrieving trips", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	if err := json.NewEncoder(w).Encode(trips); err != nil {
		log.Println(err)
		http.Error(w, "Error encoding trips", http.StatusInternalServerError)
		return
	}
	//close response body after writing to it
	defer r.Body.Close()

}

// Get trips statistics for a given station
func (m *Repository) StationTripStats(w http.ResponseWriter, r *http.Request) {
	stationId := chi.URLParam(r, "id")
	if stationId == "" {
		sendError(w, "Missing id parameter", http.StatusBadRequest)
		return
	}
	stats, err := m.DB.GetStationStatistics(stationId)
	if err != nil {
		if strings.Contains(err.Error(), "has no trip data") {
			sendError(w, err.Error(), http.StatusNotFound)
			return
		}
		log.Println(err)
		sendError(w, "Error retrieving trips", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	if err := json.NewEncoder(w).Encode(stats); err != nil {
		log.Println(err)
		sendError(w, "Error encoding trips", http.StatusInternalServerError)
		return
	}
	defer r.Body.Close()
}
