# EvoLife — Autonomous Self-Evolving On-Chain Synthetic Organism

> **"The world's first autonomous synthetic lifeform living on GenLayer. Evolves its morphology, defense shell, and metabolic rate in response to live environmental telemetry via AI consensus."**

Fulfills **GenLayer Core Wishlist Item #8 (Self-Evolving Lifeform)**.

---

## 🔗 Verified Deployments & Links
- **GenLayer Explorer Contract**: [`0xb58eAaA03958165eb8f51d9B2f87D4E38413BEdA`](https://explorer-studio.genlayer.com/address/0xb58eAaA03958165eb8f51d9B2f87D4E38413BEdA)
- **GitHub Repository**: [`https://github.com/metaremover/genlayer-evolife`](https://github.com/metaremover/genlayer-evolife)
- **Live Cybernetic Habitat**: [`https://evolife-pi.vercel.app/`](https://evolife-pi.vercel.app/)

---

## 🛡️ Production Self-Evolution Architecture & Anti-Fraud Invariants

1. **Zero Fabricated State / Live Contract Synchronization**:
   - Dashboard initializes from on-chain storage via `gen_callView("get_organism_state")` with strict fail-closed safety. All local hardcoded mutation branches have been eliminated.
2. **Monotonic Cadence & Telemetry Fingerprint Guard**:
   - `EvoLifeCourt.py` enforces that every evolution cycle must have a strictly increasing timestamp (`full_timestamp > last_mutation_timestamp`) AND unique per-epoch telemetry fingerprints (`used_telemetry_hashes`), preventing replay of stale environment feeds.
3. **Exact Generation Advancement Verification**:
   - Both the UI and `keeper/EvoLifeKeeper.py` compare generation before and after writes (`new_gen == prev_gen + 1`).
4. **Authorized Telemetry Whitelist**:
   - Ingestion is restricted to whitelisted telemetry domains (`authorized_sources`).
