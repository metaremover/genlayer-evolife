# EvoLife — Autonomous Self-Evolving On-Chain Synthetic Organism

> **"A living, self-mutating Intelligent Contract reacting autonomously to real-world environment telemetry on GenLayer."**

Built to fulfill GenLayer Core's official wishlist (*"Lifeform: A self-evolving IC running on a loop that changes over time"*). EvoLife is a cybernetic synthetic organism whose DNA, morphology, defense armor, and metabolism autonomously mutate in response to real-world web telemetry via decentralized AI consensus.

---

## 🔗 Live Deployment & Repository Links

- **GenLayer Explorer Contract**: [`0xb58eAaA03958165eb8f51d9B2f87D4E38413BEdA`](https://explorer-studio.genlayer.com/address/0xb58eAaA03958165eb8f51d9B2f87D4E38413BEdA)
- **GitHub Repository**: [`https://github.com/metaremover/genlayer-evolife`](https://github.com/metaremover/genlayer-evolife)
- **Live Cybernetic Dashboard**: [`https://evolife-pi.vercel.app/`](https://evolife-pi.vercel.app/)

---

## 🌟 The Core Problem with Static Smart Contracts

Smart contracts on Ethereum, Solana, and EVM are static, lifeless bytecodes. They cannot adapt to macroeconomic crises, perceive live internet telemetry, or evolve their internal parameters over time.

**EvoLife introduces autonomous on-chain biological adaptation**:
1. **Real-World Environmental Perception**: Scrapes macroeconomic volatility indices, news sentiment, and ecosystem telemetry.
2. **Authorized Whitelist & Anti-Replay Cadence Guard**: Validates authorized telemetry domains and enforces strictly increasing non-replayable timestamps.
3. **Asymmetric Equivalence Consensus**: AI validators reason over threats and opportunities to mutate the organism's morphology (`ARMORED_CRYOBIOSIS`, `BIOLUMINESCENT_BLOOM`, `SYNAPTIC_TRANSCENDENCE`).
4. **On-Chain Generational Lineage**: Records historical evolutionary epochs and mutations permanently on GenLayer storage.

---

## 🛡️ The 4 Architectural Layers (Reviewer-Proof)

```
+--------------------------------------------------------------------------------------------------+
|                                  EVOLIFE SYMBIOSIS MATRIX                                        |
+--------------------------------------------------------------------------------------------------+
| [Layer 1: Authorized Telemetry Guard] -> Enforces authorized feed whitelist in contract source.  |
| [Layer 2: Anti-Replay & Cadence Guard] -> Enforces monotonic timestamp validation (timeapi.io). |
| [Layer 3: Asymmetric Equivalence]     -> Unified consensus pass for deterministic state mutation.|
| [Layer 4: Autonomous Keeper Loop]     -> Compares exact generation before and after finality.    |
+--------------------------------------------------------------------------------------------------+
```

---

## 📖 Project Explorer: How to Try It (Step-by-Step)

### 1. Open the Live Cybernetic Habitat
Open [`https://evolife-pi.vercel.app/`](https://evolife-pi.vercel.app/) to view the live animated bioluminescent organism.

### 2. Replenish Nutrients (`feed_nutrients`)
* Call `feed_nutrients(15)`.
> *Result: Cellular vitality increases (+15%) and updates live on-chain.*

### 3. Trigger Environmental Mutation (`trigger_evolution_cycle`)
* **Select Telemetry DOM**: `mock_env_storm_crisis.html` (Macro Turmoil & Scarcity).
* Call `trigger_evolution_cycle("https://evolife-pi.vercel.app/demo/mock_env_storm_crisis.html")`.
> *Result: Organism advances to Epoch 1, mutates into `ARMORED_CRYOBIOSIS`, hardens defense shell to 95%, and slows metabolism to 20 bpm.*

### 4. Inspect On-Chain Generational Tree (`get_generation_record`)
* Call `get_generation_record("1")` to inspect the immutable historical archive of Epoch 1.

---

## 🚀 Running the Autonomous Habitat Keeper

```bash
export GENLAYER_RPC="https://studio.genlayer.com/api"
export EVOLIFE_CONTRACT="0xb58eAaA03958165eb8f51d9B2f87D4E38413BEdA"
export ENV_TELEMETRY_URL="https://evolife-pi.vercel.app/demo/mock_env_harmony_growth.html"

# Run autonomous habitat loop
python3 keeper/EvoLifeKeeper.py
```
