'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NAV_LINKS = [
  { href: '/biblioteca', label: 'Biblioteca' },
  { href: '/salon', label: 'Salón de la Fama' },
]

export default function Nav() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + '/')

  return (
    <>
      <nav className="av-nav">
        <Link href="/biblioteca" className="logo">
          <div className="logo-mark" />
          <div className="logo-text">
            <span className="neon-cyan">ARCADE </span>
            <span className="neon-magenta">VAULT</span>
          </div>
        </Link>
        <div className="links">
          {NAV_LINKS.map(({ href, label }) => (
            <Link key={href} href={href} className={isActive(href) ? 'active' : ''}>
              {label}
            </Link>
          ))}
        </div>
        <div className="spacer" />
        <div className="coin-counter">
          <span className="coin" />
          <span>CRÉDITOS · 03</span>
        </div>
        <Link href="/auth" className="auth-btn">
          <button className="btn" style={{ fontSize: '10px', padding: '12px 20px' }}>
            Iniciar Sesión
          </button>
        </Link>
        <button
          className="btn ghost hamburger"
          aria-label="Menú"
          onClick={() => setOpen(true)}
        >
          ≡
        </button>
      </nav>

      <div
        className={`av-mobile-backdrop${open ? ' open' : ''}`}
        onClick={() => setOpen(false)}
      />
      <aside className={`av-mobile-panel${open ? ' open' : ''}`}>
        <div className="pixel neon-cyan" style={{ fontSize: 11, marginBottom: 16 }}>MENÚ</div>
        {NAV_LINKS.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className={isActive(href) ? 'active' : ''}
            onClick={() => setOpen(false)}
          >
            {label}
          </Link>
        ))}
        <Link
          href="/auth"
          className={isActive('/auth') ? 'active' : ''}
          onClick={() => setOpen(false)}
        >
          Iniciar Sesión
        </Link>
        <div style={{ flex: 1 }} />
        <div className="pixel" style={{ fontSize: 9, color: 'var(--ink-faint)', letterSpacing: '0.16em' }}>
          CRÉDITOS · 03
        </div>
      </aside>
    </>
  )
}
