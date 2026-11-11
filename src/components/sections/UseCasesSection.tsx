import React from "react";
import Link from "next/link";
import { AlertTriangle, Compass, Factory, Users, Home, HeartPulse, ArrowUpRight } from "lucide-react";
import { USE_CASES_DATA } from "@/lib/constants";

export function UseCasesSection() {
  const iconMap: Record<string, React.ReactNode> = {
    AlertTriangle: <AlertTriangle className="w-6 h-6 text-secondary-container" />,
    Compass: <Compass className="w-6 h-6 text-secondary" />,
    Factory: <Factory className="w-6 h-6 text-primary" />,
    Users: <Users className="w-6 h-6 text-secondary-container" />,
    Home: <Home className="w-6 h-6 text-secondary" />,
    HeartPulse: <HeartPulse className="w-6 h-6 text-primary" />,
  };

  return (
    <section id="use-cases" className="w-full bg-[#05070D] py-16 md:py-24 border-t border-white/[0.08] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-4">
          <div className="max-w-3xl">
            <span className="font-mono text-xs uppercase tracking-widest text-secondary-container block mb-2 font-semibold">
              06 // OPERATIONAL SCENARIOS
            </span>
            <h2 className="font-display font-bold text-2xl sm:text-4xl text-white">
              Where communication matters most.
            </h2>
            <p className="font-sans text-sm sm:text-base text-on-surface-variant mt-2.5 leading-relaxed">
              Engineered for critical scenarios where conventional telecom networks are degraded, absent, or fundamentally compromised.
            </p>
          </div>

          <Link
            href="/use-cases"
            className="inline-flex items-center gap-1.5 font-display text-sm font-semibold text-secondary-container hover:text-white transition-colors"
          >
            <span>Explore In-Depth Scenarios</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 3x2 Bento Matrix Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {USE_CASES_DATA.map((item) => (
            <div
              key={item.id}
              className="p-6 md:p-8 bg-surface-container-low rounded-xl border border-white/[0.08] hover:border-secondary-container/40 transition-all flex flex-col justify-between group shadow-lg"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2.5 rounded-xl bg-surface-container-highest group-hover:scale-105 transition-transform border border-white/[0.05]">
                    {iconMap[item.icon]}
                  </div>
                  <span className="font-mono text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-surface-container-highest text-secondary-container">
                    {item.badge}
                  </span>
                </div>

                <h3 className="font-display font-semibold text-xl text-white mb-2.5">
                  {item.title}
                </h3>

                <p className="font-sans text-xs sm:text-sm text-on-surface-variant leading-relaxed mb-6">
                  {item.description}
                </p>

                <div className="space-y-1.5 mb-6">
                  {item.features.map((feat) => (
                    <div key={feat} className="flex items-center gap-2 text-xs font-mono text-on-surface">
                      <span className="w-1.5 h-1.5 rounded-full bg-secondary-container" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-white/[0.08] font-mono text-xs text-outline flex items-center justify-between">
                <span>SECTOR:</span>
                <span className="text-secondary font-semibold">{item.domain}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
