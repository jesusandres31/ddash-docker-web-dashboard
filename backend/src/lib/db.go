package lib

import (
	"log"

	"github.com/ddash/src/model"
	"github.com/glebarez/sqlite"
	"gorm.io/gorm"
)

var (
	DB  *gorm.DB
	DSN = "./db/ddash.db"
)

func DBConnection() {
	var error error
	DB, error = gorm.Open(sqlite.Open(DSN), &gorm.Config{})
	if error != nil {
		log.Fatal(error)
		panic("failed to connect database")
	} else {
		log.Println("Database connection successful")
	}
}

func DBMigrations() {
	DB.AutoMigrate(model.User{})
}
