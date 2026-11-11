import { Metadata } from "next";
import Link from "next/link";
import { Cpu, Radio, Wifi, Shield, ArrowRight, CheckCircle2, Layers, Zap, AlertTriangle } from "lucide-react";

export const metadata: Metadata = {
  title: "Technology & Radio Architecture",
  description:
    "Explore SPIKER's decentralized physical radio protocol. How Bluetooth Low Energy and Wi-Fi Direct coordinate to enable high-throughput local communication without telecom infrastructure.",
};

export default function TechnologyPage() {
  return (
    <div className="w-full bg-[#05070D] py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-container/10 border border-secondary-container/30 text-secondary-container font-mono text-xs uppercase tracking-widest mb-4">
            <Cpu className="w-3.5 h-3.5" />
            <span>RADIO FREQUENCY ARCHITECTURE</span>
          </div>
          <h1 className="font-display font-bold text-3xl sm:text-5xl text-white tracking-tight leading-tight">
            Built on standard consumer hardware. Driven by decentralized RF protocols.
          </h1>
          <p className="font-sans text-base sm:text-lg text-on-surface-variant mt-4 leading-relaxed">
            SPIKER turns existing consumer smartphones into autonomous, infrastructure-free transceivers. Discover how our dual-radio coordination protocol achieves zero-cloud, direct device-to-device communication.
          </p>
        </div>

        {/* Dual Radio Breakdown Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Card 1: BLE Discovery */}
          <div className="p-8 rounded-2xl bg-surface-container-low border border-white/[0.08] shadow-xl space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-secondary-container/10 text-secondary-container">
                  <Radio className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="font-display font-bold text-xl text-white">
                    Bluetooth Low Energy (BLE)
                  </h2>
                  <span className="font-mono text-xs text-secondary-container">
                    LAYER: DISCOVERY & RADAR
                  </span>
                </div>
              </div>
              <span className="font-mono text-xs text-outline px-2 py-1 rounded bg-surface-container">
                2.4 GHz ISM
              </span>
            </div>

            <p className="font-sans text-sm text-on-surface-variant leading-relaxed">
              BLE operates on 40 channels across the 2.4 GHz band. Three dedicated advertising channels (37, 38, 39) broadcast micro-beacons with customized SPIKER service identifiers. Receivers continuously listen in low-duty cycles to prevent battery drain.
            </p>

            <div className="space-y-3 font-mono text-xs">
              <div className="p-3 rounded-lg bg-surface-container-lowest border border-white/[0.05] flex justify-between">
                <span className="text-on-surface-variant">Advertising Interval:</span>
                <span className="text-white">1022.5 ms (Adaptive Standby)</span>
              </div>
              <div className="p-3 rounded-lg bg-surface-container-lowest border border-white/[0.05] flex justify-between">
                <span className="text-on-surface-variant">Proximity Calculation:</span>
                <span className="text-secondary-container">Log-Distance RSSI Path Loss</span>
              </div>
              <div className="p-3 rounded-lg bg-surface-container-lowest border border-white/[0.05] flex justify-between">
                <span className="text-on-surface-variant">Battery Footprint:</span>
                <span className="text-white">&lt; 1.8% per 8-hour shift</span>
              </div>
            </div>

            <div className="pt-2">
              <h3 className="font-display font-semibold text-sm text-white mb-2">Key BLE Capabilities</h3>
              <ul className="space-y-2 text-xs font-sans text-on-surface-variant">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-secondary-container" />
                  <span>Silent passive background peer detection</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-secondary-container" />
                  <span>Zero geographic GPS tracking required for peer listing</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-secondary-container" />
                  <span>Autonomous peer listing updates every 2 seconds</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Card 2: Wi-Fi Direct */}
          <div className="p-8 rounded-2xl bg-surface-container-low border border-white/[0.08] shadow-xl space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-primary/10 text-primary">
                  <Wifi className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="font-display font-bold text-xl text-white">
                    Wi-Fi Direct P2P Sockets
                  </h2>
                  <span className="font-mono text-xs text-primary">
                    LAYER: BROADBAND PAYLOAD TRANSPORT
                  </span>
                </div>
              </div>
              <span className="font-mono text-xs text-outline px-2 py-1 rounded bg-surface-container">
                2.4 & 5.0 GHz
              </span>
            </div>

            <p className="font-sans text-sm text-on-surface-variant leading-relaxed">
              When a user initiates an exchange, compatible devices negotiate an ad-hoc Wi-Fi P2P group. One device temporarily acts as Group Owner while the second connects directly via an autonomous socket connection.
            </p>

            <div className="space-y-3 font-mono text-xs">
              <div className="p-3 rounded-lg bg-surface-container-lowest border border-white/[0.05] flex justify-between">
                <span className="text-on-surface-variant">Socket Negotiation Latency:</span>
                <span className="text-white">~350ms to 1200ms</span>
              </div>
              <div className="p-3 rounded-lg bg-surface-container-lowest border border-white/[0.05] flex justify-between">
                <span className="text-on-surface-variant">Peak Local Transfer Rate:</span>
                <span className="text-primary">Up to 240 Mbps (802.11ac)</span>
              </div>
              <div className="p-3 rounded-lg bg-surface-container-lowest border border-white/[0.05] flex justify-between">
                <span className="text-on-surface-variant">Infrastructure Router:</span>
                <span className="text-secondary-container">NONE (Direct Over-the-Air)</span>
              </div>
            </div>

            <div className="pt-2">
              <h3 className="font-display font-semibold text-sm text-white mb-2">Key Wi-Fi Direct Capabilities</h3>
              <ul className="space-y-2 text-xs font-sans text-on-surface-variant">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  <span>Transfer compressed voice memos and coordinate files instantly</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  <span>Automatic socket teardown immediately after payload delivery</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  <span>Reliable byte delivery with CRC32 packet integrity checks</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Detailed Packet & Framing Deep Dive */}
        <div className="p-8 md:p-10 rounded-2xl bg-surface-container-low border border-white/[0.1] shadow-2xl space-y-8 mb-16">
          <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
            <div className="flex items-center gap-3">
              <Layers className="w-5 h-5 text-secondary-container" />
              <h2 className="font-display font-bold text-xl text-white">
                Packet Framing & Transport Protocol
              </h2>
            </div>
            <span className="font-mono text-xs text-secondary-container font-semibold">
              SPECIFICATION DRAFT v0.8.4
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center font-mono text-xs">
            <div className="p-4 rounded-lg bg-surface-container border border-white/[0.05]">
              <span className="text-secondary-container font-bold block mb-1">HEADER (16 Bytes)</span>
              <p className="text-on-surface-variant text-[11px]">
                Magic Bytes, Protocol Version, Stream ID, Source/Destination Ephemeral Hashes
              </p>
            </div>
            <div className="p-4 rounded-lg bg-surface-container border border-white/[0.05]">
              <span className="text-primary font-bold block mb-1">SEQUENCE (8 Bytes)</span>
              <p className="text-on-surface-variant text-[11px]">
                Packet Index, Total Chunks, Timestamp Epoch, Payload Type Flag
              </p>
            </div>
            <div className="p-4 rounded-lg bg-surface-container border border-white/[0.05]">
              <span className="text-white font-bold block mb-1">DATA CHUNK (Max 32 KB)</span>
              <p className="text-on-surface-variant text-[11px]">
                Fragmented payload: UTF-8 message text, audio opus frame, or geospatial vector
              </p>
            </div>
            <div className="p-4 rounded-lg bg-surface-container border border-white/[0.05]">
              <span className="text-secondary font-bold block mb-1">CHECKSUM (8 Bytes)</span>
              <p className="text-on-surface-variant text-[11px]">
                CRC32 error-detecting code + transmission acknowledgement token
              </p>
            </div>
          </div>
        </div>

        {/* Honest Physics Reality Section */}
        <div className="p-8 rounded-2xl bg-surface-container-lowest border border-white/[0.08] flex flex-col md:flex-row items-start gap-6">
          <div className="p-3 rounded-xl bg-error/10 text-error flex-shrink-0">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div className="space-y-3">
            <h3 className="font-display font-semibold text-lg text-white">
              Physics & Line-of-Sight Range Realities
            </h3>
            <p className="font-sans text-sm text-on-surface-variant leading-relaxed">
              Radio waves obey the inverse-square law and absorption characteristics of matter. In open rural areas with direct line-of-sight, connections routinely achieve 50 to 90 meters. Inside reinforced concrete basements, commercial shipping containers, or heavily shielded industrial plants, maximum effective range will decrease based on physical material attenuation. SPIKER does not claim impossible physics: we optimize transmission protocols to extract maximum range from existing smartphone antennas.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
