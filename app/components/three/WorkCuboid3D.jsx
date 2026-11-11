"use client"
import React, { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { RoundedBox, Text } from '@react-three/drei'
import * as THREE from 'three'

/**
 * The work section's scroll-linked marker.
 *
 * This used to be one <Canvas> per row, each spinning on its own timer - five
 * WebGL contexts doing work nobody asked for. It is now a single sticky cube
 * for the whole section: it rolls exactly one quarter-turn per role as you
 * scroll, so its position is a readout of where you are in the timeline rather
 * than decoration.
 *
 * Colour follows the site rule: the cube is white and only takes on the accent
 * while it is being hovered.
 */

const INK = new THREE.Color('#111111')
const ACCENT = new THREE.Color('#b2311c')
const FACE = '#f7f7f7'

const QUARTER = Math.PI / 2

const Cube = ({ progress, count, reduced }) => {
  const group = useRef(null)
  const material = useRef(null)
  const [hovered, setHovered] = useState(false)
  const [active, setActive] = useState(0)

  useFrame((state, delta) => {
    const d = Math.min(delta, 1 / 30)
    const p = progress ? progress.get() : 0

    // Which role is currently under the reader.
    const index = Math.max(0, Math.min(count - 1, Math.floor(p * count)))
    if (index !== active) setActive(index)

    if (group.current) {
      // One quarter-turn per role. Damped, so a fast scroll still reads as a roll.
      const targetX = index * QUARTER
      group.current.rotation.x = THREE.MathUtils.damp(group.current.rotation.x, targetX, 6, d)

      // A little life from the pointer, and a lift on hover.
      const py = reduced ? 0 : state.pointer.y * 0.12
      const px = reduced ? 0 : state.pointer.x * 0.5
      group.current.rotation.y = THREE.MathUtils.damp(group.current.rotation.y, px - 0.5, 4, d)
      group.current.rotation.z = THREE.MathUtils.damp(group.current.rotation.z, py, 4, d)

      const s = hovered ? 1.12 : 1
      const next = THREE.MathUtils.damp(group.current.scale.x, s, 9, d)
      group.current.scale.setScalar(next)
    }

    if (material.current) {
      material.current.emissive.lerp(hovered && !reduced ? ACCENT : INK, 1 - Math.pow(0.004, d))
    }
  })

  // The same number on all four side faces: whichever rolls into view is correct.
  const faces = [
    { position: [0, 0, 0.81], rotation: [0, 0, 0] },
    { position: [0, 0.81, 0], rotation: [-QUARTER, 0, 0] },
    { position: [0, 0, -0.81], rotation: [Math.PI, 0, 0] },
    { position: [0, -0.81, 0], rotation: [QUARTER, 0, 0] },
  ]

  return (
    <group
      ref={group}
      onPointerOver={(e) => {
        e.stopPropagation()
        setHovered(true)
      }}
      onPointerOut={() => setHovered(false)}
    >
      <RoundedBox args={[1.6, 1.6, 1.6]} radius={0.1} smoothness={4}>
        <meshStandardMaterial
          ref={material}
          color={FACE}
          roughness={0.5}
          metalness={0.05}
          emissive={INK}
          emissiveIntensity={0.5}
        />
      </RoundedBox>

      {faces.map((f, i) => (
        <Text
          key={i}
          position={f.position}
          rotation={f.rotation}
          fontSize={0.66}
          color="#111111"
          anchorX="center"
          anchorY="middle"
          letterSpacing={0.02}
        >
          {String(active + 1).padStart(2, '0')}
        </Text>
      ))}
    </group>
  )
}

const WorkCuboid3D = ({ progress, count = 1, reduced = false, size = 92 }) => {
  return (
    <div style={{ width: size, height: size }} className="shrink-0" aria-hidden="true">
      <Canvas
        dpr={[1, 2]}
        gl={{ alpha: true, antialias: true }}
        camera={{ position: [1.9, 1.3, 2.9], fov: 32 }}
      >
        <ambientLight intensity={0.65} />
        <directionalLight position={[2.5, 3.5, 2.5]} intensity={2.1} />
        <directionalLight position={[-2.5, -1, 1.5]} intensity={0.5} />
        <Cube progress={progress} count={count} reduced={reduced} />
      </Canvas>
    </div>
  )
}

export default WorkCuboid3D
