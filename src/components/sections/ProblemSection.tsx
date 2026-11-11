import React from "react";
import { CloudOff, SignalZero, ZapOff, AlertOctagon } from "lucide-react";
import { PROBLEM_CARDS } from "@/lib/constants";

export function ProblemSection() {
  const iconMap: Record<string, React.ReactNode> = {
    CloudOff: <CloudOff className="w-7 h-7 text-error" />,
    Radio: <SignalZero className="w-7 h-7 text-error" />,
    ZapOff: <ZapOff className="w-7 h-7 text-error" />,
  };

  return (
    <section className="w-full bg-[#05070D] py-16 md:py-24 border-t border-white/[0.08] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12 md:mb-16">
          <span className="font-mono text-xs uppercase tracking-widest text-secondary-container block mb-2 font-semibold">
            02 // THE VULNERABILITY OF CONVENTIONAL NETWORKS
          </span>
          <h2 className="font-display font-bold text-2xl sm:text-4xl text-white">
            What happens when the network disappears?
          </h2>
          <p className="font-sans text-sm sm:text-base text-on-surface-variant mt-2.5 leading-relaxed">
            Every standard messaging application relies completely on central telecom switches, distant server farms, and fragile subterranean fiber lines. When those links fracture, devices in the exact same room become unable to communicate.
          </p>
        </div>

        {/* 3 Technical Failure Mode Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PROBLEM_CARDS.map((card, idx) => (
            <div
              key={card.code}
              className="p-6 md:p-8 bg-surface-container-low rounded-xl border border-white/[0.08] hover:border-error/50 transition-all flex flex-col justify-between group shadow-lg"
            >
              <div>
                <div className="w-14 h-14 rounded-xl bg-surface-container-highest flex items-center justify-center mb-6 group-hover:scale-105 transition-transform border border-white/[0.05]">
                  {iconMap[card.icon]}
                </div>
                <div className="font-mono text-[11px] text-error uppercase tracking-widest font-semibold mb-1">
                  {card.code}
                </div>
                <h3 className="font-display font-semibold text-xl text-white mb-3">
                  {card.title}
                </h3>
                <p className="font-sans text-sm text-on-surface-variant leading-relaxed">
                  {card.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/[0.08] font-mono text-xs text-outline flex items-center justify-between">
                <span>SYSTEM STATE</span>
                <span className="text-error font-semibold flex items-center gap-1.5">
                  <AlertOctagon className="w-3.5 h-3.5" />
                  {card.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
