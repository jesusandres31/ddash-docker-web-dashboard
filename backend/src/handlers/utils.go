package handlers

import (
	"encoding/json"
	"log"
	"net/http"
)

func SetHTTPResHeaders(w http.ResponseWriter) {
	w.Header().Set("Content-Type", "application/json")
}

func SetSSEHeaders(w http.ResponseWriter) {
	w.Header().Set("Content-Type", "text/event-stream")
	w.Header().Set("Cache-Control", "no-cache")
	w.Header().Set("Connection", "keep-alive")
}

func ExecuteAndRespond(w http.ResponseWriter, r *http.Request, fn func() (interface{}, error)) {
	data, err := fn()
	if err != nil {
		log.Printf("Error: %v", err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	if err := json.NewEncoder(w).Encode(data); err != nil {
		log.Printf("Error encoding data: %v", err)
		w.WriteHeader(http.StatusInternalServerError)
	}
}
