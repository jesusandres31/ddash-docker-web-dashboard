package routes

import (
	"github.com/ddash/src/handler"
	"github.com/gorilla/mux"
)

func AuthRoutes(r *mux.Router) {
	systemRouter := r.PathPrefix("/auth").Subrouter()
	systemRouter.HandleFunc("/signin", handler.SignIn).Methods("POST")
}
