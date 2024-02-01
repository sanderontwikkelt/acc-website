/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unknown-property */
// import { useControls } from "leva";
import React from "react";
import { Decal, useGLTF, useTexture } from "@react-three/drei";

interface SceneProps {
  uploadedImage: string | undefined;
}

export function SockModel({ uploadedImage }: SceneProps) {
  const texture = useTexture(uploadedImage || "/images/wawa.png");
  const { nodes, materials } = useGLTF("/glb/sock.glb");

  // useControls({
  //   angle: {
  //     min: degToRad(60),
  //     max: degToRad(300),
  //     value: Math.PI / 4,
  //     step: 0.01,
  //     onChange: (value) => {
  //       const x = Math.cos(value);
  //       const z = Math.sin(value);
  //       const rot = Math.atan2(x, z);
  //       setRotation(() => [0, rot, 0]);

  //       setPos((pos) => [x, pos[1], z]);
  //     },
  //   },
  //   posY: {
  //     min: 0,
  //     max: 3,
  //     value: 1.8,
  //     step: 0.01,
  //     onChange: (value) => {
  //       setPos((pos) => [pos[0], value, pos[2]]);
  //     },
  //   },
  //   scale: {
  //     min: 0.5,
  //     max: 3,
  //     value: 1.1,
  //     step: 0.01,
  //     onChange: (value) => {
  //       setScale(() => [value, value, 0.1]);
  //     },
  //   },
  // });
  // // texture.repeat.set(1, 1);
  // // texture.center.set(0.5, 0.5);
  // // texture.offset.set(0, 0);

  // const [pos, setPos] = useState([0, 1.8, 1]);
  // const [rotation, setRotation] = useState([0, 0, 0]);
  // const [scale, setScale] = useState([0.05, 0.05, 0.005]);

  return (
    <group dispose={null} rotation={[0, 3, 0]}>
      <mesh
        geometry={(nodes.Cube_Cube001 as any).geometry}
        material={materials["Material.001"]}
      />
      <mesh
        geometry={(nodes.Cube_Cube001_1 as any).geometry}
        material={materials["Material.001"]}
      />

      <mesh geometry={(nodes.Cube_Cube001_2 as any).geometry}>
        <meshBasicMaterial transparent opacity={0} />
        <Decal
          // debug // Makes "bounding box" of the decal visible
          position={[0, 0.15, 0]} // Position of the decal
          rotation={[0, 0.9, 0]} // Rotation of the decal (can be a vector or a degree in radians)
          scale={[0.06, 0.1, 0.045]} // Scale of the decal
        >
          <meshStandardMaterial
            map={texture}
            toneMapped={false}
            transparent
            polygonOffset
            polygonOffsetFactor={-1} // The mesh should take precedence over the original
          />
        </Decal>
      </mesh>
    </group>
  );
}

useGLTF.preload("/glb/sock.glb");
