"use client"

import {Canvas} from "@react-three/fiber";
import {OrbitControls} from "@react-three/drei";
import React, {useEffect, useState} from "react";
import {State} from "@/types/state";
import * as THREE from "three";
import Cube from "@/components/result/state/Cube";

interface CubeDisplayProps {
    cubeNumbersData: State;
}

const GeneratedColor = [
    "#585bf2" /* Blue */,
    "#fe9941" /* Orange */,
    "#fefd32" /* Yellow */,
    "#ff3d44" /* Red */,
    "#30cc4b" /* Green */,
];

const CubeDisplay: React.FC<CubeDisplayProps> = ({ cubeNumbersData }) => {
    const [cubeNumbers, setCubeNumbers] = useState<{ [key: number]: number }>({});

    useEffect(() => {
        const initialNumbers: { [key: number]: number } = {};

        // Ensure the initialCubes length is 125 and IDs are unique from 1 to 125
        if (cubeNumbersData.length === 125) {
            cubeNumbersData.forEach((cube) => {
                if (cube[0] >= 1 && cube[0] <= 125) {
                    initialNumbers[cube[0]] = cube[1];
                } else {
                    console.error("Cube ID out of range: ", cube[0]);
                }
            });
        } else {
            console.warn("Initial cubes should contain exactly 125 cubes.");


            for (let i = 0; i < gridDimension ** 3; i++) {
                initialNumbers[i] = Math.floor(Math.random() * 125);
            }
        }

        setCubeNumbers(initialNumbers);
    }, [cubeNumbersData]);

    const SwapNumber = (id1: number, id2: number) => {
        setCubeNumbers((prevNumbers) => {
            const number1 = prevNumbers[id1];
            const number2 = prevNumbers[id2];

            // Swap the numbers
            return {
                ...prevNumbers,
                [id1]: number2,
                [id2]: number1,
            };
        });
    };

    const gridDimension = 5;
    const spacing = 2.5;
    const cubes: JSX.Element[] = [];

    let counter = 1;
    for (let x = 0; x < gridDimension; x++) {
        for (let y = 0; y < gridDimension; y++) {
            for (let z = 0; z < gridDimension; z++) {
                const position = new THREE.Vector3(
                    x - (gridDimension - 1) / 2,
                    (y - (gridDimension - 1) / 2) * spacing,
                    z - (gridDimension - 1) / 2
                );

                const selectedColor = GeneratedColor[(x + y + z) % GeneratedColor.length];
                const cubeSize = [1, 0.7, 1];


                cubes.push(
                    <Cube
                        key={`${x}-${y}-${z}`}
                        position={position}
                        id={counter}
                        number={cubeNumbers[counter]}
                        onSwap={SwapNumber}
                        text_color="#000000"
                        cube_color={selectedColor}
                        size={cubeSize}
                    />
                );
                counter++;
            }
        }
    }

    return (
        <Canvas
            style={{ height: "100vh" }}
            camera={{ position: [5, 5, 5], fov: 80 }}
        >
            <ambientLight intensity={2} />
            <pointLight position={[10, 10, 10]} />
            {cubes}
            <OrbitControls />
        </Canvas>
    );
};

export default CubeDisplay;