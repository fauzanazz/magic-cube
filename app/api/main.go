package main

import (
	"github.com/gorilla/mux"
	"log"
	"magic-cube/Algorithm"
	"net/http"
)

func main() {
	router := mux.NewRouter()

	// Path
	router.HandleFunc("/api/simulated_anneling", SimulatedAnneling).Methods("GET")

	log.Fatal(http.ListenAndServe(":8080", router))
}

func SimulatedAnneling(w http.ResponseWriter, r *http.Request) {
	Algorithm.SimulatedAnneling()
}
