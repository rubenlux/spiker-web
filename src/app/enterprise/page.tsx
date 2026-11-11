import { Metadata } from "next";
import Link from "next/link";
import { Building2, Handshake, ShieldCheck, ArrowRight, CheckCircle2, PhoneCall } from "lucide-react";

export const metadata: Metadata = {
  title: "Enterprise Solutions & Pilot Cohorts",
  description:
    "Deploy SPIKER's decentralized offline communications across your industrial facility, remote field squad, or disaster response fleet.",
};

export default function EnterprisePage() {
  return (
    <div className="w-full bg-[#05070D] py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-container/10 border border-secondary-container/30 text-secondary-container font-mono text-xs uppercase tracking-widest mb-4">
            <Building2 className="w-3.5 h-3.5" />
            <span>ORGANIZATIONAL & INDUSTRIAL DEPLOYMENTS</span>
          </div>
          <h1 className="font-display font-bold text-3xl sm:text-5xl text-white tracking-tight leading-tight">
            Bring offline communication to your organization.
          </h1>
          <p className="font-sans text-base sm:text-lg text-on-surface-variant mt-4 leading-relaxed">
            Standard communications collapse exactly when they are needed most. SPIKER provides industrial enterprises, emergency responders, and remote infrastructure teams with dependable local radio connectivity.
          </p>
        </div>

        {/* 3 Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="p-8 rounded-2xl bg-surface-container-low border border-white/[0.08] shadow-xl space-y-4">
            <div className="w-12 h-12 rounded-xl bg-primary/20 text-primary flex items-center justify-center">
              <Building2 className="w-6 h-6" />
            </div>
            <h2 className="font-display font-bold text-xl text-white">Enterprise Fleet Solutions</h2>
            <p className="font-sans text-sm text-on-surface-variant leading-relaxed">
              Equip site personnel in underground mines, commercial shipping vessels, construction tunnels, and remote exploration fields with localized direct messaging.
            </p>
            <ul className="space-y-2 font-mono text-xs text-on-surface pt-2">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-secondary-container" />
                <span>Zero infrastructure maintenance</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-secondary-container" />
                <span>Runs on standard Android devices</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-secondary-container" />
                <span>Autonomous peer heartbeat telemetry</span>
              </li>
            </ul>
          </div>

          <div className="p-8 rounded-2xl bg-surface-container-low border border-white/[0.08] shadow-xl space-y-4">
            <div className="w-12 h-12 rounded-xl bg-secondary-container/20 text-secondary-container flex items-center justify-center">
              <Handshake className="w-6 h-6" />
            </div>
            <h2 className="font-display font-bold text-xl text-white">Technology Partnerships</h2>
            <p className="font-sans text-sm text-on-surface-variant leading-relaxed">
              Integrate the SPIKER direct RF protocol stack into specialized field communication hardware, ruggedized handsets, or custom Android enterprise builds.
            </p>
            <ul className="space-y-2 font-mono text-xs text-on-surface pt-2">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-secondary-container" />
                <span>Radio physical layer SDK</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-secondary-container" />
                <span>Hardware OEM test benches</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-secondary-container" />
                <span>Custom RF packet protocol profiles</span>
              </li>
            </ul>
          </div>

          <div className="p-8 rounded-2xl bg-surface-container-low border border-white/[0.08] shadow-xl space-y-4">
            <div className="w-12 h-12 rounded-xl bg-secondary/20 text-secondary flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h2 className="font-display font-bold text-xl text-white">Targeted Pilot Programs</h2>
            <p className="font-sans text-sm text-on-surface-variant leading-relaxed">
              Join focused evaluation cohorts to test real-world RF performance across your specific architectural geometries, building materials, and personnel flows.
            </p>
            <ul className="space-y-2 font-mono text-xs text-on-surface pt-2">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-secondary-container" />
                <span>Dedicated test cohort builds</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-secondary-container" />
                <span>Engineered range diagnostic logs</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-secondary-container" />
                <span>Direct engineer-to-engineer support</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Action Panel */}
        <div className="p-8 md:p-12 rounded-2xl bg-surface-container-low border border-secondary-container/40 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2 max-w-xl text-center md:text-left">
            <h3 className="font-display font-bold text-2xl text-white">
              Ready to evaluate SPIKER for your team?
            </h3>
            <p className="font-sans text-sm text-on-surface-variant leading-relaxed">
              Contact our solutions engineering group to discuss your site specifications, testing parameters, and deployment timeline.
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center font-display text-sm font-semibold text-white bg-primary hover:bg-[#2563EB] px-7 py-3.5 rounded-lg shadow-[0_0_24px_rgba(0,213,255,0.4)] transition-all flex-shrink-0 border border-cyan-400/30 group"
          >
            <PhoneCall className="w-4 h-4 mr-2" />
            <span>Contact Solutions Team</span>
            <ArrowRight className="w-4 h-4 ml-1.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}
