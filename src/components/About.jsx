import { useEffect, useMemo, useRef } from "react";
import gsap from "gsap";
import { profile } from "../data.js";
import { useLang } from "../i18n.jsx";
import { reveal } from "../lib.js";

// "*palabra*" => énfasis en serif itálica
const parse = (text) => text.split(" ").map((w) => ({ text: w.replace(/\*/g, ""), em: w.includes("*") }));

export default function About() {
  const root = useRef();
  const { t } = useLang();
  const words = useMemo(() => parse(t.about.manifesto), [t]);

  // El scrub depende de la cantidad de palabras: se recrea al cambiar de idioma.
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".word", { opacity: 0.12 }, {
        opacity: 1, stagger: 0.12, ease: "none",
        scrollTrigger: { trigger: ".manifesto", start: "top 75%", end: "bottom 45%", scrub: true },
      });
    }, root);
    return () => ctx.revert();
  }, [words]);

  useEffect(() => reveal(root.current.querySelector(".facts"), root.current.querySelectorAll(".fact"),
    { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, stagger: 0.12, duration: 0.9, ease: "power3.out" }), []);

  return (
    <section className="about" data-section id="s1" ref={root}>
      <div className="about__inner">
        <span className="label mono">{t.about.label}</span>
        <div className="about__top">
          <figure className="portrait" data-cursor={t.cursor.hi}>
            <img src={profile.photo} alt={`${t.about.alt} ${profile.name}`} loading="lazy" />
            <figcaption className="mono">
              <span>{profile.name}</span>
              <span>{profile.city}</span>
            </figcaption>
          </figure>
          <ul className="stats">
            {t.about.stats.map((s) => (
              <li className="stat" key={s.n}>
                <b>{s.n}</b>
                <div>
                  <span className="stat__t">{s.title}</span>
                  <span className="stat__s mono">{s.sub}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <p className="manifesto">
          {words.map((w, i) => (
            <span key={i} className={`word ${w.em ? "em" : ""}`}>{w.text} </span>
          ))}
        </p>
        <dl className="facts">
          {t.about.facts.map(([k, v]) => (
            <div className="fact" key={k}>
              <dt className="mono">{k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
