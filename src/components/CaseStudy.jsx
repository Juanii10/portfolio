import { useEffect, useLayoutEffect, useRef } from "react";
import { createPortal } from "react-dom";
import gsap from "gsap";
import { projects } from "../data.js";
import { state } from "../state.js";
import { useLang } from "../i18n.jsx";

// Panel de caso de estudio a pantalla completa. Vive en un portal (fuera de <main>) para poder
// dejar el resto de la página inerte mientras está abierto; el HUD queda por encima a propósito
// (así sigue funcionando el cambio de idioma).
export default function CaseStudy({ i, returnTo, onClose }) {
  const p = projects[i];
  const { t } = useLang();
  const c = t.work.cases[p.id];
  const root = useRef();
  const scroll = useRef();
  const closeBtn = useRef();
  const tl = useRef();
  const closing = useRef(false);
  const pressed = useRef(null);
  // Siempre la última versión de onClose: el timeline lo llama al terminar de revertirse.
  const done = useRef(onClose);
  done.current = onClose;

  // Entrada: el panel se revela con clip-path y después el contenido sube escalonado.
  // El timeline queda guardado para cerrar reproduciéndolo al revés. Con movimiento
  // reducido no hay timeline: aparece y se cierra al instante.
  useLayoutEffect(() => {
    if (state.reduce) return;
    const ctx = gsap.context(() => {
      tl.current = gsap.timeline({ onReverseComplete: () => done.current() })
        .fromTo(root.current, { clipPath: "inset(100% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.9, ease: "expo.inOut" })
        .fromTo(".case__x", { autoAlpha: 0, y: 48 }, { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.07, ease: "power3.out" }, "-=0.4")
        .fromTo(".case__fig img", { scale: 1.18 }, { scale: 1, duration: 1.5, ease: "power3.out" }, "<");
    }, root);
    return () => ctx.revert();
  }, []);

  const close = () => {
    if (closing.current) return;
    closing.current = true;
    if (tl.current) tl.current.timeScale(1.8).reverse();
    else done.current();
  };

  // Bloqueo de scroll + foco. Todo se deshace al desmontar (cuando terminó la salida).
  useEffect(() => {
    const main = document.querySelector("main");
    const html = document.documentElement;
    const el = root.current;
    state.lenis?.stop();
    html.classList.add("has-case");
    main.setAttribute("inert", "");
    closeBtn.current.focus({ preventScroll: true });

    const key = (e) => { if (e.key === "Escape") close(); };
    // En touch, un gesto fuera de la zona con scroll no debe arrastrar la página de atrás.
    const block = (e) => { if (!scroll.current.contains(e.target)) e.preventDefault(); };
    document.addEventListener("keydown", key);
    el.addEventListener("touchmove", block, { passive: false });
    return () => {
      document.removeEventListener("keydown", key);
      el.removeEventListener("touchmove", block);
      main.removeAttribute("inert");
      html.classList.remove("has-case");
      state.lenis?.start();
      // El foco vuelve a la fila recién cuando <main> ya no es inerte.
      returnTo.current?.focus({ preventScroll: true });
    };
  }, []);

  // Click en el fondo (todo lo que no es contenido). Se ignora si el gesto empezó adentro
  // (p. ej. seleccionar texto y soltar afuera) o si fue sobre la barra de scroll.
  const inside = (n) => !!n?.closest?.(".case__in, .case__close");
  const backdrop = (e) => {
    if (inside(e.target) || inside(pressed.current)) return;
    if (e.clientX >= scroll.current.clientWidth) return;
    close();
  };

  return createPortal(
    <div className="case" ref={root} role="dialog" aria-modal="true" aria-labelledby="case-title"
      onPointerDown={(e) => { pressed.current = e.target; }} onClick={backdrop}>
      <div className="case__scroll" ref={scroll} data-lenis-prevent>
        <article className="case__in">
          <span className="case__x label mono">{t.work.case.label}</span>
          <header className="case__head case__x">
            <span className="case__n mono">{String(i + 1).padStart(2, "0")}</span>
            <h3 className="case__t" id="case-title">{p.title}</h3>
          </header>

          <div className={`case__grid ${p.image ? "" : "is-solo"}`}>
            {p.image && (
              <figure className="case__fig case__x">
                <img src={p.image} alt={`${t.work.case.alt} ${p.title}`} />
              </figure>
            )}
            <div className="case__body">
              <dl className="case__meta case__x">
                <div><dt className="mono">{t.work.case.role}</dt><dd>{c.role}</dd></div>
                <div><dt className="mono">{t.work.case.year}</dt><dd>{p.year}</dd></div>
                <div>
                  <dt className="mono">{t.work.case.stack}</dt>
                  <dd>
                    <ul className="tags">
                      {p.tags.split(" · ").map((g) => <li className="mono" key={g}>{g}</li>)}
                    </ul>
                  </dd>
                </div>
              </dl>

              <p className="case__sum case__x">{c.summary}</p>

              <h4 className="case__hh mono case__x">{t.work.case.highlights}</h4>
              <ol className="case__hl">
                {c.highlights.map((h, k) => (
                  <li className="case__x" key={h}>
                    <span className="mono">{String(k + 1).padStart(2, "0")}</span>
                    <span>{h}</span>
                  </li>
                ))}
              </ol>

              <div className="case__cta case__x">
                <a className="case__btn is-main" href={p.href} target="_blank" rel="noreferrer" data-cursor={t.cursor.open}>
                  <span>{t.work.case.visit}</span><i aria-hidden="true">↗</i>
                </a>
                <a className="case__btn" href={p.repo} target="_blank" rel="noreferrer" data-cursor={t.cursor.open}>
                  <span>{t.work.case.code}</span><i aria-hidden="true">↗</i>
                </a>
              </div>
            </div>
          </div>
        </article>
      </div>
      <button type="button" className="case__close mono" ref={closeBtn} onClick={close} data-cursor={t.cursor.close}>
        <span>{t.work.case.close}</span><i aria-hidden="true">✕</i>
      </button>
    </div>,
    document.body
  );
}
