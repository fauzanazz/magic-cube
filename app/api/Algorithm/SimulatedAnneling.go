package Algorithm

import (
	"magic-cube/lib"
	"math"
	"strconv"
	"time"
)

const (
	startingTemperature  = 945.0
	coolingRate          = 0.9999
	probabilityThreshold = 0.9999
	maxIteration         = 100000
)

func SimulatedAnnealing() bool {
	// Init
	initialState := lib.GenerateSuccessor()
	lib.PrintStateWithLabel(initialState, "First State")
	stateMap := map[[125]int]bool{}
	var plotData = make([][]float64, 0)

	// Set the current state to the initial state
	currentState := initialState
	stateMap[currentState] = true
	currentCost := lib.ObjectiveFunction(currentState)

	// Variables
	stuck := 0
	var neighbour [125]int
	var neighborCost int
	var temperature float64

	currentTime := time.Now()
	iteration := 1
	for iteration <= maxIteration {
		// Cool the temperature
		temperature = startingTemperature * math.Pow(coolingRate, float64(iteration))
		if temperature-0.1 < 0 {
			break
		}

		// Get a new neighbour
		neighbour, neighborCost = lib.RandomNeighbor(currentState, &stateMap)
		if neighborCost == -1 {
			break
		}
		stateMap[neighbour] = true

		// Calculate the cost difference
		deltaE := neighborCost - currentCost

		// If the new solution is better, accept it
		if deltaE > 0 {
			currentState = neighbour
			currentCost = neighborCost

		} else { // If the new solution is worse, accept it with a probability
			stuck++

			probability := acceptanceProbability(currentCost, neighborCost, temperature)
			plotData = append(plotData, []float64{float64(iteration), probability})

			// If the probability is greater than the threshold, accept the new solution
			if probability > probabilityThreshold {
				currentState = neighbour
				currentCost = neighborCost
			}
		}

		iteration++
	}

	executeTime := time.Since(currentTime).Milliseconds()
	firstState := lib.ConvertToResult(initialState)
	lastState := lib.ConvertToResult(currentState)

	lib.PrintStateWithLabel(currentState, "Last State")
	res := map[string]interface{}{
		"algorithm": "Simulated Annealing",
		"description": map[string]interface{}{
			"Objective Function": currentCost,
			"Duration":           strconv.FormatInt(executeTime, 10) + "ms",
			"Jumlah Iterasi":     iteration,
			"Frekuensi Stuck":    stuck,
		},
		"firstState": firstState,
		"lastState":  lastState,
		"plotData":   plotData,
	}

	lib.SaveToJson(res)
	return true
}

func acceptanceProbability(currentCost int, neighborCost int, temperature float64) float64 {
	if temperature == 0 {
		return 0
	}

	probability := math.Exp(float64(neighborCost-currentCost) / temperature)
	if math.IsInf(probability, 0) {
		return 1
	}

	return probability
}
