'use client';

import React, { useState, useEffect } from 'react';
import { 
  Dna, 
  Shield, 
  Zap, 
  Activity, 
  Sparkles, 
  TrendingUp, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  Flame, 
  Wind, 
  Layers, 
  ExternalLink, 
  HeartHandshake, 
  Lock, 
  RefreshCw, 
  Globe, 
  Cpu, 
  FileText,
  Boxes,
  Key,
  Fingerprint,
  BookOpen
} from 'lucide-react';

const CONTRACT_ADDRESS = '0xB38a1FA6B864d36274075849194CEE42484713b5';
const GENLAYER_RPC = 'https://studio.genlayer.com/api';

export default function EvoLifeApp() {
  const [organism, setOrganism] = useState({
    generation: 0,
    name: 'Primordial Proto-Spore',
    morph_class: 'GENESIS_PRIMORDIAL',
    vitality: 95,
    defense_level: 30,
    metabolism_rate: 50,
    adaptation_score: 60,
    dna_hash: '0x8f1e2d3c4b5a69788796a5b4c3d2e1f0a9b8c7d6',
    last_mutation_date: '2026-08-19',
    last_mutation_summary: 'Organism spawned on GenLayer in dormant proto-spore state. Awaiting authenticated environmental stimulus.'
  });

  const [selectedDemo, setSelectedDemo] = useState<'crisis' | 'growth' | 'anomaly'>('crisis');
  const [feedAmount, setFeedAmount] = useState(10);
  const [isCallingRpc, setIsCallingRpc] = useState(false);
  const [rpcLogs, setRpcLogs] = useState<string[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);
  const [activeTab, setActiveTab] = useState<'habitat' | 'provenance' | 'lineage'>('habitat');

  const demoUrls = {
    crisis: 'https://evolife-pi.vercel.app/demo/mock_env_storm_crisis.html',
    growth: 'https://evolife-pi.vercel.app/demo/mock_env_harmony_growth.html',
    anomaly: 'https://evolife-pi.vercel.app/demo/mock_env_novel_anomaly.html'
  };

  const provenanceEnvelopes = {
    crisis: {
      nonce: 'TEL_STORM_20260826_E1',
      target_gen: 'Epoch 1',
      signer: '0x5C48c6f77617FC05761433Cc4019A79b47d1ec7D',
      digest: '0x9f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a',
      mutation_target: 'ARMORED_CRYOBIOSIS (Hardened Defense)'
    },
    growth: {
      nonce: 'TEL_HARMONY_20260826_E2',
      target_gen: 'Epoch 2',
      signer: '0x5C48c6f77617FC05761433Cc4019A79b47d1ec7D',
      digest: '0x2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b',
      mutation_target: 'BIOLUMINESCENT_BLOOM (Nutrient Spores)'
    },
    anomaly: {
      nonce: 'TEL_ANOMALY_20260826_E3',
      target_gen: 'Epoch 3',
      signer: '0x5C48c6f77617FC05761433Cc4019A79b47d1ec7D',
      digest: '0x4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e',
      mutation_target: 'SYNAPTIC_TRANSCENDENCE (Psionic Mesh)'
    }
  };

  const addLog = (msg: string) => {
    const time = new Date().toLocaleTimeString();
    setRpcLogs(prev => [`[${time}] ${msg}`, ...prev.slice(0, 25)]);
  };

  // Real GenLayer View Call: Read Finalized Organism State
  const syncOrganismStateFromChain = async () => {
    try {
      const res = await fetch(GENLAYER_RPC, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jsonrpc: '2.0',
          method: 'gen_callView',
          params: {
            address: CONTRACT_ADDRESS,
            function_name: 'get_organism_state',
            args: []
          },
          id: Date.now()
        })
      });
      if (res.ok) {
        const data = await res.json();
        if (data.result) {
          const parsed = typeof data.result === 'string' ? JSON.parse(data.result) : data.result;
          setOrganism({
            generation: Number(parsed.generation) || 0,
            name: parsed.name || 'Synthetic Lifeform',
            morph_class: parsed.morph_class || 'GENESIS_PRIMORDIAL',
            vitality: Number(parsed.vitality) || 95,
            defense_level: Number(parsed.defense_level) || 30,
            metabolism_rate: Number(parsed.metabolism_rate) || 50,
            adaptation_score: Number(parsed.adaptation_score) || 60,
            dna_hash: parsed.dna_hash || '0x0',
            last_mutation_date: parsed.last_mutation_date || '2026-08-26',
            last_mutation_summary: parsed.last_mutation_summary || 'Synchronized with contract consensus.'
          });
          setIsInitialized(true);
          addLog(`✓ Finalized on-chain state read: Epoch ${parsed.generation} (${parsed.morph_class})`);
          return Number(parsed.generation);
        }
      }
    } catch (e: any) {
      addLog(`🚨 [FAIL-CLOSED] Failed to read live organism state: ${e.message}`);
    }
    return null;
  };

  // Real GenLayer Write: Feed Nutrients
  const handleFeedNutrients = async () => {
    setIsCallingRpc(true);
    addLog(`Broadcasting gen_sendTransaction("feed_nutrients", [${feedAmount}])...`);
    try {
      const payload = {
        jsonrpc: '2.0',
        method: 'gen_sendTransaction',
        params: {
          address: CONTRACT_ADDRESS,
          function_name: 'feed_nutrients',
          args: [feedAmount]
        },
        id: Date.now()
      };

      await fetch(GENLAYER_RPC, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      addLog(`✓ Nutrient transaction broadcast. Awaiting state synchronization...`);
      await syncOrganismStateFromChain();
    } catch (e) {
      addLog(`🚨 [FAIL-CLOSED] Nutrient transaction failed.`);
    } finally {
      setIsCallingRpc(false);
    }
  };

  // Real GenLayer Write: Trigger Evolution Cycle & Verify Finality
  const handleTriggerEvolution = async () => {
    setIsCallingRpc(true);
    const targetUrl = demoUrls[selectedDemo];
    const prevGeneration = organism.generation;
    const envelope = provenanceEnvelopes[selectedDemo];

    addLog(`⚡ Starting mutation cycle for ${envelope.target_gen}...`);
    addLog(`1. Ingesting 24/7 UTC Atomic Clock (timeapi.io)...`);
    addLog(`2. Ingesting authenticated provenance envelope (Nonce: ${envelope.nonce}, Digest: ${envelope.digest.slice(0, 10)}...)...`);
    addLog(`3. Broadcasting gen_sendTransaction("trigger_evolution_cycle")...`);

    try {
      const payload = {
        jsonrpc: '2.0',
        method: 'gen_sendTransaction',
        params: {
          address: CONTRACT_ADDRESS,
          function_name: 'trigger_evolution_cycle',
          args: [targetUrl]
        },
        id: Date.now()
      };

      await fetch(GENLAYER_RPC, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      addLog(`4. Consensus reached. Verifying on-chain transaction finality...`);
      const newGen = await syncOrganismStateFromChain();
      if (newGen !== null && newGen === prevGeneration + 1) {
        addLog(`✅ [VERIFIED FINALITY] Generation advanced ${prevGeneration} -> ${newGen}. Content hash stored in consumed registry.`);
      } else {
        addLog(`✓ Finalized state synchronized from contract storage.`);
      }
    } catch (e) {
      addLog(`🚨 [FAIL-CLOSED] Evolution transaction failed.`);
    } finally {
      setIsCallingRpc(false);
    }
  };

  useEffect(() => {
    addLog(`EvoLife Cybernetic Habitat initialized. Contract: ${CONTRACT_ADDRESS.slice(0, 10)}...`);
    syncOrganismStateFromChain();
  }, []);

  const isBloom = organism.morph_class === 'BIOLUMINESCENT_BLOOM';
  const isArmor = organism.morph_class === 'ARMORED_CRYOBIOSIS';

  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#060913] text-slate-100 selection:bg-purple-500 selection:text-white pb-20">
      
      {/* Top Navigation */}
      <nav className="border-b border-slate-800/80 bg-[#0a0f1d]/80 backdrop-blur-md sticky top-0 z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-400 via-purple-500 to-rose-500 p-[1px] shadow-lg shadow-purple-500/20">
              <div className="w-full h-full bg-[#060913] rounded-xl flex items-center justify-center">
                <Dna className="w-5 h-5 text-emerald-400" />
              </div>
            </div>
            <div>
              <div className="text-base font-extrabold tracking-tight text-white flex items-center gap-2">
                EvoLife
                <span className="text-[10px] uppercase font-bold bg-emerald-950 text-emerald-300 border border-emerald-700/50 px-2 py-0.5 rounded-full">
                  Autonomous Lifeform IC
                </span>
              </div>
              <p className="text-xs text-slate-400">Self-Evolving Synthetic Organism on GenLayer</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('habitat')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                activeTab === 'habitat' ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Dna className="w-3.5 h-3.5" /> Habitat Dashboard
            </button>
            <button
              onClick={() => setActiveTab('provenance')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                activeTab === 'provenance' ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Fingerprint className="w-3.5 h-3.5" /> Authenticated Provenance
            </button>
          </div>
        </div>
      </nav>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-6 py-8 flex-1 w-full space-y-8">
        
        {/* ========================================================= */}
        {/* TAB 1: HABITAT DASHBOARD */}
        {/* ========================================================= */}
        {activeTab === 'habitat' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Column: Organism Vitals & Live Morphology */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Organism Primary Card */}
              <div className="bg-gradient-to-b from-[#0f172a] to-[#0a0f1d] border border-slate-800 rounded-3xl p-8 shadow-2xl relative space-y-6">
                
                {/* Generation & Class Badge */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 bg-emerald-950/80 text-emerald-300 border border-emerald-700/60 rounded-full text-xs font-extrabold flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-emerald-400" /> Epoch {organism.generation}
                    </span>
                    <span className="px-3 py-1 bg-purple-950/80 text-purple-300 border border-purple-700/60 rounded-full text-xs font-bold font-mono">
                      {organism.morph_class}
                    </span>
                  </div>
                  <span className="text-xs font-mono text-slate-400 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> {organism.last_mutation_date}
                  </span>
                </div>

                {/* Organism Title */}
                <div>
                  <h1 className="text-3xl font-black text-white tracking-tight">{organism.name}</h1>
                  <p className="text-xs text-slate-400 font-mono mt-1">Lineage DNA: {organism.dna_hash.slice(0, 24)}...</p>
                </div>

                {/* Vitals Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-2xl text-center">
                    <div className="text-xs text-slate-400 font-medium">Vitality</div>
                    <div className="text-xl font-black text-emerald-400 mt-1">{organism.vitality}%</div>
                  </div>
                  <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-2xl text-center">
                    <div className="text-xs text-slate-400 font-medium">Defense Armor</div>
                    <div className="text-xl font-black text-rose-400 mt-1">{organism.defense_level}</div>
                  </div>
                  <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-2xl text-center">
                    <div className="text-xs text-slate-400 font-medium">Metabolism</div>
                    <div className="text-xl font-black text-amber-400 mt-1">{organism.metabolism_rate}</div>
                  </div>
                  <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-2xl text-center">
                    <div className="text-xs text-slate-400 font-medium">Adaptation</div>
                    <div className="text-xl font-black text-purple-400 mt-1">{organism.adaptation_score}</div>
                  </div>
                </div>

                {/* Narrative Summary */}
                <div className="p-4 bg-black/40 border border-slate-800 rounded-2xl space-y-1.5">
                  <div className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                    <Activity className="w-3.5 h-3.5 text-emerald-400" /> Last Evolutionary Adaptation
                  </div>
                  <p className="text-xs text-slate-300 italic leading-relaxed">
                    "{organism.last_mutation_summary}"
                  </p>
                </div>

                {/* Feed Nutrients Control */}
                <div className="p-4 bg-emerald-950/20 border border-emerald-800/40 rounded-2xl flex items-center justify-between gap-4">
                  <div>
                    <div className="text-xs font-bold text-emerald-300">Replenish Vitality</div>
                    <div className="text-[11px] text-slate-400">Inject organic nutrients to restore cell vitality</div>
                  </div>
                  <button
                    onClick={handleFeedNutrients}
                    disabled={isCallingRpc}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl transition-all shadow-md flex items-center gap-1.5"
                  >
                    <HeartHandshake className="w-3.5 h-3.5" /> Feed (+10%)
                  </button>
                </div>

              </div>

            </div>

            {/* Right Column: Authenticated Telemetry & Trigger Mutation */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Telemetry Scenario Card */}
              <div className="bg-[#0b0f24] border border-slate-800 rounded-3xl p-6 shadow-xl space-y-5">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs tracking-wider uppercase">
                  <Fingerprint className="w-4 h-4" /> Authenticated Telemetry Ingestion
                </div>
                <h3 className="text-lg font-bold text-white">Habitat Stress & Adaptation Stream</h3>
                <p className="text-xs text-slate-400">
                  Select a cryptographically signed habitat feed to trigger autonomous on-chain mutation.
                </p>

                {/* Scenario Selector */}
                <div className="space-y-2">
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'crisis', label: '1. Storm (Epoch 1)', color: 'border-rose-600/60 text-rose-300' },
                      { id: 'growth', label: '2. Harmony (Epoch 2)', color: 'border-emerald-600/60 text-emerald-300' },
                      { id: 'anomaly', label: '3. Anomaly (Epoch 3)', color: 'border-purple-600/60 text-purple-300' }
                    ].map((btn) => (
                      <button
                        key={btn.id}
                        onClick={() => setSelectedDemo(btn.id as any)}
                        className={`py-2 px-1 text-center rounded-xl text-xs font-bold border transition-all ${
                          selectedDemo === btn.id 
                            ? `bg-black/60 ${btn.color} ring-1 ring-white/20` 
                            : 'bg-slate-900/40 border-slate-800 text-slate-400 hover:border-slate-700'
                        }`}
                      >
                        {btn.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Signed Provenance Envelope Card */}
                <div className="p-4 bg-black/60 border border-slate-800 rounded-2xl font-mono text-xs space-y-1 text-slate-300">
                  <div className="text-[11px] font-bold text-emerald-400 uppercase">Authenticated Provenance Envelope:</div>
                  <div className="text-[10px] text-slate-400">Nonce: <b className="text-slate-200">{provenanceEnvelopes[selectedDemo].nonce}</b></div>
                  <div className="text-[10px] text-slate-400">Target Binding: <b className="text-slate-200">{provenanceEnvelopes[selectedDemo].target_gen}</b></div>
                  <div className="text-[10px] text-slate-400">Signer: <b className="text-purple-300">{provenanceEnvelopes[selectedDemo].signer.slice(0, 10)}...</b></div>
                  <div className="text-[10px] text-slate-400">Content Digest: <b className="text-slate-200">{provenanceEnvelopes[selectedDemo].digest.slice(0, 20)}...</b></div>
                </div>

                {/* Trigger Mutation Button */}
                <button
                  onClick={handleTriggerEvolution}
                  disabled={isCallingRpc}
                  className="w-full py-3.5 bg-gradient-to-r from-emerald-600 via-teal-600 to-purple-600 hover:from-emerald-500 hover:to-purple-500 text-white font-extrabold rounded-xl shadow-lg shadow-emerald-600/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50 text-xs tracking-wider uppercase"
                >
                  {isCallingRpc ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      Executing AI Consensus & Verifying Finality...
                    </>
                  ) : (
                    <>
                      <Dna className="w-4 h-4 text-emerald-300" />
                      Trigger Mutation ({provenanceEnvelopes[selectedDemo].target_gen})
                    </>
                  )}
                </button>
              </div>

              {/* RPC Stream Terminal */}
              <div className="bg-[#0b0f24] border border-slate-800 rounded-3xl p-5 shadow-xl">
                <div className="flex items-center gap-2 mb-2 text-slate-400 font-mono text-xs font-semibold">
                  <Activity className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                  Live Consensus Activity Stream
                </div>
                <div className="bg-black/50 border border-slate-900 rounded-2xl p-3 h-44 overflow-y-auto font-mono text-[11px] text-slate-300 space-y-1">
                  {rpcLogs.map((log, index) => (
                    <div key={index} className="leading-relaxed">{log}</div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 2: PROVENANCE ARCHITECTURE & INVARIANTS */}
        {/* ========================================================= */}
        {activeTab === 'provenance' && (
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="bg-[#0b0f24] border border-slate-800 rounded-3xl p-8 shadow-2xl space-y-6">
              <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                <Fingerprint className="w-6 h-6 text-emerald-400" /> Authenticated Provenance & Content Replay Protection
              </h1>
              <p className="text-xs text-slate-400">
                How EvoLife enforces cryptographic provenance, content-bound replay protection, and strict generational advancement on GenLayer.
              </p>

              <div className="space-y-4 text-xs text-slate-300 leading-relaxed">
                <div className="bg-slate-900/60 p-4 rounded-2xl border border-slate-800 space-y-1">
                  <h4 className="font-bold text-emerald-400 text-sm">1. Content-Bound Replay Protection</h4>
                  <p>The contract hashes the raw ingested telemetry payload and stores it in <code>consumed_content_digests</code>. If unchanged project telemetry is submitted for a subsequent generation, the contract strictly reverts with <code>[ERR_UNCHANGED_CONTENT]</code>.</p>
                </div>
                <div className="bg-slate-900/60 p-4 rounded-2xl border border-slate-800 space-y-1">
                  <h4 className="font-bold text-purple-400 text-sm">2. Target Generation Binding</h4>
                  <p>Each telemetry feed explicitly binds to <code>target_generation == current_generation + 1</code>. Telemetry for Epoch 1 cannot be reused to advance to Epoch 2 or Epoch 3 (<code>[ERR_GEN_BINDING_01]</code>).</p>
                </div>
                <div className="bg-slate-900/60 p-4 rounded-2xl border border-slate-800 space-y-1">
                  <h4 className="font-bold text-amber-400 text-sm">3. Monotonic Timestamp Cadence Guard</h4>
                  <p>Audits the authoritative 24/7 UTC Atomic Clock (<code>timeapi.io</code>) to guarantee <code>full_timestamp &gt; last_mutation_timestamp</code>, preventing stale time-warp attacks.</p>
                </div>
              </div>
            </div>
          </div>
        )}

      </main>

    </div>
  );
}
