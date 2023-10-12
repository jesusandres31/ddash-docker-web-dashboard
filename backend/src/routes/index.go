package routes

import (
	"net/http"

	"github.com/gorilla/mux"
)

func HomeHandler(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("Hello from the server."))
}

func RegisterRoutes(r *mux.Router) {
	// Register the index route
	r.HandleFunc("/", HomeHandler)

	// Register all your other routes here
	s := r.PathPrefix("/api").Subrouter()

	UserRoutes(s)
	ContainerRoutes(s)
	ImageRoutes(s)
	VolumeRoutes(s)
	NetworkRoutes(s)
	SystemRoutes(s)
}
