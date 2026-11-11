"use client";

import React, { useState } from "react";
import { Mail, MessageSquare, Building2, Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [organization, setOrganization] = useState("");
  const [inquiryType, setInquiryType] = useState<"enterprise" | "partnership" | "support" | "press">("enterprise");
  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, organization, inquiryType, message }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to submit message.");
      }

      setSuccess(true);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full bg-[#05070D] py-16 md:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-container/10 border border-secondary-container/30 text-secondary-container font-mono text-xs uppercase tracking-widest mb-4">
            <Mail className="w-3.5 h-3.5" />
            <span>OFFICIAL INQUIRIES & PARTNERSHIPS</span>
          </div>
          <h1 className="font-display font-bold text-3xl sm:text-5xl text-white tracking-tight leading-tight">
            Connect with the SPIKER Team
          </h1>
          <p className="font-sans text-base sm:text-lg text-on-surface-variant mt-4 leading-relaxed">
            Have questions about enterprise pilot cohorts, technology licensing, security disclosures, or research collaborations? Our solutions engineers are standing by.
          </p>
        </div>

        {/* Contact Form Card */}
        <div className="p-8 sm:p-12 rounded-2xl bg-surface-container-low border border-white/[0.08] shadow-2xl">
          {success ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-16 h-16 rounded-full bg-secondary-container/20 text-secondary-container mx-auto flex items-center justify-center border border-secondary-container/40">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <div className="font-mono text-xs text-secondary-container uppercase tracking-widest font-semibold">
                INQUIRY TRANSMITTED // REFERENCE LOGGED
              </div>
              <h2 className="font-display font-bold text-2xl text-white">
                Message Received, {name}
              </h2>
              <p className="font-sans text-sm text-on-surface-variant max-w-md mx-auto leading-relaxed">
                Your communication has been dispatched to our enterprise solutions team. We will reply to <strong className="text-white">{email}</strong> within 1-2 business days.
              </p>
              <div className="pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setSuccess(false);
                    setName("");
                    setEmail("");
                    setOrganization("");
                    setMessage("");
                  }}
                  className="font-mono text-xs text-secondary hover:underline"
                >
                  Send another inquiry
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div role="alert" className="p-4 rounded-lg bg-error-container/20 border border-error/40 flex items-start gap-3 text-xs text-error">
                  <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label htmlFor="contact-name" className="font-mono text-xs text-on-surface-variant uppercase tracking-wider block">
                    Your Name <span className="text-secondary-container">*</span>
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    aria-required="true"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Jordan Mitchell"
                    className="w-full px-4 py-3 bg-surface-container-lowest rounded-lg border border-white/[0.1] text-white font-sans text-sm placeholder:text-outline focus:outline-none focus:border-secondary-container focus:ring-1 focus:ring-secondary-container transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="contact-email" className="font-mono text-xs text-on-surface-variant uppercase tracking-wider block">
                    Work or Personal Email <span className="text-secondary-container">*</span>
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    aria-required="true"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="jordan@organization.org"
                    className="w-full px-4 py-3 bg-surface-container-lowest rounded-lg border border-white/[0.1] text-white font-sans text-sm placeholder:text-outline focus:outline-none focus:border-secondary-container focus:ring-1 focus:ring-secondary-container transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label htmlFor="contact-org" className="font-mono text-xs text-on-surface-variant uppercase tracking-wider block">
                    Company / Organization
                  </label>
                  <input
                    id="contact-org"
                    type="text"
                    value={organization}
                    onChange={(e) => setOrganization(e.target.value)}
                    placeholder="e.g. Alpine Rescue Unit, Site Operations"
                    className="w-full px-4 py-3 bg-surface-container-lowest rounded-lg border border-white/[0.1] text-white font-sans text-sm placeholder:text-outline focus:outline-none focus:border-secondary-container focus:ring-1 focus:ring-secondary-container transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="contact-inquiry-type" className="font-mono text-xs text-on-surface-variant uppercase tracking-wider block">
                    Inquiry Nature <span className="text-secondary-container">*</span>
                  </label>
                  <select
                    id="contact-inquiry-type"
                    value={inquiryType}
                    onChange={(e) => setInquiryType(e.target.value as any)}
                    className="w-full px-4 py-3 bg-surface-container-lowest rounded-lg border border-white/[0.1] text-white font-sans text-sm focus:outline-none focus:border-secondary-container focus:ring-1 focus:ring-secondary-container transition-all"
                  >
                    <option value="enterprise" className="bg-[#0A1421] text-white">Enterprise / Field Pilot</option>
                    <option value="partnership" className="bg-[#0A1421] text-white">Technology / Hardware OEM Partnership</option>
                    <option value="support" className="bg-[#0A1421] text-white">Developer Testing Cohort</option>
                    <option value="press" className="bg-[#0A1421] text-white">Press & Media Inquiries</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="contact-msg" className="font-mono text-xs text-on-surface-variant uppercase tracking-wider block">
                  Detailed Message <span className="text-secondary-container">*</span>
                </label>
                <textarea
                  id="contact-msg"
                  required
                  aria-required="true"
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Describe your operational environment, team size, or technical evaluation goals..."
                  className="w-full px-4 py-3 bg-surface-container-lowest rounded-lg border border-white/[0.1] text-white font-sans text-sm placeholder:text-outline focus:outline-none focus:border-secondary-container focus:ring-1 focus:ring-secondary-container transition-all resize-y"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 px-6 font-display text-sm sm:text-base font-semibold text-white bg-primary hover:bg-[#2563EB] disabled:opacity-50 disabled:cursor-not-allowed rounded-lg shadow-[0_0_24px_rgba(0,213,255,0.4)] transition-all flex items-center justify-center gap-2 border border-cyan-400/30"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-white" />
                    <span>Transmitting Message...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Send Inquiries to Engineering</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

