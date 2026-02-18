"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Physics, usePlane, useSphere } from "@react-three/cannon";
import { EffectComposer, SSAO, Bloom } from "@react-three/postprocessing";
import { useRef, useState, useMemo, useEffect } from "react";
import * as THREE from "three";

// Colors for the balls (Cyberpunk/Neon palette)
const colors = ["#00ffff", "#ff00ff", "#ea00d9", "#0abdc6", "#711c91", "#133e7c", "#091833"];

function InstancedSpheres({ count = 200 }) {
    const { viewport } = useThree();
    const [ref, api] = useSphere((index) => ({
        mass: 1,
        position: [Math.random() - 0.5, Math.random() - 0.5, index * 0.1], // Distribute them
        args: [0.1], // Radius
        friction: 0.1,
        restitution: 0.7, // Bounciness
    }));

    const colorArray = useMemo(() => {
        const array = new Float32Array(count * 3);
        const color = new THREE.Color();
        for (let i = 0; i < count; i++) {
            color.set(colors[Math.floor(Math.random() * colors.length)]).toArray(array, i * 3);
        }
        return array;
    }, [count]);

    return (
        <instancedMesh ref={ref} args={[undefined, undefined, count]} count={count} castShadow receiveShadow>
            <sphereGeometry args={[0.1, 32, 32]}>
                <instancedBufferAttribute attach="attributes-color" args={[colorArray, 3]} />
            </sphereGeometry>
            <meshStandardMaterial vertexColors roughness={0.1} metalness={0.5} />
        </instancedMesh>
    );
}

function Pointer() {
    const { viewport, mouse } = useThree();
    const [ref, api] = useSphere(() => ({ type: "Kinematic", args: [0.5], position: [0, 0, 0] }));

    useFrame((state) => {
        // Convert normalized mouse coordinates (-1 to 1) to world coordinates based on viewport
        // x: -1 to 1 -> -viewport.width/2 to viewport.width/2
        const x = (state.mouse.x * viewport.width) / 2;
        const y = (state.mouse.y * viewport.height) / 2;
        api.position.set(x, y, 0);
    });

    return (
        <mesh ref={ref} visible={false}>
            <sphereGeometry args={[0.5, 32, 32]} />
            <meshBasicMaterial color="red" />
        </mesh>
    );
}
// Visible walls for debugging
function Borders() {
    const { viewport } = useThree();
    return (
        <>
            <Plane position={[0, -viewport.height / 2, 0]} rotation={[-Math.PI / 2, 0, 0]} />
            <Plane position={[-viewport.width / 2, 0, 0]} rotation={[0, Math.PI / 2, 0]} />
            <Plane position={[viewport.width / 2, 0, 0]} rotation={[0, -Math.PI / 2, 0]} />
            <Plane position={[0, viewport.height / 2, 0]} rotation={[Math.PI / 2, 0, 0]} />
            <Plane position={[0, 0, 0]} rotation={[0, 0, 0]} visible={false} />
        </>
    );
}

function Plane(props: any) {
    const [ref] = usePlane(() => ({ type: "Static", ...props }));
    return (
        <mesh ref={ref} receiveShadow visible={false}>
            <planeGeometry args={[100, 100]} />
            <meshStandardMaterial color="white" />
        </mesh>
    );
}

function Mouse() {
    const { viewport } = useThree()
    const [, api] = useSphere(() => ({ type: "Kinematic", args: [1] }))
    useFrame((state) => api.position.set((state.mouse.x * viewport.width) / 2, (state.mouse.y * viewport.height) / 2, 0))
    return null
}

export default function Ballpit() {
    return (
        <div className="absolute inset-0 z-0 h-screen w-full">
            <Canvas
                shadows
                dpr={[1, 2]}
                gl={{ alpha: true, antialias: false, stencil: false, depth: false }}
                camera={{ position: [0, 0, 5], fov: 50, near: 0.1, far: 20 }}
                frameloop="demand" // Performance Optimization: Render only on interaction
                onPointerOver={(e) => {
                    // Force a re-render loop when mouse is over the canvas to ensure smooth physics
                    // Actually for physics we usually need continuous loop or smart invalidation. 
                    // Let's try continuous for now if physics jitters with demand.
                }}
            >
                <ambientLight intensity={0.5} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
                <pointLight position={[-10, -10, -10]} intensity={0.5} />

                <Physics gravity={[0, -2, 0]} allowSleep={false}>
                    <Mouse />
                    <Borders />
                    <InstancedSpheres count={100} />
                </Physics>
            </Canvas>
        </div>
    );
}
