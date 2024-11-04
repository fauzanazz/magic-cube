package Algorithm

import (
	"magic-cube/lib"
	"math"
	"strconv"
	"time"
)

const (
	startingTemperature = 10000.0
	coolingRate         = 0.000001
)

var (
	probabilityTreshold = 0.5
)

func SimulatedAnneling() bool {
	// Generate a random initial state
	initialState := lib.GenerateSuccessor()

	// Set the initial temperature
	temperature := startingTemperature

	// Set the current state to the initial state
	currentState := initialState
	currentCost := lib.ObjectiveFunction(currentState)

	iteration := 0
	currentTime := time.Now()
	neighbour, neighborcost := lib.RandomNeighbor(currentState)

	for ok := true; ok; ok = temperature > 0.1 {
		// Calculate the acceptance probability
		probability := acceptanceProbability(neighborcost, currentCost, temperature)

		if neighborcost > currentCost || probability > probabilityTreshold {
			currentState = neighbour
			currentCost = neighborcost
		}

		// Cool the temperature
		temperature *= 1 - coolingRate

		// Get a new neighbour
		neighbour, neighborcost = lib.RandomNeighbor(currentState)

		iteration++
	}

	executeTime := time.Since(currentTime).Milliseconds()
	firstState := lib.ConvertToResult(initialState)
	lastState := lib.ConvertToResult(currentState)

	res := map[string]interface{}{
		"algorithm": "Simulated Annealing",
		"description": map[string]interface{}{
			"Objective Function": currentCost,
			"Duration":           strconv.FormatInt(executeTime, 10) + "ms",
			"Jumlah Iterasi":     iteration,
		},
		"firstState": firstState,
		"lastState":  lastState,
	}

	lib.SaveToJson(res)
	return true
}

func acceptanceProbability(energy int, newEnergy int, temperature float64) float64 {
	if newEnergy < energy {
		return 1.0
	}
	return math.Exp(float64(energy-newEnergy) / temperature)
}
