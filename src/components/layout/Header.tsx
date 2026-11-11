"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SpikerLogo } from "@/components/brand/SpikerLogo";
import { Menu, X, ArrowUpRight, Cpu, Radio, Shield, HelpCircle, Sparkles } from "lucide-react";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const navItems = [
    { href: "/technology", label: "Technology" },
    { href: "/use-cases", label: "Use Cases" },
    { href: "/#capabilities", label: "Capabilities" },
    { href: "/enterprise", label: "Enterprise" },
    { href: "/about", label: "About" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 ${
        scrolled || mobileOpen
          ? "bg-[#060E1C]/95 backdrop-blur-md border-b border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.8)]"
          : "bg-[#060E1C]/80 backdrop-blur-sm border-b border-white/[0.05]"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 md:h-20 flex items-center justify-between gap-4">
        {/* Left: Brand Logo */}
        <div className="flex-shrink-0">
          <SpikerLogo size="md" />
        </div>

        {/* Center: Desktop Nav */}
        <nav
          aria-label="Main Navigation"
          className="hidden lg:flex items-center gap-6 xl:gap-8"
        >
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`font-sans text-sm tracking-wide transition-colors py-1 relative ${
                  isActive
                    ? "text-secondary-container font-semibold"
                    : "text-on-surface-variant hover:text-on-surface"
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-secondary-container shadow-[0_0_8px_#00D5FF]" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/#faq"
            className="hidden sm:inline-flex items-center gap-1 font-mono text-xs uppercase tracking-wider text-on-surface-variant hover:text-secondary-container transition-colors px-2 py-1"
          >
            <HelpCircle className="w-3.5 h-3.5 text-secondary-container" />
            <span>FAQ</span>
          </Link>

          <Link
            href="/early-access"
            className="inline-flex items-center justify-center font-display text-xs sm:text-sm font-semibold text-white bg-primary hover:bg-[#2563EB] transition-all px-3.5 sm:px-5 py-2 rounded-md shadow-[0_0_16px_rgba(0,213,255,0.35)] hover:shadow-[0_0_24px_rgba(0,213,255,0.6)] border border-cyan-400/30 group"
          >
            <span>Early Access</span>
            <ArrowUpRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>

          {/* Mobile Hamburger Toggle Button */}
          <button
            type="button"
            aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 rounded-md text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors focus:outline-none focus:ring-1 focus:ring-secondary-container"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Accessible Mobile Navigation Drawer */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-white/[0.08] bg-[#060E1C] px-5 py-6 space-y-4 shadow-2xl animate-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col space-y-1">
            <Link
              href="/#product-experience"
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-between py-2.5 px-3 rounded text-sm font-medium text-on-surface hover:bg-surface-container hover:text-secondary-container transition-colors"
            >
              <span>Product Experience</span>
              <Sparkles className="w-4 h-4 text-secondary-container" />
            </Link>
            <Link
              href="/technology"
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-between py-2.5 px-3 rounded text-sm font-medium text-on-surface-variant hover:bg-surface-container hover:text-secondary-container transition-colors"
            >
              <span>Technology & Radio PHY</span>
              <Cpu className="w-4 h-4 text-primary" />
            </Link>
            <Link
              href="/#how-it-works"
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-between py-2.5 px-3 rounded text-sm font-medium text-on-surface-variant hover:bg-surface-container hover:text-secondary-container transition-colors"
            >
              <span>How It Works</span>
              <Radio className="w-4 h-4 text-secondary" />
            </Link>
            <Link
              href="/use-cases"
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-between py-2.5 px-3 rounded text-sm font-medium text-on-surface-variant hover:bg-surface-container hover:text-secondary-container transition-colors"
            >
              <span>Operational Use Cases</span>
              <ArrowUpRight className="w-4 h-4 text-on-surface-variant" />
            </Link>
            <Link
              href="/#capabilities"
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-between py-2.5 px-3 rounded text-sm font-medium text-on-surface-variant hover:bg-surface-container hover:text-secondary-container transition-colors"
            >
              <span>Capability Status Matrix</span>
              <Shield className="w-4 h-4 text-secondary-container" />
            </Link>
            <Link
              href="/enterprise"
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-between py-2.5 px-3 rounded text-sm font-medium text-on-surface-variant hover:bg-surface-container hover:text-secondary-container transition-colors"
            >
              <span>Enterprise & Pilot Cohorts</span>
              <ArrowUpRight className="w-4 h-4 text-on-surface-variant" />
            </Link>
            <Link
              href="/about"
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-between py-2.5 px-3 rounded text-sm font-medium text-on-surface-variant hover:bg-surface-container hover:text-secondary-container transition-colors"
            >
              <span>About SPIKER</span>
              <ArrowUpRight className="w-4 h-4 text-on-surface-variant" />
            </Link>
            <Link
              href="/privacy"
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-between py-2.5 px-3 rounded text-sm font-medium text-on-surface-variant hover:bg-surface-container hover:text-secondary-container transition-colors"
            >
              <span>Local Privacy Architecture</span>
              <Shield className="w-4 h-4 text-on-surface-variant" />
            </Link>
            <Link
              href="/#faq"
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-between py-2.5 px-3 rounded text-sm font-medium text-on-surface-variant hover:bg-surface-container hover:text-secondary-container transition-colors"
            >
              <span>Technical FAQ</span>
              <HelpCircle className="w-4 h-4 text-secondary-container" />
            </Link>
          </div>

          <div className="pt-4 border-t border-white/[0.08] flex flex-col gap-2">
            <Link
              href="/early-access"
              onClick={() => setMobileOpen(false)}
              className="w-full text-center py-3 rounded-md bg-primary text-white font-display text-sm font-semibold shadow-[0_0_20px_rgba(0,213,255,0.4)] hover:bg-[#2563EB] transition-all"
            >
              Join Early Access Program
            </Link>
            <Link
              href="/contact"
              onClick={() => setMobileOpen(false)}
              className="w-full text-center py-2.5 rounded-md border border-white/[0.1] text-on-surface text-sm font-medium hover:border-secondary-container/40 transition-colors"
            >
              Contact Enterprise Team
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
