import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Group } from 'three'
import { Sphere, Ring } from '@react-three/drei'

function Planet({ 
  size, 
  color, 
  position, 
  orbitRadius, 
  orbitSpeed, 
  rotationSpeed = 1 
}: { 
  size: number
  color: string
  position: [number, number, number]
  orbitRadius: number
  orbitSpeed: number
  rotationSpeed?: number
}) {
  const planetRef = useRef<Group>(null)
  
  useFrame((state) => {
    if (planetRef.current) {
      const time = state.clock.elapsedTime
      planetRef.current.position.x = Math.cos(time * orbitSpeed) * orbitRadius
      planetRef.current.position.z = Math.sin(time * orbitSpeed) * orbitRadius
      planetRef.current.rotation.y = time * rotationSpeed
    }
  })

  return (
    <group ref={planetRef} position={position}>
      <Sphere args={[size, 32, 32]}>
        <meshPhysicalMaterial 
          color={color} 
          metalness={0.1} 
          roughness={0.8}
          emissive={color}
          emissiveIntensity={0.1}
        />
      </Sphere>
    </group>
  )
}

function Sun({ position }: { position: [number, number, number] }) {
  const sunRef = useRef<Group>(null)
  
  useFrame((state) => {
    if (sunRef.current) {
      sunRef.current.rotation.y = state.clock.elapsedTime * 0.5
    }
  })

  return (
    <group ref={sunRef} position={position}>
      <Sphere args={[8, 32, 32]}>
        <meshStandardMaterial 
          color="#FFA500" 
          emissive="#FF4500"
          emissiveIntensity={0.8}
        />
      </Sphere>
      <pointLight position={[0, 0, 0]} intensity={2} color="#FFA500" distance={200} />
    </group>
  )
}

export default function SolarSystem() {
  const planets = [
    { name: 'Mercury', size: 1, color: '#8C7853', orbitRadius: 15, orbitSpeed: 0.8, position: [0, 0, 0] as [number, number, number] },
    { name: 'Venus', size: 1.5, color: '#FFC649', orbitRadius: 20, orbitSpeed: 0.6, position: [0, 0, 0] as [number, number, number] },
    { name: 'Earth', size: 2, color: '#6B93D6', orbitRadius: 25, orbitSpeed: 0.5, position: [0, 0, 0] as [number, number, number] },
    { name: 'Mars', size: 1.8, color: '#CD5C5C', orbitRadius: 30, orbitSpeed: 0.4, position: [0, 0, 0] as [number, number, number] },
    { name: 'Jupiter', size: 6, color: '#D8CA9D', orbitRadius: 45, orbitSpeed: 0.2, position: [0, 0, 0] as [number, number, number] },
    { name: 'Saturn', size: 5, color: '#FAD5A5', orbitRadius: 60, orbitSpeed: 0.15, position: [0, 0, 0] as [number, number, number] },
    { name: 'Uranus', size: 3, color: '#4FD0E7', orbitRadius: 75, orbitSpeed: 0.1, position: [0, 0, 0] as [number, number, number] },
    { name: 'Neptune', size: 3, color: '#4B70DD', orbitRadius: 90, orbitSpeed: 0.08, position: [0, 0, 0] as [number, number, number] }
  ]

  return (
    <group position={[0, -100, 0]}>
      <Sun position={[0, 0, 0]} />
      
      {planets.map((planet, index) => (
        <Planet
          key={index}
          size={planet.size}
          color={planet.color}
          position={planet.position}
          orbitRadius={planet.orbitRadius}
          orbitSpeed={planet.orbitSpeed}
          rotationSpeed={1 + index * 0.2}
        />
      ))}
      
      {/* Saturn's rings */}
      <group position={[0, 0, 0]}>
        <Ring args={[7, 9, 32]} rotation={[Math.PI / 2, 0, 0]}>
          <meshBasicMaterial color="#C4A484" transparent opacity={0.6} />
        </Ring>
      </group>
      
      {/* Asteroid belt */}
      {[...Array(50)].map((_, i) => (
        <Sphere key={i} args={[0.1, 8, 8]} position={[
          Math.cos(i * 0.5) * (35 + Math.random() * 5),
          (Math.random() - 0.5) * 2,
          Math.sin(i * 0.5) * (35 + Math.random() * 5)
        ]}>
          <meshBasicMaterial color="#8C7853" />
        </Sphere>
      ))}
    </group>
  )
}