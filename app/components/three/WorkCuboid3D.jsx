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
 * Colour follows the site rule, but arrives with scroll rather than only on
 * hover: the cube is cold white as the section opens and warms toward the
 * accent as you travel down the timeline. Hovering pushes it the rest of the
 * way immediately.
 */

const INK = new THREE.Color('#111111')
// Exactly the page accent, so the cube matches the company names beside it.
// The lights below deliberately sum to roughly 1.0: any brighter and the lit
// faces multiply past the base colour, which desaturates red into dusty pink.
const RED = new THREE.Color('#b2311c')
const FACE = new THREE.Color('#f7f7f7')

// Scratch colour, reused each frame so the loop allocates nothing.
const TARGET = new THREE.Color()

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
      // Warm up across the section, and jump the rest of the way on hover.
      const warmth = hovered && !reduced ? 1 : THREE.MathUtils.clamp(p / 0.1, 0, 1)
      const rate = 1 - Math.pow(0.004, d)

      // Drive the base colour, not just the emissive: emissive alone over a
      // white face only ever tints it pink, so the cube has to actually
      // become red for the accent to read.
      TARGET.copy(FACE).lerp(RED, warmth)
      material.current.color.lerp(TARGET, rate)

      TARGET.copy(INK).lerp(RED, warmth)
      material.current.emissive.lerp(TARGET, rate)
      material.current.emissiveIntensity = 0.04 + warmth * 0.1
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
          color="#f7f7f7"
          roughness={0.7}
          metalness={0}
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
        // `flat` = NoToneMapping. R3F defaults to ACES filmic, which rolls off
        // and desaturates saturated colours - it was turning the accent into a
        // dusty brick however the lights were set. Without it the surface
        // renders the token colour it is actually given.
        flat
        dpr={[1, 2]}
        gl={{ alpha: true, antialias: true }}
        camera={{ position: [1.9, 1.3, 2.9], fov: 32 }}
      >
        <ambientLight intensity={0.78} />
        <directionalLight position={[2.5, 3.5, 2.5]} intensity={0.5} />
        <directionalLight position={[-2.5, -1, 1.5]} intensity={0.12} />
        <Cube progress={progress} count={count} reduced={reduced} />
      </Canvas>
    </div>
  )
}

export default WorkCuboid3D
