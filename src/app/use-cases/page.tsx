import { Metadata } from "next";
import Link from "next/link";
import { AlertTriangle, Compass, Factory, Users, Home, HeartPulse, ArrowRight, ShieldCheck } from "lucide-react";
import { USE_CASES_DATA } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Real-World Operational Use Cases",
  description:
    "Explore how SPIKER provides resilient offline communications across emergency preparedness, wilderness expeditions, shielded industrial sites, and crisis zones.",
};

export default function UseCasesPage() {
  const iconMap: Record<string, React.ReactNode> = {
    AlertTriangle: <AlertTriangle className="w-8 h-8 text-secondary-container" />,
    Compass: <Compass className="w-8 h-8 text-secondary" />,
    Factory: <Factory className="w-8 h-8 text-primary" />,
    Users: <Users className="w-8 h-8 text-secondary-container" />,
    Home: <Home className="w-8 h-8 text-secondary" />,
    HeartPulse: <HeartPulse className="w-8 h-8 text-primary" />,
  };

  return (
    <div className="w-full bg-[#05070D] py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-container/10 border border-secondary-container/30 text-secondary-container font-mono text-xs uppercase tracking-widest mb-4">
            <Compass className="w-3.5 h-3.5" />
            <span>OPERATIONAL SCENARIOS</span>
          </div>
          <h1 className="font-display font-bold text-3xl sm:text-5xl text-white tracking-tight leading-tight">
            Where offline communication saves time, resources, and lives.
          </h1>
          <p className="font-sans text-base sm:text-lg text-on-surface-variant mt-4 leading-relaxed">
            From remote wilderness ridges to collapsed municipal grids, discover how SPIKER enables direct local communication when cellular networks are out of range or completely incapacitated.
          </p>
        </div>

        {/* Use Cases Deep Dive */}
        <div className="space-y-12">
          {USE_CASES_DATA.map((item, idx) => (
            <div
              key={item.id}
              className="p-8 md:p-10 rounded-2xl bg-surface-container-low border border-white/[0.08] shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            >
              <div className="lg:col-span-8 space-y-4">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs font-bold px-2.5 py-1 rounded bg-surface-container-highest text-secondary-container">
                    0{idx + 1} // {item.badge}
                  </span>
                  <span className="font-mono text-xs text-outline">{item.domain}</span>
                </div>

                <h2 className="font-display font-bold text-2xl sm:text-3xl text-white">
                  {item.title}
                </h2>

                <p className="font-sans text-sm sm:text-base text-on-surface-variant leading-relaxed">
                  {item.description}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3">
                  {item.features.map((feat) => (
                    <div
                      key={feat}
                      className="p-3 rounded-lg bg-surface-container border border-white/[0.05] text-xs font-mono text-on-surface flex items-center gap-2"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-secondary-container flex-shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-4 flex flex-col items-center justify-center p-8 rounded-xl bg-surface-container-lowest border border-white/[0.05] text-center">
                <div className="w-16 h-16 rounded-2xl bg-surface-container-high flex items-center justify-center mb-4">
                  {iconMap[item.icon]}
                </div>
                <span className="font-mono text-xs text-secondary-container font-semibold uppercase tracking-wider">
                  RADIO ROLE
                </span>
                <span className="font-display text-sm font-semibold text-white mt-1">
                  Ad-Hoc Proximity Mesh
                </span>
                <p className="font-sans text-[11px] text-on-surface-variant mt-2 max-w-[200px]">
                  Zero reliance on telecom operators or external routers.
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 p-8 rounded-2xl bg-gradient-to-r from-surface-container-low to-surface-container border border-secondary-container/30 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="font-display font-bold text-xl text-white">
              Have an operational deployment scenario?
            </h3>
            <p className="font-sans text-sm text-on-surface-variant">
              Apply for an early access test cohort or register your field team.
            </p>
          </div>
          <Link
            href="/early-access"
            className="inline-flex items-center justify-center font-display text-sm font-semibold text-white bg-primary hover:bg-[#2563EB] px-6 py-3.5 rounded-lg shadow-[0_0_20px_rgba(0,213,255,0.35)] transition-all flex-shrink-0"
          >
            <span>Request Early Access</span>
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </div>
      </div>
    </div>
  );
}
