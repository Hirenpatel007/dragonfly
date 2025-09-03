import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Environment, PerspectiveCamera, Stars, Sphere } from '@react-three/drei'
import Dragonfly3D from './Dragonfly3D'
import { Suspense, useRef } from 'react'
import { Group } from 'three'

function GalacticBackground() {
  const nebulaRef = useRef<Group>(null)
  
  useFrame((state) => {
    if (nebulaRef.current) {
      nebulaRef.current.rotation.y = state.clock.elapsedTime * 0.05
      nebulaRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1
    }
  })

  return (
    <>
      <Stars radius={150} depth={80} count={8000} factor={6} saturation={0.5} fade speed={2} />
      
      <group ref={nebulaRef}>
        {/* Multiple nebula layers */}
        {[...Array(8)].map((_, i) => {
          const angle = (i / 8) * Math.PI * 2
          const radius = 60 + i * 10
          const x = Math.cos(angle) * radius
          const z = Math.sin(angle) * radius
          const y = (Math.random() - 0.5) * 40
          
          return (
            <Sphere key={i} args={[30 + Math.random() * 20]} position={[x, y, z]}>
              <meshBasicMaterial 
                color={`hsl(${i * 45 + Math.random() * 60}, 70%, 40%)`}
                transparent 
                opacity={0.05 + Math.random() * 0.05}
              />
            </Sphere>
          )
        })}
        
        {/* Spiral galaxy arms */}
        {[...Array(4)].map((_, i) => {
          const armAngle = (i / 4) * Math.PI * 2
          return (
            <group key={`arm-${i}`} rotation={[0, armAngle, 0]}>
              {[...Array(20)].map((_, j) => {
                const spiralRadius = j * 8
                const spiralAngle = j * 0.5
                const x = Math.cos(spiralAngle) * spiralRadius
                const z = Math.sin(spiralAngle) * spiralRadius
                
                return (
                  <Sphere key={j} args={[2 + Math.random() * 3]} position={[x, 0, z]}>
                    <meshBasicMaterial 
                      color={`hsl(${240 + i * 30}, 80%, 60%)`}
                      transparent 
                      opacity={0.3}
                    />
                  </Sphere>
                )
              })}
            </group>
          )
        })}
      </group>
    </>
  )
}

export default function DragonFlyScene({ showStars = true }: { showStars?: boolean }) {
  return (
    <div className="fixed inset-0 w-screen h-screen overflow-hidden">
      <Canvas gl={{ antialias: true, alpha: false }} style={{ width: '100vw', height: '100vh' }}>
        <PerspectiveCamera makeDefault position={[0, 5, 25]} fov={75} />
        <OrbitControls 
          enablePan={true} 
          enableZoom={true} 
          enableRotate={true}
          minDistance={10}
          maxDistance={150}
          autoRotate
          autoRotateSpeed={0.2}
        />
        
        {/* Enhanced Lighting */}
        <ambientLight intensity={0.2} color="#1a1a2e" />
        <directionalLight 
          position={[10, 10, 5]} 
          intensity={0.8} 
          color="#ffffff"
          castShadow
        />
        <pointLight position={[-10, -10, -5]} intensity={1} color="#4A90E2" />
        <pointLight position={[10, -5, 10]} intensity={0.8} color="#9A4AE2" />
        <pointLight position={[0, 15, 0]} intensity={0.6} color="#00ffff" />
        
        <Suspense fallback={null}>
          <GalacticBackground />
          <Dragonfly3D showStars={showStars} />
        </Suspense>
        
        <Environment preset="night" />
      </Canvas>
    </div>
  )
}