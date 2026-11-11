import { Metadata } from "next";
import { EarlyAccessSection } from "@/components/sections/EarlyAccessSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { Smartphone, ShieldCheck, Zap } from "lucide-react";

export const metadata: Metadata = {
  title: "Early Access Program Registration",
  description:
    "Apply to join SPIKER private testing cohorts for upcoming Android offline communication builds.",
};

export default function EarlyAccessPage() {
  return (
    <div className="w-full bg-[#05070D]">
      {/* Informative Header Strip */}
      <div className="border-b border-white/[0.08] bg-[#060E1C] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-container/10 border border-secondary-container/30 text-secondary-container font-mono text-xs uppercase tracking-widest mb-3">
              <Zap className="w-3.5 h-3.5" />
              <span>TESTING COHORTS & DEVELOPER RELEASES</span>
            </div>
            <h1 className="font-display font-bold text-3xl sm:text-5xl text-white tracking-tight leading-tight">
              Join the SPIKER Early Access Program
            </h1>
            <p className="font-sans text-sm sm:text-base text-on-surface-variant mt-3 leading-relaxed">
              We are actively accepting field evaluators, outdoor enthusiasts, industrial teams, and mobile developers to test upcoming offline direct-radio Android builds.
            </p>
          </div>

          {/* Requirements Badges */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs">
            <div className="p-3.5 rounded-lg bg-surface-container-low border border-white/[0.08] flex items-center gap-3">
              <Smartphone className="w-5 h-5 text-secondary-container" />
              <div>
                <span className="text-white font-semibold block">Android 8.0+</span>
                <span className="text-outline text-[11px]">Consumer smartphone</span>
              </div>
            </div>
            <div className="p-3.5 rounded-lg bg-surface-container-low border border-white/[0.08] flex items-center gap-3">
              <Zap className="w-5 h-5 text-primary" />
              <div>
                <span className="text-white font-semibold block">BLE & Wi-Fi Direct</span>
                <span className="text-outline text-[11px]">Hardware chipsets</span>
              </div>
            </div>
            <div className="p-3.5 rounded-lg bg-surface-container-low border border-white/[0.08] flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-secondary" />
              <div>
                <span className="text-white font-semibold block">Zero Spam Guarantee</span>
                <span className="text-outline text-[11px]">Build notices only</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Intake Form Section */}
      <EarlyAccessSection />

      {/* FAQ for early access applicants */}
      <FaqSection />
    </div>
  );
}
