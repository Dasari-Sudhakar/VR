import { Suspense, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html, OrbitControls, Sphere } from '@react-three/drei';
import { ARButton, Controllers, Hands, VRButton, XR } from '@react-three/xr';
import * as THREE from 'three';

const Panorama = ({ image }) => {
  const texture = useMemo(() => new THREE.TextureLoader().load(image), [image]);
  return (
    <Sphere args={[30, 60, 40]} scale={[-1, 1, 1]}>
      <meshBasicMaterial map={texture} side={THREE.BackSide} />
    </Sphere>
  );
};

const Hotspot = ({ hotspot, onNavigate }) => {
  const ref = useRef();
  const [hovered, setHovered] = useState(false);
  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += 0.01;
    }
  });

  return (
    <group position={hotspot.position}>
      <mesh
        ref={ref}
        onClick={() => onNavigate(hotspot)}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshStandardMaterial color={hovered ? '#22d3ee' : '#a855f7'} emissive="#164e63" />
      </mesh>
      {hovered && (
        <Html>
          <div className="rounded-md bg-black/80 px-2 py-1 text-xs text-white">{hotspot.label}</div>
        </Html>
      )}
    </group>
  );
};

const TourCanvas = ({ scene, onHotspotClick }) => (
  <div className="relative h-[70vh] overflow-hidden rounded-3xl border border-white/20">
    <VRButton />
    <ARButton />
    <Canvas camera={{ position: [0, 0, 0.1], fov: 75 }}>
      <ambientLight intensity={0.7} />
      <XR>
        <Suspense fallback={null}>
          <Panorama image={scene.imageUrl} />
          {scene.hotspots.map((hotspot) => (
            <Hotspot key={hotspot._id || hotspot.label} hotspot={hotspot} onNavigate={onHotspotClick} />
          ))}
        </Suspense>
        <Controllers />
        <Hands />
      </XR>
      <OrbitControls enableZoom minDistance={0.1} maxDistance={5} />
    </Canvas>
  </div>
);

export default TourCanvas;
