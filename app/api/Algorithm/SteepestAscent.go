package Algorithm

import (
	"magic-cube/lib"
	"time"
    "fmt"
)


func SteepestAscent() bool{
    
    // Generate Initial State Randomly
    var allState [][125]int
    initialState := lib.GenerateSuccessor()
    allState = append(allState, initialState)

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
        allState = append(allState, initialState)

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

    jsonAllState := map[string]interface{}{
		"allState": allState,
	}

	lib.SaveStateToJson(jsonAllState)
    lib.SaveToJson(res)

    return true;
    
}

