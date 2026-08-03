import { useEffect } from "react";
import * as THREE from "three";
// Update this path line to read directly from the new file:
import { useThree } from "./threeContext";

const TicTacToe = () => {
  const three = useThree();

  useEffect(() => {
    if (!three) return;

    const { scene } = three;
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);

    cube.position.set(0, 0.5, 0);
    scene.add(cube);

    return () => {
      scene.remove(cube);
      geometry.dispose();
      material.dispose();
    };
  }, [three]);

  return null;
};

export default TicTacToe;
