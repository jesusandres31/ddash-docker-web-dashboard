package routes

import (
	"github.com/ddash/handlers"
	"github.com/gorilla/mux"
)

func ContainerRoutes(r *mux.Router) {
    r.HandleFunc("/container", handlers.ListContainers).Methods("GET")
	r.HandleFunc("/container/sse", handlers.ServerSentEvents).Methods("GET")
 }
 