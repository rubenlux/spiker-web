import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Smartphone, Radio, Wifi, ZapOff } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden bg-[#060E1C] py-12 md:py-20 lg:py-24">
      {/* Ambient optical backglow */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[720px] h-[360px] bg-secondary-container/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 -right-24 w-[420px] h-[420px] bg-primary/10 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-[420px] h-[420px] bg-secondary/10 blur-[150px] rounded-full pointer-events-none" />

      {/* Subtle grid background matrix */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center space-y-5 md:space-y-6 max-w-4xl mx-auto">
          {/* Live Architecture Protocol Badge */}
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 bg-surface-container-low/90 rounded-full border border-secondary-container/30 shadow-[0_0_16px_rgba(0,213,255,0.15)]">
            <span className="w-2 h-2 rounded-full bg-secondary-container" />
            <span className="font-mono text-[10px] sm:text-xs uppercase tracking-widest text-secondary-container font-semibold">
              DIRECT RF PROTOCOL // PEER-TO-PEER LOCAL MESSAGING
            </span>
          </div>

          {/* Hero Headline */}
          <h1 className="font-display font-bold text-3xl sm:text-5xl md:text-6xl text-white tracking-tight leading-[1.12]">
            Stay connected when the{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary-container via-primary to-secondary">
              world goes offline.
            </span>
          </h1>

          {/* Supporting Copy */}
          <p className="font-sans text-sm sm:text-lg text-on-surface-variant max-w-3xl leading-relaxed">
            Communication shouldn't depend on Internet access. SPIKER connects nearby compatible devices directly through Bluetooth and WiFi Direct. Zero cellular networks required. Zero cloud servers in between. Pure local device-to-device connectivity.
          </p>

          {/* Dual CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-2 w-full sm:w-auto">
            <Link
              href="/early-access"
              className="w-full sm:w-auto inline-flex items-center justify-center font-display text-sm sm:text-base text-white bg-primary hover:bg-[#2563EB] transition-all px-7 py-3.5 rounded-lg shadow-[0_0_24px_rgba(0,213,255,0.4)] hover:shadow-[0_0_36px_rgba(0,213,255,0.6)] font-semibold border border-cyan-400/40 group"
            >
              <span>Join Early Access</span>
              <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </Link>

            <Link
              href="#product-experience"
              className="w-full sm:w-auto inline-flex items-center justify-center font-display text-sm sm:text-base text-on-surface bg-surface-container-high/80 hover:bg-surface-container-highest transition-all px-7 py-3.5 rounded-lg border border-white/[0.1] hover:border-secondary-container/40 font-medium"
            >
              <Smartphone className="w-4 h-4 mr-2 text-secondary-container" />
              <span>Discover the Technology</span>
            </Link>
          </div>

          {/* Telemetry Strip */}
          <div className="w-full pt-4 md:pt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="flex items-center justify-center gap-2.5 p-3.5 bg-surface-container-low/70 rounded-lg border border-white/[0.08] backdrop-blur-sm">
              <Radio className="w-4 h-4 text-secondary-container flex-shrink-0" />
              <span className="font-mono text-xs uppercase tracking-wider text-on-surface-variant">
                Low-Energy <span className="text-secondary-container font-semibold">Background Discovery</span>
              </span>
            </div>

            <div className="flex items-center justify-center gap-2.5 p-3.5 bg-surface-container-low/70 rounded-lg border border-white/[0.08] backdrop-blur-sm">
              <Wifi className="w-4 h-4 text-secondary flex-shrink-0" />
              <span className="font-mono text-xs uppercase tracking-wider text-on-surface-variant">
                <span className="text-white font-semibold">Direct Wi-Fi</span> Socket Negotiation
              </span>
            </div>

            <div className="flex items-center justify-center gap-2.5 p-3.5 bg-surface-container-low/70 rounded-lg border border-white/[0.08] backdrop-blur-sm">
              <ZapOff className="w-4 h-4 text-primary flex-shrink-0" />
              <span className="font-mono text-xs uppercase tracking-wider text-on-surface-variant">
                <span className="text-primary font-semibold">Zero Centralized</span> Server Dependency
              </span>
            </div>
          </div>
        </div>

        {/* Hardware Framing Composition */}
        <div className="mt-10 md:mt-14 relative max-w-5xl mx-auto rounded-xl bg-surface-container-low/80 border border-white/[0.12] p-2.5 sm:p-4 md:p-5 shadow-[0_24px_64px_rgba(0,0,0,0.85)]">
          {/* Technical HUD Header - Honest Architectural Framing */}
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/[0.08] text-on-surface-variant">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-secondary-container" />
              <span className="font-mono text-xs text-secondary-container tracking-wider font-semibold">
                HARDWARE ARCHITECTURE CONCEPT // P2P RADIO LINK
              </span>
            </div>
            <div className="hidden sm:flex items-center gap-5 font-mono text-xs text-outline">
              <span>BLE 2.4 GHz DISCOVERY</span>
              <span>WI-FI DIRECT P2P</span>
              <span className="text-secondary font-semibold">TELECOM INDEPENDENT</span>
            </div>
          </div>

          {/* Smartphone Hardware Showcase Container */}
          <div className="relative w-full overflow-hidden rounded-lg bg-[#05070D] aspect-[16/9] sm:aspect-[21/9] md:aspect-[16/9] max-h-[520px]">
            <Image
              src="/images/hero/hero-phones-3d.jpg"
              alt="Two modern smartphones angled toward each other with a glowing cyan and electric blue digital mesh wave transmitting directly between them in a dark studio cyberspace setting."
              fill
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1100px"
              className="object-cover object-center opacity-95 transition-transform duration-700 hover:scale-[1.02]"
            />

            {/* Overlaid Telemetry Badges - Clearly Labeled as Concept Specifications */}
            <div className="absolute top-3 left-3 sm:top-4 sm:left-4 p-2 sm:p-3 bg-surface-container-lowest/85 border border-secondary-container/40 rounded-lg backdrop-blur-md">
              <span className="font-mono text-[10px] text-secondary-container block uppercase tracking-widest font-semibold">
                Target Architecture
              </span>
              <span className="font-display text-xs sm:text-sm font-semibold text-white">
                DIRECT AD-HOC PEER CONNECTIVITY
              </span>
            </div>

            <div className="hidden sm:block absolute bottom-4 left-4 p-3 bg-surface-container-lowest/85 border border-white/[0.1] rounded-lg backdrop-blur-md">
              <span className="font-mono text-[10px] text-outline block uppercase tracking-widest">
                Supported RF Bands
              </span>
              <span className="font-display text-xs sm:text-sm text-primary font-semibold">
                Native 2.4 GHz & 5.0 GHz Radios
              </span>
            </div>

            <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 p-2 sm:p-3 bg-surface-container-lowest/85 border border-secondary-container/40 rounded-lg backdrop-blur-md text-right">
              <span className="font-mono text-[10px] text-secondary-container block uppercase tracking-widest font-semibold">
                Operational Model
              </span>
              <span className="font-display text-xs sm:text-sm font-semibold text-white">
                100% Cellular & Internet Free
              </span>
            </div>
          </div>

          <div className="mt-2 text-right">
            <span className="font-mono text-[10px] text-outline">
              * Approved Stitch 3D hardware composition. Illustrates intended direct wireless connectivity between devices.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
