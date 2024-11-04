package Algorithm

import (
	"magic-cube/lib"
	"time"
)

func Sideways(max_iteration int) bool{
    // Generate Initial Variable
	initialState := lib.GenerateSuccessor()
    iteration := 0
    currentTime := time.Now()

    bestState := initialState
    bestCost := lib.ObjectiveFunction(bestState)

    for {
        
        neighbor, neighborCost, _ := lib.FindHighestNeighbor(bestState)

        if neighborCost < bestCost || max_iteration == 0 {
            break
        }

        bestState = neighbor
        bestCost = neighborCost
        iteration++
		max_iteration--
    }
    executeTime := time.Since(currentTime) 

    firstState := lib.ConvertToResult(initialState)
    lastState := lib.ConvertToResult(bestState)

    res := map[string] interface{}{
        "algorithm" : "Sideways Algorithm",
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

