"use client"
import React, { useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Center, ContactShadows, Text3D } from '@react-three/drei'
import * as THREE from 'three'

/**
 * The hero's signature piece: the name as real extruded geometry.
 *
 * The typeface is baked from Big Shoulders Display by scripts/ttf-to-typeface.mjs
 * (three no longer ships any typeface.json, and the upstream font is variable),
 * so this is the site's actual display face in 3D rather than a stand-in.
 *
 * Nothing here is on a timer. Orientation comes from the pointer and from the
 * hero's own scroll progress, and the only colour in the scene arrives when the
 * type is hovered - the hero's instance of the site-wide "colour is earned" rule.
 */

const FONT = '/fonts/big-shoulders-800.typeface.json'
const LINES = ['NISHEVITHA', 'VENKATESH']
const ACCENT = new THREE.Color('#9d3d4f')
const BLACK = new THREE.Color('#000000')

const GEOM = {
  size: 1,
  height: 0.24,
  curveSegments: 5,
  bevelEnabled: true,
  bevelThickness: 0.015,
  bevelSize: 0.012,
  bevelOffset: 0,
  bevelSegments: 2,
}

const Wordmark = ({ scrollProgress, reduced }) => {
  const fitGroup = useRef(null)
  const tiltGroup = useRef(null)
  const materials = useRef([])
  const measured = useRef({ w: 0, h: 0 })
  const [hovered, setHovered] = useState(false)
  const { viewport } = useThree()

  useFrame((state, delta) => {
    const d = Math.min(delta, 1 / 30) // keep damping stable if a frame is dropped

    // ---- fit the wordmark to the viewport ---------------------------------
    // `measured` holds the bounding box in local units, reported by <Center>.
    // Scaling the parent keeps <Center>'s own measurement untouched.
    // Fit against BOTH axes and take the smaller scale, so the wordmark stays
    // inside a short landscape canvas as well as a narrow phone one.
    if (measured.current.w > 0 && fitGroup.current) {
      const fillW = viewport.width < 6 ? 0.9 : 0.74
      const fillH = 0.78
      const target = Math.min(
        (viewport.width * fillW) / measured.current.w,
        (viewport.height * fillH) / measured.current.h,
      )
      const next = THREE.MathUtils.damp(fitGroup.current.scale.x, target, 8, d)
      fitGroup.current.scale.setScalar(next)
    }

    // ---- orientation: pointer parallax + scroll ---------------------------
    const p = scrollProgress ? scrollProgress.get() : 0

    if (tiltGroup.current) {
      const px = reduced ? 0 : state.pointer.x
      const py = reduced ? 0 : state.pointer.y

      const targetY = px * 0.34
      const targetX = -py * 0.2 + p * 0.85
      const targetZ = reduced ? 0 : px * -0.03

      tiltGroup.current.rotation.y = THREE.MathUtils.damp(tiltGroup.current.rotation.y, targetY, 4, d)
      tiltGroup.current.rotation.x = THREE.MathUtils.damp(tiltGroup.current.rotation.x, targetX, 4, d)
      tiltGroup.current.rotation.z = THREE.MathUtils.damp(tiltGroup.current.rotation.z, targetZ, 4, d)

      // Sinks and recedes as the hero scrolls away.
      tiltGroup.current.position.y = THREE.MathUtils.damp(tiltGroup.current.position.y, -p * 1.1, 5, d)
      tiltGroup.current.position.z = THREE.MathUtils.damp(tiltGroup.current.position.z, -p * 2.4, 5, d)
    }

    // ---- colour, earned on hover ------------------------------------------
    const want = hovered && !reduced ? ACCENT : BLACK
    for (const m of materials.current) {
      if (m) m.emissive.lerp(want, 1 - Math.pow(0.001, d))
    }
  })

  return (
    <group ref={fitGroup}>
      <group ref={tiltGroup}>
        <Center
          cacheKey={LINES.join('|')}
          onCentered={({ width, height }) => {
            measured.current = { w: width, h: height }
          }}
        >
          {LINES.map((line, i) => (
            <Text3D
              key={line}
              font={FONT}
              position={[0, -i * 0.92, 0]}
              letterSpacing={-0.01}
              onPointerOver={(e) => {
                e.stopPropagation()
                setHovered(true)
              }}
              onPointerOut={() => setHovered(false)}
              {...GEOM}
            >
              {line}
              <meshStandardMaterial
                ref={(el) => (materials.current[i] = el)}
                color="#f7f7f7"
                roughness={0.34}
                metalness={0.08}
                emissive={BLACK}
                emissiveIntensity={0.85}
              />
            </Text3D>
          ))}
        </Center>
      </group>
    </group>
  )
}

const NameType3D = ({ scrollProgress, reduced = false }) => {
  return (
    <Canvas
      dpr={[1, 2]}
      gl={{ alpha: true, antialias: true }}
      camera={{ position: [0, 0, 6], fov: 32 }}
      // Decorative: the real <h1> lives in the DOM beside this canvas.
      aria-hidden="true"
    >
      <ambientLight intensity={0.5} />
      {/* One hard key light so the extrusion reads as flat white planes. */}
      <directionalLight position={[3.5, 5, 6]} intensity={2.6} />
      {/* Rim from behind-left to separate the type from the black ground. */}
      <directionalLight position={[-5, -1, -3]} intensity={0.9} />
      <pointLight position={[0, 0, 3]} intensity={0.35} />

      <Wordmark scrollProgress={scrollProgress} reduced={reduced} />

      <ContactShadows
        position={[0, -1.5, 0]}
        opacity={0.5}
        scale={14}
        blur={2.6}
        far={4}
        color="#000000"
      />
    </Canvas>
  )
}

export default NameType3D
