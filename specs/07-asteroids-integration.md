---
id: 07
title: Asteroids — Integración en Next.js
state: implementado
dependencies: [06]
date: 2026-07-07
objective: Integrar el juego Asteroids (canvas HTML5 puro) en la ruta /games/asteroids como un componente React client-side, sin alterar la lógica del juego ni el layout de la plataforma.
---

## Alcance

### Dentro

- Crear la ruta `app/games/asteroids/page.tsx`
- Crear `app/games/asteroids/_components/AsteroidsGame.tsx` — componente `'use client'` que contiene toda la lógica del canvas
- Portar `references/started-games/02-asteroids/game.js` a TypeScript dentro del componente, inicializando el loop en `useEffect` y limpiando listeners al desmontar
- Canvas fijo 800×600, centrado en la página
- Usar el layout existente de la plataforma (header/nav)
- Los estados del juego (`playing`, `dead`, `gameover`) se mantienen tal cual — manejados internamente en el canvas

### Fuera

- Power-ups (ya existen en el juego original pero se excluyen de esta integración)
- Controles táctiles / móvil
- Persistencia de puntuaciones en Supabase (spec posterior)
- Pantalla de bienvenida a nivel React
- Canvas responsivo

## Plan de implementación

1. Crear `app/games/asteroids/page.tsx`
   - Server Component simple que importa y renderiza `AsteroidsGame`
   - Usa el layout existente de la plataforma

2. Crear `app/games/asteroids/_components/AsteroidsGame.tsx`
   - Directiva `'use client'` al tope
   - `useRef<HTMLCanvasElement>` para el canvas
   - `useEffect` que inicializa el game loop (clases `Bullet`, `Asteroid`, `Ship`, `Particle`, función `loop`)
   - El `useEffect` retorna un cleanup que cancela el `requestAnimationFrame` activo y elimina los `keydown`/`keyup` listeners de `window`
   - Todo el código de `game.js` se porta dentro del effect, excluyendo la sección de power-ups

3. Excluir del port las constantes y clases relacionadas con power-ups:
   `POWERUP_DROP_CHANCE`, `POWERUP_DURATION`, `POWERUP_TTL`, `TRIPLE_SPREAD` y la lógica asociada en `Ship` y `Asteroid`

4. Centrar el canvas en la página con Tailwind (`flex items-center justify-center`)

5. Verificar: `tsc --noEmit` y `next dev` corren sin errores; el juego es jugable en `/games/asteroids`

## Criterios de aceptación

- [ ] La ruta `/games/asteroids` carga sin errores en `next dev`
- [ ] El canvas 800×600 se muestra centrado usando el layout existente de la plataforma
- [ ] El juego inicia, las teclas `←` `→` `↑` y `Espacio` funcionan correctamente
- [ ] Los asteroides se parten al recibir impactos y suman puntos correctamente
- [ ] El estado `gameover` se muestra al perder las 3 vidas
- [ ] Al desmontar el componente no quedan listeners ni `requestAnimationFrame` activos (sin memory leaks)
- [ ] `tsc --noEmit` pasa sin errores
- [ ] No hay código de power-ups en el componente portado

## Decisiones tomadas

- **Componente `'use client'` sobre iframe** — integración limpia con el sistema de la plataforma; permite acceso al DOM del canvas y limpieza controlada de listeners. Un iframe aislaría el juego del contexto React.
- **Port a TypeScript dentro de `useEffect`** — toda la lógica del juego vive en un solo effect; evita estado global de módulo que rompería al montar/desmontar el componente más de una vez.
- **Canvas fijo 800×600** — mantiene la experiencia original sin refactoring de coordenadas; responsividad queda para un spec posterior si se necesita.
- **Power-ups excluidos** — están en el código original pero no forman parte del MVP de integración; se incluirán en un spec dedicado.
- **Scoring no persistido** — la puntuación se muestra en canvas como en el original; el guardado en Supabase es responsabilidad de un spec posterior.
- **Layout existente reutilizado** — consistente con el resto de páginas de la plataforma; no se crea un layout especial para juegos.
