# ADR-007 - Local-First Persistence

## Status

Accepted.

## Decision

Use IndexedDB through Dexie for the MVP, with repositories/services as the only access path, schema versioning, idempotent seeds and transactional JSON backups.

## Consequences

Data is bound to the browser origin and is not synchronized between devices. Preview deployments must not be used as the daily production origin. Backend synchronization remains a future explicit migration.
