package lib

const magicNb = 315

func ObjectiveFunction(state [125]int) int {
	// Calculate the cost of the state
	cost := 0

	n := 5
	nn := n * n

	// Count Row
	for i := 0; i < nn; i++ {
		sum := 0
		for j := 0; j < n; j++ {
			sum += state[i*n+j]
		}
		if sum == magicNb {
			cost++
		}
	}

	// Count Column
	for i := 0; i < n; i++ {
		sum := 0
		base := i * nn
		for j := 0; j < n; j++ {
			sum += state[base+(j*n)]
		}
		if sum == magicNb {
			cost++
		}
	}

	// Count Pillar
	for i := 0; i < nn; i++ {
		sum := 0
		for j := 0; j < n; j++ {
			sum += state[i+(j*nn)]
		}
		if sum == magicNb {
			cost++
		}
	}

	// Count Area Z Diagonal
	for i := 0; i < n; i++ {
		sumAD1, sumAD2 := 0, 0
		baseAD1 := i * n
		baseAD2 := i*n + n - 1
		for j := 0; j < n; j++ {
			sumAD1 += state[baseAD1+j*(nn+1)]
			sumAD2 += state[baseAD2+j*(nn-1)]
		}
		if sumAD1 == magicNb {
			cost++
		}
		if sumAD2 == magicNb {
			cost++
		}
	}

	// Count Area Y Diagonal
	for i := 0; i < n; i++ {
		sumAD1, sumAD2 := 0, 0
		baseAD1 := i * nn
		baseAD2 := i*nn + nn - n
		for j := 0; j < n; j++ {
			sumAD1 += state[baseAD1+j*(n+1)]
			sumAD2 += state[baseAD2-j*(n-1)]
		}
		if sumAD1 == magicNb {
			cost++
		}
		if sumAD2 == magicNb {
			cost++
		}
	}

	// Count Area X Diagonal
	for i := 0; i < n; i++ {
		sumAD1, sumAD2 := 0, 0
		baseAD1 := i
		baseAD2 := nn - n + i
		for j := 0; j < n; j++ {
			sumAD1 += state[baseAD1+j*(nn+n)]
			sumAD2 += state[baseAD2+j*(nn-n)]
		}
		if sumAD1 == magicNb {
			cost++
		}
		if sumAD2 == magicNb {
			cost++
		}
	}

	// Count Space Diagonal
	sumSD1, sumSD2, sumSD3, sumSD4 := 0, 0, 0, 0
	for i := 0; i < n; i++ {
		sumSD1 += state[i*(nn+n+1)]
		sumSD2 += state[nn-1+i*(nn-n-1)]
		sumSD3 += state[n-1+i*(nn+n-1)]
		sumSD4 += state[nn-n+i*(nn-n+1)]
	}
	if sumSD1 == magicNb {
		cost++
	}
	if sumSD2 == magicNb {
		cost++
	}
	if sumSD3 == magicNb {
		cost++
	}
	if sumSD4 == magicNb {
		cost++
	}

	return cost
}
