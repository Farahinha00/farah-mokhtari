"use client";

import { useState } from "react";
import { Lang, SiteContent } from "@/lib/content-types";
import { ServiceIcon } from "./ServiceIcon";

const BG = "oklch(94% 0.02 80)";
const BORDER = "oklch(87% 0.03 80)";
const CARD = "oklch(97% 0.015 80)";
const ACCENT = "oklch(40% 0.1 160)";
const ACCENT_TEXT = "#eef7ec";
const BORDEAUX = "#7F041E";
const CREAM = "#F2EADD";
const TEXT = "#233024";
const MUTED = "#6b7a68";
const MUTED2 = "#546b50";

const HIGHLIGHT_PHRASES = ["Building AI", "Data & IA", "Data & AI"];

function splitHighlight(text: string) {
  const lower = text.toLowerCase();
  for (const phrase of HIGHLIGHT_PHRASES) {
    const idx = lower.indexOf(phrase.toLowerCase());
    if (idx !== -1) {
      return { before: text.slice(0, idx), highlight: text.slice(idx, idx + phrase.length), after: text.slice(idx + phrase.length) };
    }
  }
  return { before: text, highlight: null as string | null, after: "" };
}

export function PortfolioSite({ content }: { content: SiteContent }) {
  const [lang, setLang] = useState<Lang>("fr");
  const [activeService, setActiveService] = useState<number | null>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [expandedExperience, setExpandedExperience] = useState<number | null>(null);

  const t = content[lang];
  const services = t.services.list;
  const active = activeService !== null ? services[activeService] : null;
  const subtitleParts = splitHighlight(t.hero.subtitle);

  function goHome() {
    setActiveService(null);
  }

  function submitForm(e: React.FormEvent) {
    e.preventDefault();
    setFormSubmitted(true);
  }

  return (
    <div style={{ minHeight: "100%", background: BG, color: TEXT, fontFamily: "-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,sans-serif" }}>
      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 10,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "22px 48px",
          borderBottom: `1px solid ${BORDER}`,
          background: BG,
        }}
      >
        <div onClick={goHome} style={{ fontSize: 19, fontWeight: 800, letterSpacing: "-.5px", cursor: "pointer" }}>
          FARAH MOKHTARI
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
          <a href="#about" onClick={goHome} style={navLinkStyle}>{t.nav.about}</a>
          <a href="#services" onClick={goHome} style={navLinkStyle}>{t.nav.services}</a>
          <a href="#experience" onClick={goHome} style={navLinkStyle}>{t.nav.experience}</a>
          <a href="#contact" onClick={goHome} style={navLinkStyle}>{t.nav.contact}</a>
          <button
            onClick={() => setLang((l) => (l === "fr" ? "en" : "fr"))}
            style={{
              background: ACCENT,
              color: ACCENT_TEXT,
              border: "none",
              borderRadius: 100,
              padding: "7px 16px",
              font: "700 12px system-ui,sans-serif",
              cursor: "pointer",
            }}
          >
            {lang === "fr" ? "EN" : "FR"}
          </button>
        </div>
      </div>

      {activeService === null && (
        <>
          <div id="hero" style={{ borderBottom: `1px solid ${BORDER}`, position: "relative", overflow: "hidden" }}>
            <svg
              style={{ position: "absolute", bottom: 0, left: 0, width: "100%", height: 60 }}
              viewBox="0 0 760 60"
              preserveAspectRatio="none"
            >
              <path
                d="M0 40 Q 40 10, 80 40 T 160 40 T 240 40 T 320 40 T 400 40 T 480 40 T 560 40 T 640 40 T 720 40 T 800 40"
                stroke={BORDEAUX}
                strokeWidth="3"
                fill="none"
                opacity=".35"
              />
            </svg>
            <div style={{ maxWidth: 1200, margin: "0 auto", padding: "100px 48px 60px", position: "relative", zIndex: 1 }}>
              <div
                style={{
                  display: "inline-block",
                  background: BORDEAUX,
                  color: CREAM,
                  fontSize: 12,
                  fontWeight: 800,
                  letterSpacing: "1px",
                  textTransform: "uppercase",
                  padding: "7px 16px",
                  borderRadius: 4,
                  marginBottom: 22,
                  transform: "rotate(-1.5deg)",
                }}
              >
                {t.hero.eyebrow}
              </div>
              <h1 style={{ fontSize: 68, lineHeight: 0.98, margin: "0 0 24px", fontWeight: 800, letterSpacing: "-1.5px", maxWidth: 820 }}>
                {subtitleParts.before}
                {subtitleParts.highlight && <span style={{ color: ACCENT }}>{subtitleParts.highlight}</span>}
                {subtitleParts.after}
              </h1>
              <p style={{ fontSize: 18, lineHeight: 1.6, color: MUTED2, maxWidth: 560, margin: "0 0 32px" }}>{t.hero.lede}</p>
              <div style={{ display: "flex", gap: 12, marginBottom: 20 }}>
                <a
                  href="#contact"
                  style={{
                    padding: "16px 32px",
                    background: ACCENT,
                    color: ACCENT_TEXT,
                    borderRadius: 4,
                    fontSize: 15,
                    fontWeight: 800,
                    fontFamily: "inherit",
                    textTransform: "uppercase",
                    letterSpacing: ".5px",
                  }}
                >
                  {t.hero.ctaPrimary}
                </a>
                <a
                  href="#experience"
                  style={{
                    padding: "16px 32px",
                    background: "transparent",
                    color: TEXT,
                    border: `1.5px solid ${TEXT}`,
                    borderRadius: 4,
                    fontSize: 15,
                    fontWeight: 800,
                    fontFamily: "inherit",
                    textTransform: "uppercase",
                    letterSpacing: ".5px",
                  }}
                >
                  {t.hero.ctaSecondary}
                </a>
              </div>
              <div style={{ fontSize: 12.5, color: MUTED, fontWeight: 600 }}>{t.hero.availability}</div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", maxWidth: 1200, margin: "0 auto" }}>
              {t.metrics.map((m, i) => (
                <div
                  key={i}
                  style={{
                    padding: "36px 24px",
                    borderRight: `1px solid ${BORDER}`,
                    borderTop: `1px solid ${BORDER}`,
                    textAlign: "left",
                  }}
                >
                  <div style={{ fontSize: 38, fontWeight: 800, color: ACCENT, letterSpacing: "-1px" }}>{m.value}</div>
                  <div style={{ fontSize: 12, color: MUTED, marginTop: 8, textTransform: "uppercase", letterSpacing: ".4px" }}>{m.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div id="about" style={{ borderBottom: `1px solid ${BORDER}` }}>
            <div style={{ maxWidth: 900, margin: "0 auto", padding: "80px 48px" }}>
              <div>
                <h2 style={{ fontSize: 32, margin: "0 0 24px", fontWeight: 800, letterSpacing: "-1px" }}>{t.about.title}</h2>
                <p style={{ fontSize: 16, lineHeight: 1.7, color: MUTED2, margin: "0 0 16px" }}>{t.about.p1}</p>
                <p style={{ fontSize: 16, lineHeight: 1.7, color: MUTED2, margin: "0 0 24px" }}>{t.about.p2}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {t.about.values.map((v, i) => (
                    <span
                      key={i}
                      style={{
                        fontSize: 12,
                        fontWeight: 700,
                        padding: "6px 14px",
                        background: CARD,
                        border: `1px solid ${BORDER}`,
                        borderRadius: 4,
                        color: TEXT,
                        textTransform: "uppercase",
                        letterSpacing: ".3px",
                      }}
                    >
                      {v}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 48px 80px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40 }}>
              <div>
                <h3 style={sectionLabelStyle}>{t.about.sectorsTitle}</h3>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {t.about.sectors.map((sec, i) => (
                    <span
                      key={i}
                      style={{
                        fontSize: 13,
                        fontWeight: 600,
                        padding: "8px 16px",
                        background: CARD,
                        border: `1px solid ${BORDER}`,
                        borderRadius: 4,
                        color: TEXT,
                      }}
                    >
                      {sec}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h3 style={sectionLabelStyle}>{t.about.interestsTitle}</h3>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {t.about.interests.map((interest, i) => (
                    <span
                      key={i}
                      style={{
                        fontSize: 13,
                        fontWeight: 600,
                        padding: "8px 16px",
                        background: CARD,
                        border: `1px solid ${BORDER}`,
                        borderRadius: 4,
                        color: TEXT,
                      }}
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div id="services" style={{ borderBottom: `1px solid ${BORDER}` }}>
            <div style={{ maxWidth: 1200, margin: "0 auto", padding: "80px 48px" }}>
              <h2 style={{ fontSize: 32, margin: "0 0 8px", fontWeight: 800, letterSpacing: "-1px" }}>{t.nav.services}</h2>
              <p style={{ fontSize: 14, color: MUTED, margin: "0 0 32px" }}>{t.services.hint}</p>
              <div style={{ display: "flex", flexDirection: "column" }}>
                {services.map((s, i) => (
                  <div
                    key={i}
                    onClick={() => setActiveService(i)}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "52px 1fr 24px",
                      gap: 24,
                      padding: "28px 0",
                      alignItems: "start",
                      cursor: "pointer",
                      borderBottom: `1px solid ${BORDER}`,
                    }}
                  >
                    <div
                      style={{
                        width: 44,
                        height: 44,
                        flex: "none",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: CARD,
                        border: `1px solid ${BORDER}`,
                        borderRadius: 4,
                      }}
                    >
                      <ServiceIcon index={i} />
                    </div>
                    <div>
                      <h3 style={{ fontSize: 20, margin: "0 0 10px", fontWeight: 800 }}>{s.title}</h3>
                      <p style={{ fontSize: 14, lineHeight: 1.6, color: MUTED2, margin: "0 0 12px", maxWidth: 680 }}>{s.problem}</p>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                        {s.skills.map((skill, si) => (
                          <span
                            key={si}
                            style={{
                              fontSize: 11,
                              fontWeight: 700,
                              padding: "4px 10px",
                              background: CARD,
                              border: `1px solid ${BORDER}`,
                              borderRadius: 4,
                              color: MUTED,
                            }}
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div style={{ fontSize: 20, fontWeight: 700, color: ACCENT, lineHeight: 1, textAlign: "center" }}>→</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div id="experience" style={{ borderBottom: `1px solid ${BORDER}` }}>
            <div style={{ maxWidth: 1200, margin: "0 auto", padding: "80px 48px" }}>
              <h2 style={{ fontSize: 32, margin: "0 0 32px", fontWeight: 800, letterSpacing: "-1px" }}>{t.nav.experience}</h2>
              <div style={{ display: "flex", flexDirection: "column" }}>
                {t.experience.map((e, i) => {
                  const expanded = expandedExperience === i;
                  return (
                    <div key={i} style={{ borderBottom: `1px solid ${BORDER}` }}>
                      <div
                        onClick={() => setExpandedExperience(expanded ? null : i)}
                        style={{
                          display: "grid",
                          gridTemplateColumns: "120px 1fr 20px",
                          gap: 24,
                          padding: "18px 0",
                          cursor: "pointer",
                          alignItems: "start",
                        }}
                      >
                        <div style={{ fontSize: 15, fontWeight: 800, color: ACCENT }}>{e.period}</div>
                        <div style={{ fontSize: 16, fontWeight: 800 }}>
                          {e.role} — {e.company}
                        </div>
                        <div style={{ fontSize: 16, fontWeight: 700, color: ACCENT, textAlign: "center" }}>{expanded ? "−" : "+"}</div>
                      </div>
                      {expanded && (
                        <div style={{ padding: "0 0 24px 144px" }}>
                          {e.summary && (
                            <p style={{ fontSize: 14, lineHeight: 1.6, color: MUTED2, margin: "0 0 12px" }}>{e.summary}</p>
                          )}
                          <ul style={{ margin: 0, padding: "0 0 0 18px", display: "flex", flexDirection: "column", gap: 8 }}>
                            {e.highlights.map((h, hi) => (
                              <li key={hi} style={{ fontSize: 14, lineHeight: 1.6, color: MUTED }}>
                                {h}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div id="contact">
            <div style={{ maxWidth: 1200, margin: "0 auto", padding: "80px 48px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48 }}>
              <div>
                <h2 style={{ fontSize: 36, margin: "0 0 14px", fontWeight: 800, letterSpacing: "-1px" }}>{t.contact.title}</h2>
                <p style={{ fontSize: 16, color: MUTED2, lineHeight: 1.6, margin: "0 0 24px" }}>{t.contact.subtitle}</p>
              </div>
              {!formSubmitted ? (
                <form onSubmit={submitForm} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  <input placeholder={t.contact.formName} style={inputStyle} />
                  <input placeholder={t.contact.formEmail} style={inputStyle} />
                  <input placeholder={t.contact.formProject} style={inputStyle} />
                  <textarea placeholder={t.contact.formMessage} rows={4} style={{ ...inputStyle, resize: "vertical" }} />
                  <button
                    type="submit"
                    style={{
                      padding: "16px 26px",
                      background: ACCENT,
                      color: ACCENT_TEXT,
                      border: "none",
                      borderRadius: 4,
                      fontSize: 15,
                      fontWeight: 800,
                      cursor: "pointer",
                      fontFamily: "inherit",
                      textTransform: "uppercase",
                      letterSpacing: ".5px",
                    }}
                  >
                    {t.contact.formSubmit}
                  </button>
                </form>
              ) : (
                <div style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 4, padding: 28, fontSize: 15, color: TEXT }}>
                  {t.contact.thanks}
                </div>
              )}
            </div>
            <div style={{ padding: "20px 48px", textAlign: "center", fontSize: 12, color: MUTED, borderTop: `1px solid ${BORDER}` }}>{t.footer}</div>
          </div>
        </>
      )}

      {active && (
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "80px 48px" }}>
          <button
            onClick={goHome}
            style={{
              background: "none",
              border: "none",
              color: MUTED,
              fontSize: 13,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: ".4px",
              cursor: "pointer",
              padding: 0,
              margin: "0 0 40px",
              fontFamily: "inherit",
            }}
          >
            ← {t.services.backLabel}
          </button>
          <div style={{ display: "flex", alignItems: "center", gap: 20, margin: "0 0 28px" }}>
            <div
              style={{
                width: 64,
                height: 64,
                flex: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: CARD,
                border: `1px solid ${BORDER}`,
                borderRadius: 4,
              }}
            >
              <ServiceIcon index={activeService as number} size={30} />
            </div>
            <h1 style={{ fontSize: 32, margin: 0, fontWeight: 800, letterSpacing: "-1px" }}>{active.title}</h1>
          </div>
          <p style={{ fontSize: 17, lineHeight: 1.6, color: MUTED2, margin: "0 0 24px", maxWidth: 760 }}>{active.problem}</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, margin: "0 0 32px" }}>
            {active.skills.map((skill, si) => (
              <span
                key={si}
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  padding: "6px 14px",
                  background: CARD,
                  border: `1px solid ${BORDER}`,
                  borderRadius: 4,
                  color: TEXT,
                }}
              >
                {skill}
              </span>
            ))}
          </div>
          <div style={{ margin: "0 0 32px" }}>
            <div style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".4px", color: ACCENT, margin: "0 0 8px" }}>
              {active.audienceLabel}
            </div>
            <p style={{ fontSize: 14, lineHeight: 1.6, color: MUTED, margin: 0 }}>{active.audience}</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, padding: "32px 0", borderTop: `1px solid ${BORDER}` }}>
            <div>
              <h4 style={detailHeadingStyle}>{t.services.doLabel}</h4>
              <ul style={{ margin: 0, padding: "0 0 0 18px", display: "flex", flexDirection: "column", gap: 9 }}>
                {active.whatIDo.map((item, i) => (
                  <li key={i} style={{ fontSize: 14, lineHeight: 1.6, color: MUTED2 }}>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 style={detailHeadingStyle}>{t.services.getLabel}</h4>
              <ul style={{ margin: 0, padding: "0 0 0 18px", display: "flex", flexDirection: "column", gap: 9 }}>
                {active.whatYouGet.map((item, i) => (
                  <li key={i} style={{ fontSize: 14, lineHeight: 1.6, color: TEXT }}>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <a
            href="#contact"
            onClick={goHome}
            style={{
              display: "inline-block",
              marginTop: 36,
              padding: "16px 32px",
              background: ACCENT,
              color: ACCENT_TEXT,
              borderRadius: 4,
              fontSize: 15,
              fontWeight: 800,
              fontFamily: "inherit",
              textTransform: "uppercase",
              letterSpacing: ".5px",
            }}
          >
            {t.hero.ctaPrimary}
          </a>
        </div>
      )}
    </div>
  );
}

const navLinkStyle: React.CSSProperties = {
  fontSize: 13,
  fontWeight: 600,
  letterSpacing: ".4px",
  textTransform: "uppercase",
  color: MUTED,
};

const sectionLabelStyle: React.CSSProperties = {
  fontSize: 14,
  fontWeight: 700,
  letterSpacing: ".6px",
  textTransform: "uppercase",
  color: MUTED,
  margin: "0 0 16px",
};

const inputStyle: React.CSSProperties = {
  padding: 14,
  background: CARD,
  border: `1px solid ${BORDER}`,
  borderRadius: 4,
  color: TEXT,
  fontSize: 14,
  fontFamily: "inherit",
};

const detailHeadingStyle: React.CSSProperties = {
  fontSize: 12,
  fontWeight: 700,
  textTransform: "uppercase",
  letterSpacing: ".4px",
  color: ACCENT,
  margin: "0 0 14px",
};
