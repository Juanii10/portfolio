import { createContext, useContext, useEffect, useMemo, useState } from "react";

// Todos los textos del sitio, en español e inglés. Los nombres propios, links,
// tecnologías y años viven en data.js (no se traducen).
export const copy = {
  es: {
    meta: {
      title: "Juan Ignacio Darsaut — Desarrollador creativo",
      description:
        "Portfolio de Juan Ignacio Darsaut: desarrollo web creativo, interfaces con movimiento, SAP Fiori y full-stack. Buenos Aires.",
    },
    switchLabel: "Idioma",
    pre: "Cargando la nube de partículas",
    sections: ["Inicio", "Sobre mí", "Trabajo", "Contacto"],
    cursor: { go: "Ir", home: "Inicio", view: "Ver", write: "Escribir", copy: "Copiar", hi: "Hola", chat: "Chatear", open: "Abrir", up: "Subir" },
    hero: {
      kicker: "Disponible para proyectos — 2026",
      role: "Desarrollador web creativo",
      sub: "Construyo interfaces con movimiento, 3D y una obsesión incómoda por el detalle.",
      scroll: "Scroll",
    },
    about: {
      label: "(01) Sobre mí",
      alt: "Retrato de",
      manifesto:
        "Diseño y programo sitios que se sienten *vivos*. Me obsesiona el espacio entre lo que funciona y lo que *emociona*: el detalle de una transición, la física de un scroll, el peso exacto de una tipografía. Desde lo más profundo del backend hasta el último detalle del frontend, construyo la experiencia completa.",
      stats: [
        { n: "22", title: "Años", sub: "Buenos Aires, Argentina" },
        { n: "4º", title: "Año de Ingeniería en Informática", sub: "Universidad de Buenos Aires (UBA)" },
        { n: "+3", title: "Años de experiencia con SAP", sub: "Front-end con SAP Fiori" },
      ],
      facts: [
        ["Base", "Buenos Aires, Argentina"],
        ["Hago", "Front-end creativo y full-stack"],
        ["Busco", "Proyectos donde el detalle importa"],
      ],
    },
    work: {
      label: "(02) Trabajo seleccionado",
      title1: "Cosas que construí",
      title2: "con cuidado",
      desc: {
        nula: "E-commerce full-stack: catálogo con stock por talle y color, carrito, checkout transaccional y panel de administración.",
        forja: "Sitio institucional para una cadena de gimnasios: pizarra de clases filtrable por sede, planes y presentación de la app.",
        jaz: "Portfolio para una diseñadora gráfica: sitio multipágina con papelería, experimentación, diseño digital y posters.",
      },
    },
    contact: {
      label: "(03) Contacto",
      line1: "¿Hacemos algo",
      em: "increíble",
      line2: "juntos?",
      copy: "Copiar mail",
      copied: "Copiado ✓",
      up: "Volver arriba ↑",
    },
  },

  en: {
    meta: {
      title: "Juan Ignacio Darsaut — Creative developer",
      description:
        "Portfolio of Juan Ignacio Darsaut: creative web development, motion-driven interfaces, SAP Fiori and full-stack. Buenos Aires.",
    },
    switchLabel: "Language",
    pre: "Loading the particle cloud",
    sections: ["Home", "About", "Work", "Contact"],
    cursor: { go: "Go", home: "Home", view: "View", write: "Write", copy: "Copy", hi: "Hi", chat: "Chat", open: "Open", up: "Top" },
    hero: {
      kicker: "Available for projects — 2026",
      role: "Creative web developer",
      sub: "I build interfaces with motion, 3D and an uncomfortable obsession with detail.",
      scroll: "Scroll",
    },
    about: {
      label: "(01) About",
      alt: "Portrait of",
      manifesto:
        "I design and code websites that feel *alive*. I'm obsessed with the space between what works and what *moves you*: the detail of a transition, the physics of a scroll, the exact weight of a typeface. From the depths of the backend to the last detail of the frontend, I build the whole experience.",
      stats: [
        { n: "22", title: "Years old", sub: "Buenos Aires, Argentina" },
        { n: "4th", title: "Year of Computer Engineering", sub: "University of Buenos Aires (UBA)" },
        { n: "+3", title: "Years of experience with SAP", sub: "Front-end with SAP Fiori" },
      ],
      facts: [
        ["Based in", "Buenos Aires, Argentina"],
        ["I do", "Creative front-end and full-stack"],
        ["Looking for", "Projects where detail matters"],
      ],
    },
    work: {
      label: "(02) Selected work",
      title1: "Things I built",
      title2: "with care",
      desc: {
        nula: "Full-stack e-commerce: catalog with stock per size and color, cart, transactional checkout and admin panel.",
        forja: "Corporate website for a gym chain: class board filterable by branch, plans and app showcase.",
        jaz: "Portfolio for a graphic designer: multi-page site with stationery, experimentation, digital design and posters.",
      },
    },
    contact: {
      label: "(03) Contact",
      line1: "Shall we make something",
      em: "incredible",
      line2: "together?",
      copy: "Copy email",
      copied: "Copied ✓",
      up: "Back to top ↑",
    },
  },
};

const LangContext = createContext(null);
const KEY = "lang";

// Español si el navegador está en español; inglés para cualquier otro caso.
function initialLang() {
  try {
    const saved = localStorage.getItem(KEY);
    if (saved === "es" || saved === "en") return saved;
  } catch { /* sin acceso a localStorage */ }
  return (navigator.language || "es").toLowerCase().startsWith("es") ? "es" : "en";
}

export function LangProvider({ children }) {
  const [lang, setLangState] = useState(initialLang);

  const setLang = (l) => {
    setLangState(l);
    try { localStorage.setItem(KEY, l); } catch { /* ignorar */ }
  };

  useEffect(() => {
    const m = copy[lang].meta;
    document.documentElement.lang = lang;
    document.title = m.title;
    document.querySelector('meta[name="description"]')?.setAttribute("content", m.description);
  }, [lang]);

  const value = useMemo(() => ({ lang, setLang, t: copy[lang] }), [lang]);
  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export const useLang = () => useContext(LangContext);
