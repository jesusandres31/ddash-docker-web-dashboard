package routes

import (
	"github.com/ddash/src/handlers"
	"github.com/gorilla/mux"
)

func NetworkRoutes(r *mux.Router) {
	r.HandleFunc("/network", handlers.ListNetworks).Methods("GET")
}
