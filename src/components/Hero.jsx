import { useEffect, useRef } from "react";
import gsap from "gsap";
import { profile } from "../data.js";
import { state } from "../state.js";

const Chars = ({ text }) =>
  [...text].map((c, i) => (
    <span className="mask" key={i} aria-hidden="true">
      <span className="ch">{c === " " ? " " : c}</span>
    </span>
  ));

export default function Hero({ ready }) {
  const title = useRef();

  // Tipografía variable: las letras cercanas al cursor engordan.
  // Solo varía el peso (no el ancho) y cada letra tiene el ancho fijado, así el
  // renglón no se mueve ni tiembla; el peso se suaviza frame a frame.
  useEffect(() => {
    if (!ready) return;
    const el = title.current;
    const tl = gsap.timeline();
    tl.fromTo(".hero .ch", { yPercent: 115, rotate: 7 }, { yPercent: 0, rotate: 0, duration: 1.3, stagger: 0.035, ease: "expo.out" })
      .fromTo(".hero .fade", { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, duration: 1, stagger: 0.12, ease: "power3.out" }, "-=0.8");

    if (state.coarse || state.reduce) return () => tl.kill();

    const REST = 500, MAX = 800, RADIUS = 220;
    const items = [...el.querySelectorAll(".line:not(.serif) .ch")].map((ch) => ({
      ch, mask: ch.parentElement, w: REST, target: REST, cx: 0, cy: 0, wdthMax: 100,
    }));
    let raf = 0, active = false;

    const lock = () => {
      items.forEach((it) => { it.mask.style.width = ""; it.ch.style.fontVariationSettings = ""; });
      items.forEach((it) => { it.mask.style.width = `${it.mask.getBoundingClientRect().width}px`; });
      // Calibra, por letra, cuánto hay que angostarla (eje wdth) para que con el
      // peso máximo ocupe el mismo ancho que en reposo: sin pisarse con las vecinas.
      items.forEach((it) => {
        const target = parseFloat(it.mask.style.width);
        let lo = 75, hi = 100;
        for (let i = 0; i < 7; i++) {
          const mid = (lo + hi) / 2;
          it.ch.style.fontVariationSettings = `"wght" ${MAX}, "wdth" ${mid}`;
          if (it.ch.getBoundingClientRect().width > target) hi = mid; else lo = mid;
        }
        it.wdthMax = lo;
        it.ch.style.fontVariationSettings = "";
      });
    };
    const measure = () => items.forEach((it) => {
      const r = it.ch.getBoundingClientRect();
      it.cx = r.left + r.width / 2; it.cy = r.top + r.height / 2;
    });
    const step = () => {
      let moving = false;
      for (const it of items) {
        it.w += (it.target - it.w) * 0.16;
        if (Math.abs(it.target - it.w) > 0.5) moving = true; else it.w = it.target;
        const t = (it.w - REST) / (MAX - REST);
        it.ch.style.fontVariationSettings = it.w === REST ? "" : `"wght" ${it.w.toFixed(1)}, "wdth" ${(100 + (it.wdthMax - 100) * t).toFixed(1)}`;
      }
      if (moving) raf = requestAnimationFrame(step); else active = false;
    };
    const kick = () => { if (!active) { active = true; raf = requestAnimationFrame(step); } };
    const move = (e) => {
      measure();
      for (const it of items) {
        const k = Math.max(0, 1 - Math.hypot(e.clientX - it.cx, e.clientY - it.cy) / RADIUS);
        it.target = REST + (MAX - REST) * k * k;
      }
      kick();
    };
    const leave = () => { items.forEach((it) => (it.target = REST)); kick(); };

    // Se fija el ancho recién cuando termina la entrada y las fuentes cargaron.
    tl.add(() => { document.fonts.ready.then(lock); el.classList.add("is-set"); });
    window.addEventListener("resize", lock);
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => {
      tl.kill();
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", lock);
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
    };
  }, [ready]);

  return (
    <section className="hero" data-section id="s0">
      <p className="hero__kicker mono fade">
        <i className="dot" /> Disponible para proyectos — 2026
      </p>
      <h1 className="hero__title" ref={title} aria-label={profile.name}>
        <span className="line"><Chars text="Juan Ignacio" /></span>
        <span className="line serif"><Chars text="Darsaut" /></span>
      </h1>
      <p className="hero__sub fade">
        {profile.role}. Construyo interfaces con movimiento, 3D y una obsesión
        incómoda por el detalle.
      </p>
      <div className="hero__foot mono fade">
        <span>{profile.city}</span>
        <span className="scroll"><i /> Scroll</span>
        <span>React · Three.js · SAP Fiori</span>
      </div>
    </section>
  );
}
