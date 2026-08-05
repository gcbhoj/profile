import { useEffect } from "react";
import * as THREE from "three";
import { useThree } from "./ThreeContext";

const TicTacToe = () => {
  const three = useThree();

  useEffect(() => {
    if (!three) return;

    const { scene } = three;

    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshNormalMaterial();

    const cube = new THREE.Mesh(geometry, material);
    cube.position.y = 0.5;

    scene.add(cube);

    let frameId;

    const animate = () => {
      frameId = requestAnimationFrame(animate);

      cube.rotation.x += .01;
      cube.rotation.y += 0.01;
    };

    animate();

    return () => {
      cancelAnimationFrame(frameId);
      scene.remove(cube);
      geometry.dispose();
      material.dispose();
    };
  }, [three]);

  return null;
};

export default TicTacToe;
