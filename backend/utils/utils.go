package utils

import "net/http"

func SeHTTPResHeaders(w http.ResponseWriter) {
	w.Header().Set("Content-Type", "application/json")
}

func SetSSEHeaders(w http.ResponseWriter) {
	w.Header().Set("Content-Type", "text/event-stream")
	w.Header().Set("Cache-Control", "no-cache")
	w.Header().Set("Connection", "keep-alive")
}
