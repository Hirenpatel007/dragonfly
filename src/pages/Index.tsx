import { useState, useEffect } from 'react'
import DragonFlyScene from '@/components/DragonFlyScene'

export default function Index() {
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showUI, setShowUI] = useState(true)
  const [showStars, setShowStars] = useState(true)

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    document.addEventListener('fullscreenchange', handleFullscreenChange)
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange)
  }, [])

  const toggleFullscreen = async () => {
    if (!document.fullscreenElement) {
      await document.documentElement.requestFullscreen()
    } else {
      await document.exitFullscreen()
    }
  }

  const toggleUI = () => {
    setShowUI(!showUI)
  }

  const toggleStars = () => {
    setShowStars(!showStars)
  }

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'f' || e.key === 'F') {
        toggleFullscreen()
      }
      if (e.key === 'h' || e.key === 'H') {
        toggleUI()
      }
      if (e.key === 's' || e.key === 'S') {
        toggleStars()
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [])

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {showUI && (
        <div className="absolute top-4 left-4 z-10 transition-opacity duration-300">
          <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 dragonfly-glow animate-pulse">
            Complete Brahmand Mansion
          </h1>
          <p className="text-cyan-300 mt-2 text-lg font-medium">
            Experience the complete universe with all planets and cosmic life
          </p>
          <div className="mt-4 text-sm text-gray-400 space-y-1">
            <p>🎮 Mouse: Rotate • Scroll: Zoom • Auto-rotate enabled</p>
            <p>⌨️ Press F for fullscreen • Press H to hide/show UI • Press S to hide/show stars</p>
            <p>🐉 15 giant dragonflies • 🐋 6 space animals • 🛸 6 alien ships</p>
            <p>🌌 All 8 planets orbiting the Sun with asteroid belt</p>
            <p>🌟 Complete solar system with realistic orbital mechanics</p>
            <p className="text-purple-400 font-medium">✨ Created by Hiren Patel</p>
          </div>
        </div>
      )}
      
      {/* Control buttons */}
      <div className="absolute top-4 right-4 z-10 flex gap-2">
        <button
          onClick={toggleFullscreen}
          className="bg-black/50 hover:bg-black/70 text-white p-3 rounded-lg backdrop-blur-sm transition-all duration-200 border border-cyan-500/30 hover:border-cyan-400"
          title="Toggle Fullscreen (F)"
        >
          {isFullscreen ? (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M3 4a1 1 0 011-1h4a1 1 0 010 2H6.414l2.293 2.293a1 1 0 01-1.414 1.414L5 6.414V8a1 1 0 01-2 0V4zM16 4a1 1 0 00-1-1h-4a1 1 0 000 2h1.586l-2.293 2.293a1 1 0 001.414 1.414L13.586 6V8a1 1 0 002 0V4zM3 16a1 1 0 001 1h4a1 1 0 000-2H6.414l2.293-2.293a1 1 0 00-1.414-1.414L5 13.586V12a1 1 0 00-2 0v4zM16 16a1 1 0 01-1 1h-4a1 1 0 010-2h1.586l-2.293-2.293a1 1 0 011.414-1.414L13.586 14V12a1 1 0 012 0v4z" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M3 4a1 1 0 000 2h1.586l-2.293 2.293a1 1 0 001.414 1.414L6 7.414V9a1 1 0 002 0V4a1 1 0 00-1-1H3zM16 4a1 1 0 000 2h-1.586l2.293 2.293a1 1 0 01-1.414 1.414L13 7.414V9a1 1 0 01-2 0V4a1 1 0 011-1h4zM3 16a1 1 0 001-1v-4a1 1 0 00-2 0v1.586l-2.293-2.293a1 1 0 001.414-1.414L3.586 12H2a1 1 0 000 2h4zM16 16a1 1 0 01-1-1v-4a1 1 0 012 0v1.586l2.293-2.293a1 1 0 01-1.414-1.414L16.414 12H18a1 1 0 010 2h-4z" />
            </svg>
          )}
        </button>
        
        <button
          onClick={toggleUI}
          className="bg-black/50 hover:bg-black/70 text-white p-3 rounded-lg backdrop-blur-sm transition-all duration-200 border border-purple-500/30 hover:border-purple-400"
          title="Toggle UI (H)"
        >
          {showUI ? (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
              <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
              <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
            </svg>
          )}
        </button>
        
        <button
          onClick={toggleStars}
          className="bg-black/50 hover:bg-black/70 text-white p-3 rounded-lg backdrop-blur-sm transition-all duration-200 border border-yellow-500/30 hover:border-yellow-400"
          title="Toggle Stars (S)"
        >
          {showStars ? (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
          )}
        </button>
      </div>
      
      {/* Cosmic overlay effects */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-purple-900/10 to-black/50 pointer-events-none" />
      
      <DragonFlyScene showStars={showStars} />
    </div>
  )
}