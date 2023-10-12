package routes

import (
	"github.com/ddash/src/handler"
	"github.com/gorilla/mux"
)

func VolumeRoutes(r *mux.Router) {
	r.HandleFunc("/volume", handler.ListVolumes).Methods("GET")
}
