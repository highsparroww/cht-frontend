"use client";
import React, { useRef, useEffect } from "react";
import { motion } from "motion/react";
import { cn } from "../../lib/utils";
import { createNoise3D } from "simplex-noise";

interface VortexProps {
  children?: React.ReactNode;
  className?: string;
  containerClassName?: string;
  particleCount?: number;
  rangeY?: number;
  baseHue?: number;
  baseSpeed?: number;
  rangeSpeed?: number;
  baseRadius?: number;
  rangeRadius?: number;
  backgroundColor?: string;
}

export const Vortex = ({
  children,
  className,
  containerClassName,
  particleCount = 700,
  rangeY = 100,
  baseHue = 220,
  baseSpeed = 0.5,
  rangeSpeed = 1.5,
  baseRadius = 1,
  rangeRadius = 2,
  backgroundColor = "#000000",
}: VortexProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
const animationFrameId = useRef<number | null>(null);

  const noise3D = createNoise3D();
  const tickRef = useRef(0);

  const particlePropCount = 9;
  const particlePropsLength = particleCount * particlePropCount;
  const particleProps = useRef(new Float32Array(particlePropsLength));
  const center = useRef<[number, number]>([0, 0]);

  const rand = (n: number) => n * Math.random();
  const randRange = (n: number) => n - rand(2 * n);
  const lerp = (n1: number, n2: number, t: number) => (1 - t) * n1 + t * n2;
  const fadeInOut = (t: number, m: number) => {
    const hm = 0.5 * m;
    return Math.abs(((t + hm) % m) - hm) / hm;
  };

  const setupParticles = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    tickRef.current = 0;
    for (let i = 0; i < particlePropsLength; i += particlePropCount) {
      const x = rand(canvas.width);
      const y = center.current[1] + randRange(rangeY);
      const vx = 0;
      const vy = 0;
      const life = 0;
      const ttl = 50 + rand(150);
      const speed = baseSpeed + rand(rangeSpeed);
      const radius = baseRadius + rand(rangeRadius);
      const hue = baseHue + rand(100);

      particleProps.current.set([x, y, vx, vy, life, ttl, speed, radius, hue], i);
    }
  };

  const resizeCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    center.current = [canvas.width / 2, canvas.height / 2];
  };

  const drawParticle = (
    ctx: CanvasRenderingContext2D,
    i: number
  ) => {
    const TAU = 2 * Math.PI;
    const x = particleProps.current[i];
    const y = particleProps.current[i + 1];
    const vx = particleProps.current[i + 2];
    const vy = particleProps.current[i + 3];
    let life = particleProps.current[i + 4];
    const ttl = particleProps.current[i + 5];
    const speed = particleProps.current[i + 6];
    const radius = particleProps.current[i + 7];
    const hue = particleProps.current[i + 8];

    const n = noise3D(x * 0.00125, y * 0.00125, tickRef.current * 0.0005) * 3 * TAU;
    const newVx = lerp(vx, Math.cos(n), 0.5);
    const newVy = lerp(vy, Math.sin(n), 0.5);
    const x2 = x + newVx * speed;
    const y2 = y + newVy * speed;

    ctx.save();
    ctx.lineCap = "round";
    ctx.lineWidth = radius;
    ctx.strokeStyle = `hsla(${hue},100%,60%,${fadeInOut(life, ttl)})`;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    ctx.closePath();
    ctx.restore();

    // update particle
    particleProps.current[i] = x2;
    particleProps.current[i + 1] = y2;
    particleProps.current[i + 2] = newVx;
    particleProps.current[i + 3] = newVy;
    particleProps.current[i + 4] = life + 1;

    // reset if out of bounds or life > ttl
    if (
      x2 < 0 ||
      y2 < 0 ||
      x2 > (canvasRef.current?.width ?? 0) ||
      y2 > (canvasRef.current?.height ?? 0) ||
      life > ttl
    ) {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const newX = rand(canvas.width);
      const newY = center.current[1] + randRange(rangeY);
      particleProps.current.set([newX, newY, 0, 0, 0, ttl, speed, radius, hue], i);
    }
  };

  const draw = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    tickRef.current++;

    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < particlePropsLength; i += particlePropCount) {
      drawParticle(ctx, i);
    }

    animationFrameId.current = requestAnimationFrame(draw);
  };

  useEffect(() => {
    resizeCanvas();
    setupParticles();
    draw();
    window.addEventListener("resize", resizeCanvas);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
    };
  }, []);

  return (
    <div className={cn("relative w-full h-full", containerClassName)}>
      <motion.div
        className="absolute inset-0 w-full h-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <canvas ref={canvasRef} />
      </motion.div>
      <div className={cn("relative z-10", className)}>{children}</div>
    </div>
  );
};
