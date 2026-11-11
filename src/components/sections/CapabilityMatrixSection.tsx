import React from "react";
import { CheckCircle2, Construction, Compass, AlertCircle, ShieldCheck } from "lucide-react";
import { CAPABILITY_MATRIX } from "@/lib/constants";

export function CapabilityMatrixSection() {
  return (
    <section id="capabilities" className="w-full bg-[#060E1C] py-16 md:py-24 border-t border-white/[0.08] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-container/10 border border-secondary-container/30 text-secondary-container font-mono text-xs uppercase tracking-widest mb-3.5">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Technical Transparency & Audit</span>
          </div>
          <h2 className="font-display font-bold text-2xl sm:text-4xl text-white">
            Product Status & Capability Matrix
          </h2>
          <p className="font-sans text-sm sm:text-base text-on-surface-variant mt-2.5 leading-relaxed">
            We prioritize technical integrity over speculative promises. Here is an honest, verified account of what works today in internal Android builds, what is actively in development, and what we are investigating for future protocol iterations.
          </p>
        </div>

        {/* 3-Tier Status Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CAPABILITY_MATRIX.map((tier) => {
            const isCurrent = tier.stage === "CURRENT";
            const isDev = tier.stage === "DEVELOPMENT";

            return (
              <div
                key={tier.title}
                className={`p-6 md:p-8 rounded-xl bg-surface-container-low border transition-all flex flex-col justify-between shadow-lg relative ${
                  isCurrent
                    ? "border-secondary-container/40 shadow-[0_0_24px_rgba(0,213,255,0.08)]"
                    : isDev
                    ? "border-primary/40 shadow-[0_0_24px_rgba(52,120,246,0.08)]"
                    : "border-white/[0.08]"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between pb-3 mb-5 border-b border-white/[0.08]">
                    <span className="font-mono text-[11px] uppercase tracking-wider font-semibold text-secondary-container">
                      {tier.stageLabel}
                    </span>
                    <span
                      className={`w-2.5 h-2.5 rounded-full ${
                        isCurrent
                          ? "bg-secondary-container"
                          : isDev
                          ? "bg-primary animate-pulse"
                          : "bg-outline"
                      }`}
                    />
                  </div>

                  <div className="flex items-center gap-2.5 mb-3">
                    {isCurrent && <CheckCircle2 className="w-5 h-5 text-secondary-container" />}
                    {isDev && <Construction className="w-5 h-5 text-primary" />}
                    {!isCurrent && !isDev && <Compass className="w-5 h-5 text-outline" />}
                    <h3 className="font-display font-semibold text-xl text-white">
                      {tier.title}
                    </h3>
                  </div>

                  <p className="font-sans text-xs sm:text-sm text-on-surface-variant leading-relaxed mb-6">
                    {tier.description}
                  </p>

                  <ul className="space-y-3 font-sans text-xs sm:text-sm text-on-surface">
                    {tier.items.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <span
                          className={`w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 ${
                            isCurrent
                              ? "bg-secondary-container"
                              : isDev
                              ? "bg-primary"
                              : "bg-outline"
                          }`}
                        />
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 pt-4 border-t border-white/[0.08] font-mono text-[11px] text-outline flex items-center justify-between">
                  <span>DEPLOYMENT TIER:</span>
                  <span className="font-semibold text-white">{tier.stage}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Physical RF Reality Disclaimer */}
        <div className="mt-8 p-4 sm:p-5 rounded-xl bg-surface-container-lowest border border-white/[0.08] flex items-start gap-3.5">
          <AlertCircle className="w-5 h-5 text-secondary-container flex-shrink-0 mt-0.5" />
          <p className="font-sans text-xs sm:text-sm text-on-surface-variant leading-relaxed">
            <strong className="text-white">Physical RF Reality:</strong> Actual effective transmission range, connection negotiation latency, and bandwidth depend directly on physical laws: mobile device hardware chipsets, smartphone OS background execution models, physical line-of-sight, terrain obstacles, and local radio frequency interference.
          </p>
        </div>
      </div>
    </section>
  );
}
