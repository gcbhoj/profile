import { useEffect, useRef } from "react";
import * as THREE from "three";

const DefaultBackground = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;

    if (!mount) return;

    /*
      Scene
    */

    const scene = new THREE.Scene();

    const skyColor = new THREE.Color("#08182d");

    scene.background = skyColor;

    scene.fog = new THREE.FogExp2(skyColor, 0.025);

    /*
      Camera
    */

    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    );

    camera.position.z = 8;

    /*
      Renderer
    */

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
    });

    renderer.setPixelRatio(window.devicePixelRatio);

    renderer.setSize(window.innerWidth, window.innerHeight);

    renderer.toneMapping = THREE.ACESFilmicToneMapping;

    renderer.toneMappingExposure = 1;

    mount.appendChild(renderer.domElement);

    /*
      Environment Texture
    */

    let envTexture = null;

    const textureLoader = new THREE.TextureLoader();

    envTexture = textureLoader.load(
      "https://threejs.org/examples/textures/equirectangular/royal_esplanade_1k.jpg",

      (texture) => {
        texture.mapping = THREE.EquirectangularReflectionMapping;

        scene.environment = texture;

        envTexture = texture;
      },

      undefined,

      (error) => {
        console.error("Environment texture failed", error);
      },
    );

    /*
      Lighting
    */

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);

    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xfffaed, 3);

    sunLight.position.set(10, 12, 8);

    scene.add(sunLight);

    /*
      Metallic Material
    */

    const sphereMaterial = new THREE.MeshPhysicalMaterial({
      color: "#F0F4EF",

      // metalness: 1,

      roughness: 0.08,

      clearcoat: 1,

      clearcoatRoughness: 0.1,
    });

    /*
      Create Spheres
    */

    const spheres = [];

    const sphereGeometry = new THREE.SphereGeometry(0.15, 16, 16);

    for (let i = 0; i < 25; i++) {
      const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);

      sphere.position.set(
        (Math.random() - 0.5) * 14,

        (Math.random() - 0.5) * 10,

        Math.random() * -45,
      );

      const scale = Math.random() * 0.6 + 0.3;

      sphere.scale.setScalar(scale);

      sphere.userData = {
        speed: Math.random() * 0.01,

        rotationX: (Math.random() - 0.5) * 0.01,

        rotationY: (Math.random() - 0.5) * 0.01,
      };

      scene.add(sphere);

      spheres.push(sphere);
    }

    /*
      Animation
    */

    let animationId;

    const animate = () => {
      animationId = requestAnimationFrame(animate);

      spheres.forEach((sphere) => {
        // move toward camera

        sphere.position.z += sphere.userData.speed;

        sphere.rotation.x += sphere.userData.rotationX;

        sphere.rotation.y += sphere.userData.rotationY;

        if (sphere.position.z > 8) {
          sphere.position.z = -45;

          sphere.position.x = (Math.random() - 0.5) * 14;

          sphere.position.y = (Math.random() - 0.5) * 10;
        }
      });

      renderer.render(scene, camera);
    };

    animate();

    /*
      Resize
    */

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;

      camera.updateProjectionMatrix();

      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    /*
      Cleanup
    */

    return () => {
      cancelAnimationFrame(animationId);

      window.removeEventListener("resize", handleResize);

      sphereGeometry.dispose();

      sphereMaterial.dispose();

      if (envTexture) {
        envTexture.dispose();
      }

      renderer.dispose();

      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: -1,
        pointerEvents: "none",
      }}
    />
  );
};

export default DefaultBackground;
