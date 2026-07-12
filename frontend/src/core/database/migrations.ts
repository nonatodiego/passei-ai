import { DATABASE_SCHEMA_VERSION } from './schema';
export const migrations = [{ version: DATABASE_SCHEMA_VERSION, description: 'Initial local-first schema. Existing data is never cleared automatically.' }];
