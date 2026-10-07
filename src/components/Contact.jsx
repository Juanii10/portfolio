import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { profile } from "../data.js";
import { state } from "../state.js";
import { reveal } from "../lib.js";
import { useLang } from "../i18n.jsx";

export default function Contact() {
  const root = useRef();
  const mag = useRef();
  const [copied, setCopied] = useState(false);
  const { t } = useLang();

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
        <a className="wa" href={profile.whatsapp} target="_blank" rel="noreferrer" data-cursor={t.cursor.chat}>
          <span>WhatsApp</span>
          <small className="mono">{profile.phone}</small>
        </a>
        <button className="copy mono" onClick={copy} data-cursor={t.cursor.copy}>
          {copied ? t.contact.copied : t.contact.copy}
        </button>
      </div>

      <footer className="foot mono">
        <span>© {new Date().getFullYear()} {profile.name}</span>
        <span className="foot__links">
          {profile.links.map((l) => (
            <a key={l.label} href={l.href} target="_blank" rel="noreferrer" data-cursor={t.cursor.open}>{l.label}</a>
          ))}
        </span>
        <a href="#top" data-cursor={t.cursor.up} onClick={(e) => { e.preventDefault(); state.lenis?.scrollTo(0, { duration: 2 }); }}>
          {t.contact.up}
        </a>
      </footer>
    </section>
  );
}
