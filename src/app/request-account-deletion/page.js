"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { UserMinus, ShieldCheck } from "lucide-react";

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

export default function RequestAccountDeletionPage() {
  useEffect(() => {
    const link = document.createElement("link");
    link.href =
      "https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&family=DM+Sans:wght@400;500;600&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }, []);

  return (
    <div style={{ background: "#F8F9FC", minHeight: "100vh", fontFamily: "'DM Sans', sans-serif" }}>
      {/* ── Navbar ── */}
      <header
        className="sticky top-0 z-50 backdrop-blur-md"
        style={{ background: "rgba(248,249,252,0.92)", borderBottom: "1px solid #E2E8F2" }}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
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
          </Link>

          <div className="flex items-center gap-6">
            <Link
              href="/terms-and-conditions"
              className="text-sm font-medium transition-colors hover:text-orange-500"
              style={{ color: "#374151", fontFamily: "'DM Sans', sans-serif" }}
            >
              Terms and Conditions
            </Link>
            <Link
              href="/"
              className="text-sm font-medium transition-colors hover:text-orange-500"
              style={{ color: "#374151", fontFamily: "'DM Sans', sans-serif" }}
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </header>

      {/* ── Hero ── */}
      <section className="relative overflow-hidden w-full">
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
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-5 leading-tight"
            style={{ color: "#0F2044", fontFamily: "'Poppins', sans-serif" }}
          >
            Request Account <GradientText>Deletion</GradientText>
          </h1>

          <p
            className="text-lg md:text-xl max-w-2xl mx-auto"
            style={{ color: "#374151", fontFamily: "'DM Sans', sans-serif", lineHeight: "1.75" }}
          >
            We are sorry to see you go! If you wish to delete your Routezy account and all associated data,
            please complete the request form below. Your data security and privacy are our top priorities.
          </p>
          
          <div className="flex flex-wrap items-center justify-center gap-4 mt-10">
              <div
                className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl"
                style={{
                  background: "#FFFFFF",
                  border: "1px solid #E2E8F2",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                }}
              >
                <ShieldCheck size={18} strokeWidth={2} style={{ color: "#FF6B6B" }} />
                <span
                  className="text-sm font-medium"
                  style={{ color: "#1E3A6E", fontFamily: "'DM Sans', sans-serif" }}
                >
                  Secure Process
                </span>
              </div>
              <div
                className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl"
                style={{
                  background: "#FFFFFF",
                  border: "1px solid #E2E8F2",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                }}
              >
                <UserMinus size={18} strokeWidth={2} style={{ color: "#FF6B6B" }} />
                <span
                  className="text-sm font-medium"
                  style={{ color: "#1E3A6E", fontFamily: "'DM Sans', sans-serif" }}
                >
                  Permanent Deletion
                </span>
              </div>
          </div>
        </div>
      </section>

      {/* ── Main ── */}
      <main className="max-w-4xl mx-auto px-6 pb-24 relative z-10 w-full">
        <div
          className="rounded-3xl overflow-hidden"
          style={{
            background: "#FFFFFF",
            border: "1px solid #E2E8F2",
            boxShadow: "0 10px 40px rgba(0,0,0,0.08)",
          }}
        >
          <div className="w-full flex justify-center bg-white py-4 md:py-8 h-[700px]">
            <iframe 
              src="https://docs.google.com/forms/d/e/1FAIpQLSdbFJ9dAd9kDewRiEWbhL2i_TPP07NyIy6b6RBI8pN_j433gA/viewform?embedded=true" 
              width="100%" 
              height="100%" 
              frameBorder="0" 
              marginHeight="0" 
              marginWidth="0"
              style={{ border: 'none', maxWidth: '640px' }}
            >
              Loading…
            </iframe>
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
