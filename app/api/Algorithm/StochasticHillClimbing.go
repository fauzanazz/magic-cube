package Algorithm

import (
	"magic-cube/lib"
	"sync"
	"time"
)

var numThreads = 4

func StochasticHillClimbing(MaxIteration int) bool {
	var wg sync.WaitGroup
	var mu sync.Mutex

	bestState := lib.GenerateSuccessor()
	bestCost := lib.ObjectiveFunction(bestState)

	// Channel to collect results from goroutines
	results := make(chan map[string]interface{}, numThreads)

	currentTime := time.Now()

	for i := 0; i < numThreads; i++ {
		wg.Add(1)
		go func() {
			defer wg.Done()

			// Generate a random initial state for each goroutine
			initialState := lib.GenerateSuccessor()
			iteration := 0

			localBestState := initialState
			localBestCost := lib.ObjectiveFunction(localBestState)

			for iteration < MaxIteration {
				neighbor, neighborCost := lib.RandomNeighbor(localBestState)

				if neighborCost > localBestCost {
					localBestState = neighbor
					localBestCost = neighborCost
				}

				iteration++
			}

			// Lock to update the global best state
			mu.Lock()
			if localBestCost > bestCost {
				bestState = localBestState
				bestCost = localBestCost
			}
			mu.Unlock()

			// Send result to the channel
			results <- map[string]interface{}{
				"initialState": initialState,
				"bestState":    localBestState,
				"bestCost":     localBestCost,
				"iterations":   iteration,
			}
		}()
	}

	wg.Wait()
	close(results)

	// Collect results and determine the best state
	for result := range results {
		RbestState := result["bestState"].([125]int)
		RbestCost := result["bestCost"].(int)

		if RbestCost > bestCost {
			bestState = RbestState
			bestCost = RbestCost
		}
	}

	executeTime := time.Since(currentTime)
	firstState := lib.ConvertToResult(bestState)
	lastState := lib.ConvertToResult(bestState)

	res := map[string]interface{}{
		"algorithm": "Stochastic Hill Climbing",
		"description": map[string]interface{}{
			"Objective Function": bestCost,
			"Duration":           executeTime.String() + "ms",
			"Jumlah Iterasi":     MaxIteration * numThreads,
		},
		"firstState": firstState,
		"lastState":  lastState,
	}

	lib.SaveToJson(res)

	return true
}
