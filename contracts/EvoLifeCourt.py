# { "Depends": "py-genlayer:1jb45aa8ynh2a9c9xn3b7qqh8sm5q93hwfp7jqmwsfhh8jpz09h6" }
import json
import re
import hashlib
from dataclasses import dataclass
from genlayer import *


@allow_storage
@dataclass
class OrganismState:
    organism_id: str
    generation: u256
    name: str
    morph_class: str
    vitality: u256
    defense_level: u256
    metabolism_rate: u256
    adaptation_score: u256
    dna_hash: str
    last_mutation_date: str
    last_mutation_summary: str


@allow_storage
@dataclass
class GenerationRecord:
    generation_num: u256
    morph_class: str
    dna_hash: str
    vitality: u256
    defense_level: u256
    metabolism_rate: u256
    trigger_env_url: str
    timestamp_utc: str
    mutation_reasoning: str


class EvoLifeCourt(gl.Contract):
    operator: str
    organism: OrganismState
    genealogy: TreeMap[u256, GenerationRecord]
    total_generations: u256

    def __init__(self, operator: str):
        self.operator = operator.strip().strip('"').strip("'").lower()
        self.total_generations = u256(1)

        # Initialize Genesis Generation (Gen 0)
        self.organism = OrganismState(
            organism_id="ORGANISM_SYNTH_001",
            generation=u256(0),
            name="Genesis Amoeba",
            morph_class="GENESIS_PROTO_AMOEBA",
            vitality=u256(80),
            defense_level=u256(30),
            metabolism_rate=u256(50),
            adaptation_score=u256(50),
            dna_hash="0x7f2a89c1409fae1aafadb0a3b8382e43ed8d2d56",
            last_mutation_date="2026-08-19",
            last_mutation_summary="Genesis synthetic lifeform initialized on GenLayer."
        )

        self.genealogy[u256(0)] = GenerationRecord(
            generation_num=u256(0),
            morph_class="GENESIS_PROTO_AMOEBA",
            dna_hash="0x7f2a89c1409fae1aafadb0a3b8382e43ed8d2d56",
            vitality=u256(80),
            defense_level=u256(30),
            metabolism_rate=u256(50),
            trigger_env_url="https://evolife.genlayer.com/genesis",
            timestamp_utc="2026-08-19 12:00:00",
            mutation_reasoning="Genesis initialization."
        )

    @gl.public.write
    def feed_nutrients(self, nutrient_amount: u256) -> str:
        """Community feeding mechanism to replenish organism vitality."""
        n_amt = int(nutrient_amount)
        assert n_amt > 0, "[ERR_PARAM_01] Nutrient amount must be positive."
        
        current_vitality = int(self.organism.vitality)
        new_vitality = min(100, current_vitality + n_amt)
        self.organism.vitality = u256(new_vitality)
        self.organism.last_mutation_summary = f"Nutrients ingested (+{n_amt}%). Vitality restored to {new_vitality}%."
        return f"Vitality: {new_vitality}%"

    @gl.public.write
    def trigger_evolution_cycle(self, env_feed_url: str) -> str:
        """
        Perceives external environment signals, audits threat & opportunity,
        and mutates the on-chain organism's genome and morphology autonomously.
        """
        clean_url = env_feed_url.strip().strip('"').strip("'")
        assert clean_url.startswith("http://") or clean_url.startswith("https://"), \
            "[ERR_URL_01] Valid HTTP/HTTPS environmental telemetry URL required."

        # STEP 1: AUTHORITATIVE UTC ATOMIC CLOCK GUARD
        time_url = "https://timeapi.io/api/time/current/zone?timeZone=UTC"

        def get_time_input() -> str:
            time_resp = gl.nondet.web.render(time_url, mode="text")
            return (
                f"=== AUTHORITATIVE UTC ATOMIC CLOCK FEED ===\n"
                f"{time_resp}\n\n"
                f"Organism Last Mutation Date: {self.organism.last_mutation_date}"
            )

        time_task = (
            "You are an authoritative calendar clock auditor.\n"
            "Parse the live UTC Clock API response.\n"
            "Extract today's UTC date (YYYY-MM-DD) and full timestamp.\n"
            "Determine if clock response is fresh and valid.\n\n"
            "Output JSON format:\n"
            "{\n"
            '  "today_date": "<YYYY-MM-DD>",\n'
            '  "full_timestamp": "<YYYY-MM-DD HH:MM:SS>",\n'
            '  "clock_fresh": true/false\n'
            "}\n"
            "Respond ONLY with raw JSON."
        )

        time_criteria = (
            "Independently parse the live UTC Clock API JSON to extract today's date (YYYY-MM-DD). "
            "REJECT the leader if: "
            "(1) today_date does not match the live UTC date in the API response, or "
            "(2) clock_fresh is marked true when the clock API response is missing or unparseable."
        )

        time_result = gl.eq_principle.prompt_non_comparative(
            get_time_input,
            task=time_task,
            criteria=time_criteria
        )

        raw_time = time_result.strip()
        if "</think>" in raw_time:
            raw_time = raw_time.split("</think>")[-1].strip()
        if raw_time.startswith("```"):
            t_lines = raw_time.split("\n")
            if len(t_lines) >= 3 and t_lines[0].startswith("```") and t_lines[-1].startswith("```"):
                raw_time = "\n".join(t_lines[1:-1]).strip()
            else:
                raw_time = raw_time.replace("```json", "").replace("```", "").strip()

        time_parsed = json.loads(raw_time)
        clock_fresh = bool(time_parsed.get("clock_fresh", False))
        today_str = str(time_parsed.get("today_date", "2026-08-19"))
        full_timestamp = str(time_parsed.get("full_timestamp", "2026-08-19 12:00:00"))

        assert clock_fresh == True, "[ERR_CLOCK_01] Failed to retrieve fresh authoritative UTC clock."

        # STEP 2: NON-DETERMINISTIC ENVIRONMENTAL PERCEPTION
        def get_env_input() -> str:
            try:
                env_data = gl.nondet.web.render(clean_url, mode="text")
            except Exception as e:
                env_data = f"ENV_TELEMETRY_FETCH_ERROR: {str(e)}"

            return (
                f"=== EVOLIFE CYBERNETIC HABITAT TELEMETRY ===\n"
                f"Organism ID: {self.organism.organism_id}\n"
                f"Current Generation: Epoch {int(self.organism.generation)}\n"
                f"Current Morph Class: {self.organism.morph_class}\n"
                f"Current Vitality: {int(self.organism.vitality)}%\n"
                f"Current Defense: {int(self.organism.defense_level)}%\n"
                f"Current Metabolism: {int(self.organism.metabolism_rate)} bpm\n\n"
                f"=== INGESTED TELEMETRY STREAM ===\n"
                f"{env_data}"
            )

        task = (
            "You are the Autonomous Evolution Engine for EvoLife.\n"
            "Audit the external environment telemetry and determine the optimal survival mutation.\n\n"
            "Evaluate:\n"
            "1. adaptation_state: Strict enum ('ARMORED_CRYOBIOSIS', 'BIOLUMINESCENT_BLOOM', 'SYNAPTIC_TRANSCENDENCE')\n"
            "   - ARMORED_CRYOBIOSIS: Triggered on crisis, high volatility, stress, scarcity. (High defense, low metabolism).\n"
            "   - BIOLUMINESCENT_BLOOM: Triggered on harmony, prosperity, surplus. (High vitality, high growth).\n"
            "   - SYNAPTIC_TRANSCENDENCE: Triggered on novelty, chaotic flux, high information density.\n"
            "2. morph_class: Descriptive string (e.g. 'CHITIN_ARMORED_BEHEMOTH', 'LUMINESCENT_EXPEDITION_HYDRA', 'SYNAPTIC_AETHER_SENTRY')\n"
            "3. new_vitality: Integer 0 to 100\n"
            "4. new_defense: Integer 0 to 100\n"
            "5. new_metabolism: Integer 10 to 100\n"
            "6. adaptation_score: Integer 0 to 100\n"
            "7. reasoning: Concise 1-2 sentence explanation of environmental reaction.\n\n"
            "Output JSON format:\n"
            "{\n"
            '  "adaptation_state": "<ARMORED_CRYOBIOSIS|BIOLUMINESCENT_BLOOM|SYNAPTIC_TRANSCENDENCE>",\n'
            '  "morph_class": "<string>",\n'
            '  "new_vitality": <int>,\n'
            '  "new_defense": <int>,\n'
            '  "new_metabolism": <int>,\n'
            '  "adaptation_score": <int>,\n'
            '  "reasoning": "<string>"\n'
            "}\n"
            "Respond ONLY with raw JSON."
        )

        criteria = (
            "EvoLife Mutation Equivalence Rule:\n"
            "1. Strict Fields (100% exact match required):\n"
            "   - adaptation_state (enum 'ARMORED_CRYOBIOSIS', 'BIOLUMINESCENT_BLOOM', 'SYNAPTIC_TRANSCENDENCE')\n"
            "2. Bounded Fuzzy Fields:\n"
            "   - new_vitality (+-5 points tolerance)\n"
            "   - new_defense (+-5 points tolerance)\n"
            "   - new_metabolism (+-5 points tolerance)\n"
            "   - adaptation_score (+-10 points tolerance)\n"
            "Independently analyze the environment telemetry. REJECT the leader proposal if:\n"
            "(1) adaptation_state is marked BIOLUMINESCENT_BLOOM when telemetry indicates crisis/storm,\n"
            "(2) adaptation_state is marked ARMORED_CRYOBIOSIS when telemetry indicates optimal harmony/abundance,\n"
            "(3) defense target does not increase during severe crisis.\n"
            "Output must be valid JSON matching the schema."
        )

        consensus_result = gl.eq_principle.prompt_non_comparative(
            get_env_input,
            task=task,
            criteria=criteria
        )

        raw_res = consensus_result.strip()
        if "</think>" in raw_res:
            raw_res = raw_res.split("</think>")[-1].strip()
        if raw_res.startswith("```"):
            r_lines = raw_res.split("\n")
            if len(r_lines) >= 3 and r_lines[0].startswith("```") and r_lines[-1].startswith("```"):
                raw_res = "\n".join(r_lines[1:-1]).strip()
            else:
                raw_res = raw_res.replace("```json", "").replace("```", "").strip()

        res_parsed = json.loads(raw_res)
        state_enum = str(res_parsed.get("adaptation_state", "BIOLUMINESCENT_BLOOM")).strip().upper()
        morph_name = str(res_parsed.get("morph_class", "ADAPTIVE_CHITIN_ORGANISM")).strip()
        v_new = max(10, min(100, int(res_parsed.get("new_vitality", 85))))
        d_new = max(10, min(100, int(res_parsed.get("new_defense", 85))))
        m_new = max(10, min(100, int(res_parsed.get("new_metabolism", 45))))
        a_score = max(10, min(100, int(res_parsed.get("adaptation_score", 90))))
        reasoning = str(res_parsed.get("reasoning", "Organism adapted to habitat flux."))

        # Advance Generation
        next_gen_num = int(self.organism.generation) + 1
        gen_u256 = u256(next_gen_num)

        # Compute new DNA Hash
        raw_dna = f"EVOLIFE_GEN_{next_gen_num}_{state_enum}_{d_new}_{m_new}_{today_str}"
        new_dna_hash = "0x" + hashlib.sha256(raw_dna.encode("utf-8")).hexdigest()[:40]

        summary = f"Epoch {next_gen_num} Mutated: {state_enum} ({morph_name}). {reasoning}"

        # Update Organism Live State
        self.organism.generation = gen_u256
        self.organism.name = morph_name
        self.organism.morph_class = state_enum
        self.organism.vitality = u256(v_new)
        self.organism.defense_level = u256(d_new)
        self.organism.metabolism_rate = u256(m_new)
        self.organism.adaptation_score = u256(a_score)
        self.organism.dna_hash = new_dna_hash
        self.organism.last_mutation_date = today_str
        self.organism.last_mutation_summary = summary

        # Record in Genealogy Tree
        self.genealogy[gen_u256] = GenerationRecord(
            generation_num=gen_u256,
            morph_class=state_enum,
            dna_hash=new_dna_hash,
            vitality=u256(v_new),
            defense_level=u256(d_new),
            metabolism_rate=u256(m_new),
            trigger_env_url=clean_url,
            timestamp_utc=full_timestamp,
            mutation_reasoning=reasoning
        )

        self.total_generations = u256(next_gen_num + 1)
        return summary

    @gl.public.view
    def get_organism_state(self) -> OrganismState:
        return self.organism

    @gl.public.view
    def get_generation_record(self, gen_num: u256) -> GenerationRecord:
        assert gen_num in self.genealogy, "[ERR_STATE_01] Generation record does not exist."
        return self.genealogy[gen_num]

    @gl.public.view
    def get_total_generations(self) -> u256:
        return self.total_generations
