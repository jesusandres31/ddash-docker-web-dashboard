package routes

import (
	"net/http"

	"github.com/ddash/src/handler"
	"github.com/ddash/src/middleware"
	"github.com/gorilla/mux"
)

func UserRoutes(r *mux.Router) {
	s := r.PathPrefix("/user").Subrouter()
	s.Handle("", middleware.AuthMiddleware(http.HandlerFunc(handler.GetUsers))).Methods("GET")
	s.Handle("", middleware.AuthMiddleware(http.HandlerFunc(handler.CreateUser))).Methods("POST")
	s.Handle("/{email}", middleware.AuthMiddleware(http.HandlerFunc(handler.GetUser))).Methods("GET")
	s.Handle("/{email}", middleware.AuthMiddleware(http.HandlerFunc(handler.UpdateUser))).Methods("PUT")
	s.Handle("/{email}", middleware.AuthMiddleware(http.HandlerFunc(handler.DeleteUser))).Methods("DELETE")
}
