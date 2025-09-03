import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Mesh, Group, Color } from 'three'
import { Sparkles, Trail, Sphere } from '@react-three/drei'
import * as THREE from 'three'
import GalaxyAnimals from './GalaxyAnimals'
import SpaceShips from './SpaceShips'
import SolarSystem from './SolarSystem'

function StarField() {
  const count = 5000
  const positions = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 200
      positions[i * 3 + 1] = (Math.random() - 0.5) * 200
      positions[i * 3 + 2] = (Math.random() - 0.5) * 200
      
      const color = new THREE.Color()
      color.setHSL(Math.random(), 0.8, 0.8)
      colors[i * 3] = color.r
      colors[i * 3 + 1] = color.g
      colors[i * 3 + 2] = color.b
    }
    return { positions, colors }
  }, [])

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions.positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={positions.colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={1} vertexColors transparent opacity={0.9} />
    </points>
  )
}

function SingleDragonfly({ 
  position = [0, 0, 0] as [number, number, number],
  bodyColor = "#1a1a2e", 
  wingColor = "#4A90E2", 
  emissiveColor = "#0066CC",
  trailColor = "#4A90E2"
}) {
  const bodyRef = useRef<Mesh>(null)
  const leftWingRef = useRef<Mesh>(null)
  const rightWingRef = useRef<Mesh>(null)
  const leftWing2Ref = useRef<Mesh>(null)
  const rightWing2Ref = useRef<Mesh>(null)
  const eyesRef = useRef<Group>(null)

  useFrame((state) => {
    const time = state.clock.elapsedTime
    
    if (leftWingRef.current && rightWingRef.current) {
      const flutter = Math.sin(time * 12) * 0.6
      const flutter2 = Math.sin(time * 12 + Math.PI * 0.3) * 0.5
      
      leftWingRef.current.rotation.z = flutter
      rightWingRef.current.rotation.z = -flutter
      leftWing2Ref.current!.rotation.z = flutter2 + 0.3
      rightWing2Ref.current!.rotation.z = -flutter2 - 0.3
    }
    
    if (eyesRef.current) {
      eyesRef.current.children.forEach((eye, i) => {
        const mesh = eye as Mesh
        const material = mesh.material as THREE.MeshStandardMaterial
        material.emissiveIntensity = 0.8 + Math.sin(time * 6 + i) * 0.4
      })
    }
  })

  return (
    <group position={position}>
      <Trail
        width={1.5}
        length={30}
        color={new Color(trailColor)}
        attenuation={(t) => t * t}
      >
        <Sphere args={[0.05]}>
          <meshBasicMaterial color={trailColor} />
        </Sphere>
      </Trail>
      
      <Sparkles count={80} scale={8} size={4} speed={0.8} color={wingColor} />
      
      <mesh ref={bodyRef}>
        <cylinderGeometry args={[0.3, 0.4, 6, 16]} />
        <meshPhysicalMaterial 
          color={bodyColor}
          metalness={0.9}
          roughness={0.1}
          emissive={emissiveColor}
          emissiveIntensity={0.5}
          clearcoat={1}
          clearcoatRoughness={0}
        />
      </mesh>
      
      {[...Array(6)].map((_, i) => (
        <mesh key={i} position={[0, 2.5 - i * 0.8, 0]}>
          <sphereGeometry args={[0.25, 12, 12]} />
          <meshPhysicalMaterial 
            color={`hsl(${200 + i * 15}, 80%, 50%)`}
            metalness={0.8}
            roughness={0.2}
            emissive={`hsl(${200 + i * 15}, 80%, 30%)`}
            emissiveIntensity={0.4}
          />
        </mesh>
      ))}
      
      <group ref={eyesRef} position={[0, 2.8, 0]}>
        <mesh position={[-0.15, 0, 0.25]}>
          <sphereGeometry args={[0.12, 12, 12]} />
          <meshStandardMaterial color="#00ffff" emissive="#00ffff" emissiveIntensity={1.2} />
        </mesh>
        <mesh position={[0.15, 0, 0.25]}>
          <sphereGeometry args={[0.12, 12, 12]} />
          <meshStandardMaterial color="#00ffff" emissive="#00ffff" emissiveIntensity={1.2} />
        </mesh>
      </group>
      
      <mesh ref={leftWingRef} position={[-1.5, 1, 0]}>
        <planeGeometry args={[4, 2]} />
        <meshPhysicalMaterial 
          color={wingColor}
          transparent
          opacity={0.8}
          metalness={0.9}
          roughness={0.05}
          transmission={0.3}
          thickness={0.1}
          emissive={wingColor}
          emissiveIntensity={0.3}
          clearcoat={1}
          iridescence={1}
          iridescenceIOR={1.3}
          iridescenceThicknessRange={[100, 800]}
        />
      </mesh>
      
      <mesh ref={rightWingRef} position={[1.5, 1, 0]}>
        <planeGeometry args={[4, 2]} />
        <meshPhysicalMaterial 
          color={wingColor}
          transparent
          opacity={0.8}
          metalness={0.9}
          roughness={0.05}
          transmission={0.3}
          thickness={0.1}
          emissive={wingColor}
          emissiveIntensity={0.3}
          clearcoat={1}
          iridescence={1}
          iridescenceIOR={1.3}
          iridescenceThicknessRange={[100, 800]}
        />
      </mesh>
      
      <mesh ref={leftWing2Ref} position={[-1.2, -0.8, 0]} rotation={[0, 0, 0.4]}>
        <planeGeometry args={[3, 1.5]} />
        <meshPhysicalMaterial 
          color="#9A4AE2"
          transparent
          opacity={0.7}
          metalness={0.8}
          roughness={0.1}
          transmission={0.4}
          emissive="#6A2A92"
          emissiveIntensity={0.25}
          clearcoat={1}
          iridescence={1}
          iridescenceIOR={1.5}
          iridescenceThicknessRange={[200, 600]}
        />
      </mesh>
      
      <mesh ref={rightWing2Ref} position={[1.2, -0.8, 0]} rotation={[0, 0, -0.4]}>
        <planeGeometry args={[3, 1.5]} />
        <meshPhysicalMaterial 
          color="#9A4AE2"
          transparent
          opacity={0.7}
          metalness={0.8}
          roughness={0.1}
          transmission={0.4}
          emissive="#6A2A92"
          emissiveIntensity={0.25}
          clearcoat={1}
          iridescence={1}
          iridescenceIOR={1.5}
          iridescenceThicknessRange={[200, 600]}
        />
      </mesh>
    </group>
  )
}

