package routes

import (
	"net/http"

	"github.com/ddash/src/handler"
	"github.com/ddash/src/middleware"
	"github.com/gorilla/mux"
)

func SystemRoutes(r *mux.Router) {
	s := r.PathPrefix("/system").Subrouter()
	s.Handle("/info", middleware.AuthMiddleware(http.HandlerFunc(handler.GetSystemInfo))).Methods("GET")
	s.Handle("/disk-usage", middleware.AuthMiddleware(http.HandlerFunc(handler.GetDiskUsage))).Methods("GET")
	s.Handle("/ping", middleware.AuthMiddleware(http.HandlerFunc(handler.GetPingStatus))).Methods("GET")
}
