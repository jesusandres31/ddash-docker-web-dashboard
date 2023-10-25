package routes

import (
	"net/http"

	"github.com/ddash/src/handler"
	"github.com/ddash/src/middleware"
	"github.com/gorilla/mux"
)

func NetworkRoutes(r *mux.Router) {
	r.Handle("/network", middleware.AuthMiddleware(http.HandlerFunc(handler.ListNetworks))).Methods("GET")
}