export default function Dragonfly3D({ showStars = true }: { showStars?: boolean }) {
  const dragonflies = [
    { position: [0, 15, 0] as [number, number, number], bodyColor: "#1a1a2e", wingColor: "#4A90E2", emissiveColor: "#0066CC", trailColor: "#4A90E2" },
    { position: [-25, 8, -15] as [number, number, number], bodyColor: "#2e1a1a", wingColor: "#E24A90", emissiveColor: "#CC0066", trailColor: "#E24A90" },
    { position: [20, -5, 12] as [number, number, number], bodyColor: "#1a2e1a", wingColor: "#4AE290", emissiveColor: "#00CC66", trailColor: "#4AE290" },
    { position: [8, 25, -20] as [number, number, number], bodyColor: "#2e2e1a", wingColor: "#E2E24A", emissiveColor: "#CCCC00", trailColor: "#E2E24A" },
    { position: [-15, -12, 18] as [number, number, number], bodyColor: "#2e1a2e", wingColor: "#904AE2", emissiveColor: "#6600CC", trailColor: "#904AE2" },
    { position: [30, 0, -8] as [number, number, number], bodyColor: "#1a2e2e", wingColor: "#4AE2E2", emissiveColor: "#00CCCC", trailColor: "#4AE2E2" },
    { position: [-8, -20, -25] as [number, number, number], bodyColor: "#2e2e2e", wingColor: "#E2E2E2", emissiveColor: "#CCCCCC", trailColor: "#E2E2E2" },
    { position: [12, 18, 22] as [number, number, number], bodyColor: "#2e1a0a", wingColor: "#E2904A", emissiveColor: "#CC6600", trailColor: "#E2904A" },
    { position: [-22, 5, -12] as [number, number, number], bodyColor: "#0a1a2e", wingColor: "#4A90E2", emissiveColor: "#0066CC", trailColor: "#4A90E2" },
    { position: [5, -25, 8] as [number, number, number], bodyColor: "#2e0a1a", wingColor: "#E24A90", emissiveColor: "#CC0066", trailColor: "#E24A90" },
    { position: [-18, 12, 28] as [number, number, number], bodyColor: "#0a2e1a", wingColor: "#4AE290", emissiveColor: "#00CC66", trailColor: "#4AE290" },
    { position: [25, -8, -18] as [number, number, number], bodyColor: "#2e2e0a", wingColor: "#E2E24A", emissiveColor: "#CCCC00", trailColor: "#E2E24A" },
    { position: [-12, 28, 5] as [number, number, number], bodyColor: "#1a0a2e", wingColor: "#904AE2", emissiveColor: "#6600CC", trailColor: "#904AE2" },
    { position: [18, 2, -28] as [number, number, number], bodyColor: "#2e1a0a", wingColor: "#E2904A", emissiveColor: "#CC6600", trailColor: "#E2904A" },
    { position: [-28, -15, 12] as [number, number, number], bodyColor: "#0a2e2e", wingColor: "#4AE2E2", emissiveColor: "#00CCCC", trailColor: "#4AE2E2" }
  ]

  return (
    <>
      {showStars && <StarField />}
      {dragonflies.map((props, index) => (
        <SingleDragonfly key={index} {...props} />
      ))}
      <GalaxyAnimals />
      <SpaceShips />
      <SolarSystem />
    </>
  )
}