import React from "react";
import Image from "next/image";
import { Radar, ArrowLeftRight, MessageSquare, CheckCheck, Clock, Lock, Sparkles } from "lucide-react";

export function ProductExperienceSection() {
  return (
    <section
      id="product-experience"
      className="w-full bg-[#080D18] py-16 md:py-24 border-t border-white/[0.08] relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-container/10 border border-secondary-container/30 text-secondary-container font-mono text-xs uppercase tracking-widest mb-3.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Product Experience & Visual Concept</span>
          </div>
          <h2 className="font-display font-bold text-2xl sm:text-4xl text-white">
            Meet the SPIKER Experience
          </h2>
          <p className="font-sans text-sm sm:text-base text-on-surface-variant mt-2.5 leading-relaxed">
            Intuitive direct communication built on local radio hardware. No complex configuration, no phone number verification required to transmit, and zero cloud middlemen.
          </p>
        </div>

        {/* Product Grid: High-res Studio Render + Interactive UI Breakdowns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Left: Studio Product Render */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden border border-secondary-container/40 shadow-[0_20px_50px_rgba(0,0,0,0.8)] bg-surface-container-lowest group aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3]">
              <Image
                src="/images/product/product-phones-app.jpg"
                alt="Ultra-realistic premium studio product photography of modern Android flagship smartphones displaying the SPIKER offline communication app interface with peer discovery and offline chat."
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center transform transition-transform duration-700 group-hover:scale-[1.02]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#060E1C]/80 via-transparent to-transparent pointer-events-none" />

              {/* Bottom Telemetry Floating Pill */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between p-3 rounded-xl bg-surface-container-low/90 backdrop-blur-md border border-white/[0.1]">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-secondary-container animate-pulse" />
                  <span className="font-mono text-xs text-white">
                    Hardware Radio Physical Layer Linked
                  </span>
                </div>
                <span className="font-mono text-[11px] text-secondary font-semibold">
                  AD-HOC LINK
                </span>
              </div>
            </div>
          </div>

          {/* Right: Detailed UI Architecture Breakdown */}
          <div className="lg:col-span-6 space-y-4">
            {/* Feature UI Card 1: Proximity Discovery */}
            <div className="p-5 rounded-xl bg-surface-container-low border border-white/[0.08] hover:border-secondary-container/40 transition-all">
              <div className="flex items-center justify-between mb-2.5">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-secondary-container/10 text-secondary-container">
                    <Radar className="w-5 h-5" />
                  </div>
                  <h3 className="font-display font-semibold text-base sm:text-lg text-white">
                    Proximity Peer Discovery
                  </h3>
                </div>
                <span className="font-mono text-[10px] uppercase px-2 py-0.5 rounded bg-surface-container-highest text-secondary-container font-semibold">
                  BLE 2.4 GHz
                </span>
              </div>
              <p className="font-sans text-xs sm:text-sm text-on-surface-variant leading-relaxed mb-3">
                Passive radio beacon scanning detects nearby devices automatically. Relative signal strength (RSSI) provides immediate proximity awareness without revealing exact GPS coordinates.
              </p>

              {/* Mini Simulation Pill */}
              <div className="p-3 bg-surface-container-lowest rounded-lg border border-white/[0.05] flex items-center justify-between text-xs font-mono">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-secondary-container animate-pulse" />
                  <span className="text-white font-medium">ROVER_01 (Nearby Peer)</span>
                </div>
                <span className="text-secondary-container font-semibold">-64 dBm (~18m line-of-sight)</span>
              </div>
            </div>

            {/* Feature UI Card 2: Active Connection */}
            <div className="p-5 rounded-xl bg-surface-container-low border border-white/[0.08] hover:border-primary/40 transition-all">
              <div className="flex items-center justify-between mb-2.5">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary">
                    <ArrowLeftRight className="w-5 h-5" />
                  </div>
                  <h3 className="font-display font-semibold text-base sm:text-lg text-white">
                    Direct Ad-Hoc Radio Socket
                  </h3>
                </div>
                <span className="font-mono text-[10px] uppercase px-2 py-0.5 rounded bg-surface-container-highest text-primary font-semibold">
                  Wi-Fi Direct
                </span>
              </div>
              <p className="font-sans text-xs sm:text-sm text-on-surface-variant leading-relaxed mb-3">
                High-speed socket negotiated on demand directly between two hardware radios. Payloads pass directly between device memory buffers across the air without touching any external Wi-Fi router.
              </p>

              <div className="p-3 bg-surface-container-lowest rounded-lg border border-white/[0.05] flex items-center justify-between text-xs font-mono">
                <span className="text-on-surface-variant">STREAM_ID: 0x9AF4</span>
                <span className="text-primary flex items-center gap-1 font-semibold">
                  <Lock className="w-3.5 h-3.5" /> Direct Local Channel
                </span>
              </div>
            </div>

            {/* Feature UI Card 3: Radio Delivery Status */}
            <div className="p-5 rounded-xl bg-surface-container-low border border-white/[0.08] hover:border-secondary/40 transition-all">
              <div className="flex items-center justify-between mb-2.5">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-secondary/10 text-secondary">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <h3 className="font-display font-semibold text-base sm:text-lg text-white">
                    Radio Delivery Indicators
                  </h3>
                </div>
                <span className="font-mono text-[10px] uppercase px-2 py-0.5 rounded bg-surface-container-highest text-secondary font-semibold">
                  PHYSICAL ACK
                </span>
              </div>
              <p className="font-sans text-xs sm:text-sm text-on-surface-variant leading-relaxed mb-3">
                Clear delivery acknowledgements transparently reflect local RF transmission conditions. Every message indicates whether it was broadcast over radio, received, or awaiting peer acknowledgment.
              </p>

              {/* Chat Simulation */}
              <div className="space-y-2 p-3 bg-surface-container-lowest rounded-lg border border-white/[0.05] text-xs">
                <div className="bg-surface-container-high p-2.5 rounded-lg max-w-[85%]">
                  <p className="text-white text-xs">Basecamp team: local radio links verified.</p>
                  <div className="flex items-center justify-end gap-1 mt-1 text-[10px] font-mono text-secondary-container">
                    <CheckCheck className="w-3 h-3" />
                    <span>Transmitted via Local Radio</span>
                  </div>
                </div>

                <div className="bg-surface-container p-2.5 rounded-lg max-w-[85%] ml-auto border border-white/[0.08]">
                  <p className="text-white text-xs">Standing by for next waypoint coordinates.</p>
                  <div className="flex items-center justify-end gap-1 mt-1 text-[10px] font-mono text-outline">
                    <Clock className="w-3 h-3" />
                    <span>Awaiting Peer RF Acknowledgement</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Technical Notice Banner */}
        <div className="mt-8 p-3.5 rounded-lg bg-surface-container-lowest border border-white/[0.08] flex items-center justify-between text-xs font-mono text-on-surface-variant">
          <span>NOTE: Interface imagery demonstrates UX architecture concepts under active prototyping.</span>
          <span className="text-secondary-container">HONEST TECHNICAL DISCLOSURE</span>
        </div>
      </div>
    </section>
  );
}
