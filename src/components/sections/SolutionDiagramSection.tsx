import React from "react";
import { Smartphone, Radio, Wifi, ArrowRight, ShieldCheck, Zap } from "lucide-react";

export function SolutionDiagramSection() {
  return (
    <section className="w-full bg-[#060E1C] py-16 md:py-24 border-t border-white/[0.08] relative overflow-hidden">
      {/* Subtle ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-secondary-container/5 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mb-12 md:mb-16">
          <span className="font-mono text-xs uppercase tracking-widest text-secondary-container block mb-2 font-semibold">
            03 // THE DIRECT ARCHITECTURE
          </span>
          <h2 className="font-display font-bold text-2xl sm:text-4xl text-white">
            Communication, without the infrastructure.
          </h2>
          <p className="font-sans text-sm sm:text-base text-on-surface-variant mt-2.5 leading-relaxed">
            By shifting from a centralized cloud architecture to direct peer-to-peer radio protocols, SPIKER restores communications sovereignty to physical devices in proximity.
          </p>
        </div>

        {/* Clear Responsive Interactive Diagram */}
        <div className="p-6 md:p-10 rounded-2xl bg-surface-container-low border border-white/[0.1] shadow-2xl">
          <div className="flex items-center justify-between pb-4 mb-8 border-b border-white/[0.08]">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-secondary-container animate-ping" />
              <span className="font-mono text-xs text-secondary-container font-semibold tracking-wider">
                PEER-TO-PEER RF DATAFLOW SCHEMATIC
              </span>
            </div>
            <span className="font-mono text-xs text-outline hidden sm:inline">
              NO ROUTER // NO CLOUD // NO TELCO
            </span>
          </div>

          {/* Diagram Nodes */}
          <div className="grid grid-cols-1 md:grid-cols-7 gap-4 items-center">
            {/* Device A Node */}
            <div className="md:col-span-2 p-5 rounded-xl bg-surface-container border border-secondary-container/30 text-center relative group shadow-md">
              <div className="w-12 h-12 rounded-xl bg-primary/20 text-secondary-container mx-auto flex items-center justify-center mb-3">
                <Smartphone className="w-6 h-6" />
              </div>
              <span className="font-mono text-[10px] text-secondary uppercase tracking-widest block font-semibold">
                NODE INITIATOR
              </span>
              <h4 className="font-display font-semibold text-lg text-white">Device A</h4>
              <p className="font-mono text-xs text-on-surface-variant mt-1">BLE Broadcaster</p>
              <div className="mt-3 py-1 px-2.5 bg-surface-container-lowest rounded text-[11px] font-mono text-secondary-container">
                Hardware Radios Ready
              </div>
            </div>

            {/* Connection Flow Stage 1: Discovery */}
            <div className="md:col-span-1 flex flex-col items-center justify-center py-2 text-center">
              <div className="p-2 rounded-full bg-secondary-container/10 border border-secondary-container/30 text-secondary-container mb-1">
                <Radio className="w-4 h-4 animate-pulse" />
              </div>
              <span className="font-mono text-[10px] text-secondary uppercase font-semibold">
                01 BLE Beacon
              </span>
              <span className="font-mono text-[9px] text-outline">Discovery Arc</span>
              <ArrowRight className="w-4 h-4 text-secondary-container mt-1 hidden md:block" />
            </div>

            {/* Central Bridge Node: Autonomous Direct Radio Link */}
            <div className="md:col-span-1 p-4 rounded-xl bg-surface-container-highest border border-primary/40 text-center relative shadow-lg">
              <div className="w-10 h-10 rounded-lg bg-primary/20 text-primary mx-auto flex items-center justify-center mb-2">
                <Wifi className="w-5 h-5" />
              </div>
              <span className="font-mono text-[9px] text-primary uppercase font-bold tracking-wider block">
                02 AD-HOC LINK
              </span>
              <h5 className="font-display font-semibold text-xs text-white">Direct Radio Socket</h5>
              <p className="font-mono text-[10px] text-on-surface-variant mt-0.5">2.4 / 5 GHz</p>
            </div>

            {/* Connection Flow Stage 2: Transfer */}
            <div className="md:col-span-1 flex flex-col items-center justify-center py-2 text-center">
              <div className="p-2 rounded-full bg-primary/10 border border-primary/30 text-primary mb-1">
                <Zap className="w-4 h-4" />
              </div>
              <span className="font-mono text-[10px] text-primary uppercase font-semibold">
                03 Transfer
              </span>
              <span className="font-mono text-[9px] text-outline">Broadband Speed</span>
              <ArrowRight className="w-4 h-4 text-primary mt-1 hidden md:block" />
            </div>

            {/* Device B Node */}
            <div className="md:col-span-2 p-5 rounded-xl bg-surface-container border border-secondary/30 text-center relative group shadow-md">
              <div className="w-12 h-12 rounded-xl bg-secondary/20 text-secondary mx-auto flex items-center justify-center mb-3">
                <Smartphone className="w-6 h-6" />
              </div>
              <span className="font-mono text-[10px] text-secondary uppercase tracking-widest block font-semibold">
                PEER RECIPIENT
              </span>
              <h4 className="font-display font-semibold text-lg text-white">Device B</h4>
              <p className="font-mono text-xs text-on-surface-variant mt-1">Direct Socket Peer</p>
              <div className="mt-3 py-1 px-2.5 bg-surface-container-lowest rounded text-[11px] font-mono text-secondary">
                RF Payload Acknowledged
              </div>
            </div>
          </div>

          {/* Complementary Radios Breakdown Strip */}
          <div className="mt-8 pt-6 border-t border-white/[0.08] grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 rounded-xl bg-surface-container border border-white/[0.05] flex items-start gap-3">
              <div className="p-2 rounded-lg bg-secondary-container/10 text-secondary-container flex-shrink-0 mt-0.5">
                <Radio className="w-4 h-4" />
              </div>
              <div>
                <h5 className="font-display font-semibold text-sm text-white">
                  Bluetooth Low Energy (Discovery Layer)
                </h5>
                <p className="font-sans text-xs text-on-surface-variant mt-1 leading-relaxed">
                  Operates 24/7 with minimal battery draw. Emits and parses tiny proximity advertisement packets so nearby team members identify each other silently.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-surface-container border border-white/[0.05] flex items-start gap-3">
              <div className="p-2 rounded-lg bg-primary/10 text-primary flex-shrink-0 mt-0.5">
                <Wifi className="w-4 h-4" />
              </div>
              <div>
                <h5 className="font-display font-semibold text-sm text-white">
                  Wi-Fi Direct (High-Throughput Transport)
                </h5>
                <p className="font-sans text-xs text-on-surface-variant mt-1 leading-relaxed">
                  Negotiated on demand when a payload is queued. Fires up high-bandwidth 2.4/5 GHz local channels to transfer text, offline maps, and voice memos instantly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

