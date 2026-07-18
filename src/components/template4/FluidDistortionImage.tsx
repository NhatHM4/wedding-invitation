"use client";

import React, { useRef, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";

// Custom GLSL shaders for Liquid Distortion
const FluidShader = {
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    // Simplex 2D noise
    vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }

    float snoise(vec2 v) {
      const vec4 C = vec4(0.211324865405187, 0.366025403784439,
               -0.577350269189626, 0.024390243902439);
      vec2 i  = floor(v + dot(v, C.yy) );
      vec2 x0 = v -   i + dot(i, C.xx);
      vec2 i1;
      i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
      vec4 x12 = x0.xyxy + C.xxzz;
      x12.xy -= i1;
      i = mod(i, 289.0);
      vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
      + i.x + vec3(0.0, i1.x, 1.0 ));
      vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
        dot(x12.zw,x12.zw)), 0.0);
      m = m*m ;
      m = m*m ;
      vec3 x = 2.0 * fract(p * C.www) - 1.0;
      vec3 h = abs(x) - 0.5;
      vec3 a0 = x - floor(x + 0.5);
      vec3 g = a0 * vec3(x0.x, x12.x, x12.z) + h * vec3(x0.y, x12.y, x12.w);
      vec3 t = 12.0 * m * g;
      return dot(t, vec3(1.0));
    }

    uniform sampler2D uTexture;
    uniform vec2 uMouseVelocity;
    uniform float uTime;
    uniform float uDistortionProgress;
    varying vec2 vUv;

    void main() {
      vec2 uv = vUv;
      
      // Calculate liquid distortion based on noise, velocity vector, and progress
      float noiseVal = snoise(uv * 4.0 + vec2(uTime * 0.4));
      
      // Compute distortion displacement - warp coordinates along velocity vector
      vec2 distortion = uMouseVelocity * noiseVal * uDistortionProgress * 0.15;
      
      // Add subtle passive ripple animation for organic contemporary aesthetic
      distortion += vec2(
        snoise(uv * 5.0 + vec2(uTime * 0.12)),
        snoise(uv * 5.0 + vec2(uTime * 0.12 + 15.0))
      ) * 0.004 * (1.0 + uDistortionProgress * 3.0);
      
      // Clamp UV coordinates to avoid border repetition wrapping artifacts
      vec2 finalUv = clamp(uv + distortion, 0.0, 1.0);
      
      vec4 texColor = texture2D(uTexture, finalUv);
      
      // Vignette effect to reinforce premium gallery aesthetic
      float distFromCenter = distance(uv, vec2(0.5));
      texColor.rgb *= (1.0 - distFromCenter * 0.12);
      
      gl_FragColor = texColor;
    }
  `
};

interface ShaderMeshProps {
  src: string;
  pointerState: React.MutableRefObject<{
    x: number;
    y: number;
    vx: number;
    vy: number;
    progress: number;
    isDown: boolean;
  }>;
}

function ShaderMesh({ src, pointerState }: ShaderMeshProps) {
  const texture = useTexture(src);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const { viewport } = useThree();

  // Create uniforms ref to preserve values between frames
  const uniforms = useRef({
    uTexture: { value: texture },
    uMouseVelocity: { value: new THREE.Vector2(0, 0) },
    uTime: { value: 0 },
    uDistortionProgress: { value: 0 }
  });

  useFrame((state, delta) => {
    const { clock } = state;
    if (materialRef.current) {
      // Update running elapsed time
      materialRef.current.uniforms.uTime.value = clock.getElapsedTime();
      
      // Get frame delta time
      const dt = Math.min(delta, 0.1); // Clamp to prevent massive spikes
      
      const ps = pointerState.current;
      
      if (ps.isDown) {
        // Boost distortion progress exponentially
        ps.progress += (1.0 - ps.progress) * (1.0 - Math.exp(-8.0 * dt));
        
        // Target velocity vector interpolated smoothly
        const targetVx = ps.vx * 0.18;
        const targetVy = ps.vy * 0.18;
        
        materialRef.current.uniforms.uMouseVelocity.value.x += (targetVx - materialRef.current.uniforms.uMouseVelocity.value.x) * (1.0 - Math.exp(-7.0 * dt));
        materialRef.current.uniforms.uMouseVelocity.value.y += (targetVy - materialRef.current.uniforms.uMouseVelocity.value.y) * (1.0 - Math.exp(-7.0 * dt));
      } else {
        // Exponential decay loop when touch ceases: damping back to exactly 0.0
        // Damping coefficients: t = 1 - e^(-5 * dt)
        const decay = Math.exp(-5.0 * dt);
        ps.progress *= decay;
        materialRef.current.uniforms.uMouseVelocity.value.multiplyScalar(decay);
      }
      
      materialRef.current.uniforms.uDistortionProgress.value = ps.progress;
      
      // Damping the pointerState velocity itself
      const velocityDecay = Math.exp(-2.5 * dt);
      ps.vx *= velocityDecay;
      ps.vy *= velocityDecay;
    }
  });

  return (
    <mesh scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={FluidShader.vertexShader}
        fragmentShader={FluidShader.fragmentShader}
        uniforms={uniforms.current}
        transparent={true}
      />
    </mesh>
  );
}

interface FluidDistortionImageProps {
  src: string;
  alt: string;
  className?: string;
}

export default function FluidDistortionImage({ src, alt, className = "" }: FluidDistortionImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // High-performance pointer tracking metrics
  const pointerState = useRef({
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
    progress: 0,
    isDown: false
  });
  
  const lastTime = useRef(0);

  const handlePointerDown = (e: React.PointerEvent) => {
    pointerState.current.isDown = true;
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      pointerState.current.x = e.clientX - rect.left;
      pointerState.current.y = e.clientY - rect.top;
    }
    pointerState.current.vx = 0;
    pointerState.current.vy = 0;
    lastTime.current = performance.now();
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    
    const currX = e.clientX - rect.left;
    const currY = e.clientY - rect.top;
    const currTime = performance.now();
    const dt = (currTime - lastTime.current) / 1000; // time delta in seconds
    
    if (dt > 0.001) {
      // Calculate relative speed coordinates normalized to webgl -1 to 1 viewport
      const dx = (currX - pointerState.current.x) / rect.width;
      const dy = -(currY - pointerState.current.y) / rect.height; // Flip y-axis for WebGL
      
      pointerState.current.vx = dx / dt;
      pointerState.current.vy = dy / dt;
      
      // Speed threshold to protect texture wrapping
      const speed = Math.sqrt(pointerState.current.vx ** 2 + pointerState.current.vy ** 2);
      const maxSpeed = 8.0;
      if (speed > maxSpeed) {
        pointerState.current.vx = (pointerState.current.vx / speed) * maxSpeed;
        pointerState.current.vy = (pointerState.current.vy / speed) * maxSpeed;
      }
    }
    
    pointerState.current.x = currX;
    pointerState.current.y = currY;
    lastTime.current = currTime;
    
    if (!pointerState.current.isDown) {
      pointerState.current.isDown = true;
    }
  };

  const handlePointerUp = () => {
    pointerState.current.isDown = false;
  };

  return (
    <div 
      ref={containerRef}
      className={`relative overflow-hidden cursor-grab active:cursor-grabbing select-none touch-none will-change-transform ${className}`}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      style={{ backfaceVisibility: "hidden" }}
    >
      <Canvas
        camera={{ position: [0, 0, 1], fov: 75 }}
        gl={{ antialias: true, alpha: true }}
        style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none" }}
      >
        <Suspense fallback={null}>
          <ShaderMesh src={src} pointerState={pointerState} />
        </Suspense>
      </Canvas>
      {/* Fallback image for SEO, accessibility, and visual fallback */}
      <img 
        src={src} 
        alt={alt} 
        className="w-full h-full object-cover opacity-0 pointer-events-none" 
      />
    </div>
  );
}
