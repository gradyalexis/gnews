"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef, useCallback } from "react";
import * as THREE from "three";

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform float u_time;
  uniform vec2 u_resolution;
  varying vec2 vUv;

  // Pseudo-random
  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
  }

  // Simplex-like noise
  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
  }

  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    vec2 shift = vec2(100.0);
    mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.5));
    for (int i = 0; i < 6; i++) {
      v += a * noise(p);
      p = rot * p * 2.0 + shift;
      a *= 0.5;
    }
    return v;
  }

  void main() {
    vec2 uv = vUv;
    float t = u_time * 0.08;

    // Flow field
    vec2 q = vec2(0.0);
    q.x = fbm(uv + t * 0.3);
    q.y = fbm(uv + vec2(1.0));

    vec2 r = vec2(0.0);
    r.x = fbm(uv + 1.0 * q + vec2(1.7, 9.2) + 0.15 * t);
    r.y = fbm(uv + 1.0 * q + vec2(8.3, 2.8) + 0.126 * t);

    float f = fbm(uv + r);

    // Editorial palette: deep ink, crimson ember, warm gold, midnight blue
    vec3 ink = vec3(0.02, 0.02, 0.03);
    vec3 crimson = vec3(0.35, 0.08, 0.12);
    vec3 amber = vec3(0.65, 0.40, 0.12);
    vec3 gold = vec3(0.83, 0.65, 0.22);
    vec3 midnight = vec3(0.04, 0.03, 0.07);
    vec3 violet = vec3(0.10, 0.05, 0.15);

    vec3 col = ink;
    col = mix(col, midnight, clamp(f * f * 3.0, 0.0, 1.0));
    col = mix(col, violet, clamp(length(q), 0.0, 1.0));
    col = mix(col, crimson, clamp(length(r.x), 0.0, 1.0));

    // Aurora streaks
    float streak = fbm(vec2(uv.x * 3.0 + t, uv.y * 1.5 - t * 0.5));
    col = mix(col, amber, streak * 0.25);
    col = mix(col, gold, streak * streak * 0.15);

    // Vignette
    float vig = 1.0 - length(uv - 0.5) * 0.6;
    col *= 0.7 + vig * 0.3;

    // Subtle brightness in center-top
    float spotlight = 1.0 - length(uv - vec2(0.5, 0.3)) * 0.4;
    col += vec3(0.01, 0.005, 0.0) * max(spotlight, 0.0);

    gl_FragColor = vec4(col, 1.0);
  }
`;

function MeshGradient() {
  const meshRef = useRef<THREE.Mesh>(null);
  const { size } = useThree();

  const uniforms = useMemo(
    () => ({
      u_time: { value: 0 },
      u_resolution: { value: new THREE.Vector2(size.width, size.height) },
    }),
    [size.width, size.height]
  );

  useFrame((state) => {
    if (meshRef.current) {
      const material = meshRef.current.material as THREE.ShaderMaterial;
      material.uniforms.u_time.value = state.clock.elapsedTime;
    }
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        depthWrite={false}
        depthTest={false}
      />
    </mesh>
  );
}

export default function WebGLBackground() {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        orthographic
        camera={{ zoom: 1, position: [0, 0, 1] }}
        gl={{ antialias: false, alpha: false, depth: false }}
        dpr={[1, 1.5]}
        style={{ position: "absolute", inset: 0 }}
      >
        <MeshGradient />
      </Canvas>
    </div>
  );
}
