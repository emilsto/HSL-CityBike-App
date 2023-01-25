package main

import (
	"log"
	"net/http"

	"github.com/emilsto/HSL-CityBike-App/internal/driver"
	"github.com/emilsto/HSL-CityBike-App/pkg/config"
	"github.com/emilsto/HSL-CityBike-App/pkg/handlers"
)

const port = ":5000"

func main() {
	// create a new config
	var app config.AppConfig

	//set production to false
	app.Production = false

	log.Println("Trying to connect to database...")
	// connect to the database
	db, err := driver.ConnectSQL("host=localhost port=5432 user=postgres password=postgres dbname=bikedata sslmode=disable")
	if err != nil {
		log.Fatal(err)
	}
	log.Println("Successfully connected to database!")
	defer db.SQL.Close()

	// create a new repo, and set it as the global repo
	repo := handlers.NewRepo(&app, db)
	handlers.NewHandlers(repo)

	log.Printf("Listening on port %s", port)

	mux := routes(&app)
	log.Fatal(http.ListenAndServe(port, mux))

}
