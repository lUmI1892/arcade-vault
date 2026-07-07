'use client'

import { useState } from 'react'

type Tab = 'login' | 'signup'

export default function AuthPage() {
  const [tab, setTab] = useState<Tab>('login')

  return (
    <div className="av-auth-wrap">
      <div className="auth-card">
        <div className="auth-header">
          <div className="mark" />
          <h2 className="neon-cyan">ARCADE VAULT</h2>
        </div>

        <div className="auth-tabs">
          <button className={tab === 'login' ? 'on' : ''} onClick={() => setTab('login')}>
            LOGIN
          </button>
          <button className={tab === 'signup' ? 'on' : ''} onClick={() => setTab('signup')}>
            REGISTRO
          </button>
        </div>

        {tab === 'signup' && (
          <div className="field">
            <label>Email</label>
            <input type="email" placeholder="tu@email.com" readOnly />
          </div>
        )}

        <div className="field">
          <label>Jugador</label>
          <input type="text" placeholder="PX_KAI" readOnly />
        </div>

        <div className="field">
          <label>Contraseña</label>
          <input type="password" placeholder="••••••••" readOnly />
        </div>

        <button className="btn" style={{ width: '100%', marginTop: '8px' }}>
          {tab === 'login' ? 'ENTRAR' : 'CREAR CUENTA'}
        </button>

        <div className="auth-divider">O CONTINÚA CON</div>

        <div className="social">
          <button className="btn ghost">GOOGLE</button>
          <button className="btn ghost">DISCORD</button>
        </div>
      </div>
    </div>
  )
}
