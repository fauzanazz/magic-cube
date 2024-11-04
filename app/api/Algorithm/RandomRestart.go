package Algorithm

import (
	"magic-cube/lib"
	"time"
)

func RandomRestart(max_restart int) bool {
	restart := 0
	iteration := 0
	currentTime := time.Now()

	initialState := lib.GenerateSuccessor()
	globalBestState := initialState
	globalBestCost := lib.ObjectiveFunction(globalBestState)
	currentState := globalBestState
	currentCost := globalBestCost
	

	for restart < max_restart {

		for {
			neighbor, neighborCost, _ := lib.FindHighestNeighbor(currentState)

			if neighborCost <= currentCost {
				break
			}

			currentState = neighbor
			currentCost = neighborCost
			iteration++
		}

		if currentCost > globalBestCost {
			globalBestState = currentState
			globalBestCost = currentCost
		}

		
		if restart < max_restart-1 {
			currentState = lib.GenerateSuccessor()
			currentCost= lib.ObjectiveFunction(currentState)
		}

		restart++
	}

	executeTime := time.Since(currentTime)

	firstState := lib.ConvertToResult(initialState)
	lastState := lib.ConvertToResult(globalBestState)

	res := map[string]interface{}{
		"algorithm": "Random Restart Algorithm",
		"description": map[string]interface{}{
			"Objective Function": globalBestCost,
			"Duration":           executeTime.String(),
			"Jumlah Iterasi":     iteration,
			"Jumlah Restart":     restart,
		},
		"firstState": firstState,
		"lastState":  lastState,
	}

	lib.SaveToJson(res)

	return true
}
