package main

import (
	"database/sql"
	"fmt"
	"log"
	"net/http"
	"os"

	_ "github.com/jackc/pgx/stdlib"
)

func main() {
	// Connect to the database
	conn, err := sql.Open("pgx", "host=localhost port=5432 user=postgres password=postgres dbname=bikedata")
	if err != nil {
		log.Fatal("Failed to connect to database", err)
	}
	defer conn.Close()

	log.Println("Connected to database")

	//test connection
	err = conn.Ping()
	if err != nil {
		log.Fatal("Failed to ping database", err)
	}

	// get some data
	getFirstTenRows(conn)

	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintf(w, "API is online 💻⚡ get to coding!")
	})
	port := os.Getenv("PORT")
	if port == "" {
		port = "5000"
	}
	log.Printf("Listening on port %s", port)
	log.Fatal(http.ListenAndServe(fmt.Sprintf(":%s", port), nil))
}

func getFirstTenRows(conn *sql.DB) error {
	// get some data
	rows, err := conn.Query("SELECT id, departure_station_name, return_station_name FROM hsl_schema.trips LIMIT 10")
	if err != nil {
		log.Fatal("Failed to query database", err)
	}
	defer rows.Close()

	// print the data
	for rows.Next() {
		var id int
		var departure_station_name string
		var return_station_name string
		err = rows.Scan(&id, &departure_station_name, &return_station_name)
		if err != nil {
			log.Fatal("Failed to scan row", err)
		}
		fmt.Printf("id: %d, departure_station_name: %s, return_station_name: %s", id, departure_station_name, return_station_name)
	}

	if err = rows.Err(); err != nil {
		log.Fatal("Failed to iterate rows", err)
	}

	return nil

}
