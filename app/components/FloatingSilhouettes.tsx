const SILOS = [
  { cls: 's1', color: '#00f5ff',  style: { top: '14%',    left: '8%',   width: 80,  animationDelay: '0s'    } },
  { cls: 's2', color: '#ff006e',  style: { top: '22%',    right: '10%', width: 72,  animationDelay: '-1.5s' } },
  { cls: 's3', color: '#f5ff00',  style: { bottom: '18%', left: '12%',  width: 88,  animationDelay: '-3s'   } },
  { cls: 's4', color: '#00ff88',  style: { bottom: '22%', right: '14%', width: 60,  animationDelay: '-4.5s' } },
  { cls: 's5', color: '#aa00ff',  style: { top: '38%',    left: '4%',   width: 70,  animationDelay: '-2s'   } },
  { cls: 's6', color: '#ffcf3a',  style: { top: '8%',     left: '46%',  width: 44,  animationDelay: '-3.5s' } },
  { cls: 's7', color: '#ff3060',  style: { bottom: '12%', left: '42%',  width: 52,  animationDelay: '-1s'   } },
  { cls: 's8', color: '#00d4ff',  style: { top: '50%',    right: '4%',  width: 60,  animationDelay: '-5s'   } },
]

const SILO_BASE: React.CSSProperties = {
  position: 'absolute',
  imageRendering: 'pixelated',
  animation: 'float 6s ease-in-out infinite',
  height: 'auto',
}

export default function FloatingSilhouettes() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute', inset: 0, zIndex: 1,
        pointerEvents: 'none', opacity: 0.55,
      }}
    >
      {/* s1: Space Invader */}
      <svg style={{ ...SILO_BASE, ...SILOS[0].style, filter: `drop-shadow(0 0 10px ${SILOS[0].color})`, color: SILOS[0].color }} viewBox="0 0 40 32"><g fill="#00f5ff">
        <rect x="6" y="4" width="4" height="4"/><rect x="30" y="4" width="4" height="4"/>
        <rect x="2" y="8" width="36" height="4"/>
        <rect x="2" y="12" width="4" height="4"/><rect x="14" y="12" width="4" height="4"/><rect x="22" y="12" width="4" height="4"/><rect x="34" y="12" width="4" height="4"/>
        <rect x="2" y="16" width="36" height="4"/>
        <rect x="6" y="20" width="4" height="4"/><rect x="30" y="20" width="4" height="4"/>
      </g></svg>

      {/* s2: Nave */}
      <svg style={{ ...SILO_BASE, ...SILOS[1].style, filter: `drop-shadow(0 0 10px ${SILOS[1].color})` }} viewBox="0 0 32 32"><g fill="#ff006e">
        <rect x="8" y="0" width="16" height="4"/>
        <rect x="4" y="4" width="24" height="4"/>
        <rect x="0" y="8" width="32" height="12"/>
        <rect x="0" y="20" width="6" height="6"/><rect x="10" y="20" width="4" height="6"/><rect x="18" y="20" width="4" height="6"/><rect x="26" y="20" width="6" height="6"/>
      </g></svg>

      {/* s3: Castillo */}
      <svg style={{ ...SILO_BASE, ...SILOS[2].style, filter: `drop-shadow(0 0 10px ${SILOS[2].color})` }} viewBox="0 0 32 32"><g fill="#f5ff00">
        <rect x="10" y="0" width="12" height="4"/>
        <rect x="6" y="4" width="20" height="4"/>
        <rect x="4" y="8" width="6" height="6"/><rect x="22" y="8" width="6" height="6"/>
        <rect x="2" y="14" width="28" height="10"/>
        <rect x="6" y="24" width="4" height="4"/><rect x="14" y="24" width="4" height="4"/><rect x="22" y="24" width="4" height="4"/>
      </g></svg>

      {/* s4: Cruz/mira */}
      <svg style={{ ...SILO_BASE, ...SILOS[3].style, filter: `drop-shadow(0 0 10px ${SILOS[3].color})` }} viewBox="0 0 24 24"><g fill="#00ff88">
        <rect x="10" y="0" width="4" height="24"/>
        <rect x="0" y="10" width="24" height="4"/>
        <rect x="6" y="6" width="12" height="12" fill="none" stroke="#00ff88" strokeWidth="2"/>
      </g></svg>

      {/* s5: UFO */}
      <svg style={{ ...SILO_BASE, ...SILOS[4].style, filter: `drop-shadow(0 0 10px ${SILOS[4].color})` }} viewBox="0 0 36 24"><g fill="#aa00ff">
        <rect x="14" y="2" width="8" height="4"/>
        <rect x="10" y="6" width="16" height="4"/>
        <rect x="4" y="10" width="28" height="4"/>
        <rect x="0" y="14" width="36" height="4"/>
        <rect x="6" y="18" width="4" height="2"/><rect x="16" y="18" width="4" height="2"/><rect x="26" y="18" width="4" height="2"/>
      </g></svg>

      {/* s6: Moneda */}
      <svg style={{ ...SILO_BASE, ...SILOS[5].style, filter: `drop-shadow(0 0 10px ${SILOS[5].color})` }} viewBox="0 0 20 20"><g fill="#ffcf3a">
        <rect x="6" y="0" width="8" height="2"/>
        <rect x="2" y="2" width="16" height="2"/>
        <rect x="0" y="4" width="20" height="12"/>
        <rect x="2" y="16" width="16" height="2"/>
        <rect x="6" y="18" width="8" height="2"/>
        <rect x="8" y="4" width="4" height="12" fill="#0a0a0f"/>
      </g></svg>

      {/* s7: Corazón */}
      <svg style={{ ...SILO_BASE, ...SILOS[6].style, filter: `drop-shadow(0 0 10px ${SILOS[6].color})` }} viewBox="0 0 24 22"><g fill="#ff3060">
        <rect x="2" y="2" width="6" height="2"/><rect x="16" y="2" width="6" height="2"/>
        <rect x="0" y="4" width="10" height="4"/><rect x="14" y="4" width="10" height="4"/>
        <rect x="0" y="8" width="24" height="4"/>
        <rect x="2" y="12" width="20" height="2"/>
        <rect x="4" y="14" width="16" height="2"/>
        <rect x="6" y="16" width="12" height="2"/>
        <rect x="8" y="18" width="8" height="2"/>
        <rect x="10" y="20" width="4" height="2"/>
      </g></svg>

      {/* s8: D-pad */}
      <svg style={{ ...SILO_BASE, ...SILOS[7].style, filter: `drop-shadow(0 0 10px ${SILOS[7].color})` }} viewBox="0 0 24 24"><g fill="#00d4ff">
        <rect x="8" y="2" width="8" height="6"/>
        <rect x="2" y="8" width="20" height="8"/>
        <rect x="8" y="16" width="8" height="6"/>
        <rect x="11" y="6" width="2" height="2" fill="#0a0a0f"/>
        <rect x="11" y="16" width="2" height="2" fill="#0a0a0f"/>
        <rect x="4" y="11" width="2" height="2" fill="#0a0a0f"/>
        <rect x="18" y="11" width="2" height="2" fill="#0a0a0f"/>
      </g></svg>
    </div>
  )
}
