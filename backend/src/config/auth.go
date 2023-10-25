package config

import "os"

var (
	DefaultPsswd     string
	DefaultUserEmail string
	DefaultUserName  string
	JWTSecret        string
)

func InitAuth() {
	JWTSecret = os.Getenv("JWT_SECRET")
	DefaultPsswd = os.Getenv("DEFAULT_PSSWD")
	DefaultUserEmail = os.Getenv("DEFAULT_USER_EMAIL")
	DefaultUserName = "admin"
}
