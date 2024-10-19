package Algorithm

import (
	"fmt"
	"magic-cube/lib"
	"time"
)


func SteepestAscent(initialState [125]int) ([125]int, int, time.Duration, int, int) {
    fmt.Println("Initial state :")
    lib.PrintState(initialState)
    iteration := 0
    currentTime := time.Now()

    bestState := initialState
    bestCost := lib.ObjectiveFunction(bestState)

    for {
        fmt.Println("Iteration:",iteration, " Best Cost: ", bestCost)
        neighbor, neighborCost, successorCount := lib.FindHighestNeighbor(bestState)

        if neighborCost <= bestCost {
			fmt.Println("Time: ", time.Since(currentTime))
			fmt.Println("Best Cost: ", bestCost)
			fmt.Println("Best State: ")
			lib.PrintState(bestState)
            return bestState, bestCost, time.Since(currentTime), iteration, successorCount
        }

        bestState = neighbor
        bestCost = neighborCost
        iteration++
    }
}

