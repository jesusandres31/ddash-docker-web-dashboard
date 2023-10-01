package routes

import (
	"github.com/ddash/src/handlers"
	"github.com/gorilla/mux"
)

func SystemRoutes(r *mux.Router) {
	systemRouter := r.PathPrefix("/system").Subrouter()
	systemRouter.HandleFunc("/info", handlers.GetSystemInfo).Methods("GET")
	systemRouter.HandleFunc("/disk-usage", handlers.GetDiskUsage).Methods("GET")
	systemRouter.HandleFunc("/ping", handlers.GetPingStatus).Methods("GET")
}
