# Solving the Diagonal Magic Cube with a Local Search Algorithm

This project implements a search algorithm to solve the 5x5x5 Diagonal Magic Cube problem using a local search approach. The problem requires that each row, column, pillar, and diagonal within the cube satisfies a constant called the magic number. This project is built as a web application to visualize the solution steps and facilitate analysis.

## List of Algorithms

### 1. **Steepest Ascent Hill-Climbing**
   - The algorithm moves to the neighbor with the highest objective function value.
   - Termination occurs when a local optimum is reached.

### 2. **Hill-Climbing with Sideways Move**
   - Allows steps to neighbors with the same objective function value to overcome flat areas.

### 3. **Random Restart Hill-Climbing**
   - If the solution reaches a dead end, the algorithm restarts randomly and begins the search anew.

### 4. **Simulated Annealing**
   - Uses a probabilistic approach with annealing simulation to avoid getting stuck in local optima.

### 5. **Genetic Algorithm**
   - Utilizes selection, mutation, and crossover to evolve solutions from generation to generation until an optimal solution is reached.

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## How To Use

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Task and Member
| Task                                  | Member                                   |
|---------------------------------------|------------------------------------------|
| Visualization (Front-End)             | 13522157 - Muhammad Davis Adhipramana    |
| Objective Function                    | 13522164 - Valentino Chryslie Triadi     |
| Steepest Ascent Hill-Climbing         | 13522134 - Shabrina Maharani             |
| Hill-Climbing with Sideways Move      | 13522157 - Muhammad Davis Adhipramana    |
| Random Restart Hill-Climbing          | 13522134 - Shabrina Maharani             |
| Stochastic Hill-Climbing              | 13522153 - Muhammad Fauzan Azhim         |
| Simulated Annealing                   | 13522153 - Muhammad Fauzan Azhim         |
| Genetic Algorithm                     | 13522164 - Valentino Chryslie Triadi     |
