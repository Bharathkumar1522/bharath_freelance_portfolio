"use client";

import { useMemo, useRef, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Html, Text, Float, Stars, Trail, Sparkles } from "@react-three/drei";
import * as THREE from "three";
import { useSpring, animated } from "@react-spring/three";
import { Hand } from "lucide-react";

// --- Types ---
interface SkillNode {
    name: string;
    level: number;
}

interface OrbitCategory {
    id: string;
    label: string;
    icon: any; // Lucide icon component
    skills: SkillNode[];
    color: string;
    radius: number;
    speed: number;
}

interface ThreeOrbitalSystemProps {
    categories: OrbitCategory[];
    isVisible?: boolean;
}

// --- Components ---

function CentralStar() {
    return (
        <group>
            {/* The Sun Core */}
            <mesh>
                <sphereGeometry args={[1.6, 48, 48]} />
                <meshStandardMaterial
                    color="#FF6B35"
                    emissive="#FF4500"
                    emissiveIntensity={1.5}
                    toneMapped={false}
                />
            </mesh>
            {/* Inner Glow */}
            <mesh scale={[1.1, 1.1, 1.1]}>
                <sphereGeometry args={[1.6, 32, 32]} />
                <meshBasicMaterial color="#FF8A4C" transparent opacity={0.3} side={THREE.BackSide} />
            </mesh>
            {/* Outer Corona Glow */}
            <pointLight intensity={8} distance={25} color="#FF6B35" decay={2.2} />
            <Sparkles count={40} scale={5} size={6} speed={0.4} opacity={0.6} color="#FFD700" />

            <Html center position={[0, 0, 0]} style={{ pointerEvents: 'none' }}>
                <div className="flex items-center justify-center w-full h-full relative">
                    <span className="text-white font-heading font-black text-2xl tracking-[0.2em] blur-[2px] absolute opacity-40 select-none">ME</span>
                    <span className="text-white font-heading font-black text-2xl tracking-[0.2em] drop-shadow-[0_0_10px_rgba(255,107,53,0.8)] select-none">ME</span>
                </div>
            </Html>
        </group>
    );
}

function Planet({ category, isActive, onClick, onHover, index, isVisible }: {
    category: OrbitCategory;
    isActive: boolean;
    onClick: (e: any) => void;
    onHover: (hover: boolean) => void;
    index: number;
    isVisible: boolean;
}) {
    const meshRef = useRef<THREE.Group>(null);
    const speed = 0.15 / category.speed;
    const [angle, setAngle] = useState(Math.random() * Math.PI * 2);

    useFrame((state, delta) => {
        if (!isActive) {
            setAngle((prev) => prev + speed * delta);
        }
        if (meshRef.current) {
            const x = Math.cos(angle) * category.radius * 0.035;
            const z = Math.sin(angle) * category.radius * 0.035;
            meshRef.current.position.set(x, 0, z);
            meshRef.current.rotation.y -= delta * 0.5;
        }
    });

    const { scale } = useSpring({
        scale: isActive ? 1.4 : (isVisible ? 1 : 0),
        config: { mass: 1, tension: 180, friction: 12 },
        delay: isVisible ? index * 200 + 500 : 0
    });

    return (
        <group>
            {/* Orbit Ring */}
            <animated.mesh rotation={[-Math.PI / 2, 0, 0]} scale={scale}>
                <ringGeometry args={[(category.radius * 0.035) - 0.03, (category.radius * 0.035) + 0.03, 128]} />
                <meshBasicMaterial color="#FFFFFF" transparent opacity={0.2} side={THREE.DoubleSide} blending={THREE.AdditiveBlending} />
            </animated.mesh>

            {/* Planet Container */}
            <animated.group
                ref={meshRef}
                onClick={(e: any) => { e.stopPropagation(); onClick(e); }}
                onPointerOver={() => { document.body.style.cursor = 'pointer'; onHover(true); }}
                onPointerOut={() => { document.body.style.cursor = 'auto'; onHover(false); }}
                scale={scale}
            >
                {/* 1. Glass Sphere (Outer Shell) */}
                <mesh castShadow receiveShadow>
                    <sphereGeometry args={[0.7, 24, 24]} />
                    <meshPhysicalMaterial
                        color={category.color}
                        transparent
                        transmission={0.4} // Glass-like
                        opacity={0.5}
                        roughness={0.2}
                        metalness={0.1}
                        clearcoat={1}
                        clearcoatRoughness={0.1}
                        emissive={category.color}
                        emissiveIntensity={0.2}
                    />
                </mesh>

                {/* 2. Inner Icon - "Trapped" inside */}
                <Html center transform={false} distanceFactor={10} style={{ pointerEvents: 'none' }}>
                    <div className={`transition-all duration-300 ${isActive ? 'scale-125 opacity-100' : 'opacity-80'}`}>
                        <category.icon className="w-6 h-6 text-white drop-shadow-[0_0_5px_rgba(255,255,255,0.8)]" strokeWidth={2.5} />
                    </div>
                </Html>

                {/* 3. Tech Label (Scanning Effect) - Below */}
                <Html position={[0, -1.2, 0]} center style={{ pointerEvents: 'none' }}>
                    <div className="flex flex-col items-center">
                        <div className={`
                            px-4 py-1.5 rounded-sm border-l-2 border-r-2 
                            bg-black/60 backdrop-blur-md 
                            transition-all duration-300
                        `}
                            style={{
                                borderColor: category.color,
                                boxShadow: isActive ? `0 0 15px ${category.color}20` : 'none'
                            }}>
                            <span className="text-[10px] font-heading font-bold uppercase tracking-[0.2em] text-white whitespace-nowrap">
                                {category.label}
                            </span>
                        </div>
                        {/* Scanning Line */}
                        {isActive && (
                            <div className="w-[1px] h-8 bg-gradient-to-b from-transparent via-white to-transparent absolute bottom-full left-1/2 -translate-x-1/2 animate-pulse" />
                        )}
                    </div>
                </Html>

            </animated.group>
        </group>
    );
}

