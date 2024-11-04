// Cube.tsx
import React, { useRef } from "react";
import { Text } from "@react-three/drei";
import * as THREE from "three";
import { PixelatedMaterial } from "./PixelatedMaterial";
import { useFrame } from "@react-three/fiber";

interface CubeProps {
  position: THREE.Vector3; 
  id: number; // Save the position id 
  number: number;
  text_color: string;
  cube_color: string;
  onSwap: (id: number, newNumber: number) => void; // Function to swap cubes number
  size: number[];
}

const Cube: React.FC<CubeProps> = ({
  position,
  text_color,
  cube_color,
  number,
  size = [1, 1, 1],
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const color = new THREE.Color(cube_color);
  const material = new PixelatedMaterial(
    color,
    20,
    0
  );
  useFrame((state) => {

    material.uniforms.uTime.value = state.clock.getElapsedTime();
    
  });


  return (
    <mesh ref={meshRef} position={position}>
      <boxGeometry args={[size[0], size[1], size[2]]} />
      {/* <meshStandardMaterial color={cube_color} /> */}
      <primitive object={material} attach="material" />
      {/* Add text inside the cube */}
      
      <Text
        position={[0, size[1] / 2 + 0.05, 0]}
        fontSize={0.5}
        
        color={text_color}
        anchorX="center"
        anchorY="middle"
        rotation={[-Math.PI / 2, 0, Math.PI / 2]}
        fontWeight="bold"
      >
        {number}
      </Text>
    </mesh>
  );
};

export default Cube;
