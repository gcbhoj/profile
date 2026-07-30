import { useEffect, useRef } from "react";
import * as THREE from "three";
// Import the CSS2D subsystems directly from the standard Three package bundles
import {
  CSS2DRenderer,
  CSS2DObject,
} from "three/examples/jsm/renderers/CSS2DRenderer.js";
import { useSelector, useDispatch } from "react-redux";
import { geoFindMe, getLocationDetails } from "../utils/locationfinder";
import { setLocation } from "../features/locationSlice";

const EARTH_RADIUS = 1.2; // Your scaled down size

function latLonToVector3(lat, lon, radius) {
  const phi = THREE.MathUtils.degToRad(90 - lat);
  const theta = THREE.MathUtils.degToRad(lon + 90);
  return new THREE.Vector3(
    radius * Math.sin(phi) * Math.sin(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.cos(theta),
  );
}

const HomeBackground = () => {
  const mountRef = useRef(null);
  const dispatch = useDispatch();
  const { latitude, longitude, city } = useSelector((state) => state.location);

  // Trigger the permission request and lookup city asynchronously
  useEffect(() => {
    geoFindMe()
      .then(async (coords) => {
        const detailedLocation = await getLocationDetails(
          coords.latitude,
          coords.longitude,
        );
        dispatch(
          setLocation({
            latitude: coords.latitude,
            longitude: coords.longitude,
            city: detailedLocation,
          }),
        );
      })
      .catch((err) => console.error(err));
  }, [dispatch]);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    // scene.background = new THREE.Color("#08182d");

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

    // --- HTML Label Layer Setup ---
    const labelRenderer = new CSS2DRenderer();
    labelRenderer.setSize(window.innerWidth, window.innerHeight);
    labelRenderer.domElement.style.position = "absolute";
    labelRenderer.domElement.style.top = "0px";
    labelRenderer.domElement.style.pointerEvents = "none"; // Keeps background transparent/clickable
    mount.appendChild(labelRenderer.domElement);

    scene.add(new THREE.AmbientLight(0xffffff, 0.5));
    const sun = new THREE.DirectionalLight(0xffffff, 2);
    sun.position.set(5, 3, 5);
    scene.add(sun);

    const earthGroup = new THREE.Group();
    scene.add(earthGroup);

    const loader = new THREE.TextureLoader();
    const earthTexture = loader.load(
      "https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg",
    );
    const bumpTexture = loader.load(
      "https://unpkg.com/three-globe/example/img/earth-topology.png",
    );

    // --- NEW: Load Star Icon Alpha Texture ---
    const starIconTexture = loader.load(
      "https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/lensflare/lensflare0_alpha.png",
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
    earthGroup.add(earth);

    // --- Searching / Scanning Lines Setup ---
    const scanningLinesGroup = new THREE.Group();
    const isSearching = latitude === null || longitude === null;

    if (isSearching) {
      scene.add(scanningLinesGroup);

      const ringCount = 3;
      const ringMaterial = new THREE.MeshBasicMaterial({
        color: 0x00ffcc,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.4,
      });

      for (let i = 0; i < ringCount; i++) {
        const ringGeo = new THREE.RingGeometry(
          EARTH_RADIUS + 0.02,
          EARTH_RADIUS + 0.035,
          64,
        );
        const ringMesh = new THREE.Mesh(ringGeo, ringMaterial);
        ringMesh.rotation.x = Math.PI / 2;
        ringMesh.position.y = (i - 1) * 0.6;
        ringMesh.userData = { speed: 0.015 + i * 0.005, direction: 1 };
        scanningLinesGroup.add(ringMesh);
      }
    }

    let marker = null;
    let targetRotationY = 0;
    let targetRotationX = 0;

    if (latitude !== null && longitude !== null) {
      const markerGroup = new THREE.Group();

      // Pin components
      const stem = new THREE.Mesh(
        new THREE.CylinderGeometry(0.006, 0.006, 0.12, 12),
        new THREE.MeshBasicMaterial({ color: "white" }),
      );
      stem.position.y = 0.06;
      markerGroup.add(stem);

      const head = new THREE.Mesh(
        new THREE.SphereGeometry(0.03, 16, 16),
        new THREE.MeshBasicMaterial({ color: "#ff3030" }),
      );
      head.position.y = 0.12;
      markerGroup.add(head);

      // Position logic
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
      earth.add(markerGroup);
      marker = markerGroup;

      // --- Floating HTML UI Label Component ---
      if (city) {
        const cityDiv = document.createElement("div");
        cityDiv.className = "globe-city-label";
        cityDiv.textContent = city;

        cityDiv.style.color = "white";
        cityDiv.style.fontFamily = "sans-serif";
        cityDiv.style.fontWeight = "bold";
        cityDiv.style.fontSize = "14px";
        cityDiv.style.padding = "4px 10px";
        cityDiv.style.background = "rgba(8, 24, 45, 0.85)";
        cityDiv.style.border = "1px solid rgba(255, 255, 255, 0.2)";
        cityDiv.style.borderRadius = "4px";
        cityDiv.style.whiteSpace = "nowrap";

        const cityLabel = new CSS2DObject(cityDiv);
        cityLabel.position.set(0, 0.18, 0);
        marker.add(cityLabel);
      }

      targetRotationY = THREE.MathUtils.degToRad(-longitude - 90);
      targetRotationX = THREE.MathUtils.degToRad(latitude);
    }

    // --- UPDATED: Icon-Based Starfield Layout ---
    const starGeometry = new THREE.BufferGeometry();
    const starCount = 600; // Lowered slightly since icon sprites look fuller than raw pixels
    const starPositions = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      starPositions[i * 3] = (Math.random() - 0.5) * 80;
      starPositions[i * 3 + 1] = (Math.random() - 0.5) * 80;
      starPositions[i * 3 + 2] = (Math.random() - 0.5) * 80;
    }
    starGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(starPositions, 3),
    );

    const starsMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.7, // Scaled up slightly so the icons are recognizable
      map: starIconTexture, // Injects the star icon image
      transparent: true, // Required to honor the alpha transparency background
      blending: THREE.AdditiveBlending, // Makes the stars pop and look intensely bright
      depthWrite: false, // Prevents the icon square borders from clipping each other
    });

    const stars = new THREE.Points(starGeometry, starsMaterial);
    scene.add(stars);

    let frame;
    const animate = () => {
      frame = requestAnimationFrame(animate);

      if (latitude !== null && longitude !== null) {
        earthGroup.rotation.y +=
          (targetRotationY - earthGroup.rotation.y) * 0.04;
        earth.rotation.x += (targetRotationX - earth.rotation.x) * 0.04;
      } else {
        earthGroup.rotation.y += 0.002;

        // Animate scanning lines while searching
        scanningLinesGroup.children.forEach((ring) => {
          ring.position.y += ring.userData.speed * ring.userData.direction;
          if (Math.abs(ring.position.y) > EARTH_RADIUS * 0.9) {
            ring.userData.direction *= -1;
          }
        });
      }

      stars.rotation.y += 0.0001; // Soft cosmic space rotation

      renderer.render(scene, camera);
      labelRenderer.render(scene, camera);
    };
    animate();

    const resize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      labelRenderer.setSize(window.innerWidth, window.innerHeight);
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
      starIconTexture.dispose(); // Dispose texture resource
      starGeometry.dispose();
      stars.material.dispose();

      scanningLinesGroup.children.forEach((ring) => {
        ring.geometry.dispose();
        if (Array.isArray(ring.material)) {
          ring.material.forEach((m) => m.dispose());
        } else {
          ring.material.dispose();
        }
      });

      if (mount.contains(renderer.domElement))
        mount.removeChild(renderer.domElement);
      if (mount.contains(labelRenderer.domElement))
        mount.removeChild(labelRenderer.domElement);
    };
  }, [latitude, longitude, city]);

  return (
    <div
      ref={mountRef}
      style={{ position: "fixed", inset: 0, zIndex: -1, pointerEvents: "none" }}
    />
  );
};

export default HomeBackground;
