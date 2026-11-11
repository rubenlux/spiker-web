import React from "react";
import Link from "next/link";
import { Bluetooth, Wifi, Check, Cpu, Layers, ShieldCheck, ArrowRight } from "lucide-react";

export function TechnologySection() {
  return (
    <section id="technology" className="w-full bg-[#060E1C] py-16 md:py-24 border-t border-white/[0.08] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12 md:mb-16">
          <span className="font-mono text-xs uppercase tracking-widest text-secondary-container block mb-2 font-semibold">
            05 // TECHNICAL FOUNDATION
          </span>
          <h2 className="font-display font-bold text-2xl sm:text-4xl text-white">
            Built for a connected world that doesn't need the Internet.
          </h2>
          <p className="font-sans text-sm sm:text-base text-on-surface-variant mt-2.5 leading-relaxed">
            No specialized dongles, satellite transceivers, or proprietary silicon required. SPIKER leverages the standard consumer RF chipsets already embedded inside billions of modern smartphones.
          </p>
        </div>

        {/* 2 Comparative Architecture Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Bluetooth Card */}
          <div className="p-6 md:p-8 bg-surface-container-low rounded-xl border border-white/[0.08] hover:border-secondary/40 transition-all flex flex-col justify-between shadow-lg">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <span className="font-mono text-xs text-secondary uppercase tracking-widest block font-semibold mb-1">
                    PRIMARY DISCOVERY
                  </span>
                  <h3 className="font-display font-semibold text-2xl text-white">
                    Bluetooth Low Energy (BLE)
                  </h3>
                </div>
                <div className="p-3 rounded-xl bg-surface-container-highest text-secondary border border-white/[0.05]">
                  <Bluetooth className="w-7 h-7" />
                </div>
              </div>

              <p className="font-sans text-sm text-on-surface-variant leading-relaxed mb-6">
                Operates as an ambient proximity radar. Phones broadcast compact, ephemeral discovery identifiers that nearby receivers match locally without contacting any remote cloud directory or phonebook service.
              </p>

              <ul className="space-y-3 font-sans text-xs sm:text-sm text-on-surface mb-6">
                <li className="flex items-start gap-2.5">
                  <div className="p-0.5 rounded-full bg-secondary-container/20 text-secondary-container mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>Direct device-to-device proximity discovery without cloud presence servers</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <div className="p-0.5 rounded-full bg-secondary-container/20 text-secondary-container mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>Continuous background peer awareness based on local RF reception</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <div className="p-0.5 rounded-full bg-secondary-container/20 text-secondary-container mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>Standard consumer smartphone Bluetooth 4.2+ and BLE 5.0 compatibility</span>
                </li>
              </ul>
            </div>

            <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between font-mono text-xs text-outline">
              <span>RADIO ROLE: DISCOVERY</span>
              <span className="text-secondary font-semibold">LOCAL RF RADAR</span>
            </div>
          </div>

          {/* Wi-Fi Direct Card */}
          <div className="p-6 md:p-8 bg-surface-container-low rounded-xl border border-white/[0.08] hover:border-secondary-container/40 transition-all flex flex-col justify-between shadow-lg">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <span className="font-mono text-xs text-secondary-container uppercase tracking-widest block font-semibold mb-1">
                    HIGH-SPEED TRANSPORT
                  </span>
                  <h3 className="font-display font-semibold text-2xl text-white">
                    Wi-Fi Direct P2P Sockets
                  </h3>
                </div>
                <div className="p-3 rounded-xl bg-surface-container-highest text-secondary-container border border-white/[0.05]">
                  <Wifi className="w-7 h-7" />
                </div>
              </div>

              <p className="font-sans text-sm text-on-surface-variant leading-relaxed mb-6">
                Establishes an instantaneous peer-to-peer Wi-Fi link between two devices. Transfers voice memos, text streams, and offline documents directly across standard 2.4 GHz or 5 GHz channels at broadband speeds.
              </p>

              <ul className="space-y-3 font-sans text-xs sm:text-sm text-on-surface mb-6">
                <li className="flex items-start gap-2.5">
                  <div className="p-0.5 rounded-full bg-secondary-container/20 text-secondary-container mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>Zero wireless router, access point, or cellular gateway required</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <div className="p-0.5 rounded-full bg-secondary-container/20 text-secondary-container mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>High-throughput channel for voice recordings, telemetry, and payloads</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <div className="p-0.5 rounded-full bg-secondary-container/20 text-secondary-container mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>Native Android Wi-Fi Direct (P2P) platform integration</span>
                </li>
              </ul>
            </div>

            <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between font-mono text-xs text-outline">
              <span>RADIO ROLE: PAYLOAD TRANSFER</span>
              <span className="text-secondary-container font-semibold">PEER-TO-PEER SOCKET</span>
            </div>
          </div>
        </div>

        {/* Layered Protocol Architecture Stack */}
        <div className="p-6 md:p-8 rounded-2xl bg-surface-container-low border border-white/[0.1] shadow-2xl">
          <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/[0.08]">
            <div className="flex items-center gap-2">
              <Layers className="w-5 h-5 text-secondary-container" />
              <h4 className="font-display font-semibold text-lg text-white">
                SPIKER Layered Protocol Stack
              </h4>
            </div>
            <Link
              href="/technology"
              className="inline-flex items-center gap-1 font-mono text-xs text-secondary-container hover:underline"
            >
              <span>Full Technical Specifications</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3 font-mono text-xs">
            {/* Layer 4 */}
            <div className="p-4 rounded-lg bg-surface-container border border-white/[0.05] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-3">
                <span className="px-2 py-0.5 rounded bg-primary/20 text-primary font-bold">L4</span>
                <span className="text-white font-medium">Application & Proximity UI Layer</span>
              </div>
              <span className="text-on-surface-variant text-[11px]">Chat threads, proximity list, delivery tags, local storage</span>
            </div>

            {/* Layer 3 */}
            <div className="p-4 rounded-lg bg-surface-container border border-white/[0.05] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-3">
                <span className="px-2 py-0.5 rounded bg-secondary-container/20 text-secondary-container font-bold">L3</span>
                <span className="text-white font-medium">Radio Session & State Orchestrator</span>
              </div>
              <span className="text-on-surface-variant text-[11px]">BLE / Wi-Fi Direct handoff management, heartbeat timers</span>
            </div>

            {/* Layer 2 */}
            <div className="p-4 rounded-lg bg-surface-container border border-white/[0.05] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-3">
                <span className="px-2 py-0.5 rounded bg-secondary/20 text-secondary font-bold">L2</span>
                <span className="text-white font-medium">Local Session Handshake & Packet Frames</span>
              </div>
              <span className="text-on-surface-variant text-[11px]">Payload fragmentation, checksums, physical transmission ACK</span>
            </div>

            {/* Layer 1 */}
            <div className="p-4 rounded-lg bg-surface-container border border-secondary-container/30 flex flex-col sm:flex-row sm:items-center justify-between gap-2 shadow-[0_0_12px_rgba(0,213,255,0.15)]">
              <div className="flex items-center gap-3">
                <span className="px-2 py-0.5 rounded bg-secondary-container text-black font-bold">L1</span>
                <span className="text-white font-semibold">Physical RF Hardware Layer (Airwaves)</span>
              </div>
              <span className="text-secondary-container text-[11px] font-semibold">2.4 GHz Bluetooth Low Energy + 2.4/5.0 GHz Wi-Fi Direct</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

