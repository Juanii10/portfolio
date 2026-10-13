import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { profile } from "../data.js";
import { state } from "../state.js";
import { reveal } from "../lib.js";
import { useLang } from "../i18n.jsx";

// Logos de las redes (silueta de una sola tinta, toman el color del texto).
const ICONS = {
  github: "M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12",
  linkedin: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
};

export default function Contact() {
  const root = useRef();
  const mag = useRef();
  const [copied, setCopied] = useState(false);
  const { t, lang } = useLang();

  useEffect(() => {
    return reveal(root.current.querySelector(".cta"), root.current.querySelectorAll(".cta__line span"),
      { yPercent: 110 }, { yPercent: 0, stagger: 0.12, duration: 1.2, ease: "expo.out" });
  }, []);

  // Botón magnético: se inclina hacia el cursor.
  useEffect(() => {
    if (state.coarse) return;
    const el = mag.current;
    const x = gsap.quickTo(el, "x", { duration: 0.6, ease: "elastic.out(1, 0.5)" });
    const y = gsap.quickTo(el, "y", { duration: 0.6, ease: "elastic.out(1, 0.5)" });
    const move = (e) => {
      const r = el.getBoundingClientRect();
      x((e.clientX - (r.left + r.width / 2)) * 0.25);
      y((e.clientY - (r.top + r.height / 2)) * 0.35);
    };
    const leave = () => { x(0); y(0); };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => { el.removeEventListener("pointermove", move); el.removeEventListener("pointerleave", leave); };
  }, []);

  // Abre un borrador de Gmail en otra pestaña (el mailto: no hace nada si no hay
  // programa de correo configurado) y además copia el mail, con confirmación.
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch { /* sin permiso de portapapeles */ }
  };

  return (
    <section className="contact" data-section id="s3" ref={root}>
      <span className="label mono">{t.contact.label}</span>
      <h2 className="cta">
        <span className="cta__line"><span>{t.contact.line1}</span></span>
        <span className="cta__line"><span><em>{t.contact.em}</em> {t.contact.line2}</span></span>
      </h2>

      <div className="contact__row">
        <a ref={mag} className={`mail ${copied ? "is-copied" : ""}`} href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(profile.email)}&su=${encodeURIComponent(t.contact.subject)}`} target="_blank" rel="noreferrer" data-cursor={t.cursor.write} onClick={copy}>
          <span className="mail__txt">
            <span>{profile.email}</span>
            <span aria-live="polite">{t.contact.copied}</span>
          </span>
          <i aria-hidden="true">↗</i>
        </a>
        <a className="cv" href={profile.cv[lang]} download data-cursor={t.cursor.download}>
          <span>{t.contact.cv}</span>
          <i aria-hidden="true">↓</i>
        </a>
        <a className="wa" href={profile.whatsapp} target="_blank" rel="noreferrer" data-cursor={t.cursor.chat}>
          <span>WhatsApp</span>
          <small className="mono">{profile.phone}</small>
        </a>
      </div>

      <footer className="foot mono">
        <span>© {new Date().getFullYear()} {profile.name}</span>
        <span className="foot__links">
          {profile.links.map((l) => (
            <a key={l.label} className="social" href={l.href} target="_blank" rel="noreferrer" data-cursor={t.cursor.open}>
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d={ICONS[l.icon]} /></svg>
              <span>{l.label}</span>
              <i aria-hidden="true">↗</i>
            </a>
          ))}
        </span>
        <a href="#top" data-cursor={t.cursor.up} onClick={(e) => { e.preventDefault(); state.lenis?.scrollTo(0, { duration: 2 }); }}>
          {t.contact.up}
        </a>
      </footer>
    </section>
  );
}
