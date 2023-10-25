package routes

import (
	"net/http"

	"github.com/ddash/src/handler"
	"github.com/ddash/src/middleware"
	"github.com/gorilla/mux"
)

func ContainerRoutes(r *mux.Router) {
	r.Handle("/container", middleware.AuthMiddleware(http.HandlerFunc(handler.ListContainers))).Methods("GET")
}
