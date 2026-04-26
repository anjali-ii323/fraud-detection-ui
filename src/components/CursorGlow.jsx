import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

function CursorGlow() {
  const [point, setPoint] = useState({ x: -300, y: -300, active: false })

  useEffect(() => {
    const move = (event) => setPoint({ x: event.clientX, y: event.clientY, active: true })
    const leave = () => setPoint((prev) => ({ ...prev, active: false }))

    window.addEventListener('mousemove', move)
    window.addEventListener('mouseleave', leave)

    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseleave', leave)
    }
  }, [])

  return (
    <motion.div
      animate={{ opacity: point.active ? 0.5 : 0, x: point.x - 220, y: point.y - 220 }}
      transition={{ type: 'spring', damping: 28, stiffness: 170, mass: 0.4 }}
      className="pointer-events-none fixed left-0 top-0 z-0 h-[440px] w-[440px] rounded-full bg-[radial-gradient(circle,rgba(34,211,238,0.23),rgba(37,99,235,0.16),rgba(15,23,42,0)_70%)] blur-3xl"
    />
  )
}

export default CursorGlow
