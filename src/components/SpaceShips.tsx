import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Group } from 'three'
import { Sphere, Box, Cylinder, Torus } from '@react-three/drei'

function AlienUFO({ position }: { position: [number, number, number] }) {
  const ufoRef = useRef<Group>(null)
  
  useFrame((state) => {
    if (ufoRef.current) {
      ufoRef.current.rotation.y = state.clock.elapsedTime * 2
      ufoRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 3) * 1
    }
  })

  return (
    <group ref={ufoRef} position={position}>
      <Sphere args={[2, 16, 8]} position={[0, 0, 0]} scale={[1, 0.3, 1]}>
        <meshPhysicalMaterial color="#C0C0C0" metalness={0.9} roughness={0.1} emissive="#00FF00" emissiveIntensity={0.2} />
      </Sphere>
      <Sphere args={[1, 12, 8]} position={[0, 0.5, 0]} scale={[1, 0.8, 1]}>
        <meshPhysicalMaterial color="#87CEEB" metalness={0.8} roughness={0.2} transparent opacity={0.7} />
      </Sphere>
      <Torus args={[2.5, 0.2, 8, 16]} position={[0, -0.2, 0]}>
        <meshPhysicalMaterial color="#FFD700" metalness={1} roughness={0} emissive="#FFFF00" emissiveIntensity={0.3} />
      </Torus>
      {[...Array(8)].map((_, i) => (
        <Sphere key={i} args={[0.1, 8, 8]} position={[Math.cos(i * Math.PI / 4) * 2.5, -0.2, Math.sin(i * Math.PI / 4) * 2.5]}>
          <meshBasicMaterial color="#00FFFF" />
        </Sphere>
      ))}
    </group>
  )
}

function Satellite({ position }: { position: [number, number, number] }) {
  const satRef = useRef<Group>(null)
  const panelRef = useRef<Group>(null)
  
  useFrame((state) => {
    if (satRef.current) {
      satRef.current.rotation.z = state.clock.elapsedTime * 0.5
    }
    if (panelRef.current) {
      panelRef.current.rotation.y = state.clock.elapsedTime * 1.5
    }
  })

  return (
    <group ref={satRef} position={position}>
      <Box args={[1.5, 1.5, 2]} position={[0, 0, 0]}>
        <meshPhysicalMaterial color="#2F4F4F" metalness={0.8} roughness={0.3} />
      </Box>
      <Cylinder args={[0.1, 0.1, 3, 8]} position={[0, 0, 2]}>
        <meshPhysicalMaterial color="#FFD700" metalness={0.9} roughness={0.1} />
      </Cylinder>
      <Sphere args={[0.3, 12, 12]} position={[0, 0, 3.5]}>
        <meshBasicMaterial color="#FF0000" />
      </Sphere>
      <group ref={panelRef}>
        <Box args={[4, 0.1, 1]} position={[-2.5, 0, 0]}>
          <meshPhysicalMaterial color="#000080" metalness={0.1} roughness={0.9} />
        </Box>
        <Box args={[4, 0.1, 1]} position={[2.5, 0, 0]}>
          <meshPhysicalMaterial color="#000080" metalness={0.1} roughness={0.9} />
        </Box>
      </group>
    </group>
  )
}

function SpaceStation({ position }: { position: [number, number, number] }) {
  const stationRef = useRef<Group>(null)
  
  useFrame((state) => {
    if (stationRef.current) {
      stationRef.current.rotation.y = state.clock.elapsedTime * 0.2
    }
  })

  return (
    <group ref={stationRef} position={position}>
      <Torus args={[8, 2, 8, 16]} position={[0, 0, 0]}>
        <meshPhysicalMaterial color="#4A4A4A" metalness={0.7} roughness={0.4} />
      </Torus>
      <Cylinder args={[1, 1, 4, 8]} position={[0, 0, 0]}>
        <meshPhysicalMaterial color="#696969" metalness={0.8} roughness={0.3} />
      </Cylinder>
      {[...Array(6)].map((_, i) => (
        <Box key={i} args={[1, 1, 0.5]} position={[Math.cos(i * Math.PI / 3) * 8, Math.sin(i * Math.PI / 3) * 8, 0]}>
          <meshPhysicalMaterial color="#FF4500" metalness={0.5} roughness={0.5} emissive="#FF6600" emissiveIntensity={0.1} />
        </Box>
      ))}
    </group>
  )
}

export default function SpaceShips() {
  const objects = [
    { type: 'ufo', position: [50, 15, -40] as [number, number, number] },
    { type: 'satellite', position: [-45, -10, 30] as [number, number, number] },
    { type: 'station', position: [0, 40, -60] as [number, number, number] },
    { type: 'ufo', position: [-30, 25, 45] as [number, number, number] },
    { type: 'satellite', position: [40, -30, -25] as [number, number, number] },
    { type: 'ufo', position: [25, -35, 50] as [number, number, number] }
  ]

  return (
    <>
      {objects.map((obj, index) => {
        switch (obj.type) {
          case 'ufo':
            return <AlienUFO key={index} position={obj.position} />
          case 'satellite':
            return <Satellite key={index} position={obj.position} />
          case 'station':
            return <SpaceStation key={index} position={obj.position} />
          default:
            return null
        }
      })}
    </>
  )
}