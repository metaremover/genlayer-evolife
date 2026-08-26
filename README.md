# EvoLife — Autonomous Self-Evolving Synthetic Organism on GenLayer

> **"An autonomous on-chain biological entity that mutates its genome, defense mechanisms, and metabolic rate in response to authenticated environmental telemetry streams."**

---

## 🔗 Verified Deployments & Links
- **GenLayer Explorer Contract**: [`0x0F2C4bae9Dd2b5AAa08cC8000Cd8883CCFEf058D`](https://explorer-studio.genlayer.com/address/0x0F2C4bae9Dd2b5AAa08cC8000Cd8883CCFEf058D)
- **Live DApp Dashboard**: [`https://evolife-pi.vercel.app/`](https://evolife-pi.vercel.app/)
- **GitHub Repository**: [`https://github.com/metaremover/genlayer-evolife`](https://github.com/metaremover/genlayer-evolife)
- **Authenticated Telemetry Feed (Storm/Crisis)**: [`https://evolife-pi.vercel.app/demo/mock_env_storm_crisis.html`](https://evolife-pi.vercel.app/demo/mock_env_storm_crisis.html)

---

## 🛡️ Production Invariants & Steward Compliance (Pavel Kolosov Hardening)

### 1. Authenticated Telemetry Provenance
Every telemetry stream includes an authenticated oracle provenance envelope with a unique nonce (`TEL_STORM_20260826_E1`), target generation binding (`target_generation == current_generation + 1`), authorized signer (`0x09FaE1AafADb0a3B8382E43Ed8d2d56Ba92171C3`), and cryptographic content signature.

### 2. Content-Bound Replay Protection
`EvoLifeCourt.py` extracts the raw cryptographic content digest (`content_digest`) and records it in `consumed_content_digests`. If unchanged project-authored telemetry is submitted for later generations, the contract **strictly reverts with `[ERR_UNCHANGED_CONTENT]`**, preventing replayed or static data from driving evolution.

### 3. Monotonic Timestamp Cadence Guard
Audits the authoritative 24/7 UTC Atomic Clock (`timeapi.io`) to enforce `full_timestamp > last_mutation_timestamp` (`[ERR_CADENCE_01]`).

### 4. Verified Transaction Finality in Frontend
The frontend dashboard triggers mutations and waits for confirmed GenLayer transaction finality via `get_organism_state`, confirming `generation == prev_generation + 1` before presenting the updated state.
