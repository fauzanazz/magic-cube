package Algorithm

import (
	"magic-cube/lib"
	"time"
)

func StochasticHillClimbing(MaxIteration int) bool {
	// Generate a random initial state
	initialState := lib.GenerateSuccessor()

	iteration := 0
	currentTime := time.Now()

	bestState := initialState
	bestCost := lib.ObjectiveFunction(bestState)

	for {
		if iteration > MaxIteration {
			break
		}

		neighbor, neighborCost := lib.RandomNeighbor(bestState)

		if neighborCost > bestCost {
			bestState = neighbor
			bestCost = neighborCost
		}

		iteration++
	}

	executeTime := time.Since(currentTime)
	firstState := lib.ConvertToResult(initialState)
	lastState := lib.ConvertToResult(bestState)

	res := map[string]interface{}{
		"algorithm": "Stochastic Hill Climbing",
		"description": map[string]interface{}{
			"Objective Function": bestCost,
			"Duration":           executeTime.String() + "ms",
			"Jumlah Iterasi":     iteration,
		},
		"firstState": firstState,
		"lastState":  lastState,
	}

	lib.SaveToJson(res)

	return true
}