function Scene({ categories, activeId, setActiveId, setHoveredId, isVisible }: {
    categories: OrbitCategory[];
    activeId: string | null;
    setActiveId: (id: string | null) => void;
    setHoveredId: (id: string | null) => void;
    isVisible: boolean;
}) {
    // Parallax logic
    const starsRef = useRef<THREE.Group>(null);
    useFrame((state) => {
        if (starsRef.current) {
            const mouseX = state.mouse.x * 0.05;
            const mouseY = state.mouse.y * 0.05;
            starsRef.current.rotation.x = mouseY;
            starsRef.current.rotation.y = mouseX;
        }
    });

    // Central Star Animation
    const { scale: sunScale } = useSpring({
        scale: isVisible ? 1 : 0,
        config: { mass: 1, tension: 280, friction: 18 },
        delay: 0
    });

    return (
        <>
            <ambientLight intensity={0.2} />
            <pointLight position={[10, 10, 10]} intensity={1.5} color="#ffffff" />
            <pointLight position={[-10, -10, -5]} intensity={0.5} color="#4c8aff" />

            <group ref={starsRef}>
                <Stars radius={100} depth={50} count={8000} factor={6} saturation={0} fade speed={1} />
            </group>

            {/* Shift Scene Position - Adjusted to prevent bottom clipping */}
            <group position={[0, -0.5, 0]}>
                <animated.group scale={sunScale}>
                    <CentralStar />
                </animated.group>

                {categories.map((cat, idx) => (
                    <Planet
                        key={cat.id}
                        category={cat}
                        isActive={activeId === cat.id}
                        onClick={() => setActiveId(activeId === cat.id ? null : cat.id)}
                        onHover={(hover) => setHoveredId(hover ? cat.id : null)}
                        index={idx}
                        isVisible={isVisible}
                    />
                ))}
            </group>

            <OrbitControls
                enablePan={false}
                enableZoom={false}
                minPolarAngle={Math.PI / 3}
                maxPolarAngle={Math.PI / 2.2}
                autoRotate={!activeId}
                autoRotateSpeed={0.8}
            />
        </>
    );
}

// --- Helper Components ---

