"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Radio,
  Settings2,
  Handshake,
  Database,
  ShieldCheck,
  Cookie,
  Baby,
  RefreshCw,
  Lock,
  Ban,
  BadgeCheck,
  UserCheck,
  Plane,
  Mail,
  Globe,
  ClipboardList,
  ChevronRight,
} from "lucide-react";

// ─── Section icon map ─────────────────────────────────────────────────────────

const sectionIcons = {
  "information-we-collect": Radio,
  "how-we-use": Settings2,
  "data-sharing": Handshake,
  "data-storage": Database,
  "your-rights": ShieldCheck,
  cookies: Cookie,
  children: Baby,
  updates: RefreshCw,
};

// ─── Data ────────────────────────────────────────────────────────────────────

const sections = [
  {
    id: "information-we-collect",
    title: "Information We Collect",
    content: [
      {
        subtitle: "Location Data",
        text: "Routezy collects your GPS coordinates and location history to generate optimized itineraries, suggest nearby restaurants and ATMs, and power real-time trip progress tracking. Location data is only accessed when the app is in use or when background location is explicitly enabled.",
      },
      {
        subtitle: "Account Information",
        text: "When you create a Routezy account, we collect your name, email address, and optional profile photo. If you sign in via Google or Apple, we receive only the data those services share with us under their respective privacy policies.",
      },
      {
        subtitle: "Usage & Itinerary Data",
        text: "We collect the trips you plan, attractions you visit, and interactions with the app. This data powers personalization and improves our route optimization algorithms.",
      },
      {
        subtitle: "Device Information",
        text: "We collect device type, operating system version, app version, and anonymous crash logs to maintain performance and fix bugs. We do not access contacts, camera, or microphone without your explicit permission.",
      },
    ],
  },
  {
    id: "how-we-use",
    title: "How We Use Your Data",
    content: [
      {
        subtitle: "Itinerary Generation",
        text: "Your location, time budget, and preferences are processed in real time to build optimized travel plans using our TSP-based routing engine. This data is used exclusively to deliver your requested itinerary.",
      },
      {
        subtitle: "Personalization",
        text: "Past trip data helps us refine recommendations, prioritize attraction types you prefer, and improve the accuracy of visit-duration estimates over time. You can reset your personalization profile at any time from Settings.",
      },
      {
        subtitle: "Community Features",
        text: "Traveler tips you submit are published under your display name. Private notes are never shared. Shared itinerary links contain only the trip plan data — not your account details or location history.",
      },
      {
        subtitle: "Product Improvement",
        text: "Aggregated, anonymized usage patterns help us improve route optimization, identify popular attractions in new cities, and develop features. No individual user data is used in public-facing analytics.",
      },
    ],
  },
  {
    id: "data-sharing",
    title: "Data Sharing & Third Parties",
    content: [
      {
        subtitle: "Google Maps Platform",
        text: "We use Google Maps APIs (Places, Directions, Distance Matrix) to power map rendering, attraction search, and route calculation. Your location queries are sent to Google under their API terms. We do not share your personal identity with Google Maps.",
      },
      {
        subtitle: "Sponsored Placements",
        text: "Restaurant partners and promoted attractions receive only aggregated impression counts — never your personal data, name, or travel history. Sponsored content is always clearly labeled within the app.",
      },
      {
        subtitle: "Affiliate Booking Partners",
        text: "When you tap a hotel or activity booking link, you are redirected to partners like Booking.com or GetYourGuide. These partners have their own privacy policies. Routezy receives anonymized booking confirmation for commission purposes only.",
      },
      {
        subtitle: "Legal Requirements",
        text: "We will disclose data if required by law, court order, or to protect the safety and rights of Routezy users. We will notify affected users of any such request to the extent permitted by law.",
      },
    ],
  },
  {
    id: "data-storage",
    title: "Data Storage & Security",
    content: [
      {
        subtitle: "Infrastructure",
        text: "Routezy data is stored on MongoDB Atlas clusters in secure, SOC 2-certified data centers. Firebase handles authentication tokens and real-time sync. All data is encrypted at rest using AES-256 and in transit via TLS 1.3.",
      },
      {
        subtitle: "Retention Policy",
        text: "Active account data is retained as long as your account exists. Community tips you submit remain unless you manually delete them.",
      },
      {
        subtitle: "Security Practices",
        text: "We conduct regular security audits, employ rate limiting on all API endpoints, and follow OWASP guidelines. Passwords are hashed with bcrypt. We maintain an internal incident response plan and will notify affected users within 72 hours of any confirmed data breach.",
      },
    ],
  },
  {
    id: "your-rights",
    title: "Your Rights & Controls",
    content: [
      {
        subtitle: "Correction & Deletion",
        text: "You may update your account information at any time. To permanently delete your account and all associated data, go to Settings → Account → Delete Account. Deletion is irreversible and processed within 30 days.",
      },
      {
        subtitle: "Location Permissions",
        text: "You can revoke location access at any time via your device's app permissions. Note that core features including itinerary generation and live trip tracking require location access to function.",
      },
      {
        subtitle: "Marketing Communications",
        text: "You can unsubscribe from promotional emails via the link in any email footer or from Settings → Notifications. Transactional emails (booking confirmations, security alerts) cannot be disabled.",
      },
    ],
  },
  {
    id: "cookies",
    title: "Cookies & Tracking",
    content: [
      {
        subtitle: "Essential Cookies",
        text: "We use strictly necessary cookies to maintain your session, remember authentication state, and store UI preferences (such as map style). These cannot be disabled as they are required for the app to function.",
      },
      {
        subtitle: "Analytics",
        text: "With your consent, we use anonymized analytics to understand feature usage and user flows. We do not use third-party advertising trackers or sell behavioral data to ad networks. Routezy products are ad-free — we do not allow advertisers to target users through our platform.",
      },
    ],
  },
  {
    id: "children",
    title: "Children's Privacy",
    content: [
      {
        subtitle: "Age Requirement",
        text: "Routezy is intended for users aged 13 and older. We do not knowingly collect personal information from children under 13. If we become aware that a child under 13 has provided us personal data, we will delete that information promptly. Parents or guardians may contact us at routezy.support@gmail.com.",
      },
    ],
  },
  {
    id: "updates",
    title: "Policy Updates",
    content: [
      {
        subtitle: "How We Notify You",
        text: "We will notify you of material changes to this policy via in-app notification and email at least 14 days before changes take effect. Continued use of Routezy after the effective date constitutes acceptance of the updated policy. The version history below tracks all changes.",
      },
    ],
  },
];

