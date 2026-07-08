---
id: 06
title: Supabase — Configuración inicial
state: implementado
dependencies: [05]
date: 2026-07-07
objective: Instalar y configurar el cliente Supabase con @supabase/ssr en Next.js App Router, dejando la infraestructura lista para auth y datos reales en specs posteriores.
---

## Alcance

### Dentro

- Instalar `@supabase/supabase-js` y `@supabase/ssr`
- Crear `lib/supabase/client.ts` — cliente para Client Components (browser)
- Crear `lib/supabase/server.ts` — cliente para Server Components (cookies)
- Agregar `NEXT_PUBLIC_SUPABASE_URL` y `NEXT_PUBLIC_SUPABASE_ANON_KEY` al `.env` existente
- Verificación: `tsc --noEmit` y `next build` pasan sin errores

### Fuera

- Tablas, migraciones o esquema de base de datos
- Autenticación de usuarios (spec siguiente)
- Reemplazar datos hardcodeados por datos reales de Supabase
- Generación de tipos TypeScript (`supabase gen types`) — se hace cuando haya tablas
- Ruta de health check o ping a Supabase

## Plan de implementación

1. Instalar dependencias:
   `npm install @supabase/supabase-js @supabase/ssr`

2. Agregar al `.env` existente:

   ```
   NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxx...
   ```

3. Crear `lib/supabase/client.ts`:
   - Exporta `createBrowserClient` de `@supabase/ssr`
   - Función `createClient()` que usa las variables de entorno públicas

4. Crear `lib/supabase/server.ts`:
   - Exporta `createServerClient` de `@supabase/ssr`
   - Función `createClient()` async que lee cookies con `await cookies()` de `next/headers`

5. Verificar: `tsc --noEmit` y `next build` pasan sin errores

## Criterios de aceptación

- [ ] `@supabase/supabase-js` y `@supabase/ssr` aparecen en `package.json`
- [ ] `NEXT_PUBLIC_SUPABASE_URL` y `NEXT_PUBLIC_SUPABASE_ANON_KEY` están en `.env`
- [ ] `lib/supabase/client.ts` exporta una función `createClient()` para el browser
- [ ] `lib/supabase/server.ts` exporta una función `createClient()` async para Server Components
- [ ] `tsc --noEmit` pasa sin errores
- [ ] `next build` completa sin errores
- [ ] Las variables de entorno nunca se acceden directamente fuera de `lib/supabase/`

## Decisiones tomadas

- **`@supabase/ssr` sobre `@supabase/supabase-js` directo** — el helper oficial para Next.js App Router maneja cookies automáticamente, dejando la base lista para auth en el spec siguiente sin refactoring.
- **Dos clientes separados (`client.ts` / `server.ts`)** — patrón oficial de Supabase para App Router; el cliente browser no puede leer cookies de servidor y viceversa.
- **Variables en `.env` existente** — consistente con la convención del proyecto (spec 05 usó el mismo archivo para `RESEND_API_KEY`).
- **Sin generación de tipos** — `supabase gen types` se ejecuta cuando haya tablas reales; generarlo ahora produciría un archivo vacío sin valor.
- **Sin health check ni ping** — el build limpio es suficiente verificación para una integración de infraestructura sin features concretas aún.
