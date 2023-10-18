package config

import "os"

var (
	DefaultPsswd     string
	DefaultUserEmail string
	DefaultUserName  string
)

func InitAuth() {
	DefaultPsswd = os.Getenv("DEFAULT_PSSWD")
	DefaultUserEmail = os.Getenv("DEFAULT_USER_EMAIL")
	DefaultUserName = "admin"
}
