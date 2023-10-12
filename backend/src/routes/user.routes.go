package routes

import (
	"github.com/ddash/src/handler"
	"github.com/gorilla/mux"
)

func UserRoutes(r *mux.Router) {
	r.HandleFunc("/user", handler.GetUsers).Methods("GET")
	r.HandleFunc("/user/{id}", handler.GetUser).Methods("GET")
	r.HandleFunc("/user", handler.CreateUser).Methods("POST")
	r.HandleFunc("/user/{id}", handler.UpdateUser).Methods("PUT")
	r.HandleFunc("/user/{id}", handler.DeleteUser).Methods("DELETE")
}
