# Architecture

## Purpose

This repository is the dedicated mission-control dashboard for an AI-powered conversational cross-border commerce platform.

The platform starts with Vendor Sourcing Intelligence and later expands into Commerce Operations.

This repository currently implements only:

- Vendor Sourcing Mission Control
- visual dashboard MVP
- mock data

It does not yet implement:

- live Firecrawl crawling
- browser fallback automation
- Apollo enrichment
- Trillet voice
- Supabase runtime integration

## Product model

One platform, two modules, one shared operating backbone.

```text
Mission Control Dashboard
|
+-- Module 1: Vendor Sourcing
|   - discovery
|   - research jobs
|   - dossiers
|   - scoring
|   - calls/transcripts
|   - follow-ups
|   - shortlist
|
+-- Module 2: Commerce Operations
    - future
    - orders
    - carts
    - payments
    - warehouse/customs
    - delivery exceptions
```

## Core principle

The agent should do the work.

The dashboard should provide:

- visibility
- traceability
- approvals when needed
- exception handling
- operational monitoring

The dashboard is not the engine.
It is the control tower for the engine.

## Planned stack

### Frontend

- React + Vite
- Tailwind
- dashboard-first UX

### Database

- Supabase Postgres
- multi-tenant structure
- real schemas, not only prefixed table names

### Backend

- Supabase Edge Functions using Deno/TypeScript
- queue-driven jobs
- idempotent workflow steps

### Research engine

- Firecrawl first
- Browserbase or Browserless + Playwright fallback
- OpenAI or Claude for reasoning and scoring

### Contact and outreach

- Apollo for contacts
- SendGrid for email
- Twilio for SMS
- Trillet later for calls

## Module 1: Vendor Sourcing

This is the first product slice.

Responsibilities:

- discover 3PLs, warehouses, customs brokers, parcel forwarders, and ecommerce logistics companies
- crawl multiple pages per company
- extract operational evidence
- score fit for conversational commerce
- prepare dossiers
- stage contacts and outreach
- track call outcomes and follow-up tasks

## Data domains

### `shared`

Shared platform layer:

- organizations
- users
- memberships
- notifications
- audit logs
- job queue
- agent runs
- settings

### `vs`

Vendor sourcing layer:

- leads
- company profiles
- source pages
- dossiers
- scorecards
- contacts
- followups
- calls
- transcripts
- shortlist

### `co`

Future commerce operations layer:

- orders
- carts
- payments
- shipments
- customs events
- support cases

## Agent workflow

```text
discover leads
-> research websites
-> extract structured data
-> score companies
-> enrich contacts
-> prepare outreach
-> capture call outcomes
-> rank shortlist
```

The dashboard reflects that workflow visually even before APIs are connected.

## Current repository scope

This repo is focused on UX and workflow validation.

Implemented now:

- mission-control navigation
- overview screen
- lead list
- research jobs
- dossier cards
- score visualization
- calls/transcripts
- follow-up queue
- shortlist
- vendor detail drilldown

## Next implementation steps

1. connect Supabase schemas from `SUPABASE_SCHEMA.sql`
2. replace mock data with database reads
3. connect Firecrawl-first research pipeline
4. connect browser fallback jobs
5. connect Apollo enrichment
6. connect Trillet voice and transcript storage
7. add review queue and notifications

## Definition of success for V1

V1 is successful when:

- the dashboard clearly communicates the full Vendor Sourcing workflow
- operators can understand state transitions at a glance
- the information model is stable enough to wire into real agents later
- the repo is cleanly separated from unrelated storefront code
