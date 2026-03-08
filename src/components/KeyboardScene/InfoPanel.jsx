export default function InfoPanel({ data, onClose }) {
  if (!data) return null

  return (
    <div style={{
      position:'absolute', top:'50%', right:'5%',
      transform:'translateY(-50%)',
      width:280, zIndex:10,
      background:'rgba(8,13,22,0.7)',
      backdropFilter:'blur(20px)',
      border:'1px solid rgba(59,130,246,0.25)',
      borderRadius:12, padding:'28px 24px',
      boxShadow:'0 0 40px rgba(59,130,246,0.1)',
      animation:'fadeIn .3s ease',
    }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:16 }}>
        <div style={{ display:'flex', alignItems:'center', gap:10 }}>
          <div style={{
            width:10, height:10, borderRadius:'50%',
            background:data.color,
            boxShadow:`0 0 8px ${data.color}`,
          }} />
          <span style={{
            fontFamily:"'Orbitron', sans-serif",
            fontSize:14, fontWeight:700, color:'#F0F6FF',
          }}>
            {data.label}
          </span>
        </div>
        <button onClick={onClose} style={{
          background:'none', border:'none', color:'rgba(240,246,255,0.4)',
          cursor:'pointer', fontSize:18, lineHeight:1,
        }}>×</button>
      </div>

      <div style={{
        display:'inline-block',
        padding:'3px 10px',
        background:`${data.color}20`,
        border:`1px solid ${data.color}50`,
        borderRadius:3, marginBottom:16,
      }}>
        <span style={{
          fontFamily:"'Space Mono', monospace",
          fontSize:10, letterSpacing:2,
          color:data.color, textTransform:'uppercase',
        }}>
          {data.info.level}
        </span>
      </div>

      <p style={{
        fontFamily:"'Inter', sans-serif",
        fontSize:13, lineHeight:1.7,
        color:'rgba(240,246,255,0.6)',
      }}>
        {data.info.desc}
      </p>

      <style>{`
        @keyframes fadeIn {
          from { opacity:0; transform:translateY(-50%) translateX(10px); }
          to   { opacity:1; transform:translateY(-50%) translateX(0); }
        }
      `}</style>
    </div>
  )
}