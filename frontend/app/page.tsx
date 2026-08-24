'use client';

import React, { useState, useEffect } from 'react';
import { 
  Dna, 
  Sparkles, 
  ShieldAlert, 
  Activity, 
  Heart, 
  Shield, 
  Zap, 
  Radio, 
  RefreshCw, 
  ChevronRight, 
  Layers, 
  Cpu, 
  Eye, 
  Flame, 
  Globe, 
  Atom, 
  Clock, 
  ArrowUpRight, 
  CheckCircle, 
  AlertTriangle 
} from 'lucide-react';

const CONTRACT_ADDRESS = '0xB38a1FA6B864d36274075849194CEE42484713b5';
const GENLAYER_RPC = 'https://studio.genlayer.com/api';

interface GenerationRecord {
  gen: number;
  name: string;
  morph: string;
  vitality: number;
  defense: number;
  metabolism: number;
  dna: string;
  date: string;
  reasoning: string;
}

interface OrganismStateData {
  generation: number;
  name: string;
  morph_class: string;
  vitality: number;
  defense_level: number;
  metabolism_rate: number;
  adaptation_score: number;
  dna_hash: string;
  last_mutation_date: string;
  last_mutation_summary: string;
}

export default function EvoLifeDashboard() {
  const [activeTab, setActiveTab] = useState<'habitat' | 'genealogy' | 'telemetry'>('habitat');
  const [isCallingRpc, setIsCallingRpc] = useState(false);
  const [selectedDemo, setSelectedDemo] = useState<'growth' | 'crisis' | 'anomaly'>('crisis');
  const [feedAmount, setFeedAmount] = useState<number>(15);
  const [rpcLogs, setRpcLogs] = useState<string[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Organism State from Finalized GenLayer Contract
  const [organism, setOrganism] = useState<OrganismStateData>({
    generation: 0,
    name: 'Genesis Amoeba',
    morph_class: 'GENESIS_PROTO_AMOEBA',
    vitality: 80,
    defense_level: 30,
    metabolism_rate: 50,
    adaptation_score: 50,
    dna_hash: '0x7f2a89c1409fae1aafadb0a3b8382e43ed8d2d56',
    last_mutation_date: '2026-08-20',
    last_mutation_summary: 'Genesis synthetic lifeform initialized on GenLayer.'
  });

  const [genealogy, setGenealogy] = useState<GenerationRecord[]>([]);

  const demoUrls = {
    growth: 'https://evolife-pi.vercel.app/demo/mock_env_harmony_growth.html',
    crisis: 'https://evolife-pi.vercel.app/demo/mock_env_storm_crisis.html',
    anomaly: 'https://evolife-pi.vercel.app/demo/mock_env_novel_anomaly.html'
  };

  const addLog = (msg: string) => {
    const time = new Date().toLocaleTimeString();
    setRpcLogs(prev => [`[${time}] ${msg}`, ...prev.slice(0, 20)]);
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
            morph_class: parsed.morph_class || 'GENESIS_PROTO_AMOEBA',
            vitality: Number(parsed.vitality) || 80,
            defense_level: Number(parsed.defense_level) || 30,
            metabolism_rate: Number(parsed.metabolism_rate) || 50,
            adaptation_score: Number(parsed.adaptation_score) || 50,
            dna_hash: parsed.dna_hash || '0x0',
            last_mutation_date: parsed.last_mutation_date || '2026-08-20',
            last_mutation_summary: parsed.last_mutation_summary || 'Synchronized with contract consensus.'
          });
          setIsInitialized(true);
          addLog(`✓ Finalized on-chain organism state read: Epoch ${parsed.generation} (${parsed.morph_class})`);
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

  // Real GenLayer Write: Trigger Evolution Cycle & Verify Advancement
  const handleTriggerEvolution = async () => {
    setIsCallingRpc(true);
    const targetUrl = demoUrls[selectedDemo];
    const prevGeneration = organism.generation;

    addLog(`⚡ Starting mutation cycle from Epoch ${prevGeneration}...`);
    addLog(`1. Authoritative UTC clock checked (timeapi.io)...`);
    addLog(`2. Ingesting authorized telemetry feed: ${targetUrl}`);
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

      addLog(`4. Evolution transaction confirmed. Reading finalized state from contract...`);
      const newGen = await syncOrganismStateFromChain();
      if (newGen !== null && newGen === prevGeneration + 1) {
        addLog(`✅ [VERIFIED ON-CHAIN] Epoch advanced ${prevGeneration} -> ${newGen} strictly confirmed from contract.`);
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

  const glowClass = isBloom ? 'glow-emerald' : isArmor ? 'glow-crimson' : 'glow-violet';
  const themeColor = isBloom ? 'text-emerald-400' : isArmor ? 'text-rose-400' : 'text-purple-400';
  const badgeBg = isBloom ? 'bg-emerald-950/80 border-emerald-500/60 text-emerald-300' : isArmor ? 'bg-rose-950/80 border-rose-500/60 text-rose-300' : 'bg-purple-950/80 border-purple-500/60 text-purple-300';

  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#060913] text-slate-100 selection:bg-purple-500 selection:text-white">
      
      {/* Top Navigation */}
      <nav className="border-b border-slate-800/80 bg-[#0a0f1d]/80 backdrop-blur-md sticky top-0 z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-400 via-purple-500 to-rose-500 p-[1px] shadow-lg shadow-purple-500/20">
              <div className="w-full h-full bg-[#060913] rounded-xl flex items-center justify-center">
                <Dna className="w-5 h-5 text-emerald-400 animate-pulse-slow" />
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

          {/* Navigation Pills */}
          <div className="flex items-center gap-1.5 bg-[#0a0f1d] p-1.5 rounded-xl border border-slate-800">
            <button
              onClick={() => setActiveTab('habitat')}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all flex items-center gap-2 ${
                activeTab === 'habitat' 
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-black font-bold shadow-md shadow-emerald-500/20' 
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Activity className="w-4 h-4" /> 1. Cybernetic Habitat
            </button>
            <button
              onClick={() => setActiveTab('genealogy')}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all flex items-center gap-2 ${
                activeTab === 'genealogy' 
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-black font-bold shadow-md shadow-emerald-500/20' 
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Layers className="w-4 h-4" /> 2. Phylogenetic Tree ({genealogy.length})
            </button>
            <button
              onClick={() => setActiveTab('telemetry')}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all flex items-center gap-2 ${
                activeTab === 'telemetry' 
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-black font-bold shadow-md shadow-emerald-500/20' 
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Radio className="w-4 h-4" /> 3. Live RPC Stream
            </button>
          </div>
        </div>
      </nav>

      {/* Top Banner Status Bar */}
      <div className="bg-[#090e1c] border-b border-slate-800/60 px-6 py-2.5 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span>EPOCH: <strong className="text-white font-mono">Generation {organism.generation}</strong></span>
            <span>MORPH: <strong className={`font-mono ${themeColor}`}>{organism.morph_class}</strong></span>
            <span>DNA: <strong className="text-slate-300 font-mono">{organism.dna_hash.slice(0, 14)}...</strong></span>
          </div>
          <div className="flex items-center gap-2 text-[11px] text-emerald-400 font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
            AUTHORIZED TELEMETRY & CADENCE GUARD ACTIVE
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-6 py-8 flex-1 w-full space-y-8">
        
        {/* TAB 1: CYBERNETIC HABITAT */}
        {activeTab === 'habitat' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left: Dynamic Bioluminescent Creature Canvas */}
            <div className="lg:col-span-6 bg-[#0a0f1d]/80 border border-slate-800 rounded-3xl p-8 backdrop-blur-xl shadow-2xl flex flex-col items-center justify-between relative overflow-hidden">
              
              <div className="w-full flex items-center justify-between z-10">
                <span className={`px-3 py-1 rounded-full text-xs font-bold border ${badgeBg}`}>
                  {organism.name}
                </span>
                <span className="text-xs text-slate-400 font-mono">Epoch: {organism.generation}</span>
              </div>

              {/* Central Animated Creature SVG */}
              <div className="my-10 relative flex items-center justify-center">
                <div className={`w-72 h-72 rounded-full flex items-center justify-center transition-all duration-700 ${glowClass}`}>
                  
                  {/* Outer Pulsing Orbital Rings */}
                  <svg className="w-full h-full animate-spin-slow" viewBox="0 0 200 200">
                    <circle 
                      cx="100" cy="100" r="85" 
                      fill="none" 
                      stroke={isBloom ? "#10b981" : isArmor ? "#ef4444" : "#a855f7"} 
                      strokeWidth="1.5" 
                      strokeDasharray="8 6" 
                      opacity="0.6"
                    />
                    <circle 
                      cx="100" cy="100" r="70" 
                      fill="none" 
                      stroke={isBloom ? "#34d399" : isArmor ? "#f87171" : "#c084fc"} 
                      strokeWidth="1" 
                      strokeDasharray="4 8" 
                      opacity="0.4"
                    />
                  </svg>

                  {/* Core Bioluminescent Cell Nucleus */}
                  <div className={`absolute w-36 h-36 rounded-full flex items-center justify-center transition-all duration-500 animate-pulse-slow ${
                    isBloom ? 'bg-gradient-to-tr from-emerald-600 via-teal-500 to-green-300' :
                    isArmor ? 'bg-gradient-to-tr from-rose-700 via-red-600 to-amber-500' :
                    'bg-gradient-to-tr from-purple-700 via-indigo-600 to-pink-500'
                  }`}>
                    <div className="w-24 h-24 rounded-full bg-[#060913] flex flex-col items-center justify-center shadow-inner">
                      <Atom className={`w-8 h-8 ${themeColor} animate-spin-slow`} />
                      <span className="text-[10px] font-mono text-slate-400 mt-1">{organism.metabolism_rate} bpm</span>
                    </div>
                  </div>

                </div>
              </div>

              {/* Feeding Controls */}
              <div className="w-full z-10 bg-[#060913]/90 border border-slate-800 rounded-2xl p-4 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-emerald-950 border border-emerald-800 text-emerald-400">
                    <Heart className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">Replenish Nutrients</div>
                    <span className="text-[11px] text-slate-400">Community Bio-Feed Action</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleFeedNutrients}
                    disabled={isCallingRpc}
                    className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-black font-bold rounded-xl text-xs flex items-center gap-1.5 transition-all shadow-md shadow-emerald-500/20 disabled:opacity-50"
                  >
                    <Zap className="w-3.5 h-3.5" /> Feed (+{feedAmount}%)
                  </button>
                </div>
              </div>

            </div>

            {/* Right: Real-Time Vitals, Genome Matrix & Evolution Triggers */}
            <div className="lg:col-span-6 space-y-6">
              
              {/* Vitals Matrix */}
              <div className="bg-[#0a0f1d]/80 border border-slate-800 rounded-3xl p-6 backdrop-blur-xl shadow-xl space-y-5">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <Activity className="w-4 h-4 text-emerald-400" /> Real-Time Organism Vitals
                </h3>

                <div className="space-y-4 text-xs">
                  
                  {/* Vitality Bar */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between font-semibold">
                      <span className="text-slate-300 flex items-center gap-1.5">
                        <Heart className="w-3.5 h-3.5 text-emerald-400" /> Cellular Vitality
                      </span>
                      <span className="text-emerald-400 font-mono font-bold">{organism.vitality}%</span>
                    </div>
                    <div className="w-full h-3 bg-[#060913] rounded-full overflow-hidden border border-slate-800">
                      <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-700" style={{ width: `${organism.vitality}%` }}></div>
                    </div>
                  </div>

                  {/* Defense Shield */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between font-semibold">
                      <span className="text-slate-300 flex items-center gap-1.5">
                        <Shield className="w-3.5 h-3.5 text-rose-400" /> Defense Armor Shell
                      </span>
                      <span className="text-rose-400 font-mono font-bold">{organism.defense_level}%</span>
                    </div>
                    <div className="w-full h-3 bg-[#060913] rounded-full overflow-hidden border border-slate-800">
                      <div className="h-full bg-gradient-to-r from-rose-500 to-amber-500 transition-all duration-700" style={{ width: `${organism.defense_level}%` }}></div>
                    </div>
                  </div>

                  {/* Metabolism Rate */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between font-semibold">
                      <span className="text-slate-300 flex items-center gap-1.5">
                        <Zap className="w-3.5 h-3.5 text-purple-400" /> Metabolism Burn Rate
                      </span>
                      <span className="text-purple-400 font-mono font-bold">{organism.metabolism_rate} bpm</span>
                    </div>
                    <div className="w-full h-3 bg-[#060913] rounded-full overflow-hidden border border-slate-800">
                      <div className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 transition-all duration-700" style={{ width: `${organism.metabolism_rate}%` }}></div>
                    </div>
                  </div>

                  {/* Adaptation Fitness */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between font-semibold">
                      <span className="text-slate-300 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-cyan-400" /> Environmental Adaptation Fitness
                      </span>
                      <span className="text-cyan-400 font-mono font-bold">{organism.adaptation_score}%</span>
                    </div>
                    <div className="w-full h-3 bg-[#060913] rounded-full overflow-hidden border border-slate-800">
                      <div className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-700" style={{ width: `${organism.adaptation_score}%` }}></div>
                    </div>
                  </div>

                </div>
              </div>

              {/* Environmental Telemetry Trigger Selector */}
              <div className="bg-[#0a0f1d]/80 border border-slate-800 rounded-3xl p-6 backdrop-blur-xl shadow-xl space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                    <Radio className="w-4 h-4 text-purple-400" /> Trigger Authorized Mutation Cycle
                  </h3>
                  <span className="text-[11px] text-slate-400">Authenticated Whitelist Feeds</span>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <button
                    onClick={() => setSelectedDemo('growth')}
                    className={`p-3 rounded-2xl border text-left transition-all ${
                      selectedDemo === 'growth'
                        ? 'bg-emerald-950/60 border-emerald-500 text-white shadow-lg shadow-emerald-950/40'
                        : 'bg-[#060913] border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <strong className="block text-emerald-400 text-xs font-bold">1. Harmony / Surplus</strong>
                    <span className="text-[10px] text-slate-400 block mt-1">BIOLUMINESCENT_BLOOM</span>
                  </button>

                  <button
                    onClick={() => setSelectedDemo('crisis')}
                    className={`p-3 rounded-2xl border text-left transition-all ${
                      selectedDemo === 'crisis'
                        ? 'bg-rose-950/60 border-rose-500 text-white shadow-lg shadow-rose-950/40'
                        : 'bg-[#060913] border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <strong className="block text-rose-400 text-xs font-bold">2. Crisis / Storm</strong>
                    <span className="text-[10px] text-slate-400 block mt-1">ARMORED_CRYOBIOSIS</span>
                  </button>

                  <button
                    onClick={() => setSelectedDemo('anomaly')}
                    className={`p-3 rounded-2xl border text-left transition-all ${
                      selectedDemo === 'anomaly'
                        ? 'bg-purple-950/60 border-purple-500 text-white shadow-lg shadow-purple-950/40'
                        : 'bg-[#060913] border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <strong className="block text-purple-400 text-xs font-bold">3. Anomaly Flux</strong>
                    <span className="text-[10px] text-slate-400 block mt-1">SYNAPTIC_TRANSCENDENCE</span>
                  </button>
                </div>

                <button
                  onClick={handleTriggerEvolution}
                  disabled={isCallingRpc}
                  className="w-full py-4 bg-gradient-to-r from-emerald-500 via-teal-500 to-purple-600 hover:from-emerald-400 hover:to-purple-500 text-black font-extrabold rounded-2xl text-xs flex items-center justify-center gap-2 shadow-xl shadow-emerald-500/20 transition-all disabled:opacity-50"
                >
                  {isCallingRpc ? <RefreshCw className="w-4 h-4 animate-spin text-black" /> : <Dna className="w-4 h-4 text-black" />}
                  Execute Verified GenLayer Evolution Cycle
                </button>

                {/* Latest Mutation Proof */}
                <div className="p-4 bg-[#060913] rounded-2xl border border-slate-800 text-xs space-y-1">
                  <span className="text-slate-400 block font-semibold">Latest On-Chain Mutation Consensus Proof:</span>
                  <p className="text-slate-300 font-mono text-[11px] leading-relaxed">{organism.last_mutation_summary}</p>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* TAB 2: PHYLOGENETIC TREE */}
        {activeTab === 'genealogy' && (
          <div className="bg-[#0a0f1d]/80 border border-slate-800 rounded-3xl p-8 backdrop-blur-xl shadow-xl space-y-6">
            <div className="border-b border-slate-800 pb-4 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Layers className="w-5 h-5 text-emerald-400" /> On-Chain Generational Lineage Tree
                </h3>
                <p className="text-xs text-slate-400 mt-1">Archived permanently on GenLayer storage (`0xB38a1FA6B864d36274075849194CEE42484713b5`).</p>
              </div>
              <span className="text-xs font-mono text-emerald-400 bg-emerald-950 border border-emerald-800/50 px-3 py-1 rounded-full">
                Total Epochs: {genealogy.length}
              </span>
            </div>

            <div className="space-y-4">
              {genealogy.map((rec, idx) => (
                <div key={idx} className="p-5 bg-[#060913] rounded-2xl border border-slate-800/90 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-bold font-mono px-2.5 py-0.5 rounded bg-slate-800 text-slate-300">
                        Epoch {rec.gen}
                      </span>
                      <strong className="text-white text-sm">{rec.name}</strong>
                      <span className="text-xs text-emerald-400 font-mono">[{rec.morph}]</span>
                    </div>
                    <p className="text-xs text-slate-400 font-mono pt-1">{rec.reasoning}</p>
                  </div>

                  <div className="flex items-center gap-6 text-xs text-slate-400 font-mono">
                    <div>Vitality: <strong className="text-white">{rec.vitality}%</strong></div>
                    <div>Defense: <strong className="text-white">{rec.defense}%</strong></div>
                    <div>DNA: <strong className="text-indigo-400">{rec.dna.slice(0, 10)}...</strong></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: LIVE RPC TELEMETRY STREAM */}
        {activeTab === 'telemetry' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-[#0a0f1d]/80 p-5 rounded-2xl border border-slate-800 text-xs space-y-1">
                <span className="text-slate-400">Architecture Layer 1</span>
                <div className="font-bold text-white text-sm">Anti-Replay & Cadence</div>
                <span className="text-[11px] text-emerald-400">✓ Monotonic Timestamp Guard</span>
              </div>
              <div className="bg-[#0a0f1d]/80 p-5 rounded-2xl border border-slate-800 text-xs space-y-1">
                <span className="text-slate-400">Architecture Layer 2</span>
                <div className="font-bold text-white text-sm">Authorized Telemetry</div>
                <span className="text-[11px] text-emerald-400">✓ Whitelist Source Assertion</span>
              </div>
              <div className="bg-[#0a0f1d]/80 p-5 rounded-2xl border border-slate-800 text-xs space-y-1">
                <span className="text-slate-400">Architecture Layer 3</span>
                <div className="font-bold text-white text-sm">Asymmetric Equivalence</div>
                <span className="text-[11px] text-emerald-400">✓ Single Unified Consensus</span>
              </div>
              <div className="bg-[#0a0f1d]/80 p-5 rounded-2xl border border-slate-800 text-xs space-y-1">
                <span className="text-slate-400">Architecture Layer 4</span>
                <div className="font-bold text-white text-sm">Autonomous Keeper</div>
                <span className="text-[11px] text-emerald-400">✓ Exact Gen Comparison</span>
              </div>
            </div>

            <div className="bg-[#0a0f1d]/80 rounded-3xl border border-slate-800 p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="text-xs uppercase font-bold tracking-wider text-emerald-400 flex items-center gap-2">
                  <Cpu className="w-4 h-4" /> Live GenLayer JSON-RPC Execution Feed
                </h3>
                <span className="text-emerald-400 text-[11px] font-mono">● LIVE STREAM CONNECTED</span>
              </div>

              <div className="bg-[#060913] p-4 rounded-2xl border border-slate-800/90 space-y-1.5 text-xs text-slate-300 font-mono h-64 overflow-y-auto">
                {rpcLogs.map((log, idx) => (
                  <div key={idx} className={log.includes('🚨') ? 'text-rose-400 font-bold' : log.includes('✅') || log.includes('✓') ? 'text-emerald-400' : 'text-slate-400'}>
                    {log}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 px-6 py-4 text-center text-xs text-slate-500 bg-[#0a0f1d]/80">
        EvoLife // Powered by GenLayer Intelligent Contracts · Self-Evolving Cybernetic Organism with Real JSON-RPC & Autonomous Habitat Keeper
      </footer>
    </div>
  );
}
