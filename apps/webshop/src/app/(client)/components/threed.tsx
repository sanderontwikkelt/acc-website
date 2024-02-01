/* eslint-disable react/no-unknown-property */
import React from "react";
import { ContactShadows, Environment, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

import { SockModel } from "./sock-model";

const Threed = ({ uploadedImage }: { uploadedImage: string }) => {
  return (
    <Canvas
      shadows
      camera={{ position: [1, 0, 1], fov: 20 }}
      className="h-full"
    >
      <color attach="background" args={["#ececec"]} />
      <>
        <OrbitControls />
        <SockModel uploadedImage={uploadedImage} />
        <ContactShadows position-y={-0.15} opacity={0.6} blur={1} />
        <Environment preset="sunset" background blur={3} />
      </>
    </Canvas>
  );
};

export default Threed;
