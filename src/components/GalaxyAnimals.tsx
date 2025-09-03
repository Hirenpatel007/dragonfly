import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Group } from 'three'
import { Sphere, Box, Cone, Cylinder } from '@react-three/drei'

function SpaceWhale({ position }: { position: [number, number, number] }) {
  const whaleRef = useRef<Group>(null)
  
  useFrame((state) => {
    if (whaleRef.current) {
      whaleRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2
      whaleRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.3) * 2
    }
  })

  return (
    <group ref={whaleRef} position={position}>
      <Sphere args={[4, 16, 16]} position={[0, 0, 0]}>
        <meshPhysicalMaterial color="#2A4A6B" metalness={0.3} roughness={0.7} />
      </Sphere>
      <Sphere args={[2, 12, 12]} position={[3, 0, 0]}>
        <meshPhysicalMaterial color="#1A3A5B" metalness={0.3} roughness={0.7} />
      </Sphere>
      <Box args={[6, 1, 3]} position={[-2, 2, 0]} rotation={[0, 0, 0.3]}>
        <meshPhysicalMaterial color="#0A2A4B" metalness={0.4} roughness={0.6} />
      </Box>
      <Box args={[6, 1, 3]} position={[-2, -2, 0]} rotation={[0, 0, -0.3]}>
        <meshPhysicalMaterial color="#0A2A4B" metalness={0.4} roughness={0.6} />
      </Box>
    </group>
  )
}

function CosmicEagle({ position }: { position: [number, number, number] }) {
  const eagleRef = useRef<Group>(null)
  const wingRef = useRef<Group>(null)
  
  useFrame((state) => {
    if (eagleRef.current) {
      eagleRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.8) * 0.1
    }
    if (wingRef.current) {
      wingRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 8) * 0.4
    }
  })

  return (
    <group ref={eagleRef} position={position}>
      <Cylinder args={[0.3, 0.5, 3, 8]} position={[0, 0, 0]}>
        <meshPhysicalMaterial color="#8B4513" metalness={0.2} roughness={0.8} />
      </Cylinder>
      <Sphere args={[0.8, 12, 12]} position={[0, 2, 0]}>
        <meshPhysicalMaterial color="#654321" metalness={0.2} roughness={0.8} />
      </Sphere>
      <Cone args={[0.2, 0.8, 6]} position={[0, 2.5, 0.5]} rotation={[0.5, 0, 0]}>
        <meshPhysicalMaterial color="#FFD700" metalness={0.8} roughness={0.2} />
      </Cone>
      <group ref={wingRef}>
        <Box args={[8, 0.2, 2]} position={[-4, 0, 0]}>
          <meshPhysicalMaterial color="#4A4A4A" metalness={0.1} roughness={0.9} />
        </Box>
        <Box args={[8, 0.2, 2]} position={[4, 0, 0]}>
          <meshPhysicalMaterial color="#4A4A4A" metalness={0.1} roughness={0.9} />
        </Box>
      </group>
    </group>
  )
}

function GalacticShark({ position }: { position: [number, number, number] }) {
  const sharkRef = useRef<Group>(null)
  
  useFrame((state) => {
    if (sharkRef.current) {
      sharkRef.current.rotation.y = state.clock.elapsedTime * 0.3
      sharkRef.current.position.x = position[0] + Math.sin(state.clock.elapsedTime * 0.4) * 3
    }
  })

  return (
    <group ref={sharkRef} position={position}>
      <Cylinder args={[1, 2, 6, 8]} position={[0, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <meshPhysicalMaterial color="#708090" metalness={0.4} roughness={0.6} />
      </Cylinder>
      <Cone args={[1, 2, 6]} position={[4, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <meshPhysicalMaterial color="#556B7D" metalness={0.4} roughness={0.6} />
      </Cone>
      <Box args={[2, 0.3, 4]} position={[0, 2, 0]}>
        <meshPhysicalMaterial color="#2F4F4F" metalness={0.5} roughness={0.5} />
      </Box>
      <Box args={[1, 0.3, 2]} position={[-2, -1, 0]}>
        <meshPhysicalMaterial color="#2F4F4F" metalness={0.5} roughness={0.5} />
      </Box>
    </group>
  )
}

export default function GalaxyAnimals() {
  const animals = [
    { type: 'whale', position: [-40, 20, -30] as [number, number, number] },
    { type: 'eagle', position: [35, -15, 25] as [number, number, number] },
    { type: 'shark', position: [-25, -25, 40] as [number, number, number] },
    { type: 'whale', position: [45, 30, -20] as [number, number, number] },
    { type: 'eagle', position: [-35, 25, -35] as [number, number, number] },
    { type: 'shark', position: [30, -20, 35] as [number, number, number] }
  ]

  return (
    <>
      {animals.map((animal, index) => {
        switch (animal.type) {
          case 'whale':
            return <SpaceWhale key={index} position={animal.position} />
          case 'eagle':
            return <CosmicEagle key={index} position={animal.position} />
          case 'shark':
            return <GalacticShark key={index} position={animal.position} />
          default:
            return null
        }
      })}
    </>
  )
}