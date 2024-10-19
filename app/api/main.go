package main

import (
	"encoding/json"
	"fmt"
	"log"
	"magic-cube/Algorithm"
	"magic-cube/lib"
	"net/http"
	"time"

	"github.com/gorilla/mux"
)

func enableCORS(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
	
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTION")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")


		log.Printf("Received request: %s %s", r.Method, r.URL.Path)

		if r.Method == http.MethodOptions {
            w.WriteHeader(http.StatusOK)
            return
        }

		// Call the next handler in the chain
		next.ServeHTTP(w, r)
	})
}



func main() {
	router := mux.NewRouter()

	
	// Path
	router.HandleFunc("/api/steepest_ascent", SteepestAscentHandler).Methods("POST")
	router.HandleFunc("/api/simulated_anneling", SimulatedAnneling).Methods("GET")
	router.HandleFunc("/api/genetic_algorithm", GeneticAlgorithm).Methods("POST")
	router.HandleFunc("/api/test_obj_func", TestObjFunc).Methods("GET")
	router.HandleFunc("/api/test", Test).Methods("GET")

	log.Fatal(http.ListenAndServe(":8080", enableCORS(router)))
	
}

func SimulatedAnneling(w http.ResponseWriter, r *http.Request) {
	Algorithm.SimulatedAnneling()
}

func GeneticAlgorithm(w http.ResponseWriter, r *http.Request) {
	
	type GeneticAlgorithmRequest struct {
		Population int `json:"population"`
		Iteration  int `json:"iteration"`
	}
	
	var req GeneticAlgorithmRequest

	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Bad Request", http.StatusBadRequest)
		return
	}

	fmt.Println(req)

	resp := Algorithm.GeneticAlgorithm(req.Population, req.Iteration)
	if resp {
		json.NewEncoder(w).Encode("OK")
	} else {
		json.NewEncoder(w).Encode("Error")
	}
}

func SteepestAscentHandler(w http.ResponseWriter, r *http.Request) {
    fmt.Println("Steepest Ascent Completed")
	
	initialState := lib.GenerateSuccessor()
	resp := Algorithm.SteepestAscent(initialState)
	if resp {
		json.NewEncoder(w).Encode("OK")
	} else {
		json.NewEncoder(w).Encode("Error")
	}
}

func TestObjFunc(w http.ResponseWriter, r *http.Request) {
	currentTime := time.Now()
	for i := 0; i < 1000000; i++ {
		lib.ObjectiveFunction([125]int{1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125})
	}
	fmt.Println("Time: ", time.Since(currentTime))
}

func Test(w http.ResponseWriter, r *http.Request) {
	lib.GeneratePopulation(10)
	fmt.Println("Test")
}
