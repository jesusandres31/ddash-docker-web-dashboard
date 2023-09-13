package main

import (
	"log"
	"net/http"
	"os"

	"github.com/ddash/routes"
	"github.com/gorilla/mux"
	"github.com/joho/godotenv"
)

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
	routes.DockerRoutes(s) 

	port := os.Getenv("PORT")
	if port == "" {
		port = "8000"
	}

	// server
	http.ListenAndServe("localhost:"+port, r)
}
