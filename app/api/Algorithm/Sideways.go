package Algorithm

import (
	"magic-cube/lib"
	"time"
)

func Sideways(max_iteration int) bool{
    // Generate Initial Variable
    var allState [][125]int
	initialState := lib.GenerateSuccessor()
    allState = append(allState, initialState)
    
    lib.PrintStateWithLabel(initialState, "Initial State: ")

    iteration := 0
    currentTime := time.Now()

    cached_max_iteration  := max_iteration
    bestState := initialState
    bestCost := lib.ObjectiveFunction(bestState)

    for {
        
        neighbor, neighborCost, _ := lib.FindHighestNeighbor(bestState)

        if neighborCost < bestCost{
            break
        }else if(neighborCost == bestCost){
            // Asumsi: Ga Reset ya bang klo misal dia berhasil naik
            if(max_iteration == 0){ 
                break
            }
            max_iteration--;
        }

        bestState = neighbor
        bestCost = neighborCost
        allState = append(allState, initialState)

        iteration++
		
    }
    executeTime := time.Since(currentTime) 

    firstState := lib.ConvertToResult(initialState)
    lastState := lib.ConvertToResult(bestState)

    res := map[string] interface{}{
        "algorithm" : "Sideways Algorithm",
        "description" : map[string]interface{}{
            "Max Sideways Iteration" : cached_max_iteration,
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
    
    lib.PrintStateWithLabel(bestState, "Final State: ")
    lib.SaveToJson(res)

    return true;
    
}

