package routes

import (
	"github.com/ddash/src/handler"
	"github.com/gorilla/mux"
)

func ImageRoutes(r *mux.Router) {
	r.HandleFunc("/image", handler.ListImages).Methods("GET")
}
