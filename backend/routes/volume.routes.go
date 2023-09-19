package routes

import (
	"github.com/ddash/handlers"
	"github.com/gorilla/mux"
)

func VolumeRoutes(r *mux.Router) {
    r.HandleFunc("/volume", handlers.ListVolumes).Methods("GET")
 }