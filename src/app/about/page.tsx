import { Metadata } from "next";
import Link from "next/link";
import { Radio, ShieldCheck, Heart, ArrowRight, Zap, Globe2 } from "lucide-react";

export const metadata: Metadata = {
  title: "About SPIKER — Decentralized Offline Mission",
  description:
    "Learn about SPIKER's mission to build resilient, local-first communication technology that operates independently of commercial telecom networks.",
};

export default function AboutPage() {
  return (
    <div className="w-full bg-[#05070D] py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-container/10 border border-secondary-container/30 text-secondary-container font-mono text-xs uppercase tracking-widest mb-4">
            <Globe2 className="w-3.5 h-3.5" />
            <span>OUR MISSION & PRINCIPLES</span>
          </div>
          <h1 className="font-display font-bold text-3xl sm:text-5xl text-white tracking-tight leading-tight">
            Communication is a human fundamental, not a subscription service.
          </h1>
          <p className="font-sans text-base sm:text-lg text-on-surface-variant mt-4 leading-relaxed">
            We are engineering a future where nearby individuals, teams, and communities remain connected by default—even when commercial cell towers fail or natural disasters strike.
          </p>
        </div>

        {/* Narrative Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-16">
          <div className="lg:col-span-7 space-y-6 text-on-surface-variant leading-relaxed font-sans text-base">
            <h2 className="font-display font-bold text-2xl text-white">
              The Illusion of Ubiquitous Connectivity
            </h2>
            <p>
              Modern society has outsourced human communication to fragile centralized infrastructure. Every text message you send travels hundreds of miles through fiber optic cables, telecom switching offices, and data center servers—even if the person you are talking to is standing across the street.
            </p>
            <p>
              When a storm cuts power lines, when carrier networks become oversaturated at a massive gathering, or when you venture into remote wilderness outside cell tower reach, standard messaging applications stop functioning entirely. Devices that have powerful 2.4 GHz and 5 GHz wireless transceivers sit silent simply because they are programmed to depend on distant telecom intermediaries.
            </p>
            <h2 className="font-display font-bold text-2xl text-white pt-4">
              The Local-First Radio Alternative
            </h2>
            <p>
              SPIKER was founded on an obvious realization: modern smartphones already contain world-class high-frequency radio hardware. By developing intelligent coordination protocols that pair Bluetooth Low Energy for discovery with Wi-Fi Direct for broadband data transfer, devices can speak directly to one another across the airwaves.
            </p>
            <p>
              No cloud servers. No mobile network subscriptions. No public IP routing. Just clean, resilient, local radio communication.
            </p>
          </div>

          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 rounded-2xl bg-surface-container-low border border-white/[0.08] shadow-xl space-y-4">
              <span className="font-mono text-xs text-secondary-container font-semibold uppercase tracking-widest">
                CORE PRINCIPLES
              </span>
              <ul className="space-y-4 font-sans text-sm">
                <li className="flex items-start gap-3">
                  <div className="p-1 rounded-full bg-secondary-container/20 text-secondary-container mt-1">
                    <Radio className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-white block font-display">Local-First Architecture</strong>
                    <span className="text-on-surface-variant text-xs">
                      All messages, states, and contacts exist solely on physical hardware.
                    </span>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <div className="p-1 rounded-full bg-primary/20 text-primary mt-1">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-white block font-display">Honest Radio Physics</strong>
                    <span className="text-on-surface-variant text-xs">
                      We never invent impossible range claims. We design within verified RF boundaries.
                    </span>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <div className="p-1 rounded-full bg-secondary/20 text-secondary mt-1">
                    <Zap className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-white block font-display">Zero Cloud Gatekeepers</strong>
                    <span className="text-on-surface-variant text-xs">
                      No central entity can turn off, monitor, or censor your direct local transmissions.
                    </span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="p-8 md:p-10 rounded-2xl bg-gradient-to-r from-surface-container-low to-surface-container border border-secondary-container/30 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="font-display font-bold text-xl text-white">
              Want to support or evaluate our technology?
            </h3>
            <p className="font-sans text-sm text-on-surface-variant">
              Request early access or connect with our engineering team directly.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/early-access"
              className="inline-flex items-center justify-center font-display text-sm font-semibold text-white bg-primary hover:bg-[#2563EB] px-6 py-3 rounded-lg shadow-[0_0_20px_rgba(0,213,255,0.35)] transition-all"
            >
              Early Access
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center font-display text-sm font-medium text-on-surface bg-surface-container-high hover:bg-surface-container-highest px-6 py-3 rounded-lg border border-white/[0.1] transition-all"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
