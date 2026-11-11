"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { FAQ_ITEMS } from "@/lib/constants";

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="w-full bg-[#060E1C] py-16 md:py-24 border-t border-white/[0.08] relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-container/10 border border-secondary-container/30 text-secondary-container font-mono text-xs uppercase tracking-widest mb-3.5">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Technical Inquiries & Hardware Realities</span>
          </div>
          <h2 className="font-display font-bold text-2xl sm:text-4xl text-white">
            Frequently Answered Inquiries
          </h2>
          <p className="font-sans text-sm sm:text-base text-on-surface-variant mt-2.5 leading-relaxed">
            Honest explanations of local hardware radios, physical range limitations, and device compatibility.
          </p>
        </div>

        {/* Accessible Accordion */}
        <div className="space-y-3">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div
                key={item.id}
                className="rounded-xl bg-surface-container-low border border-white/[0.08] overflow-hidden transition-colors hover:border-white/[0.18]"
              >
                <button
                  type="button"
                  id={`faq-btn-${item.id}`}
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${item.id}`}
                  onClick={() => toggle(idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 font-display font-semibold text-base sm:text-lg text-white hover:text-secondary-container transition-colors focus:outline-none focus:ring-1 focus:ring-secondary-container"
                >
                  <span className="flex items-center gap-3">
                    <span className="font-mono text-xs text-secondary-container font-semibold">
                      0{idx + 1}.
                    </span>
                    <span>{item.question}</span>
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-secondary-container flex-shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div
                    id={`faq-panel-${item.id}`}
                    role="region"
                    aria-labelledby={`faq-btn-${item.id}`}
                    className="px-5 sm:px-6 pb-6 pt-1 font-sans text-sm text-on-surface-variant leading-relaxed border-t border-white/[0.04] animate-in fade-in duration-150"
                  >
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

