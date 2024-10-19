package lib

import "math/rand"

func RandomInt(min int, max int) int {
	if max <= min {
		return min
	}
	return min + rand.Intn(max-min)
}

func NotIn(value int, arr [125]int) bool {
	for _, v := range arr {
		if v == value {
			return false
		}
	}
	return true
}

func PrintState(state [125]int) {
	for i := 0; i < 5; i++ {
		for j := 0; j < 5; j++ {
			for k := 0; k < 5; k++ {
				print(state[i*25+j*5+k], " ")
			}
			println()
		}
		println()
	}
}

func FindHighestNeighbor(state [125]int) ([125]int, int, int) {
    var bestNeighbor [125]int
    bestCost := -1 
    successorCount := 0

    for i := 0; i < 125; i++ {
        for j := i + 1; j < 125; j++ {
            newNeighbor := state
            newNeighbor[i], newNeighbor[j] = newNeighbor[j], newNeighbor[i]
            successorCount++

            cost := ObjectiveFunction(newNeighbor)

            if cost > bestCost {
                bestCost = cost
                bestNeighbor = newNeighbor
            
        }
    }
    }
    return bestNeighbor, bestCost, successorCount
}
