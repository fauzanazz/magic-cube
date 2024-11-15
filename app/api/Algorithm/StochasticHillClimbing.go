package Algorithm

import (
	"magic-cube/lib"
	"strconv"
	"time"
)

func StochasticHillClimbing(MaxIteration int) bool {
	// Generate a random initial state
	var allState [][125]int
	initialState := lib.GenerateSuccessor()
	lib.PrintState(initialState)
	allState = append(allState, initialState)

	stateMap := map[[125]int]bool{}
	stateMap[initialState] = true

	iteration := 1
	currentTime := time.Now()

	bestState := initialState
	bestCost := lib.ObjectiveFunction(bestState)

	for {
		if iteration > MaxIteration {
			break
		}

		neighbor, neighborCost := lib.RandomNeighbor(bestState, &stateMap)
		if neighborCost == -1 {
			break
		}
		stateMap[neighbor] = true

		if neighborCost > bestCost {
			bestState = neighbor
			bestCost = neighborCost
			allState = append(allState, bestState)
		}

		iteration++
	}

	executeTime := time.Since(currentTime).Milliseconds()
	firstState := lib.ConvertToResult(initialState)
	lastState := lib.ConvertToResult(bestState)

	res := map[string]interface{}{
		"algorithm": "Stochastic Hill Climbing",
		"description": map[string]interface{}{
			"Objective Function": bestCost,
			"Duration":           strconv.FormatInt(executeTime, 10) + " ms",
			"Jumlah Iterasi":     iteration,
		},
		"firstState": firstState,
		"lastState":  lastState,
	}

	jsonAllState := map[string]interface{}{
		"allState": allState,
	}

	lib.SaveStateToJson(jsonAllState)
	
	lib.PrintState(bestState)
	lib.SaveToJson(res)

	return true
}
