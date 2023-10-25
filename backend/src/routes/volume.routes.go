package routes

import (
	"net/http"

	"github.com/ddash/src/handler"
	"github.com/ddash/src/middleware"
	"github.com/gorilla/mux"
)

func VolumeRoutes(r *mux.Router) {
	r.Handle("/volume", middleware.AuthMiddleware(http.HandlerFunc(handler.ListVolumes))).Methods("GET")
}
