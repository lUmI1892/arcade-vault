---
id: 05
title: Contact Form — Resend Email Integration
state: implementado
dependencies: [04]
date: 2026-07-06
objective: Conectar el formulario de contacto de /about con Resend para enviar correos reales al equipo vía API Route de Next.js.
---

## Alcance

### Dentro
- Instalar el paquete `resend` como dependencia
- Crear `app/api/contact/route.ts` — POST handler que recibe `{ name, email, msg }` y envía el correo con Resend
- Modificar `app/about/page.tsx` — reemplazar `setSent(form.name.trim())` por un `fetch` real a la API Route
- Estados de UI: loading (botón deshabilitado), success (terminal actual), error (mensaje inline en el form)
- Variables de entorno: `RESEND_API_KEY` y `CONTACT_TO_EMAIL` leídas desde `.env`

### Fuera
- Verificación de dominio propio en Resend (se usa sandbox `onboarding@resend.dev`)
- Rate limiting o captcha en el formulario
- Almacenamiento de mensajes en base de datos
- Notificación de confirmación al usuario que envía el mensaje
- Template HTML enriquecido para el correo (se usa texto plano)

## Modelo de datos

### Payload `POST /api/contact`
```ts
type ContactPayload = {
  name: string   // mínimo 1 carácter tras trim
  email: string  // formato válido
  msg: string    // mínimo 1 carácter tras trim
}
```

### Variables de entorno (`.env`)
```
RESEND_API_KEY=re_xxxxxxxxxxxx   # API key de Resend (ficticia hasta configurar cuenta)
CONTACT_TO_EMAIL=miguel18592@gmail.com
```

La API Route retorna `{ ok: true }` en éxito o `{ ok: false, error: string }` en fallo.

## Plan de implementación

1. Instalar dependencia: `npm install resend`

2. Agregar a `.env`:
   - `RESEND_API_KEY=re_xxxxxxxxxxxx`
   - `CONTACT_TO_EMAIL=miguel18592@gmail.com`

3. Crear `app/api/contact/route.ts`:
   - Leer body JSON `{ name, email, msg }`
   - Validar que los tres campos no estén vacíos tras trim
   - Instanciar `new Resend(process.env.RESEND_API_KEY)`
   - Llamar `resend.emails.send({ from: 'onboarding@resend.dev', to: process.env.CONTACT_TO_EMAIL, subject: '...', text: '...' })`
   - Retornar `{ ok: true }` o `{ ok: false, error: string }` con status HTTP apropiado

4. Modificar `app/about/page.tsx`:
   - Agregar estado `loading: boolean`
   - Reemplazar `setSent(form.name.trim())` por `fetch('/api/contact', { method: 'POST', body: JSON.stringify(form) })`
   - Deshabilitar el botón durante `loading`
   - En éxito `{ ok: true }`: llamar `setSent(form.name.trim())` — el terminal de éxito existente se muestra sin cambios
   - En fallo `{ ok: false }`: mostrar mensaje de error inline bajo el botón

## Criterios de aceptación

- [x] `npm install resend` agrega el paquete a `package.json`
- [x] `POST /api/contact` con campos válidos retorna `{ ok: true }` y status 200
- [x] `POST /api/contact` con campos vacíos retorna `{ ok: false }` y status 400
- [x] `POST /api/contact` con `RESEND_API_KEY` inválida retorna `{ ok: false }` y status 500
- [x] El botón "ENVIAR MENSAJE" se deshabilita mientras el fetch está en curso
- [x] Si el envío es exitoso, aparece el terminal de éxito con el nombre del usuario
- [x] Si el envío falla, aparece un mensaje de error inline bajo el botón sin resetear el formulario
- [x] No hay errores de TypeScript (`tsc --noEmit` pasa limpio)
- [x] Las variables `RESEND_API_KEY` y `CONTACT_TO_EMAIL` se leen desde `.env` y nunca se exponen al cliente

## Decisiones tomadas

- **API Route sobre Server Action** — más explícita, testeable con `curl`, y separa la lógica de envío del componente de UI.
- **Dominio sandbox `onboarding@resend.dev`** — permite envío real sin verificar dominio propio; se reemplaza cuando se configure dominio en Resend.
- **Variables en `.env` (no `.env.local`)** — decisión del usuario; `RESEND_API_KEY` ficticia hasta configurar cuenta real en Resend.
- **Sin template HTML** — correo en texto plano para mantener el scope mínimo; se puede enriquecer en un spec posterior.
- **Sin rate limiting ni captcha** — fuera de scope; se delega a un spec posterior si el formulario se expone a abuso.
- **Terminal de éxito sin cambios** — la UI de confirmación del spec 04 se reutiliza tal cual; solo cambia el trigger (fetch real en lugar de `setSent` directo).
