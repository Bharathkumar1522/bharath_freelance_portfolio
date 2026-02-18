"use client";

import { useEffect, useRef, useState } from "react";
import Matter from "matter-js";

interface GravityZoneProps {
    items: string[];
    className?: string;
}

export default function GravityZone({ items, className = "" }: GravityZoneProps) {
    const sceneRef = useRef<HTMLDivElement>(null);
    const engineRef = useRef<Matter.Engine | null>(null);
    const renderRef = useRef<Matter.Render | null>(null);
    const runnerRef = useRef<Matter.Runner | null>(null);

    useEffect(() => {
        if (!sceneRef.current) return;

        // Module aliases
        const Engine = Matter.Engine,
            Render = Matter.Render,
            Runner = Matter.Runner,
            Bodies = Matter.Bodies,
            Composite = Matter.Composite,
            Mouse = Matter.Mouse,
            MouseConstraint = Matter.MouseConstraint,
            Events = Matter.Events;

        // Create engine
        const engine = Engine.create();
        engineRef.current = engine;

        // Create renderer
        const width = sceneRef.current.clientWidth;
        const height = sceneRef.current.clientHeight;

        const render = Render.create({
            element: sceneRef.current,
            engine: engine,
            options: {
                width,
                height,
                background: "transparent",
                wireframes: false,
                pixelRatio: window.devicePixelRatio,
            },
        });
        renderRef.current = render;

        // Create bodies (skills)
        const pillBodies = items.map((item) => {
            const x = Math.random() * width;
            const y = -Math.random() * 500 - 50; // Start above screen

            // Approximate width based on char count
            const pillWidth = item.length * 10 + 40;
            const pillHeight = 40;

            const body = Bodies.rectangle(x, y, pillWidth, pillHeight, {
                restitution: 0.8,
                friction: 0.005,
                render: {
                    fillStyle: ["#FF6B35", "#F7B801", "#EA580C", "#D97706", "#F97316"][Math.floor(Math.random() * 5)], // Cosmic: Orange, Amber, Red-Orange, Burnt Orange, Bright Orange
                    strokeStyle: "#ffffff",
                    lineWidth: 1,
                },
                chamfer: { radius: 20 }, // Rounded corners
                label: item // Store text in label
            });
            return body;
        });

        // Create walls
        const wallOptions = {
            isStatic: true,
            render: { visible: false }
        };
        const ground = Bodies.rectangle(width / 2, height + 25, width, 50, wallOptions);
        const leftWall = Bodies.rectangle(-25, height / 2, 50, height * 2, wallOptions);
        const rightWall = Bodies.rectangle(width + 25, height / 2, 50, height * 2, wallOptions);

        Composite.add(engine.world, [...pillBodies, ground, leftWall, rightWall]);

        // Add mouse control
        const mouse = Mouse.create(render.canvas);
        const mouseConstraint = MouseConstraint.create(engine, {
            mouse: mouse,
            constraint: {
                stiffness: 0.2,
                render: {
                    visible: false,
                },
            },
        });
        Composite.add(engine.world, mouseConstraint);

        // Keep the mouse in sync with rendering
        render.mouse = mouse;

        // Run the engine
        Render.run(render);
        const runner = Runner.create();
        runnerRef.current = runner;
        Runner.run(runner, engine);

        // Custom rendering for text
        Events.on(render, "afterRender", () => {
            const context = render.context;
            context.font = "bold 16px 'Space Grotesk', sans-serif";
            context.fillStyle = "#ffffff";
            context.textAlign = "center";
            context.textBaseline = "middle";
            context.shadowColor = "rgba(0,0,0,0.5)";
            context.shadowBlur = 4;

            pillBodies.forEach((body) => {
                const { x, y } = body.position;
                const angle = body.angle;

                context.save();
                context.translate(x, y);
                context.rotate(angle);
                context.fillText(body.label, 0, 0);
                context.restore();
            });
        });

        // Cleanup
        return () => {
            Render.stop(render);
            Runner.stop(runner);
            if (render.canvas) {
                render.canvas.remove();
            }
            Composite.clear(engine.world, false);
            Engine.clear(engine);
        };
    }, [items]);

    return (
        <div
            ref={sceneRef}
            className={`w-full h-full overflow-hidden cursor-grab active:cursor-grabbing ${className}`}
        />
    );
}
