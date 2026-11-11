import React from "react";
import Link from "next/link";
import { SpikerLogo } from "@/components/brand/SpikerLogo";
import { Radio, Shield, Cpu, Activity } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full bg-[#060E1C] border-t border-white/[0.08] pt-16 pb-12 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[250px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-[400px] h-[200px] bg-secondary-container/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12 mb-14">
          {/* Brand Column */}
          <div className="md:col-span-5 space-y-4">
            <SpikerLogo size="lg" showTagline />
            <p className="font-sans text-sm text-on-surface-variant max-w-sm leading-relaxed pt-2">
              Engineered for off-grid resilience and direct peer communications. Enabling local device-to-device radio messaging across compatible consumer smartphone hardware without cellular network or Internet dependency.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-container border border-white/[0.08] text-xs font-mono text-on-surface-variant">
              <span className="w-2 h-2 rounded-full bg-secondary-container" />
              <span>RF ARCHITECTURE: BLE 2.4 GHz + WI-FI DIRECT</span>
            </div>
          </div>

          {/* Nav Columns */}
          <div className="md:col-span-4 grid grid-cols-2 gap-8">
            <div className="space-y-3">
              <span className="font-mono text-xs uppercase tracking-widest text-outline block">
                Platform
              </span>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="/#product-experience"
                    className="text-on-surface-variant hover:text-secondary-container transition-colors"
                  >
                    Experience
                  </Link>
                </li>
                <li>
                  <Link
                    href="/technology"
                    className="text-on-surface-variant hover:text-secondary-container transition-colors"
                  >
                    Technology
                  </Link>
                </li>
                <li>
                  <Link
                    href="/#capabilities"
                    className="text-on-surface-variant hover:text-secondary-container transition-colors"
                  >
                    Capabilities
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy"
                    className="text-on-surface-variant hover:text-secondary-container transition-colors"
                  >
                    Privacy Architecture
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="text-on-surface-variant hover:text-secondary-container transition-colors"
                  >
                    About Mission
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <span className="font-mono text-xs uppercase tracking-widest text-outline block">
                Solutions
              </span>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="/use-cases"
                    className="text-on-surface-variant hover:text-secondary-container transition-colors"
                  >
                    Use Cases
                  </Link>
                </li>
                <li>
                  <Link
                    href="/enterprise"
                    className="text-on-surface-variant hover:text-secondary-container transition-colors"
                  >
                    Enterprise & Fleet
                  </Link>
                </li>
                <li>
                  <Link
                    href="/early-access"
                    className="text-on-surface-variant hover:text-secondary-container transition-colors"
                  >
                    Early Access Program
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-on-surface-variant hover:text-secondary-container transition-colors"
                  >
                    Contact Team
                  </Link>
                </li>
                <li>
                  <Link
                    href="/#faq"
                    className="text-on-surface-variant hover:text-secondary-container transition-colors"
                  >
                    Technical FAQ
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Protocol Specifications Column */}
          <div className="md:col-span-3 space-y-3">
            <span className="font-mono text-xs uppercase tracking-widest text-outline block">
              Protocol Specifications
            </span>
            <div className="p-4 rounded-xl bg-surface-container-low border border-white/[0.08] space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-secondary-container" />
                  <span className="font-mono text-xs text-secondary-container font-semibold">
                    RF SPECIFICATION
                  </span>
                </div>
                <span className="font-mono text-[10px] text-outline">P2P RADIO</span>
              </div>

              <div className="space-y-1.5 pt-1 text-[11px] font-mono text-on-surface-variant border-t border-white/[0.05]">
                <div className="flex justify-between">
                  <span>DISCOVERY:</span>
                  <span className="text-on-surface">BLE 2.4 GHz</span>
                </div>
                <div className="flex justify-between">
                  <span>SOCKET:</span>
                  <span className="text-on-surface">AD-HOC WI-FI P2P</span>
                </div>
                <div className="flex justify-between">
                  <span>TOPOLOGY:</span>
                  <span className="text-secondary-container">INFRASTRUCTURE-FREE</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Legal Bar */}
        <div className="pt-8 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-on-surface-variant">
          <span>&copy; {new Date().getFullYear()} SPIKER. All rights reserved.</span>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-secondary-container transition-colors">
              Privacy Information
            </Link>
            <Link href="/contact" className="hover:text-secondary-container transition-colors">
              Security Disclosures
            </Link>
            <span className="font-mono text-[11px] text-outline">
              DIRECT P2P RF PROTOCOL
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
