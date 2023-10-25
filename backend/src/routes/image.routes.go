package routes

import (
	"net/http"

	"github.com/ddash/src/handler"
	"github.com/ddash/src/middleware"
	"github.com/gorilla/mux"
)

func ImageRoutes(r *mux.Router) {
	r.Handle("/image", middleware.AuthMiddleware(http.HandlerFunc(handler.ListImages))).Methods("GET")
}
