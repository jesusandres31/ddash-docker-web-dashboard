package routes

import (
	"github.com/ddash/src/handler"
	"github.com/gorilla/mux"
)

func ContainerRoutes(r *mux.Router) {
	r.HandleFunc("/container", handler.ListContainers).Methods("GET")
}
