import { useEffect, useState, useRef } from "react";
import * as THREE from "three";
import { ThreeContext } from "./ThreeContext";

const ThreeCanvas = ({ children }) => {
  const mountRef = useRef(null);
  const [threeInstance, setThreeInstance] = useState(null);

  useEffect(() => {
    const mount = mountRef.current;

    if (!mount) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color("red");

    const camera = new THREE.PerspectiveCamera(75, 850 / 650, 0.1, 1000);

    camera.position.set(3, 3, 5);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
    });

    renderer.setSize(850, 650);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    renderer.domElement.style.display = "block";

    mount.appendChild(renderer.domElement);

    const gridHelper = new THREE.GridHelper(10, 10);
    scene.add(gridHelper);

    const instance = {
      scene,
      camera,
      renderer,
    };

    setThreeInstance(instance);

    let animationId;

    const animate = () => {
      animationId = requestAnimationFrame(animate);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);

      setThreeInstance(null);

      scene.traverse((obj) => {
        if (obj.geometry) {
          obj.geometry.dispose();
        }

        if (obj.material) {
          if (Array.isArray(obj.material)) {
            obj.material.forEach((material) => material.dispose());
          } else {
            obj.material.dispose();
          }
        }
      });

      renderer.dispose();

      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <ThreeContext.Provider value={threeInstance}>
      <div
        ref={mountRef}
        style={{
          width: "850px",
          height: "650px",
          position: "relative",
          borderRadius: "2rem",
          overflow: "hidden",
        }}
      >
        {threeInstance && children}
      </div>
    </ThreeContext.Provider>
  );
};

export default ThreeCanvas;
