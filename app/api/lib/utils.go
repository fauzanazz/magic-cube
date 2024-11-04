package lib

import (
	"encoding/json"
	"fmt"
	"log"
	"math/rand"
	"os"
)

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
	for i := 4; i >= 0; i-- {
		// for i := 0; i < 5; i++ {
		// for j:= 4; j >= 0; j-- {
		for j := 0; j < 5; j++ {
			startIdx := 25 * j
			// for k:= 0; k < 5; k++ {
			for k := 4; k >= 0; k-- {
				// fmt.Printf("%d ", startIdx+j*5+k)
				fmt.Print(state[startIdx+i*5+k], " ")
			}
			println()
		}
		println()
	}
}

func PrintStateWithLabel(state [125]int, label string) {
	fmt.Println(label)
	PrintState(state)
}

func SaveToJson(res any) {
	jsonData, err := json.MarshalIndent(res, "", "  ")
	if err != nil {
		log.Fatal(err)
	}

	// Write the JSON to a file
	err = os.WriteFile("../../public/external-data/data.json", jsonData, 0644)
	if err != nil {
		log.Fatal(err)
	}
}

func SaveStateToJson(res any) {
	jsonData, err := json.MarshalIndent(res, "", "  ")
	if err != nil {
		log.Fatal(err)
	}

	// Write the JSON to a file
	err = os.WriteFile("../../public/external-data/cube-data.json", jsonData, 0644)
	if err != nil {
		log.Fatal(err)
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

func RandomNeighbor(state [125]int, stateMap *map[[125]int]bool) ([125]int, int) {
	var neighbor [125]int
	iteration := 0
	for {
		if iteration > 15624 {
			return state, -1
		}

		i := RandomInt(0, 125)
		j := RandomInt(0, 125)

		if i == j {
			continue
		}

		neighbor = state
		neighbor[i], neighbor[j] = neighbor[j], neighbor[i]

		if !(*stateMap)[neighbor] {
			break
		}

		iteration++
	}
	cost := ObjectiveFunction(neighbor)
	return neighbor, cost
}

func ConvertToResult(list [125]int) [][]int {
	res := make([][]int, 125)
	for i := range res {
		res[i] = make([]int, 2)
		res[i][0] = i + 1
		res[i][1] = list[i]
	}
	return res
}
