package routes

import (
	"github.com/ddash/src/handlers"
	"github.com/gorilla/mux"
)

func ContainerRoutes(r *mux.Router) {
	r.HandleFunc("/container", handlers.ListContainers).Methods("GET")
}