function ResponsiveCamera() {
    const { camera } = useThree();

    useEffect(() => {
        const handleResize = () => {
            const perspectiveCamera = camera as THREE.PerspectiveCamera;
            if (window.innerWidth < 768) {
                perspectiveCamera.position.set(0, 20, 40); // Mobile: Further out and higher
                perspectiveCamera.fov = 45;
            } else {
                perspectiveCamera.position.set(0, 6, 20); // Desktop: Default
                perspectiveCamera.fov = 40;
            }
            perspectiveCamera.updateProjectionMatrix();
        };

        handleResize(); // Init
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [camera]);

    return null;
}

// --- Main Component ---

export default function ThreeOrbitalSystem({ categories, isVisible = true }: ThreeOrbitalSystemProps) {
    const [activeCategory, setActiveCategory] = useState<string | null>(categories[0].id);
    const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
    const [hasInteracted, setHasInteracted] = useState(false);

    // Find active data to display in overlay
    const activeData = categories.find(c => c.id === activeCategory);

    return (
        <div
            className="relative w-full h-full flex items-center justify-center"
            onPointerDown={() => setHasInteracted(true)}
            onTouchStart={() => setHasInteracted(true)}
        >

            <Canvas className="z-10" dpr={[1, 1.5]} gl={{ antialias: true, powerPreference: "high-performance" }}>
                <ResponsiveCamera />
                <Scene
                    categories={categories}
                    activeId={activeCategory}
                    setActiveId={setActiveCategory}
                    setHoveredId={setHoveredCategory}
                    isVisible={isVisible}
                />
            </Canvas>

            {/* Drag to Explore Cue - Fades out on first interaction */}
            {!hasInteracted && isVisible && (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-30 flex flex-col items-center justify-center opacity-70 animate-pulse">
                    <Hand className="w-10 h-10 text-white/60 mb-3 animate-bounce" />
                    <p className="text-white/60 font-mono text-[10px] uppercase tracking-[0.2em]">Drag to Rotate</p>
                </div>
            )}

            {/* Desktop Sidebar (unchanged) */}
            {activeData && (
                <div className="hidden md:block absolute right-4 top-1/2 -translate-y-1/2 w-80 p-6 rounded-xl border z-20 backdrop-blur-xl pointer-events-none md:pointer-events-auto"
                    style={{
                        borderColor: activeData.color,
                        background: `linear-gradient(135deg, rgba(0,0,0,0.9), ${activeData.color}15)`,
                        boxShadow: `0 0 50px -20px ${activeData.color}40`
                    }}
                >
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-white/5 border border-white/10">
                                <activeData.icon className="w-6 h-6" style={{ color: activeData.color }} />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold font-heading text-white uppercase tracking-wider glow-text">{activeData.label}</h3>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        {activeData.skills.map((skill, idx) => (
                            <div key={idx} className="space-y-1">
                                <div className="flex justify-between items-center text-xs uppercase tracking-widest text-zinc-400">
                                    <span>{skill.name}</span>
                                    <span>{skill.level}%</span>
                                </div>
                                <div className="w-full h-1 bg-zinc-800 rounded-full overflow-hidden">
                                    <div
                                        className="h-full rounded-full shadow-[0_0_10px_currentColor] transition-all duration-1000"
                                        style={{ width: `${skill.level}%`, backgroundColor: activeData.color }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Mobile Bottom Sheet */}
            {activeData && (
                <div className="md:hidden absolute bottom-0 left-0 right-0 p-6 z-20 rounded-t-3xl backdrop-blur-xl border-t border-white/10"
                    style={{
                        background: `linear-gradient(to top, rgba(0,0,0,0.95), ${activeData.color}10)`,
                        borderColor: activeData.color + '40'
                    }}
                >
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 rounded-lg bg-white/5 border border-white/10">
                            <activeData.icon className="w-5 h-5" style={{ color: activeData.color }} />
                        </div>
                        <h3 className="text-xl font-bold font-heading text-white uppercase tracking-wider">{activeData.label}</h3>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        {activeData.skills.map((skill, idx) => (
                            <div key={idx} className="bg-white/5 rounded-lg p-2 border border-white/5">
                                <div className="flex justify-between items-center text-[10px] uppercase tracking-wider text-zinc-400 mb-1">
                                    <span>{skill.name}</span>
                                </div>
                                <div className="w-full h-1 bg-zinc-800 rounded-full overflow-hidden">
                                    <div
                                        className="h-full rounded-full"
                                        style={{ width: `${skill.level}%`, backgroundColor: activeData.color }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