const versionHistory = [
  { version: "1.0.0", date: "March 22, 2026", change: "Initial Privacy Policy published." },
];

const trustStats = [
  { Icon: Lock,       label: "AES-256 Encrypted" },
  { Icon: Ban,        label: "Never Sold" },
  { Icon: BadgeCheck, label: "GDPR Aligned" },
  { Icon: UserCheck,  label: "You Own Your Data" },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function GradientText({ children }) {
  return (
    <span
      style={{
        background: "linear-gradient(135deg, #FF6B6B 0%, #FF8E53 50%, #FFC947 100%)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
      }}
    >
      {children}
    </span>
  );
}

function TableOfContents({ activeSection, onNavigate }) {
  return (
    <nav className="sticky top-8 hidden lg:block">
      <div
        className="rounded-2xl p-6"
        style={{
          background: "#F8F9FC",
          border: "1px solid #E2E8F2",
          boxShadow: "0 2px 8px rgba(0,0,0,0.06), 0 8px 24px rgba(0,0,0,0.04)",
        }}
      >
        <p
          className="text-xs font-bold uppercase tracking-widest mb-5"
          style={{ color: "#6B7280", fontFamily: "'DM Sans', sans-serif" }}
        >
          Contents
        </p>
        <ul className="space-y-1">
          {sections.map((s) => {
            const Icon = sectionIcons[s.id];
            const isActive = activeSection === s.id;
            return (
              <li key={s.id}>
                <button
                  onClick={() => onNavigate(s.id)}
                  className="w-full text-left flex items-center gap-3 px-3 py-2 rounded-xl transition-all duration-200"
                  style={{
                    background: isActive
                      ? "linear-gradient(135deg, rgba(255,107,107,0.12) 0%, rgba(255,201,71,0.08) 100%)"
                      : "transparent",
                  }}
                >
                  <Icon
                    size={15}
                    strokeWidth={isActive ? 2.2 : 1.8}
                    style={{ color: isActive ? "#FF6B6B" : "#9CA3AF", flexShrink: 0 }}
                  />
                  <span
                    className="text-sm font-medium flex-1"
                    style={{
                      color: isActive ? "#FF6B6B" : "#374151",
                      fontFamily: "'DM Sans', sans-serif",
                    }}
                  >
                    {s.title}
                  </span>
                  {isActive && (
                    <ChevronRight size={13} style={{ color: "#FF6B6B", flexShrink: 0 }} />
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}

function SectionCard({ section, index }) {
  const Icon = sectionIcons[section.id];
  return (
    <div
      id={section.id}
      className="rounded-2xl p-8 scroll-mt-8"
      style={{
        background: "#FFFFFF",
        border: "1px solid #E2E8F2",
        boxShadow: "0 2px 8px rgba(0,0,0,0.06), 0 8px 24px rgba(0,0,0,0.04)",
      }}
    >
      {/* Header */}
      <div className="flex items-start gap-4 mb-7">
        <div
          className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
          style={{
            background: "linear-gradient(135deg, rgba(255,107,107,0.12) 0%, rgba(255,201,71,0.10) 100%)",
            border: "1px solid rgba(255,107,107,0.15)",
          }}
        >
          <Icon size={22} strokeWidth={1.8} style={{ color: "#FF6B6B" }} />
        </div>
        <div>
          <span
            className="text-xs font-bold uppercase tracking-widest"
            style={{ color: "#FF8E53", fontFamily: "'DM Sans', sans-serif" }}
          >
            Section {String(index + 1).padStart(2, "0")}
          </span>
          <h2
            className="text-xl font-semibold mt-0.5"
            style={{ color: "#0F2044", fontFamily: "'Poppins', sans-serif" }}
          >
            {section.title}
          </h2>
        </div>
      </div>

      {/* Divider */}
      <div
        className="h-px mb-7"
        style={{ background: "linear-gradient(90deg, #FF6B6B22, #FFC94722, transparent)" }}
      />

      {/* Content */}
      <div className="space-y-6">
        {section.content.map((block, i) => (
          <div key={i} className="flex gap-4">
            <div className="flex-shrink-0 mt-2.5">
              <div
                className="w-2 h-2 rounded-full"
                style={{ background: "linear-gradient(135deg, #FF6B6B, #FFC947)" }}
              />
            </div>
            <div>
              <h3
                className="text-base font-semibold mb-1.5"
                style={{ color: "#1E3A6E", fontFamily: "'Poppins', sans-serif" }}
              >
                {block.subtitle}
              </h3>
              <p
                className="text-sm"
                style={{ color: "#374151", fontFamily: "'DM Sans', sans-serif", lineHeight: "1.75" }}
              >
                {block.text}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function PrivacyPolicyPage() {
  const [activeSection, setActiveSection] = useState(sections[0].id);
  const observerRef = useRef(null);

  useEffect(() => {
    const link = document.createElement("link");
    link.href =
      "https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&family=DM+Sans:wght@400;500;600&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }, []);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) setActiveSection(e.target.id); });
      },
      { rootMargin: "-20% 0px -60% 0px" }
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observerRef.current.observe(el);
    });
    return () => observerRef.current?.disconnect();
  }, []);

  const scrollTo = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <div style={{ background: "#F8F9FC", minHeight: "100vh", fontFamily: "'DM Sans', sans-serif" }}>

      {/* ── Navbar ── */}
      <header
        className="sticky top-0 z-50 backdrop-blur-md"
        style={{ background: "rgba(248,249,252,0.92)", borderBottom: "1px solid #E2E8F2" }}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Image
              src="/Logo.png"
              alt="Routezy Logo"
              width={48}
              height={48}
              className="rounded-xl"
            />
            <span className="font-bold text-lg" style={{ color: "#0F2044", fontFamily: "'Poppins', sans-serif" }}>
              Routezy
            </span>
          </div>

          <Link
            href="/terms-and-conditions"
            className="text-sm font-medium transition-colors hover:text-orange-500"
            style={{ color: "#374151", fontFamily: "'DM Sans', sans-serif" }}
          >
            Terms and Conditions
          </Link>
        </div>
      </header>

      {/* ── Hero ── */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(255,107,107,0.12) 0%, rgba(255,201,71,0.06) 60%, transparent 100%)",
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none opacity-30"
          style={{
            backgroundImage:
              "linear-gradient(#E2E8F2 1px, transparent 1px), linear-gradient(90deg, #E2E8F2 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        <div className="relative max-w-4xl mx-auto px-6 pt-20 pb-16 text-center">
          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider mb-6"
            style={{
              background: "linear-gradient(135deg, rgba(255,107,107,0.12), rgba(255,201,71,0.08))",
              border: "1px solid rgba(255,107,107,0.2)",
              color: "#FF6B6B",
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            <Lock size={12} strokeWidth={2.5} />
            Last Updated: March 22, 2026 · Version 1.0.0
          </div>

          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-5 leading-tight"
            style={{ color: "#0F2044", fontFamily: "'Poppins', sans-serif" }}
          >
            Privacy <GradientText>Policy</GradientText>
          </h1>

          <p
            className="text-lg md:text-xl max-w-2xl mx-auto"
            style={{ color: "#374151", fontFamily: "'DM Sans', sans-serif", lineHeight: "1.75" }}
          >
            At Routezy, your trust is our most valued travel companion. This policy explains clearly and
            transparently how we collect, use, and protect your personal data.
          </p>

          {/* Trust stats */}
          <div className="flex flex-wrap items-center justify-center gap-4 mt-10">
            {trustStats.map(({ Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl"
                style={{
                  background: "#FFFFFF",
                  border: "1px solid #E2E8F2",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                }}
              >
                <Icon size={15} strokeWidth={2} style={{ color: "#FF6B6B" }} />
                <span
                  className="text-sm font-medium"
                  style={{ color: "#1E3A6E", fontFamily: "'DM Sans', sans-serif" }}
                >
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Main ── */}
      <main className="max-w-7xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-8 items-start">

          <TableOfContents activeSection={activeSection} onNavigate={scrollTo} />

          <div className="space-y-6">
            {sections.map((section, i) => (
              <SectionCard key={section.id} section={section} index={i} />
            ))}

            {/* Version History */}
            <div
              className="rounded-2xl p-8"
              style={{
                background: "#FFFFFF",
                border: "1px solid #E2E8F2",
                boxShadow: "0 2px 8px rgba(0,0,0,0.06), 0 8px 24px rgba(0,0,0,0.04)",
              }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: "rgba(14,165,233,0.1)", border: "1px solid rgba(14,165,233,0.2)" }}
                >
                  <ClipboardList size={20} strokeWidth={1.8} style={{ color: "#0EA5E9" }} />
                </div>
                <h2
                  className="text-xl font-semibold"
                  style={{ color: "#0F2044", fontFamily: "'Poppins', sans-serif" }}
                >
                  Version History
                </h2>
              </div>
              <div className="space-y-4">
                {versionHistory.map((v, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <div
                      className="flex-shrink-0 px-2.5 py-1 rounded-lg text-xs font-bold"
                      style={{
                        background:
                          i === 0
                            ? "linear-gradient(135deg, rgba(255,107,107,0.12), rgba(255,201,71,0.10))"
                            : "rgba(226,232,242,0.6)",
                        color: i === 0 ? "#FF6B6B" : "#6B7280",
                        border: i === 0 ? "1px solid rgba(255,107,107,0.2)" : "1px solid #E2E8F2",
                        fontFamily: "'DM Sans', sans-serif",
                      }}
                    >
                      v{v.version}
                    </div>
                    <div>
                      <span
                        className="text-xs font-medium"
                        style={{ color: "#6B7280", fontFamily: "'DM Sans', sans-serif" }}
                      >
                        {v.date}
                      </span>
                      <p
                        className="text-sm mt-0.5"
                        style={{ color: "#374151", fontFamily: "'DM Sans', sans-serif" }}
                      >
                        {v.change}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Card */}
            <div
              className="rounded-2xl p-8 relative overflow-hidden"
              style={{
                background: "linear-gradient(135deg, #0F2044 0%, #1E3A6E 100%)",
                boxShadow: "0 20px 60px rgba(15,32,68,0.18)",
              }}
            >
              <div
                className="absolute -top-10 -right-10 w-48 h-48 rounded-full pointer-events-none"
                style={{ background: "radial-gradient(circle, rgba(255,107,107,0.2) 0%, transparent 70%)" }}
              />
              <div
                className="absolute -bottom-8 -left-8 w-36 h-36 rounded-full pointer-events-none"
                style={{ background: "radial-gradient(circle, rgba(255,201,71,0.15) 0%, transparent 70%)" }}
              />

              <div className="relative">
                <h2
                  className="text-2xl font-bold text-white mb-2"
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  Questions About Your Privacy?
                </h2>
                <p
                  className="text-sm mb-6"
                  style={{ color: "rgba(255,255,255,0.65)", fontFamily: "'DM Sans', sans-serif", lineHeight: "1.75" }}
                >
                  Our dedicated privacy team responds to all inquiries within 2 business days. For urgent
                  data deletion requests, use the in-app Settings flow for the fastest resolution.
                </p>
                <div className="flex flex-wrap gap-3">
                  <a
                    href="mailto:routezy.support@gmail.com"
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold"
                    style={{
                      background: "linear-gradient(135deg, #FF6B6B 0%, #FF8E53 100%)",
                      color: "#fff",
                      fontFamily: "'DM Sans', sans-serif",
                      boxShadow: "0 4px 16px rgba(255,107,107,0.4)",
                    }}
                  >
                    <Mail size={15} strokeWidth={2} />
                    routezy.support@gmail.com
                  </a>
                  
                </div>
                <p
                  className="text-xs mt-5"
                  style={{ color: "rgba(255,255,255,0.4)", fontFamily: "'DM Sans', sans-serif" }}
                >
                  Routezy · Registered under applicable data protection laws · © 2025 All rights reserved
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* ── Footer ── */}
      <footer style={{ borderTop: "1px solid #E2E8F2", background: "#fff" }}>
        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <Image
              src="/Logo.png"
              alt="Routezy Logo"
              width={32}
              height={32}
              className="rounded-lg"
            />
            <span
              className="text-sm font-semibold"
              style={{ color: "#0F2044", fontFamily: "'Poppins', sans-serif" }}
            >
              Routezy
            </span>
            <span className="text-sm" style={{ color: "#6B7280", fontFamily: "'DM Sans', sans-serif" }}>
              · Explore More. Waste Less Time. Travel Smart.
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}