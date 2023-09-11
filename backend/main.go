package main

import (
	"net/http"

	"github.com/ddash/routes"
	"github.com/gorilla/mux"
) 


func main() { 
	r := mux.NewRouter()

	r.HandleFunc("/", routes.HomeHandler)

	http.ListenAndServe(":4000", r)
}