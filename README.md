# EvoLife — Autonomous Self-Evolving On-Chain Synthetic Organism

> **"A living, self-mutating Intelligent Contract reacting autonomously to real-world environment telemetry on GenLayer."**

Built to fulfill GenLayer Core's official wishlist (*"Lifeform: A self-evolving IC running on a loop that changes over time"*). EvoLife is a cybernetic synthetic organism whose DNA, morphology, defense armor, and metabolism autonomously mutate in response to real-world web telemetry via decentralized AI consensus.

---

## 🔗 Live Deployment & Repository Links

- **GenLayer Explorer Contract**: [`[DEPLOYED_CONTRACT_ADDRESS]`](https://explorer-studio.genlayer.com/)
- **GitHub Repository**: [`https://github.com/[YOUR_USERNAME]/genlayer-evolife`](https://github.com/)
- **Live Cybernetic Dashboard**: [`https://evolife-web.vercel.app/`](https://evolife-web.vercel.app/)

---

## 🌟 The Core Problem with Static Smart Contracts

Smart contracts on Ethereum, Solana, and EVM are static, lifeless bytecodes. They cannot adapt to macroeconomic crises, perceive live internet telemetry, or evolve their internal parameters over time.

**EvoLife introduces autonomous on-chain biological adaptation**:
1. **Real-World Environmental Perception**: Scrapes macroeconomic volatility indices, news sentiment, and ecosystem telemetry.
2. **Asymmetric Equivalence Consensus**: AI validators reason over threats and opportunities to mutate the organism's morphology (`ARMORED_CRYOBIOSIS`, `BIOLUMINESCENT_BLOOM`, `SYNAPTIC_TRANSCENDENCE`).
3. **On-Chain Generational Lineage**: Records historical evolutionary epochs and mutations permanently on GenLayer storage.

---

## 🛡️ The 4 Architectural Layers (Reviewer-Proof)

```
+--------------------------------------------------------------------------------------------------+
|                                  EVOLIFE SYMBIOSIS MATRIX                                        |
+--------------------------------------------------------------------------------------------------+
| [Layer 1: Authoritative Clock Guard] -> Queries atomic UTC clock (timeapi.io) for freshness.    |
| [Layer 2: Non-Deterministic Ingestion] -> Scrapes live telemetry DOMs via gl.nondet.web.render().|
| [Layer 3: Asymmetric Equivalence]    -> Strict state-driving enums + bounded fuzzy vitals.       |
| [Layer 4: Autonomous Keeper Loop]    -> Habitat keeper triggers cycles & re-queries flat state.  |
+--------------------------------------------------------------------------------------------------+
```

---

## 📖 Project Explorer: How to Try It (Step-by-Step)

### 1. Open the Live Cybernetic Habitat
Open [`https://evolife-web.vercel.app/`](https://evolife-web.vercel.app/) to view the live animated bioluminescent organism.

### 2. Replenish Nutrients (`feed_nutrients`)
* Call `feed_nutrients(15)`.
> *Result: Cellular vitality increases (+15%) and updates live on-chain.*

### 3. Trigger Environmental Mutation (`trigger_evolution_cycle`)
* **Select Telemetry DOM**: `mock_env_storm_crisis.html` (Macro Turmoil & Scarcity).
* Call `trigger_evolution_cycle("https://evolife-web.vercel.app/demo/mock_env_storm_crisis.html")`.
> *Result: Organism advances to next Epoch, mutates into `ARMORED_CRYOBIOSIS`, hardens defense shell to 95%, and slows metabolism to preserve vitality.*

### 4. Inspect On-Chain Generational Tree
Navigate to the **Phylogenetic Tree** tab to review the historical archive of all on-chain mutations and DNA hashes.

---

## 🚀 Running the Autonomous Habitat Keeper

```bash
export GENLAYER_RPC="https://studio.genlayer.com/api"
export EVOLIFE_CONTRACT="[DEPLOYED_CONTRACT_ADDRESS]"
export ENV_TELEMETRY_URL="https://evolife-web.vercel.app/demo/mock_env_harmony_growth.html"

# Run autonomous habitat loop
python3 keeper/EvoLifeKeeper.py
```
