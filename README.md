# Conversational Commerce Mission Control

Mission control dashboard for an AI-powered conversational cross-border commerce platform, starting with Vendor Sourcing Intelligence and later expanding into Commerce Operations.

## Current scope

This repository is intentionally limited to the first visual MVP of the Vendor Sourcing Mission Control module.

Included now:

- visual dashboard MVP only
- mock vendor sourcing data only
- no external APIs connected yet
- no Commerce Operations implementation yet

Included views:

- Overview
- Vendor Leads
- Research Jobs
- Company Dossiers
- Scores
- Calls / Transcripts
- Follow-ups
- Shortlist
- Vendor Detail

## Product intent

This is not meant to be a simple scraper UI.

The long-term platform is a mission-control operating system for autonomous AI workflows that:

- discover vendors
- research websites
- extract structured data
- score operational fit
- enrich contacts
- prepare outreach and call briefs
- track follow-ups
- surface exceptions to human operators

The human should supervise, not do the primary research work manually.

## Tech choice for this MVP

- React + Vite
- TypeScript
- Tailwind
- mock data stored locally in app code

This MVP is meant to validate workflow, information architecture, and operator experience before connecting:

- Firecrawl
- Browserbase or Browserless
- Apollo
- Trillet
- Supabase

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Important notes

- No external APIs are wired yet.
- No real database is connected yet.
- The Supabase design lives in `SUPABASE_SCHEMA.sql` as a draft.
- The system architecture lives in `ARCHITECTURE.md`.
