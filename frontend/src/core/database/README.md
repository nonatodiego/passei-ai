# Local Database

Dexie-backed IndexedDB storage. Schema version 1 never clears data automatically. Seed is idempotent; backup import is transactional; reset is manual through `resetDatabase`.
