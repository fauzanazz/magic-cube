package Algorithm

import (
	"magic-cube/lib"
	"time"
    "fmt"
)


func SteepestAscent() bool{
    
    // Generate Initial State Randomly
    initialState := lib.GenerateSuccessor()

    lib.PrintState(initialState)
    
    iteration := 0
    currentTime := time.Now()

    bestState := initialState
    bestCost := lib.ObjectiveFunction(bestState)

    for {
        
        neighbor, neighborCost, _ := lib.FindHighestNeighbor(bestState)

        if neighborCost <= bestCost {
            break
        }

        bestState = neighbor
        bestCost = neighborCost
        iteration++
    }
    executeTime := time.Since(currentTime) 

    firstState := lib.ConvertToResult(initialState)
    lastState := lib.ConvertToResult(bestState)
    fmt.Println("Steepest Ascent complete")
	lib.PrintState(bestState)

    res := map[string] interface{}{
        "algorithm" : "Steepest Ascent Algorithm",
        "description" : map[string]interface{}{
            "Objective Function" : bestCost,
            "Duration" : executeTime.String(),
            "Jumlah Iterasi" : iteration,
        },
        "firstState" : firstState,
        "lastState" : lastState,
    }

    lib.SaveToJson(res)

    return true;
    
}

