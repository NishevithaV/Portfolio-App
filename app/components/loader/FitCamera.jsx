"use client"
import { useEffect, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

/**
 * Frames the camera to whatever `target` actually measures, instead of relying
 * on hand-tuned camera coordinates.
 *
 * The loader's strip is a wide, short box whose height is a `clamp()` of the
 * viewport, so its aspect ratio varies enormously between a phone and a desktop.
 * Measuring the rig's real bounding box and solving for the distance that fits
 * it is the only way to guarantee the figure is fully visible everywhere.
 *
 * The fit is taken over the first few frames and then held, so the shove - which
 * deliberately moves the figure out of frame - cannot re-frame itself.
 *
 * `bias` is the fraction of the visible height left as clearance above the rig.
 */
const FitCamera = ({ target, margin = 1.18, bias = 0.035 }) => {
  const { camera, size } = useThree()
  const settled = useRef(0)

  // Re-fit whenever the canvas is resized.
  useEffect(() => {
    settled.current = 0
  }, [size.width, size.height])

  useFrame(() => {
    if (settled.current > 4 || !target.current) return

    const box = new THREE.Box3().setFromObject(target.current)
    if (!Number.isFinite(box.min.y) || box.isEmpty()) return

    const h = (box.max.y - box.min.y) * margin
    const w = (box.max.x - box.min.x) * margin

    const vFov = (camera.fov * Math.PI) / 180
    const distForHeight = h / 2 / Math.tan(vFov / 2)
    const distForWidth = w / 2 / (Math.tan(vFov / 2) * Math.max(camera.aspect, 0.0001))
    const dist = Math.max(distForHeight, distForWidth)

    // The visible height at the rig's plane, given the distance we just solved.
    const visible = 2 * dist * Math.tan(vFov / 2)

    // Pin the TOP of the rig just under the top edge rather than centring it:
    // the figure's hands have to read as touching the panel above them, and the
    // leftover margin is better spent as floor under its feet.
    const camY = box.max.y + bias * visible - visible / 2

    camera.position.set(0, camY, dist)
    camera.lookAt(0, camY, 0)
    camera.updateProjectionMatrix()

    settled.current += 1
  })

  return null
}

export default FitCamera
