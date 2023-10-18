package config

import "os"

var DBPath string

func InitDB() {
	DBPath = os.Getenv("DB_PATH")
}
