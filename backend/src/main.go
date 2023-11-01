package main

import (
	"log"
	"net/http"
	"os"

	"github.com/ddash/src/config"
	"github.com/ddash/src/lib"
	"github.com/ddash/src/routes"
	"github.com/gorilla/mux"
	"github.com/joho/godotenv"

	"github.com/docker/docker/client"
	"golang.org/x/net/context"

	"github.com/rs/cors"
)

func init() {
	// init context background
	lib.Ctx = context.Background()

	// init docker client
	var err error
	lib.DockerCli, err = client.NewClientWithOpts(client.FromEnv, client.WithAPIVersionNegotiation())
	if err != nil {
		log.Fatal(err)
		return
	}
}

func main() {
	// load envs
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	// init configurations
	config.InitDB()
	config.InitAuth()

	// init db and data
	lib.DBConnection()
	lib.DBMigrations()
	lib.CreateAdminUser()

	// router
	r := mux.NewRouter()
	routes.RegisterRoutes(r)

	// CORS middleware
	c := cors.AllowAll().Handler(r)

	// server
	port := os.Getenv("PORT")
	if port == "" {
		port = "8000"
	}

	log.Printf("Server on localhost:%s\n", port)
	http.ListenAndServe("localhost:"+port, c)
}
