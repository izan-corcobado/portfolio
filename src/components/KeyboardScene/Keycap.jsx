import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { RoundedBox } from '@react-three/drei'

export default function Keycap({ data, onSelect, isActive }) {
  const groupRef = useRef()
  const [hovered, setHovered] = useState(false)

  useFrame((_, delta) => {
    if (!groupRef.current) return
    const targetY = isActive ? -0.18 : hovered ? -0.08 : 0
    groupRef.current.position.y +=
      (targetY - groupRef.current.position.y) * 10 * delta
  })

  return (
    <group position={data.position}>
      {/* Sombra / base oscura */}
      <RoundedBox args={[1.1, 0.3, 1.1]} radius={0.12} position={[0, -0.18, 0]}>
        <meshStandardMaterial color="#050508" roughness={1} />
      </RoundedBox>

      {/* Keycap coloreada */}
      <group ref={groupRef}>
        {/* Cuerpo principal */}
        <RoundedBox
          args={[1.05, 0.55, 1.05]}
          radius={0.18}
          onPointerEnter={() => {
            setHovered(true)
            document.body.style.cursor = 'pointer'
          }}
          onPointerLeave={() => {
            setHovered(false)
            document.body.style.cursor = 'auto'
          }}
          onClick={() => onSelect(data)}
        >
          <meshStandardMaterial
            color={data.color}
            roughness={0.3}
            metalness={0.0}
            emissive={data.color}
            emissiveIntensity={isActive ? 0.4 : hovered ? 0.15 : 0.0}
          />
        </RoundedBox>

        {/* Cara superior más clara */}
        <RoundedBox args={[0.82, 0.08, 0.82]} radius={0.1} position={[0, 0.28, 0]}>
          <meshStandardMaterial
            color={data.colorTop || '#ffffff'}
            roughness={0.2}
            transparent
            opacity={0.15}
          />
        </RoundedBox>
      </group>
    </group>
  )
}