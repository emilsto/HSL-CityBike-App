package driver

// connect the app to the database

import (
	"database/sql"
	"time"

	_ "github.com/jackc/pgconn"
	_ "github.com/jackc/pgx/v4"
	_ "github.com/jackc/pgx/v4/stdlib"
)

// DB holds the database connection pool
type DB struct {
	SQL *sql.DB
}

var dbConn = &DB{}

// consts for the database connection
const maxConns = 10
const maxIdleConns = 5
const maxTtl = 5 * time.Minute

// Create a connection pool to the database
func ConnectSQL(dsn string) (*DB, error) {
	d, err := NewDatabase(dsn)
	if err != nil {
		panic(err) //panic, no use in continuing if we can't connect to the database
	}

	d.SetMaxOpenConns(maxConns)
	d.SetMaxIdleConns(maxIdleConns)
	d.SetConnMaxLifetime(maxTtl)

	dbConn.SQL = d

	err = testDB(d)
	if err != nil {
		panic(err)
	}

	return dbConn, nil

}

// ping the database to test the connection
func testDB(d *sql.DB) error {
	err := d.Ping()
	if err != nil {
		return err
	}
	return nil
}

// create a new database connection
func NewDatabase(dsn string) (*sql.DB, error) {
	// connect to the database
	db, err := sql.Open("pgx", dsn)
	if err != nil {
		return nil, err //
	}

	if err := db.Ping(); err != nil {
		return nil, err // throw error if connection fails
	}

	return db, nil //return connection pool
}
