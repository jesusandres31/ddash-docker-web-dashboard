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
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	r := mux.NewRouter()
	s := r.PathPrefix("/api").Subrouter()

	// index route
	r.HandleFunc("/", routes.HomeHandler) 

	// routes
	routes.ContainerRoutes(s) 

	port := os.Getenv("PORT")
	if port == "" {
		port = "8000"
	}

	// server
	http.ListenAndServe("localhost:"+port, r)
}
