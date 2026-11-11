import React from "react";
import { Bluetooth, ArrowLeftRight, Wifi, Check, Cpu } from "lucide-react";
import { HOW_IT_WORKS_STEPS } from "@/lib/constants";

export function HowItWorksSection() {
  const iconMap: Record<string, React.ReactNode> = {
    Radar: <Bluetooth className="w-6 h-6 text-secondary-container" />,
    Shuffle: <ArrowLeftRight className="w-6 h-6 text-secondary-container" />,
    Wifi: <Wifi className="w-6 h-6 text-primary" />,
  };

  return (
    <section id="how-it-works" className="w-full bg-[#05070D] py-16 md:py-24 border-t border-white/[0.08] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12 md:mb-16">
          <span className="font-mono text-xs uppercase tracking-widest text-secondary-container block mb-2 font-semibold">
            04 // OPERATIONAL WORKFLOW
          </span>
          <h2 className="font-display font-bold text-2xl sm:text-4xl text-white">
            How SPIKER Works: From Discovery to Connection
          </h2>
          <p className="font-sans text-sm sm:text-base text-on-surface-variant mt-2.5 leading-relaxed">
            Instead of routing your personal communication through distant telecom data centers, SPIKER coordinates two built-in radios on your smartphone to achieve immediate off-grid connectivity.
          </p>
        </div>

        {/* 3-Stage Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {HOW_IT_WORKS_STEPS.map((step) => (
            <div
              key={step.step}
              className="p-6 md:p-8 bg-surface-container-low rounded-xl border border-white/[0.08] hover:border-secondary-container/40 transition-all flex flex-col justify-between group shadow-lg"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <span className="font-mono text-xs font-semibold uppercase tracking-wider text-secondary-container bg-surface-container-highest px-2.5 py-1 rounded">
                    STAGE {step.step}
                  </span>
                  <div className="p-2.5 rounded-xl bg-surface-container-highest group-hover:scale-105 transition-transform border border-white/[0.05]">
                    {iconMap[step.icon]}
                  </div>
                </div>

                <h3 className="font-display font-semibold text-xl text-white mb-1.5">
                  {step.title}
                </h3>
                <div className="font-mono text-xs text-secondary mb-3 font-semibold">
                  {step.sub}
                </div>

                <p className="font-sans text-sm text-on-surface-variant leading-relaxed mb-6">
                  {step.description}
                </p>
              </div>

              <div className="p-3 bg-surface-container-lowest rounded-lg border border-white/[0.05] font-mono text-xs text-on-surface-variant">
                <span className="text-secondary-container font-semibold block mb-0.5">TECHNICAL NOTE:</span>
                {step.detail}
              </div>
            </div>
          ))}
        </div>

        {/* Radio Role Engineering Explainer */}
        <div className="mt-10 p-6 md:p-8 bg-surface-container-low/70 rounded-xl border border-white/[0.08] shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-7">
              <span className="font-mono text-xs uppercase tracking-wider text-secondary-container font-semibold block mb-1">
                RADIO ENGINEERING PHILOSOPHY
              </span>
              <h4 className="font-display font-semibold text-lg sm:text-xl text-white mb-2">
                Why Two Radios Instead of One?
              </h4>
              <p className="font-sans text-sm text-on-surface-variant leading-relaxed">
                Wi-Fi provides exceptional transmission bandwidth but consumes substantial battery power if kept constantly searching in standby. Bluetooth Low Energy draws negligible power but cannot efficiently transmit voice or data files. SPIKER orchestrates both: Bluetooth monitors for nearby peers in standby, while Wi-Fi Direct powers up on demand to transmit data payloads in fractions of a second.
              </p>
            </div>

            <div className="md:col-span-5 grid grid-cols-2 gap-3 text-center">
              <div className="p-4 rounded-lg bg-surface-container border border-white/[0.05]">
                <span className="font-display font-semibold text-sm sm:text-base text-secondary block mb-1">
                  Bluetooth LE
                </span>
                <span className="font-sans text-xs text-on-surface-variant">
                  Continuous proximity discovery with minimal battery impact
                </span>
              </div>
              <div className="p-4 rounded-lg bg-surface-container border border-white/[0.05]">
                <span className="font-display font-semibold text-sm sm:text-base text-secondary-container block mb-1">
                  Wi-Fi Direct
                </span>
                <span className="font-sans text-xs text-on-surface-variant">
                  High-throughput peer-to-peer file & message transport on demand
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

