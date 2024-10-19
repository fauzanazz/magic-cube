package lib

import (
	"encoding/json"
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
