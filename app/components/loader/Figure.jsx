"use client"
import React, { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'

/**
 * A procedural low-poly figure that braces against the loading panel above it
 * and shoves it up out of frame.
 *
 * The rig is nested groups, each positioned at a joint, with the limb box
 * offset by half its length so the group's origin behaves as a pivot. Pose is
 * not keyframed per-joint over time; instead two named poses (brace / shove)
 * are interpolated by a single eased `shove` value derived from the shared
 * loader progress, which keeps the 3D in lockstep with the DOM panel motion.
 */

const WHITE = '#f7f7f7'

// Limb lengths, in world units. Figure stands ~1.9 tall.
const L = {
  torso: 0.64,
  neck: 0.1,
  head: 0.32,
  upperArm: 0.46,
  lowerArm: 0.42,
  upperLeg: 0.52,
  lowerLeg: 0.48,
}

const POSE = {
  brace: {
    rootY: -0.1,
    torsoX: 0.3,
    headX: -0.34,
    upperArmX: -2.72,
    lowerArmX: 0.34,
    armSpread: 0.1,
    upperLegX: 0.52,
    lowerLegX: -0.86,
    footX: 0.34,
  },
  shove: {
    rootY: 0.14,
    torsoX: -0.06,
    headX: -0.5,
    upperArmX: -3.1,
    lowerArmX: 0.02,
    armSpread: 0.04,
    upperLegX: 0.05,
    lowerLegX: -0.07,
    footX: 0.02,
  },
}

const lerp = (a, b, t) => a + (b - a) * t
const clamp01 = (v) => (v < 0 ? 0 : v > 1 ? 1 : v)
const smoothstep = (edge0, edge1, v) => {
  const t = clamp01((v - edge0) / (edge1 - edge0))
  return t * t * (3 - 2 * t)
}

/**
 * A box whose group origin sits at the joint, with the box hanging "down", so
 * the group can be rotated as a pivot. `ref` is taken as an explicit prop
 * (React 19 passes it through for function components) and forwarded to that
 * pivot group, which is what the pose loop rotates.
 */
const Limb = ({ length, width, depth, children, ref, ...props }) => (
  <group ref={ref} {...props}>
    <mesh position={[0, -length / 2, 0]} castShadow>
      <boxGeometry args={[width, length, depth]} />
      <meshStandardMaterial color={WHITE} roughness={0.62} metalness={0} flatShading />
    </mesh>
    {/* Children are placed at the far end of this limb, ready to be the next joint. */}
    <group position={[0, -length, 0]}>{children}</group>
  </group>
)

const Figure = ({ progress, rigRef }) => {
  const internal = useRef(null)
  const root = rigRef ?? internal
  const torso = useRef(null)
  const head = useRef(null)
  const arms = useRef([])
  const foreArms = useRef([])
  const legs = useRef([])
  const shins = useRef([])
  const feet = useRef([])

  // Collected once so useFrame can pose symmetric pairs in a single pass.
  const sides = useMemo(() => [-1, 1], [])

  useFrame((state) => {
    const p = progress.get()

    // Wind up into a deeper crouch, then fire. Both curves are derived from the
    // one shared progress value, so the shove always matches the panel leaving.
    const crouch = smoothstep(0.08, 0.46, p)
    const shove = smoothstep(0.46, 0.68, p)

    const t = state.clock.elapsedTime
    // Effort shake while braced, gone once the push is released.
    const strain = (1 - shove) * crouch * 0.012
    const shake = Math.sin(t * 34) * strain
    // Gentle idle breathing before the wind-up begins.
    const idle = (1 - crouch) * Math.sin(t * 2.1) * 0.02

    const pose = (key) => lerp(POSE.brace[key], POSE.shove[key], shove)

    if (root.current) {
      root.current.position.y = pose('rootY') - crouch * 0.12 + idle
      root.current.position.x = shake
      root.current.rotation.z = shake * 0.4
    }
    if (torso.current) torso.current.rotation.x = pose('torsoX') + crouch * 0.12 + idle * 0.5
    if (head.current) head.current.rotation.x = pose('headX')

    const upperArmX = pose('upperArmX')
    const lowerArmX = pose('lowerArmX')
    const spread = pose('armSpread')
    const upperLegX = pose('upperLegX') + crouch * 0.16
    const lowerLegX = pose('lowerLegX') - crouch * 0.2
    const footX = pose('footX')

    sides.forEach((side, i) => {
      const a = arms.current[i]
      if (a) {
        a.rotation.x = upperArmX
        a.rotation.z = side * spread
      }
      const f = foreArms.current[i]
      if (f) f.rotation.x = lowerArmX

      const lg = legs.current[i]
      if (lg) lg.rotation.x = upperLegX
      const sh = shins.current[i]
      if (sh) sh.rotation.x = lowerLegX
      const ft = feet.current[i]
      if (ft) ft.rotation.x = footX
    })

  })

  return (
    <group ref={root}>
      {/* hips */}
      <group position={[0, 0.98, 0]}>
        {/* ---- upper body ---- */}
        <group ref={torso}>
          <mesh position={[0, L.torso / 2, 0]} castShadow>
            <boxGeometry args={[0.52, L.torso, 0.3]} />
            <meshStandardMaterial color={WHITE} roughness={0.62} metalness={0} flatShading />
          </mesh>

          {/* head, pivoting at the neck */}
          <group ref={head} position={[0, L.torso + L.neck, 0]}>
            <mesh position={[0, L.head / 2, 0]} castShadow>
              <boxGeometry args={[0.3, L.head, 0.3]} />
              <meshStandardMaterial color={WHITE} roughness={0.62} metalness={0} flatShading />
            </mesh>
          </group>

          {/* arms, pivoting at the shoulders */}
          {sides.map((side, i) => (
            <group key={side} position={[side * 0.33, L.torso - 0.08, 0]}>
              <Limb
                ref={(el) => (arms.current[i] = el)}
                length={L.upperArm}
                width={0.15}
                depth={0.15}
              >
                <Limb
                  ref={(el) => (foreArms.current[i] = el)}
                  length={L.lowerArm}
                  width={0.13}
                  depth={0.13}
                >
                  {/* hand - the contact point with the panel */}
                  <mesh position={[0, -0.07, 0.02]} castShadow>
                    <boxGeometry args={[0.17, 0.14, 0.17]} />
                    <meshStandardMaterial color={WHITE} roughness={0.62} metalness={0} flatShading />
                  </mesh>
                </Limb>
              </Limb>
            </group>
          ))}
        </group>

        {/* ---- legs ---- */}
        {sides.map((side, i) => (
          <group key={side} position={[side * 0.15, 0, 0]}>
            <Limb ref={(el) => (legs.current[i] = el)} length={L.upperLeg} width={0.19} depth={0.19}>
              <Limb
                ref={(el) => (shins.current[i] = el)}
                length={L.lowerLeg}
                width={0.17}
                depth={0.17}
              >
                <group ref={(el) => (feet.current[i] = el)}>
                  <mesh position={[0, -0.05, 0.08]} castShadow>
                    <boxGeometry args={[0.2, 0.1, 0.34]} />
                    <meshStandardMaterial color={WHITE} roughness={0.62} metalness={0} flatShading />
                  </mesh>
                </group>
              </Limb>
            </Limb>
          </group>
        ))}
      </group>
    </group>
  )
}

export default Figure
