package main

import (
	"log"
	"net/http"
	"os"

	"github.com/ddash/config"
	"github.com/ddash/routes"
	"github.com/gorilla/mux"
	"github.com/joho/godotenv"

	"github.com/docker/docker/client"
	"golang.org/x/net/context"
)
 
func init() {
	// init context background
	config.BgCtx = context.Background()

	// init docker client
	var err error
    config.DockerCli, err = client.NewClientWithOpts(client.FromEnv, client.WithAPIVersionNegotiation())
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

	// router
	r := mux.NewRouter() 
    routes.RegisterRoutes(r)
 
	// server
	port := os.Getenv("PORT")
	if port == "" {
		port = "8000"
	}
	http.ListenAndServe("localhost:"+port, r)
}
