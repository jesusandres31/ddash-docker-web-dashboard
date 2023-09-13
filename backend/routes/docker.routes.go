package routes

import (
	"github.com/ddash/handlers"
	"github.com/gorilla/mux"
)

func DockerRoutes(r *mux.Router) {
    r.HandleFunc("/docker/ps", handlers.DockerPSHandler).Methods("GET")
 }