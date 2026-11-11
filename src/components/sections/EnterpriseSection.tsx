import React from "react";
import Link from "next/link";
import { Building2, Handshake, ShieldAlert, ArrowRight, CheckCircle2 } from "lucide-react";

export function EnterpriseSection() {
  return (
    <section className="w-full bg-[#060E1C] py-16 md:py-24 border-t border-white/[0.08] relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[300px] bg-primary/5 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mb-12 md:mb-16">
          <span className="font-mono text-xs uppercase tracking-widest text-secondary-container block mb-2 font-semibold">
            08 // ORGANIZATIONAL RESILIENCE
          </span>
          <h2 className="font-display font-bold text-2xl sm:text-4xl text-white">
            Bring offline communication to your organization.
          </h2>
          <p className="font-sans text-sm sm:text-base text-on-surface-variant mt-2.5 leading-relaxed">
            Industrial operations, disaster recovery agencies, search-and-rescue squads, and remote field enterprises rely on unbroken communication. Discover tailored deployment programs for dedicated operational teams.
          </p>
        </div>

        {/* 3 Enterprise Offerings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Solution 1 */}
          <div className="p-6 md:p-8 rounded-xl bg-surface-container-low border border-white/[0.08] hover:border-primary/40 transition-all flex flex-col justify-between shadow-lg">
            <div>
              <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-5">
                <Building2 className="w-6 h-6" />
              </div>
              <h3 className="font-display font-semibold text-xl text-white mb-2">
                Enterprise Solutions
              </h3>
              <p className="font-sans text-xs sm:text-sm text-on-surface-variant leading-relaxed mb-4">
                Deploy offline local communication protocols across field operations, mining sites, maritime vessels, and shielded manufacturing environments.
              </p>
              <ul className="space-y-2 text-xs font-mono text-on-surface">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-secondary-container" />
                  <span>Fleet proximity telemetry</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-secondary-container" />
                  <span>Zero public cloud dependency</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-secondary-container" />
                  <span>Compatible with standard Android devices</span>
                </li>
              </ul>
            </div>
            <div className="mt-6 pt-4 border-t border-white/[0.08] font-mono text-[11px] text-outline">
              FOCUS: INDUSTRIAL & FIELD OPERATIONS
            </div>
          </div>

          {/* Solution 2 */}
          <div className="p-6 md:p-8 rounded-xl bg-surface-container-low border border-white/[0.08] hover:border-secondary-container/40 transition-all flex flex-col justify-between shadow-lg">
            <div>
              <div className="w-12 h-12 rounded-xl bg-secondary-container/10 text-secondary-container flex items-center justify-center mb-5">
                <Handshake className="w-6 h-6" />
              </div>
              <h3 className="font-display font-semibold text-xl text-white mb-2">
                Technology Partnerships
              </h3>
              <p className="font-sans text-xs sm:text-sm text-on-surface-variant leading-relaxed mb-4">
                Partner with the SPIKER engineering core to integrate direct RF communication layers into specialized field tablets, ruggedized radios, and proprietary systems.
              </p>
              <ul className="space-y-2 text-xs font-mono text-on-surface">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-secondary-container" />
                  <span>Hardware OEM evaluation</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-secondary-container" />
                  <span>Ad-hoc radio protocol SDKs</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-secondary-container" />
                  <span>Direct developer core support</span>
                </li>
              </ul>
            </div>
            <div className="mt-6 pt-4 border-t border-white/[0.08] font-mono text-[11px] text-outline">
              FOCUS: OEM & HARDWARE PLATFORMS
            </div>
          </div>

          {/* Solution 3 */}
          <div className="p-6 md:p-8 rounded-xl bg-surface-container-low border border-white/[0.08] hover:border-secondary/40 transition-all flex flex-col justify-between shadow-lg">
            <div>
              <div className="w-12 h-12 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center mb-5">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <h3 className="font-display font-semibold text-xl text-white mb-2">
                Targeted Pilot Programs
              </h3>
              <p className="font-sans text-xs sm:text-sm text-on-surface-variant leading-relaxed mb-4">
                Join private pilot testing cohorts to rigorously evaluate peer-to-peer radio resilience in your facility's exact physical geometry and RF background conditions.
              </p>
              <ul className="space-y-2 text-xs font-mono text-on-surface">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-secondary-container" />
                  <span>Dedicated test cohort builds</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-secondary-container" />
                  <span>Structured RF range diagnostics</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-secondary-container" />
                  <span>Tailored feedback review channel</span>
                </li>
              </ul>
            </div>
            <div className="mt-6 pt-4 border-t border-white/[0.08] font-mono text-[11px] text-outline">
              FOCUS: EVALUATION COHORTS
            </div>
          </div>
        </div>

        {/* Enterprise Call To Action Card */}
        <div className="p-8 sm:p-10 rounded-2xl bg-gradient-to-r from-surface-container-low to-surface-container border border-secondary-container/30 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 text-center sm:text-left">
            <h4 className="font-display font-bold text-xl sm:text-2xl text-white">
              Evaluate SPIKER for your mission-critical operations.
            </h4>
            <p className="font-sans text-sm text-on-surface-variant max-w-xl">
              Connect with our solutions engineering team to discuss your environment, testing parameters, and early access pilot slots.
            </p>
          </div>
          <Link
            href="/enterprise"
            className="inline-flex items-center justify-center font-display text-sm font-semibold text-white bg-primary hover:bg-[#2563EB] px-6 py-3.5 rounded-lg shadow-[0_0_20px_rgba(0,213,255,0.35)] transition-all flex-shrink-0 border border-cyan-400/30 group"
          >
            <span>Request Pilot Consultation</span>
            <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
