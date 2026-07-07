---
id: 03
title: MVP Visual — Arcade Vault
state: Implementado
dependencies: []
date: 2026-07-05
objective: Implementar las 5 pantallas principales de Arcade Vault como UI estática en Next.js, sin lógica de juego ni persistencia.
---

## Alcance

### Dentro
- Pantalla `Biblioteca`: hero, búsqueda, filtros por categoría, grid de tarjetas de juegos
- Pantalla `Detalle`: ficha de juego, stats, leaderboard lateral (datos estáticos)
- Pantalla `Reproductor`: CRT con animaciones CSS, HUD (score/vidas/nivel estáticos), modal "Game Over" visible pero estático
- Pantalla `Auth`: tabs login/signup, formularios estáticos, botones sociales
- Pantalla `Salón de la Fama`: podio, tabla de rankings, tabs por juego
- Componente `Nav`: barra superior sticky, menú móvil funcional (abrir/cerrar)
- Datos ficticios en `app/data/`: 8 juegos, jugadores, scores

### Fuera
- Lógica de juego (score en tiempo real, vidas, nivel)
- Autenticación real (localStorage, backend, sesión)
- Navegación entre pantallas (cada ruta es una página independiente estática)
- Leaderboard dinámico (sin cálculo de ranking del usuario)
- Persistencia de cualquier tipo

## Modelo de datos

Ubicación: `app/data/` — archivos TypeScript con datos ficticios exportados como constantes.

### `app/data/games.ts`
```ts
type Game = {
  id: string
  title: string
  description: string        // corta (card)
  longDescription: string    // larga (detalle)
  category: 'ARCADE' | 'PUZZLE' | 'SHOOTER' | 'VERSUS'
  color: 'cyan' | 'magenta' | 'yellow' | 'green'
  bestScore: number
  playCount: number
}
// 8 juegos: BLOQUE BUSTER, CAÍDA, SERPENTINA, GLOTÓN,
//           INVASORES, ROCAS, RANARIA, DUELO PIXEL
```

### `app/data/scores.ts`
```ts
type ScoreEntry = {
  rank: number
  playerName: string
  score: number
  date: string               // "DD/MM/YYYY"
  gameId: string
}
// 12 entradas por juego (96 total), generadas con seed fijo
```

### `app/data/players.ts`
```ts
// 18 nombres de jugadores: PX_KAI, NEONFOX, Z3R0COOL, etc.
export const PLAYERS: string[]
```

## Plan de implementación

1. Crear `app/data/players.ts`, `app/data/games.ts`, `app/data/scores.ts` con todos los datos ficticios.

2. Migrar `styles.css` del template a `app/globals.css` — variables CSS, animaciones, clases de componentes.

3. Crear componente `app/components/Nav.tsx` — barra sticky con logo, links de escritorio, menú hamburguesa móvil (open/close con useState).

4. Crear `app/layout.tsx` — importa fuentes (Press Start 2P, JetBrains Mono, Courier Prime vía next/font o Google Fonts), Nav, footer, fondo `.av-bg`.

5. Crear `app/page.tsx` → ruta `/` — redirige a `/biblioteca`.

6. Crear `app/biblioteca/page.tsx` — hero, barra de búsqueda (input estático), chips de categoría, grid con todas las tarjetas de juegos desde `games.ts`.

7. Crear `app/juego/[id]/page.tsx` — ficha de juego, stats, leaderboard lateral con datos de `scores.ts` filtrados por `id`.

8. Crear `app/juego/[id]/jugar/page.tsx` — CRT con animaciones CSS, HUD estático, modal "Game Over" visible.

9. Crear `app/auth/page.tsx` — card centrada, tabs login/signup (useState), formularios estáticos.

10. Crear `app/salon/page.tsx` — podio top 3, tabs por juego (useState), tabla de rankings con datos de `scores.ts`.

## Criterios de aceptación

- [ ] `/biblioteca` renderiza el hero, input de búsqueda, 5 chips de categoría y las 8 tarjetas de juegos
- [ ] `/juego/[id]` renderiza la ficha correcta según el `id` en la URL, con leaderboard de 12 entradas
- [ ] `/juego/[id]/jugar` muestra el CRT con animaciones CSS activas (grid scroll, bob, drift) y el HUD con valores estáticos
- [ ] `/auth` muestra los dos tabs (login/signup) y el campo de email aparece/desaparece al cambiar de tab
- [ ] `/salon` muestra el podio y la tabla; los tabs de juego cambian el leaderboard visible
- [ ] `Nav` es visible en todas las rutas; el menú hamburguesa abre y cierra en móvil
- [ ] El diseño es fiel al template: colores neon, fuentes pixel, efectos de brillo y animaciones CSS
- [ ] No hay errores de TypeScript (`tsc --noEmit` pasa limpio)
- [ ] No hay errores de consola en ninguna de las 5 rutas

## Decisiones tomadas

- **Routing nativo Next.js** en lugar de hash-router del template. Razón: es lo natural del App Router y evita conflictos con SSR.
- **Datos en `app/data/`** como constantes TypeScript en lugar de JSON en `public/`. Razón: type-safety y co-ubicación con el código.
- **Sin interactividad de juego**: el reproductor es puramente visual. La lógica de score, vidas y nivel se implementa en un spec posterior.
- **Sin autenticación funcional**: la pantalla `/auth` es estática. LocalStorage y sesión se implementan en un spec posterior.
- **Sin navegación entre pantallas**: cada página es independiente. El routing entre ellas (clicks en tarjetas, botones "Jugar") se implementa en un spec posterior.
- **Definición rápida sin bloque de preguntas extendido**: el usuario confirmó avanzar con mínimas preguntas de clarificación.
