package routes

import (
	"github.com/ddash/src/handlers"
	"github.com/gorilla/mux"
)

func ImageRoutes(r *mux.Router) {
	r.HandleFunc("/image", handlers.ListImages).Methods("GET")
}
