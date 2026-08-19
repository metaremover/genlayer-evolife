# EvoLife — GenLayer Studio Test Log & Validation Suite

This document records the test cases and execution log for **EvoLifeCourt** in GenLayer Studio.

---

## 📋 Comprehensive Test Matrix

| Test Case | Description | Telemetry Evidence DOM | Expected Output | Expected Morph State |
|---|---|---|---|---|
| **TC-01** | Macro Turmoil / Storm Crisis | `mock_env_storm_crisis.html` | State: `ARMORED_CRYOBIOSIS`, Defense: `95%` | Defensive Shell Hardened |
| **TC-02** | Abundance & Ecosystem Harmony | `mock_env_harmony_growth.html` | State: `BIOLUMINESCENT_BLOOM`, Vitality: `98%` | Cellular Vitality Surge |
| **TC-03** | Novel Cognitive Anomaly | `mock_env_novel_anomaly.html` | State: `SYNAPTIC_TRANSCENDENCE`, Adaptation: `99%` | Sensory Tendril Sprouting |

---

## 🛠️ Step-by-Step Studio Execution Template

### 1. Deploy Contract
Deploy `EvoLifeCourt.py` in Studio with your wallet as `operator`.

### 2. Inspect Genesis State (`get_organism_state`)
```json
{
  "organism_id": "ORGANISM_SYNTH_001",
  "generation": 0,
  "morph_class": "GENESIS_PROTO_AMOEBA",
  "vitality": 80,
  "defense_level": 30,
  "metabolism_rate": 50
}
```

### 3. Replenish Nutrients (`feed_nutrients`)
* `nutrient_amount`: `15`
> *Returns: `"Vitality: 95%"`*

### 4. Trigger TC-01 Mutation (`trigger_evolution_cycle`)
* `env_feed_url`: `"https://evolife-web.vercel.app/demo/mock_env_storm_crisis.html"`
* Call `get_organism_state`:
```json
{
  "generation": 1,
  "morph_class": "ARMORED_CRYOBIOSIS",
  "defense_level": 95,
  "metabolism_rate": 25
}
```
