import { ShaderMaterial } from "three";

declare module "@react-three/fiber" {
  export interface JSX {
    pixelatedShaderMaterial: any;
  }
}
