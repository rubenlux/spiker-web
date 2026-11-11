"use client";

import React, { useState } from "react";
import { User, Building, Handshake, CheckCircle2, AlertCircle, Loader2, ArrowRight } from "lucide-react";
import { UserSegment } from "@/lib/types";

export function EarlyAccessSection() {
  const [selectedSegment, setSelectedSegment] = useState<UserSegment>("personal");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [deviceModel, setDeviceModel] = useState("");
  const [intendedUse, setIntendedUse] = useState("");
  const [consent, setConsent] = useState(false);

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const segmentConfig = {
    personal: {
      label: "Personal Users",
      desc: "Hikers, field travelers & backup communications",
      icon: <User className="w-5 h-5" />,
      fieldLabel: "Primary Personal Use Case",
      fieldPlaceholder: "e.g. Off-grid hiking group, emergency household preparation",
    },
    business: {
      label: "Businesses & Sites",
      desc: "Remote operations & industrial site teams",
      icon: <Building className="w-5 h-5" />,
      fieldLabel: "Company / Organization & Team Scope",
      fieldPlaceholder: "e.g. Mining safety squad, 35 field crew members",
    },
    partner: {
      label: "Technology Partners",
      desc: "Hardware OEMs & emergency relief networks",
      icon: <Handshake className="w-5 h-5" />,
      fieldLabel: "Partnership & Integration Interests",
      fieldPlaceholder: "e.g. OS radio framework evaluation, rugged device firmware testing",
    },
    organization: {
      label: "Institutions & NGOs",
      desc: "Civil defense, search-and-rescue squads",
      icon: <Building className="w-5 h-5" />,
      fieldLabel: "Mission & Deployment Scope",
      fieldPlaceholder: "e.g. Disaster relief squad, volunteer search & rescue unit",
    },
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!consent) {
      setError("Please confirm acknowledgment of the early access experimental testing terms.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/early-access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          email,
          country,
          deviceModel,
          userType: selectedSegment,
          intendedUse,
          consent,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Failed to submit registration. Please verify your connection.");
      }

      setSuccess(true);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred during submission. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="early-access" className="w-full bg-[#05070D] py-16 md:py-24 border-t border-white/[0.08] relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <span className="font-mono text-xs uppercase tracking-widest text-secondary-container block mb-2 font-semibold">
            09 // EARLY ACCESS INTAKE
          </span>
          <h2 className="font-display font-bold text-2xl sm:text-4xl text-white">
            Be among the first to experience SPIKER.
          </h2>
          <p className="font-sans text-sm sm:text-base text-on-surface-variant mt-2.5 max-w-2xl mx-auto leading-relaxed">
            Join testing cohorts for upcoming Android builds. Select your intended pathway below to register for direct developer releases and documentation.
          </p>
        </div>

        {/* Pathway Segment Selector Tabs */}
        <div className="mb-8 grid grid-cols-1 sm:grid-cols-3 gap-3">
          {(["personal", "business", "partner"] as const).map((seg) => {
            const isSelected = selectedSegment === seg;
            const item = segmentConfig[seg];

            return (
              <button
                key={seg}
                type="button"
                onClick={() => setSelectedSegment(seg)}
                className={`p-4 rounded-xl border text-left transition-all ${
                  isSelected
                    ? "border-secondary-container bg-secondary-container/10 shadow-[0_0_16px_rgba(0,213,255,0.15)]"
                    : "border-white/[0.08] bg-surface-container-low hover:border-white/[0.2]"
                }`}
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <span className={isSelected ? "text-secondary-container" : "text-on-surface-variant"}>
                    {item.icon}
                  </span>
                  <span className="font-display font-semibold text-sm text-white">{item.label}</span>
                </div>
                <p className="font-sans text-xs text-on-surface-variant">{item.desc}</p>
              </button>
            );
          })}
        </div>

        {/* Registration Form Card */}
        <div className="p-6 sm:p-10 bg-surface-container-low rounded-2xl border border-secondary-container/30 shadow-[0_16px_48px_rgba(0,0,0,0.7)] relative">
          {success ? (
            <div className="text-center py-10 space-y-4 animate-in fade-in zoom-in-95 duration-300">
              <div className="w-16 h-16 rounded-full bg-secondary-container/20 text-secondary-container mx-auto flex items-center justify-center border border-secondary-container/40">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <div className="font-mono text-xs uppercase tracking-widest text-secondary-container font-semibold">
                REGISTRATION CONFIRMED // COHORT QUEUED
              </div>
              <h3 className="font-display font-bold text-2xl text-white">
                Thank you, {fullName || "Field Tester"}!
              </h3>
              <p className="font-sans text-sm text-on-surface-variant max-w-md mx-auto leading-relaxed">
                Your early access registration has been recorded in our evaluation registry. As testing cohorts roll out for compatible Android hardware in your region, instructions will be delivered to <strong className="text-white">{email}</strong>.
              </p>
              <div className="pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setSuccess(false);
                    setFullName("");
                    setEmail("");
                    setCountry("");
                    setDeviceModel("");
                    setIntendedUse("");
                    setConsent(false);
                  }}
                  className="font-mono text-xs text-secondary hover:underline"
                >
                  Submit another registration
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <div className="p-4 rounded-lg bg-error-container/20 border border-error/40 flex items-start gap-3 text-xs text-error">
                  <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Full Name */}
                <div className="space-y-1.5">
                  <label className="font-mono text-xs text-on-surface-variant uppercase tracking-wider block">
                    Full Name <span className="text-secondary-container">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Alex Rivera"
                    className="w-full px-4 py-2.5 bg-surface-container-lowest rounded-lg border border-white/[0.1] text-white font-sans text-sm placeholder:text-outline focus:outline-none focus:border-secondary-container focus:ring-1 focus:ring-secondary-container transition-all"
                  />
                </div>

                {/* Email Address */}
                <div className="space-y-1.5">
                  <label className="font-mono text-xs text-on-surface-variant uppercase tracking-wider block">
                    Email Address <span className="text-secondary-container">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="alex@domain.com"
                    className="w-full px-4 py-2.5 bg-surface-container-lowest rounded-lg border border-white/[0.1] text-white font-sans text-sm placeholder:text-outline focus:outline-none focus:border-secondary-container focus:ring-1 focus:ring-secondary-container transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Country / Operating Region */}
                <div className="space-y-1.5">
                  <label className="font-mono text-xs text-on-surface-variant uppercase tracking-wider block">
                    Country / Operating Region <span className="text-secondary-container">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    placeholder="e.g. Spain, Chile, United States"
                    className="w-full px-4 py-2.5 bg-surface-container-lowest rounded-lg border border-white/[0.1] text-white font-sans text-sm placeholder:text-outline focus:outline-none focus:border-secondary-container focus:ring-1 focus:ring-secondary-container transition-all"
                  />
                </div>

                {/* Test Device Model */}
                <div className="space-y-1.5">
                  <label className="font-mono text-xs text-on-surface-variant uppercase tracking-wider block">
                    Primary Android Device Model
                  </label>
                  <input
                    type="text"
                    value={deviceModel}
                    onChange={(e) => setDeviceModel(e.target.value)}
                    placeholder="e.g. Pixel 8, Galaxy S24, Xiaomi 13"
                    className="w-full px-4 py-2.5 bg-surface-container-lowest rounded-lg border border-white/[0.1] text-white font-sans text-sm placeholder:text-outline focus:outline-none focus:border-secondary-container focus:ring-1 focus:ring-secondary-container transition-all"
                  />
                </div>
              </div>

              {/* Dynamic Segment Note */}
              <div className="space-y-1.5">
                <label className="font-mono text-xs text-on-surface-variant uppercase tracking-wider block">
                  {segmentConfig[selectedSegment].fieldLabel}
                </label>
                <input
                  type="text"
                  value={intendedUse}
                  onChange={(e) => setIntendedUse(e.target.value)}
                  placeholder={segmentConfig[selectedSegment].fieldPlaceholder}
                  className="w-full px-4 py-2.5 bg-surface-container-lowest rounded-lg border border-white/[0.1] text-white font-sans text-sm placeholder:text-outline focus:outline-none focus:border-secondary-container focus:ring-1 focus:ring-secondary-container transition-all"
                />
              </div>

              {/* Privacy Consent Checkbox */}
              <label className="flex items-start gap-3 cursor-pointer pt-2 select-none">
                <input
                  type="checkbox"
                  required
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  className="mt-1 rounded bg-surface-container-lowest border-white/[0.2] text-primary focus:ring-0 w-4 h-4"
                />
                <span className="font-sans text-xs text-on-surface-variant leading-relaxed">
                  I understand that early access releases are experimental test builds intended strictly for direct local radio evaluation on compatible Android devices. Zero marketing spam.
                </span>
              </label>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 px-6 font-display text-sm sm:text-base font-semibold text-white bg-primary hover:bg-[#2563EB] disabled:opacity-50 disabled:cursor-not-allowed rounded-lg shadow-[0_0_24px_rgba(0,213,255,0.4)] hover:shadow-[0_0_36px_rgba(0,213,255,0.6)] transition-all flex items-center justify-center gap-2 border border-cyan-400/30"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-white" />
                    <span>Transmitting Application...</span>
                  </>
                ) : (
                  <>
                    <span>Submit Early Access Request</span>
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </>
                )}
              </button>

              <div className="pt-2 text-center">
                <span className="font-mono text-[11px] text-outline">
                  SECURE LEAD COLLECTION // BACKEND ENDPOINT VERIFIED
                </span>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
