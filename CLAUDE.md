# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Project

Arcade Vault is an online gaming platform for competing and earning points. It follows **Spec Driven Design** using `/spec` and `/spec-impl` directories.

## Commands

```bash
npm run dev      # Start dev server (Turbopack, outputs to .next/dev)
npm run build    # Production build (Turbopack by default)
npm run start    # Start production server
npm run lint     # Run ESLint directly (NOT next lint — removed in v16)
```

No test runner is configured yet.

## Architecture

- **Framework**: Next.js 16.2.10 with App Router (`app/`) — do not use Pages Router
- **React**: 19.2.4 with Server Components by default
- **Styling**: Tailwind CSS v4 via `@tailwindcss/postcss` (new plugin, not `tailwindcss/nesting`)
- **Language**: TypeScript 5 strict mode; path alias `@/*` maps to project root
- **Bundler**: Turbopack (default for both `dev` and `build`); webpack config will break the build

## Next.js 16 Breaking Changes

Always read `node_modules/next/dist/docs/` before writing new features. Critical changes:

**Async Request APIs** — `cookies()`, `headers()`, `draftMode()`, `params`, and `searchParams` are now fully async. Always `await` them:
```tsx
export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
}
```
Run `npx next typegen` to generate `PageProps`, `LayoutProps`, and `RouteContext` helpers.

**Middleware → Proxy** — rename `middleware.ts` to `proxy.ts`; export `proxy` instead of `middleware`. Edge runtime is NOT supported in proxy files.

**`next lint` removed** — use `eslint` CLI directly (already in `package.json`).

**Caching** — `use cache` directive replaces `experimental.useCache`/`experimental.dynamicIO`. Enable with `cacheComponents: true` in `next.config.ts`. `revalidateTag` now requires a second `cacheLife` argument. New: `updateTag` (immediate) and `refresh` from `next/cache`.

**PPR** — `experimental.ppr` removed; use `cacheComponents: true` instead.

**`serverRuntimeConfig` / `publicRuntimeConfig` removed** — use `process.env` and `NEXT_PUBLIC_` prefix. Use `connection()` from `next/server` to read env vars at runtime.

**`next/image`** — `images.domains` deprecated (use `remotePatterns`). `minimumCacheTTL` default is now 4 hours. Local images with query strings require `images.localPatterns.search`.

**Parallel routes** — all `@slot` directories now require an explicit `default.js` file.

**Turbopack config** — `experimental.turbopack` moved to top-level `turbopack` in `next.config.ts`. No tilde (`~`) prefix for Sass node_modules imports.
