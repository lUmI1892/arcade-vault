---
id: 04
title: Home Landing + About/Contact
state: Implementado
dependencies: [03]
date: 2026-07-06
objective: Reemplazar la ruta raíz con una landing page y agregar la pantalla About/Contact, trasladando la biblioteca actual a /games.
---

## Alcance

### Dentro
- Ruta `/` — landing page completa (hero, ¿por qué?, preview de juegos, stats, actividad en vivo, precios, CTA final)
- Ruta `/about` — misión, highlights, divider animado, formulario de contacto con lógica (shake + success terminal)
- Componente `FloatingSilhouettes` — 8 siluetas SVG pixel animadas en el hero
- Componente `FeatureIcon` — 4 íconos pixel SVG para la sección "¿Por qué?"
- Componente `HighlightIcon` — 3 íconos pixel SVG para el hero de About
- Sección "Actividad en vivo" — datos hardcodeados como constante en `app/data/activity.ts`
- Migrar `app/page.tsx` de redirect a `/biblioteca` → landing page completa
- Renombrar ruta `/biblioteca` → `/games`
- Actualizar `Nav` para reflejar el nuevo link `/games` (en lugar de `/biblioteca`)
- Todos los estilos nuevos de home y about incorporados en `app/globals.css`

### Fuera
- Navegación funcional entre páginas (botones son estáticos)
- Envío real del formulario de contacto (solo UI con estado local)
- Animación de scroll automático del ticker de actividad
- Rutas `/juego/[id]` y `/salon` (ya implementadas en spec 03)

## Modelo de datos

### `app/data/activity.ts`
```ts
type RecentScore = {
  player: string
  game: string
  score: number
  time: string        // "hace X min"
  color: 'cyan' | 'magenta' | 'yellow' | 'green'
}

type TopPlayer = {
  rank: number
  player: string
  score: number
}

export const RECENT_SCORES: RecentScore[]  // 7 entradas — datos del template
export const TOP_PLAYERS: TopPlayer[]      // 5 entradas — datos del template
```

Sin cambios en `app/data/games.ts`, `scores.ts` ni `players.ts` — la sección de preview
de juegos reutiliza `GAMES` (primeros 6 elementos).

## Plan de implementación

1. Renombrar `app/biblioteca/` → `app/games/` y actualizar el link en `Nav`.

2. Crear `app/data/activity.ts` con las constantes `RECENT_SCORES` y `TOP_PLAYERS`.

3. Agregar a `app/globals.css` todos los estilos nuevos del template:
   home hero, siluetas flotantes, secciones, feature cards, mini-rail,
   stats block, activity grid, ticker, top-list, pricing, about hero,
   highlight row, about divider, contact form, terminal success.

4. Crear `app/components/FloatingSilhouettes.tsx` — 8 SVGs pixel con clases `.silo`.

5. Crear `app/components/FeatureIcon.tsx` — 4 íconos pixel (GAMEPAD, FREE, TROPHY, ROCKET).

6. Crear `app/components/HighlightIcon.tsx` — 3 íconos pixel (HEART, BROWSER, PLANT).

7. Reemplazar `app/page.tsx` con la landing page completa: hero, why, games preview,
   stats, actividad en vivo, precios, CTA final. Client Component (`"use client"`).

8. Crear `app/about/page.tsx` — hero de misión, divider animado, formulario de contacto
   con useState (shake + success terminal). Client Component.

9. Agregar link "ABOUT" al Nav apuntando a `/about`.

## Criterios de aceptación

- [ ] `/` renderiza la landing completa: hero con siluetas, 4 feature cards, 6 mini-cards de juegos, 3 stat blocks, actividad en vivo (scores + top players), sección de precios con FAQ, CTA final
- [ ] `/about` renderiza el hero de misión, 3 highlights, divider animado y formulario de contacto
- [ ] El formulario de `/about` hace shake si se envía vacío y muestra el terminal de éxito si todos los campos están llenos
- [ ] `/games` responde correctamente (la biblioteca anterior no se rompe)
- [ ] El Nav refleja los links actualizados: incluye `/games` y `/about`
- [ ] Las siluetas flotantes del hero son visibles y tienen animación CSS
- [ ] No hay errores de TypeScript (`tsc --noEmit` pasa limpio)
- [ ] No hay errores de consola en `/`, `/about` ni `/games`

## Decisiones tomadas

- **`/` como landing en lugar de redirect** — el proyecto escala mejor con una home dedicada; `/biblioteca` se convierte en `/games` para mantener coherencia semántica con el resto del sistema.
- **Ruta `/about` en inglés** — consistente con la convención de rutas del proyecto (spec 03 usó `/auth`, `/salon` en español fue excepción por branding).
- **Datos de actividad en `app/data/activity.ts`** — constante TypeScript en lugar de inline, consistente con el patrón de `games.ts` y `scores.ts` del spec 03.
- **Formulario de contacto con lógica (shake + success terminal)** — es la única interactividad de UI que no implica backend ni persistencia; se mantiene fiel al template.
- **Botones de navegación estáticos** — la navegación funcional entre páginas se delega a un spec posterior, igual que en spec 03.
- **Componentes SVG extraídos** — `FloatingSilhouettes`, `FeatureIcon` y `HighlightIcon` se crean como componentes separados para mantener `page.tsx` legible.
