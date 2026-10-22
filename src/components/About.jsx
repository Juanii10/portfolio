import { useEffect, useMemo, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { profile, experience } from "../data.js";
import { useLang } from "../i18n.jsx";
import { reveal } from "../lib.js";
import { state, measure } from "../state.js";

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

  // Trayectoria: la línea se dibuja con el scroll (scrub) y cada hito se enciende cuando
  // la línea lo alcanza. Con movimiento reducido todo queda dibujado y estático.
  useEffect(() => {
    const list = root.current.querySelector(".exp__list");
    const jobs = [...list.querySelectorAll(".job")];
    if (state.reduce) {
      gsap.set(list.querySelector(".exp__fill"), { scaleY: 1 });
      jobs.forEach((j) => j.classList.add("is-on"));
      return;
    }
    const ctx = gsap.context(() => {
      gsap.fromTo(".exp__fill", { scaleY: 0 }, {
        scaleY: 1, ease: "none",
        scrollTrigger: {
          trigger: list, start: "top 65%", end: "bottom 55%", scrub: true,
          onUpdate: (self) => {
            const y = self.progress * list.offsetHeight;
            jobs.forEach((j) => j.classList.toggle("is-on", y > j.offsetTop));
          },
        },
      });
    }, root);
    // Cada entrada se revela por su cuenta: la segunda aparece recién cuando llegás a ella.
    const undo = jobs.map((j) => reveal(j, j.querySelectorAll(".job__l, .job__r"),
      { autoAlpha: 0, y: 40 }, { autoAlpha: 1, y: 0, stagger: 0.12, duration: 0.9, ease: "power3.out" }));
    return () => { ctx.revert(); undo.forEach((u) => u()); };
  }, []);

  // Al cambiar de idioma cambia el alto de los textos: se vuelve a medir para que la nube
  // y los ScrollTrigger (la línea de la trayectoria incluida) sigan alineados con la página.
  useEffect(() => { measure(); ScrollTrigger.refresh(); }, [t]);

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

        <div className="exp">
          <span className="label mono">{t.about.exp.label}</span>
          <div className="exp__list">
            <span className="exp__line" aria-hidden="true"><i className="exp__fill" /></span>
            <ol className="exp__jobs">
              {experience.map((j) => {
                const c = t.about.exp.jobs[j.id];
                return (
                  <li className="job" key={j.id}>
                    <div className="job__l">
                      <span className="job__d mono">{c.date}</span>
                      <h3 className="job__co">{j.company}</h3>
                    </div>
                    <div className="job__r">
                      <p className="job__role">{c.role}</p>
                      <ul className="job__pts">
                        {c.points.map((p) => <li key={p}>{p}</li>)}
                      </ul>
                      <ul className="tags">
                        {j.tags.map((g) => <li className="mono" key={g}>{g}</li>)}
                      </ul>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
