package handler

import (
	"encoding/json"
	"net/http"
)

// respondJSON makes the response with payload as json format
func respondJSON(w http.ResponseWriter, status int, payload interface{}) {
	response, err := json.Marshal(payload)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte(err.Error()))
		return
	}
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	w.Write([]byte(response))
}

// respondError makes the error response with payload as json format
func respondError(w http.ResponseWriter, code int, message string) {
	respondJSON(w, code, map[string]string{"error": message})
}

// handleRes is a utility function that processes a request and sends an HTTP response.
// It takes an http.ResponseWriter, an http.Request, and a function that returns data and an error.
// If the function executes successfully, it responds with a JSON payload and an HTTP 200 (OK) status code.
// If the function returns an error, it responds with a JSON error payload and an HTTP 400 (Bad Request) status code.
func handleRes(w http.ResponseWriter, r *http.Request, fn func() (interface{}, error)) {
	data, err := fn()
	if err != nil {
		respondError(w, http.StatusBadRequest, err.Error())
	}
	respondJSON(w, http.StatusOK, data)
}
