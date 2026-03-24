import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const ParticleField = () => {
    const count = 1000;
    const meshRef = useRef<THREE.Points>(null);

    const particles = useMemo(() => {
        const positions = new Float32Array(count * 3);
        const velocities = new Float32Array(count);
        for (let i = 0; i < count; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 50;
            positions[i * 3 + 1] = Math.random() * 50;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 50;
            velocities[i] = 0.05 + Math.random() * 0.1;
        }
        return { positions, velocities };
    }, []);

    useFrame((state) => {
        if (!meshRef.current) return;
        const positions = meshRef.current.geometry.attributes.position.array as Float32Array;
        for (let i = 0; i < count; i++) {
            positions[i * 3 + 1] -= particles.velocities[i];
            if (positions[i * 3 + 1] < -25) {
                positions[i * 3 + 1] = 25;
            }
        }
        meshRef.current.geometry.attributes.position.needsUpdate = true;
    });

    return (
        <points ref={meshRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={count}
                    array={particles.positions}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.05}
                color="#FF0000"
                transparent
                opacity={0.5}
                sizeAttenuation
            />
        </points>
    );
};

const Grid = () => {
    return (
        <gridHelper 
            args={[100, 50, "#ffffff44", "#ffffff11"]} 
            position={[0, -10, 0]} 
            rotation={[0, 0, 0]} 
        />
    );
};

const CyberBackground = () => {
    return (
        <div id="canvas-container">
            <Canvas camera={{ position: [0, 5, 20], fov: 75 }}>
                <color attach="background" args={['#000000']} />
                <ambientLight intensity={0.5} />
                <ParticleField />
                <Grid />
            </Canvas>
            <div className="absolute inset-0 bg-transparent pointer-events-none border-x border-white/10 mx-auto max-w-7xl" />
            <div className="fixed top-0 left-0 w-full h-[1px] bg-red-600/50 animate-scan-line z-50" />
        </div>
    );
};

export default CyberBackground;
