import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useSelector, useDispatch } from "react-redux";
import { geoFindMe } from "../utils/locationfinder";
import { setLocation } from "../features/locationSlice";

const EARTH_RADIUS = 1.2;

// Standard spherical conversion matching default Three.js texture UV mapping
function latLonToVector3(lat, lon, radius) {
  const phi = THREE.MathUtils.degToRad(90 - lat);
  const theta = THREE.MathUtils.degToRad(lon + 90); // 90-degree offset fixes texture seam placement

  return new THREE.Vector3(
    radius * Math.sin(phi) * Math.sin(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.cos(theta),
  );
}

const HomeBackground = () => {
  const mountRef = useRef(null);
  const dispatch = useDispatch();
  const { latitude, longitude } = useSelector((state) => state.location);

  useEffect(() => {
    geoFindMe()
      .then((coords) => {
        dispatch(
          setLocation({
            latitude: coords.latitude,
            longitude: coords.longitude,
          }),
        );
      })
      .catch((err) => {
        console.error("Location tracking failed:", err);
      });
  }, [dispatch]);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#08182d");

    const camera = new THREE.PerspectiveCamera(
      55,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    );
    camera.position.set(0, 0, 6);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    mount.appendChild(renderer.domElement);

    scene.add(new THREE.AmbientLight(0xffffff, 0.5));
    const sun = new THREE.DirectionalLight(0xffffff, 2);
    sun.position.set(5, 3, 5);
    scene.add(sun);

    /*
    ====================================
    Earth Pivot Group (FIXES BACKSIDE BUG)
    ====================================
    */
    const earthGroup = new THREE.Group();
    scene.add(earthGroup);

    const loader = new THREE.TextureLoader();
    const earthTexture = loader.load(
      "https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg",
    );
    const bumpTexture = loader.load(
      "https://unpkg.com/three-globe/example/img/earth-topology.png",
    );

    const earth = new THREE.Mesh(
      new THREE.SphereGeometry(EARTH_RADIUS, 64, 64),
      new THREE.MeshStandardMaterial({
        map: earthTexture,
        bumpMap: bumpTexture,
        bumpScale: 0.02,
        roughness: 0.9,
        metalness: 0.05,
      }),
    );
    // Add earth to the outer rotational group container
    earthGroup.add(earth);

    /*
    ====================================
    User Marker & Perfect Target Rotations
    ====================================
    */
    let marker = null;
    let targetRotationY = 0;
    let targetRotationX = 0;

    if (latitude !== null && longitude !== null) {
      const markerGroup = new THREE.Group();

      const stem = new THREE.Mesh(
        new THREE.CylinderGeometry(0.006, 0.006, 0.12, 12),
        new THREE.MeshBasicMaterial({ color: "white" }),
      );
      stem.position.y = 0.09;
      markerGroup.add(stem);

      const head = new THREE.Mesh(
        new THREE.SphereGeometry(0.04, 16, 16),
        new THREE.MeshBasicMaterial({ color: "#ff3030" }),
      );
      head.position.y = 0.18;
      markerGroup.add(head);

      const glow = new THREE.Mesh(
        new THREE.SphereGeometry(0.06, 16, 16),
        new THREE.MeshBasicMaterial({
          color: "#ff3030",
          transparent: true,
          opacity: 0.35,
        }),
      );
      glow.position.y = 0.18;
      markerGroup.add(glow);

      const position = latLonToVector3(
        latitude,
        longitude,
        EARTH_RADIUS + 0.01,
      );
      markerGroup.position.copy(position);

      markerGroup.quaternion.setFromUnitVectors(
        new THREE.Vector3(0, 1, 0),
        position.clone().normalize(),
      );

      // Attach marker to the earth mesh so it moves relatively with it
      earth.add(markerGroup);
      marker = markerGroup;

      // Mathematically precise targets to bring the pin front-and-center:
      targetRotationY = THREE.MathUtils.degToRad(-longitude - 90);
      targetRotationX = THREE.MathUtils.degToRad(latitude);
    }

    /*
    ====================================
    Stars & Animation Loop
    ====================================
    */
    const starGeometry = new THREE.BufferGeometry();
    const starCount = 2000;
    const starPositions = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      starPositions[i * 3] = (Math.random() - 0.5) * 100;
      starPositions[i * 3 + 1] = (Math.random() - 0.5) * 100;
      starPositions[i * 3 + 2] = (Math.random() - 0.5) * 100;
    }
    starGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(starPositions, 3),
    );
    const stars = new THREE.Points(
      starGeometry,
      new THREE.PointsMaterial({ color: "white", size: 0.15 }),
    );
    scene.add(stars);

    let frame;
    const clock = new THREE.Clock();

    const animate = () => {
      frame = requestAnimationFrame(animate);

      if (latitude !== null && longitude !== null) {
        // Outer group handles Longitude (Y-Axis) tracking
        earthGroup.rotation.y +=
          (targetRotationY - earthGroup.rotation.y) * 0.04;
        // Inner mesh handles Latitude (X-Axis) tracking perfectly independent of Y deformation
        earth.rotation.x += (targetRotationX - earth.rotation.x) * 0.04;
      } else {
        // Idle spinning when coordinates aren't ready yet
        earthGroup.rotation.y += 0.002;
      }

      if (marker) {
        const pulse = 1 + Math.sin(clock.getElapsedTime() * 4) * 0.15;
        marker.scale.setScalar(pulse);
      }

      stars.rotation.y += 0.0002;
      renderer.render(scene, camera);
    };

    animate();

    const resize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      renderer.dispose();
      renderer.forceContextLoss();
      earth.geometry.dispose();
      earth.material.dispose();
      earthTexture.dispose();
      bumpTexture.dispose();
      starGeometry.dispose();
      stars.material.dispose();
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, [latitude, longitude]);

  return (
    <div
      ref={mountRef}
      style={{ position: "fixed", inset: 0, zIndex: -1, pointerEvents: "none" }}
    />
  );
};

export default HomeBackground;
