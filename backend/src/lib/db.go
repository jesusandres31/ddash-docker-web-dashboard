package lib

import (
	"fmt"
	"log"

	"github.com/ddash/src/config"
	"github.com/ddash/src/model"
	"github.com/ddash/src/utils"
	"github.com/glebarez/sqlite"
	"gorm.io/gorm"
)

var DB *gorm.DB

// DBConnection connects to the database
func DBConnection() {
	DSN := config.DBPath
	var error error
	DB, error = gorm.Open(sqlite.Open(DSN), &gorm.Config{})
	if error != nil {
		log.Fatal(error)
		panic("failed to connect database")
	} else {
		log.Println("Database connection successful")
	}
}

// DBMigrations runs the database migrations
func DBMigrations() {
	DB.AutoMigrate(model.User{})
}

// CreateAdminUser creates the default admin user if it doesn't exist in the database
func CreateAdminUser() {
	existingUser := model.User{}
	if err := DB.First(&existingUser, model.User{Email: config.DefaultUserEmail}).Error; err != nil {
		fmt.Errorf("Error checking for existing user: %w", err)
	}

	if existingUser.Id != 0 {
		fmt.Println("Admin user already created.")
		return
	}

	user := model.User{
		UUID:  utils.GenerateUUID(),
		Name:  config.DefaultUserName,
		Email: config.DefaultUserEmail,
	}

	salt, hash, err := utils.EncryptPassword(config.DefaultPsswd)
	if err != nil {
		fmt.Errorf("Error encrypting password: %w", err)
		return
	}
	user.Salt = salt
	user.Hash = hash

	if err := DB.Save(&user).Error; err != nil {
		fmt.Errorf("Error saving admin user in database: %w", err)
		return
	}
}
