import { Metadata } from "next";
import Link from "next/link";
import { Shield, Lock, EyeOff, HardDrive, CheckCircle2, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Architecture & Data Sovereignty",
  description:
    "Review SPIKER's privacy architecture. Transparent, verified details regarding local device storage, ephemeral radio beacons, and zero central servers.",
};

export default function PrivacyPage() {
  return (
    <div className="w-full bg-[#05070D] py-16 md:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-container/10 border border-secondary-container/30 text-secondary-container font-mono text-xs uppercase tracking-widest mb-4">
            <Shield className="w-3.5 h-3.5" />
            <span>TRANSPARENT PRIVACY ARCHITECTURE</span>
          </div>
          <h1 className="font-display font-bold text-3xl sm:text-5xl text-white tracking-tight leading-tight">
            Your communication. Your local perimeter.
          </h1>
          <p className="font-sans text-base sm:text-lg text-on-surface-variant mt-4 leading-relaxed">
            Unlike commercial messaging applications that mine conversation graphs and metadata, SPIKER is engineered from the physical radio layer upward to eliminate centralized data collection.
          </p>
        </div>

        {/* Verified Privacy Facts */}
        <div className="space-y-8 text-on-surface-variant font-sans text-sm sm:text-base leading-relaxed">
          <div className="p-8 rounded-2xl bg-surface-container-low border border-white/[0.08] space-y-4">
            <div className="flex items-center gap-3">
              <HardDrive className="w-6 h-6 text-secondary-container" />
              <h2 className="font-display font-bold text-xl text-white">
                1. Local-First Device Storage
              </h2>
            </div>
            <p>
              All message payloads, conversation transcripts, and contact aliases are stored exclusively in your smartphone's sandboxed local application memory. There are no remote database mirrors, public cloud syncing services, or off-site analytical backups. If you delete a conversation or uninstall the app, the data ceases to exist on your device.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-surface-container-low border border-white/[0.08] space-y-4">
            <div className="flex items-center gap-3">
              <EyeOff className="w-6 h-6 text-primary" />
              <h2 className="font-display font-bold text-xl text-white">
                2. Ephemeral Radio Beacons
              </h2>
            </div>
            <p>
              When Bluetooth Low Energy discovery is enabled, your phone broadcasts temporary, randomized peer identifiers. These packets do not broadcast your phone number, real name, IMEI hardware number, or GPS coordinates. Nearby devices only recognize your presence if you have mutually exchanged contact credentials or accepted an ad-hoc handshake.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-surface-container-low border border-white/[0.08] space-y-4">
            <div className="flex items-center gap-3">
              <Lock className="w-6 h-6 text-secondary" />
              <h2 className="font-display font-bold text-xl text-white">
                3. Zero Centralized Intermediaries
              </h2>
            </div>
            <p>
              Because SPIKER data packets travel exclusively across local 2.4 GHz and 5 GHz airwaves directly between the participating hardware chipsets, no telecom carrier switch, Internet Service Provider, or cloud proxy server ever observes your message transmissions or creates metadata calling records.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-surface-container-low border border-white/[0.08] space-y-4">
            <div className="flex items-center gap-3">
              <Shield className="w-6 h-6 text-secondary-container" />
              <h2 className="font-display font-bold text-xl text-white">
                4. Absolute Stealth Mode Control
              </h2>
            </div>
            <p>
              You maintain total physical control over your radio transmitters. With a single tap, toggle offline stealth mode to silence all outgoing Bluetooth advertisement beacons. Your device will remain invisible to nearby scans while continuing to receive emergency broadcasts or manual connection requests.
            </p>
          </div>

          {/* Honest Technical Scope Disclosure */}
          <div className="p-6 rounded-xl bg-surface-container-lowest border border-white/[0.08] font-mono text-xs text-outline space-y-2">
            <span className="text-secondary-container font-semibold block uppercase">
              HONEST TECHNICAL DISCLOSURE:
            </span>
            <p className="leading-relaxed">
              We do not make speculative claims about unverified mathematical guarantees or universal anonymity. Unencrypted radio broadcasts across the open air can be detected by specialized RF spectrum analyzers in physical proximity. We are currently implementing end-to-end cryptographic key exchanges for upcoming cohort releases, and all progress is documented transparently in our Capability Status Matrix.
            </p>
          </div>
        </div>

        {/* Back navigation */}
        <div className="mt-12 pt-8 border-t border-white/[0.08] flex items-center justify-between">
          <Link
            href="/"
            className="font-display text-sm font-semibold text-secondary-container hover:underline"
          >
            &larr; Back to Platform Home
          </Link>
          <Link
            href="/contact"
            className="font-display text-sm font-semibold text-white hover:text-secondary-container"
          >
            Security & Compliance Inquiries &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
