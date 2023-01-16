package dbrepo

import (
	"database/sql"

	"github.com/emilsto/HSL-CityBike-App/internal/repository"
	"github.com/emilsto/HSL-CityBike-App/pkg/config"
)

type postgresDBRepo struct {
	App *config.AppConfig
	DB  *sql.DB
}

func NewPostgresRepo(a *config.AppConfig, conn *sql.DB) repository.DatabaseRepo {
	// create a new repo
	return &postgresDBRepo{
		App: a,
		DB:  conn,
	}
}
