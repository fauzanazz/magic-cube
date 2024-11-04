import * as THREE from "three";

export class PixelatedMaterial extends THREE.ShaderMaterial {
  constructor(color: THREE.Color, pixelSize: number, time: number) {
    super({
      uniforms: {
        uColor: { value: color },

        uPixelSize: { value: pixelSize },

        uTime: { value: time },

        uLightPos: { value: new THREE.Vector3(5,1,5) }, // Light position
      },

      vertexShader: `
  
          varying vec3 vWorldPos; // World position of the pixel
  
          varying vec3 vNormal;   // Surface normal of the pixel
  
  
          void main() {
  
            vWorldPos = (modelMatrix * vec4(position, 1.0)).xyz;
  
            vNormal = normalMatrix * normal;
  
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  
          }
  
        `,

      fragmentShader: `
  
          uniform vec3 uColor;
  
          uniform float uPixelSize;
  
          uniform float uTime;
  
          uniform vec3 uLightPos; // Light position
  
  
          varying vec3 vWorldPos;
  
          varying vec3 vNormal;
  
  
          void main() {
  
            vec3 pixelatedPos = floor(vWorldPos / uPixelSize) * uPixelSize;
  
  
            // 1. Calculate Light Direction and View Direction:
  
            vec3 lightDir = normalize(uLightPos - pixelatedPos);
  
            vec3 viewDir = normalize(cameraPosition - pixelatedPos);
  
            vec3 halfwayDir = normalize(lightDir + viewDir); 
  
  
            // 2. Metallic Reflection:
  
            float specPower = 20.0; // Controls the sharpness of the reflection
  
            float metallicReflection = pow(max(dot(vNormal, halfwayDir), 0.0), specPower);
  
  
            // 3. Fresnel Effect (for edge reflections):
  
            float fresnel = pow(1.0 + dot(viewDir, vNormal), 2.0);
  
  
            // 4. Combine for the Final Color:
  
            vec3 finalColor = uColor * (0.2 + fresnel * 0.8);  // Base color + edge reflection
  
  
  
            gl_FragColor = vec4(finalColor, 1.0);
  
          }
  
        `,
    });
  }
}
