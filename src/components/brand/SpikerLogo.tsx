import React from "react";
import Link from "next/link";
import Image from "next/image";

interface SpikerLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  showTagline?: boolean;
  linkToHome?: boolean;
}

export function SpikerLogo({
  className = "",
  size = "md",
  showTagline = false,
  linkToHome = true,
}: SpikerLogoProps) {
  const iconSizes = {
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-10 h-10",
  };

  const textSizes = {
    sm: "text-base tracking-[0.18em]",
    md: "text-lg md:text-xl tracking-[0.2em]",
    lg: "text-2xl md:text-3xl tracking-[0.22em]",
  };

  const content = (
    <div className={`flex items-center gap-3 group select-none ${className}`}>
      {/* Precision Vector RF Radio Mark */}
      <div className={`relative flex items-center justify-center flex-shrink-0 ${iconSizes[size]}`}>
        <svg
          viewBox="0 0 36 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full transform transition-transform duration-300 group-hover:scale-105"
        >
          <defs>
            <linearGradient id="spikerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00D5FF" />
              <stop offset="50%" stopColor="#3478F6" />
              <stop offset="100%" stopColor="#0058CC" />
            </linearGradient>
            <filter id="cyanGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Central Transmitter Core Node */}
          <circle cx="18" cy="18" r="3.5" fill="#00D5FF" filter="url(#cyanGlow)" />
          
          {/* Internal Pulse Node */}
          <circle cx="18" cy="18" r="1.5" fill="#FFFFFF" />

          {/* Inner Radio Wave Arc Left */}
          <path
            d="M12 12C10.4 13.6 9.5 15.7 9.5 18C9.5 20.3 10.4 22.4 12 24"
            stroke="#00D5FF"
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.85"
          />

          {/* Inner Radio Wave Arc Right */}
          <path
            d="M24 12C25.6 13.6 26.5 15.7 26.5 18C26.5 20.3 25.6 22.4 24 24"
            stroke="#00D5FF"
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.85"
          />

          {/* Outer High-Aperture Wave Arc Left */}
          <path
            d="M7 7C4.5 9.8 3 13.7 3 18C3 22.3 4.5 26.2 7 29"
            stroke="url(#spikerGrad)"
            strokeWidth="2.2"
            strokeLinecap="round"
          />

          {/* Outer High-Aperture Wave Arc Right */}
          <path
            d="M29 7C31.5 9.8 33 13.7 33 18C33 22.3 31.5 26.2 29 29"
            stroke="url(#spikerGrad)"
            strokeWidth="2.2"
            strokeLinecap="round"
          />

          {/* Top/Bottom Micro Guidance Telemetry Marks */}
          <line x1="18" y1="4" x2="18" y2="7" stroke="#3478F6" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="18" y1="29" x2="18" y2="32" stroke="#3478F6" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </div>

      <div className="flex flex-col">
        <span
          className={`font-display font-bold uppercase text-on-surface transition-colors group-hover:text-secondary-container ${textSizes[size]}`}
        >
          SPIKER
        </span>
        {showTagline && (
          <span className="font-mono text-[10px] md:text-xs tracking-wider text-secondary uppercase -mt-0.5">
            Communication without Internet
          </span>
        )}
      </div>
    </div>
  );

  if (linkToHome) {
    return (
      <Link href="/" aria-label="SPIKER Home" className="inline-block focus:outline-none">
        {content}
      </Link>
    );
  }

  return content;
}

