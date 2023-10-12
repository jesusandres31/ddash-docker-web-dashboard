package routes

import (
	"github.com/ddash/src/handler"
	"github.com/gorilla/mux"
)

func NetworkRoutes(r *mux.Router) {
	r.HandleFunc("/network", handler.ListNetworks).Methods("GET")
}
