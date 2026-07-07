import { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function Globe() {
  const group = useRef<THREE.Group>(null);
  const inner = useRef<THREE.Mesh>(null);

  const geo = useMemo(() => new THREE.IcosahedronGeometry(2.2, 4), []);
  const wire = useMemo(() => new THREE.WireframeGeometry(geo), [geo]);

  useFrame((state, delta) => {
    if (group.current) {
      group.current.rotation.y += delta * 0.08;
      const mx = state.mouse.x * 0.25;
      const my = state.mouse.y * 0.25;
      group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, my, 0.05);
      group.current.position.x = THREE.MathUtils.lerp(group.current.position.x, mx, 0.05);
    }
    if (inner.current) inner.current.rotation.y -= delta * 0.05;
  });

  return (
    <group ref={group}>
      <lineSegments geometry={wire}>
        <lineBasicMaterial color="#ff0000" transparent opacity={0.35} />
      </lineSegments>
      <mesh ref={inner} geometry={geo}>
        <meshBasicMaterial color="#000000" transparent opacity={0.6} />
      </mesh>
    </group>
  );
}

const WireGlobe = () => {
  const isMobile = typeof window !== 'undefined' && window.matchMedia('(max-width: 767px)').matches;
  return (
    <div className="absolute inset-0 pointer-events-none">
      <Canvas
        dpr={[1, isMobile ? 1.25 : 1.75]}
        camera={{ position: [0, 0, 6], fov: 55 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.6} />
          <Globe />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default WireGlobe;
