package handlers

import (
	"net/http"

	"github.com/emilsto/HSL-CityBike-App/internal/driver"
	"github.com/emilsto/HSL-CityBike-App/internal/repository"
	"github.com/emilsto/HSL-CityBike-App/internal/repository/dbrepo"
	"github.com/emilsto/HSL-CityBike-App/pkg/config"
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
