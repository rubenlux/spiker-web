import React from "react";
import Link from "next/link";
import { HardDrive, CloudOff, EyeOff, ShieldCheck, ArrowRight } from "lucide-react";

export function PrivacySection() {
  return (
    <section id="privacy" className="w-full bg-[#05070D] py-16 md:py-24 border-t border-white/[0.08] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-4">
          <div className="max-w-3xl">
            <span className="font-mono text-xs uppercase tracking-widest text-secondary-container block mb-2 font-semibold">
              07 // LOCAL-FIRST ARCHITECTURE
            </span>
            <h2 className="font-display font-bold text-2xl sm:text-4xl text-white">
              Your communication. Your local connection.
            </h2>
            <p className="font-sans text-sm sm:text-base text-on-surface-variant mt-2.5 leading-relaxed">
              SPIKER is designed strictly around direct local wireless transmission rather than reliance on remote cloud servers.
            </p>
          </div>

          <Link
            href="/privacy"
            className="inline-flex items-center gap-1.5 font-display text-sm font-semibold text-secondary-container hover:text-white transition-colors"
          >
            <span>Read Privacy Architecture</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 3 Privacy Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Pillar 1 */}
          <div className="p-6 md:p-8 bg-surface-container-low rounded-xl border border-white/[0.08] hover:border-secondary-container/30 transition-all flex flex-col justify-between shadow-lg">
            <div>
              <div className="w-14 h-14 rounded-xl bg-surface-container-highest flex items-center justify-center text-secondary-container mb-6 border border-white/[0.05]">
                <HardDrive className="w-7 h-7" />
              </div>
              <h3 className="font-display font-semibold text-xl text-white mb-2.5">
                Local-First Storage
              </h3>
              <p className="font-sans text-sm text-on-surface-variant leading-relaxed">
                Transmitted text messages, contact aliases, and identifiers stay exclusively on your physical phone memory and the recipient's phone memory. There are no remote database mirrors, telemetry trackers, or cloud backup syncs.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/[0.08] font-mono text-xs text-outline">
              DATA RESIDENCE: PHYSICAL CHIPSET ONLY
            </div>
          </div>

          {/* Pillar 2 */}
          <div className="p-6 md:p-8 bg-surface-container-low rounded-xl border border-white/[0.08] hover:border-secondary/30 transition-all flex flex-col justify-between shadow-lg">
            <div>
              <div className="w-14 h-14 rounded-xl bg-surface-container-highest flex items-center justify-center text-secondary mb-6 border border-white/[0.05]">
                <CloudOff className="w-7 h-7" />
              </div>
              <h3 className="font-display font-semibold text-xl text-white mb-2.5">
                Zero Central Servers
              </h3>
              <p className="font-sans text-sm text-on-surface-variant leading-relaxed">
                Because direct RF packets travel exclusively through local airwaves, no centralized telecommunication servers or internet service providers observe, log, or timestamp your message transmissions.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/[0.08] font-mono text-xs text-outline">
              NETWORK TOPOLOGY: AD-HOC DECENTRALIZED
            </div>
          </div>

          {/* Pillar 3 */}
          <div className="p-6 md:p-8 bg-surface-container-low rounded-xl border border-white/[0.08] hover:border-primary/30 transition-all flex flex-col justify-between shadow-lg">
            <div>
              <div className="w-14 h-14 rounded-xl bg-surface-container-highest flex items-center justify-center text-primary mb-6 border border-white/[0.05]">
                <EyeOff className="w-7 h-7" />
              </div>
              <h3 className="font-display font-semibold text-xl text-white mb-2.5">
                User Visibility Control
              </h3>
              <p className="font-sans text-sm text-on-surface-variant leading-relaxed">
                You dictate exactly when your radio broadcasts presence beacons. Toggle offline stealth mode at any instant to stop advertising discovery packets to nearby devices while continuing to listen.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/[0.08] font-mono text-xs text-outline">
              BEACON VISIBILITY: USER CONFIGURABLE
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

