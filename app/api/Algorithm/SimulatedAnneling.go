package Algorithm

import (
	"fmt"
	"math"
	"math/rand"
	"time"
)

const (
	startingTemperature = 1000.0
	coolingRate         = 0.003
)

var (
	randomizer = rand.New(rand.NewSource(time.Now().UTC().UnixNano()))
)

func SimulatedAnneling() {
	// Generate a random initial state
	initialState := randomStateGenerator()

	// Set the initial temperature
	temperature := startingTemperature

	// Set the current state to the initial state
	currentState := initialState

	neighbour := randomNeighbour(currentState)

	for ok := true; ok; ok = costFunction(neighbour) < costFunction(currentState) {
		// Calculate the acceptance probability
		acceptanceProbability := math.Exp(float64(costFunction(neighbour)-costFunction(currentState)) / temperature)

		// If the neighbour is better, accept it
		if costFunction(neighbour) < costFunction(currentState) {
			currentState = neighbour
		} else if randomizer.Float64() < acceptanceProbability {
			currentState = neighbour
		}

		// Cool the temperature
		temperature *= 1 - coolingRate

		// Get a new neighbour
		neighbour = randomNeighbour(currentState)
	}

	fmt.Println("Final state: ", currentState)
	fmt.Println("Final cost: ", costFunction(currentState))
}

func randomStateGenerator() [5][5][5]int {
	var state [5][5][5]int

	for i := 0; i < 5; i++ {
		for j := 0; j < 5; j++ {
			for k := 0; k < 5; k++ {
				number := i + j*5 + k*25
				state[i][j][k] = number
			}
		}
	}

	randomShuffle(&state)

	return state
}

func randomShuffle(state *[5][5][5]int) {
	for i := 0; i < 5; i++ {
		for j := 0; j < 5; j++ {
			for k := 0; k < 5; k++ {
				i1 := randomizer.Intn(5)
				j1 := randomizer.Intn(5)
				k1 := randomizer.Intn(5)

				temp := state[i1][j1][k1]
				state[i1][j1][k1] = state[i][j][k]
				state[i][j][k] = temp
			}
		}
	}
}

func costFunction(state [5][5][5]int) int {
	// Calculate the cost of the state
	cost := 0
	return cost
}

func randomNeighbour(state [5][5][5]int) [5][5][5]int {
	// Swap two random elements in the state
	return randomSwap(state)
}

func randomSwap(state [5][5][5]int) [5][5][5]int {
	// Swap two random elements in the state

	// Get the first random element
	i1 := randomizer.Intn(5)
	j1 := randomizer.Intn(5)
	k1 := randomizer.Intn(5)

	// Get the second random element
	i2 := randomizer.Intn(5)
	j2 := randomizer.Intn(5)
	k2 := randomizer.Intn(5)

	// Swap the elements
	temp := state[i1][j1][k1]
	state[i1][j1][k1] = state[i2][j2][k2]
	state[i2][j2][k2] = temp

	// Return the new state
	return state
}
