package Algorithm

import (
	"magic-cube/lib"
	"time"
)


func SteepestAscent(initialState [125]int) bool{
    
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

    res := map[string] interface{}{
        "algorithm" : "Steepest Ascent Algorithm",
        "description" : map[string]interface{}{
            "Objective Function" : bestCost,
            "Duration" : executeTime.String() + "ms",
            "Jumlah Iterasi" : iteration,
        },
        "firstState" : firstState,
        "lastState" : lastState,
    }

    lib.SaveToJson(res)

    return true;
    
}

