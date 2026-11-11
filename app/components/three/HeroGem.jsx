"use client"
import React, { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { ContactShadows } from '@react-three/drei'

const INK = "#121212"
const ACCENT = "#9d3d4f"

const Gem = () => {
  const ref = useRef(null)
  const [hovered, setHovered] = useState(false)

  useFrame((state, delta) => {
    if (!ref.current) return
    ref.current.rotation.y += delta * (hovered ? 0.7 : 0.24)
    ref.current.rotation.x += delta * 0.09
    const targetScale = hovered ? 1.1 : 1
    ref.current.scale.x += (targetScale - ref.current.scale.x) * 0.1
    ref.current.scale.y += (targetScale - ref.current.scale.y) * 0.1
    ref.current.scale.z += (targetScale - ref.current.scale.z) * 0.1
  })

  return (
    <mesh
      ref={ref}
      castShadow
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <icosahedronGeometry args={[1, 0]} />
      <meshStandardMaterial
        color={INK}
        roughness={0.35}
        metalness={0.2}
        flatShading
        emissive={ACCENT}
        emissiveIntensity={0.1}
      />
    </mesh>
  )
}

const HeroGem = ({ size = 150 }) => {
  return (
    <div style={{ width: size, height: size }}>
      <Canvas
        shadows
        dpr={[1, 2]}
        gl={{ alpha: true, antialias: true }}
        camera={{ position: [2.1, 1.7, 2.8], fov: 34 }}
      >
        <ambientLight intensity={0.75} />
        <directionalLight position={[3, 4, 2]} intensity={1.25} castShadow shadow-mapSize={[512, 512]} />
        <pointLight position={[-2, -1, 1]} intensity={0.4} color={ACCENT} />
        <Gem />
        <ContactShadows position={[0, -1.08, 0]} opacity={0.32} scale={3.6} blur={2.2} far={2} color={INK} />
      </Canvas>
    </div>
  )
}

export default HeroGem
