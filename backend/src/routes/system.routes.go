package routes

import (
	"github.com/ddash/src/handler"
	"github.com/gorilla/mux"
)

func SystemRoutes(r *mux.Router) {
	systemRouter := r.PathPrefix("/system").Subrouter()
	systemRouter.HandleFunc("/info", handler.GetSystemInfo).Methods("GET")
	systemRouter.HandleFunc("/disk-usage", handler.GetDiskUsage).Methods("GET")
	systemRouter.HandleFunc("/ping", handler.GetPingStatus).Methods("GET")
}
