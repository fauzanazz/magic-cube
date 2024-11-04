package Algorithm

import (
	"fmt"
	"magic-cube/lib"
	"time"
)

func GeneticAlgorithm(jumlah_populasi int, jumlah_generasi int) bool {
	iterasi := 0
	currentTime := time.Now()
	populasi := lib.GeneratePopulation(jumlah_populasi)
	bestFirstState := [125]int{}
	// populasi_awal := populasi
	bestState := [125]int{}
	bestCost := 0
	
	for iterasi < jumlah_generasi {
		newGeneration := [][125]int{}

		// Calculate the cost of the state
		cost := make([]int, jumlah_populasi)
		sumCost := 0
		for i := 0; i < jumlah_populasi; i++ {
			cost[i] = lib.ObjectiveFunction(populasi[i])
			sumCost += cost[i]

			if iterasi > 0 {
				// Get best child of the best child of the best 👌
				if cost[i] > bestCost {
					bestCost = cost[i]
					bestState = populasi[i]
				}
			}
		}

		if (iterasi == 0) {
			tempBestCost := 0
			tempBestIdx := 0
			for i := 0; i < jumlah_populasi; i++ {
				if (tempBestCost < cost[i]) {
					tempBestCost = cost[i]
					tempBestIdx = i
				}
			}
			bestFirstState = populasi[tempBestIdx]
		}

		// Selection
		selectedPopulasi := make([][125]int, jumlah_populasi)
		for i := 0; i < jumlah_populasi; i++ {
			randPoint := lib.RandomInt(0, sumCost)
			for j := 0; j < jumlah_populasi; j++ {
				randPoint -= cost[j]
				if randPoint <= 0 {
					selectedPopulasi[i] = populasi[j]
					break
				}
			}
		}

		// Crossover
		for i := 0; i < jumlah_populasi; i += 2 {
			// Randomly select 2 parents
			parent1 := selectedPopulasi[i]
			parent2 := selectedPopulasi[i+1]

			crossoverPoint := 75

			// Create 2 children
			child1 := [125]int{}
			child2 := [125]int{}

			// Copy the first part of the parents to the children
			for j := 0; j < crossoverPoint; j++ {
				child1[j] = parent1[j]
				child2[j] = parent2[j]
			}

			// Copy the second part of the parents to the children
			currentIdx := 0
			for j := crossoverPoint; j < 125; j++ {
				for k := currentIdx; k < 125; k++ {
					if lib.NotIn(parent2[k], child1) {
						child1[j] = parent2[k]
						currentIdx = k
						break
					}
				}
			}
			currentIdx = 0
			for j := crossoverPoint; j < 125; j++ {
				for k := currentIdx; k < 125; k++ {
					if lib.NotIn(parent1[k], child2) {
						child2[j] = parent1[k]
						currentIdx = k
						break
					}
				}
			}

			// Mutate the children
			// Swap two random elements in child1
			idx1 := lib.RandomInt(0, 124)
			idx2 := lib.RandomInt(0, 124)
			child1[idx1], child1[idx2] = child1[idx2], child1[idx1]

			// Swap two random elements in child2
			idx1 = lib.RandomInt(0, 124)
			idx2 = lib.RandomInt(0, 124)
			child2[idx1], child2[idx2] = child2[idx2], child2[idx1]

			newGeneration = append(newGeneration, child1)
			newGeneration = append(newGeneration, child2)

		}

		populasi = newGeneration
		iterasi++
	}
	executeTime := time.Since(currentTime) 
	fmt.Println("Time: ", executeTime)
	fmt.Println("Best Cost: ", bestCost)


	// fmt.Println("Best State: ")
	// lib.PrintState(bestState)

	lastState := lib.ConvertToResult(bestState)
	firstState := lib.ConvertToResult(bestFirstState)
	lib.PrintStateWithLabel(bestFirstState, "Initial State")
	lib.PrintStateWithLabel(bestState, "Last State")

	res := map[string]interface{}{
		"algorithm" : "Genetic Algorithm",
		"description": map[string]interface{}{
			"Jumlah Populasi Awal": jumlah_populasi,
			"Jumlah Generasi": jumlah_generasi,
			"Best Value": bestCost,
			"Duration":   executeTime.String(),
		},
		"firstState": firstState,
		"lastState": lastState,
	}

	lib.SaveToJson(res)

	return true
}
