package routes

import (
	"net/http"

	"github.com/ddash/src/handler"
	"github.com/ddash/src/middleware"
	"github.com/gorilla/mux"
)

func AuthRoutes(r *mux.Router) {
	s := r.PathPrefix("/auth").Subrouter()
	s.Handle("/signin", http.HandlerFunc(handler.SignIn)).Methods("POST")
	s.Handle("/refresh", middleware.AuthMiddleware(http.HandlerFunc(handler.RefreshToken))).Methods("GET")
}
