import { createContext, useContext, useEffect, useMemo, useState } from "react";

// Todos los textos del sitio, en español e inglés. Los nombres propios, links,
// tecnologías y años viven en data.js (no se traducen).
export const copy = {
  es: {
    meta: {
      title: "Juan Ignacio Darsaut — Desarrollador Full Stack",
      description:
        "Portfolio de Juan Ignacio Darsaut: desarrollador full stack con más de 3 años de experiencia en SAP Fiori y proyectos web. Buenos Aires, Argentina.",
    },
    switchLabel: "Idioma",
    pre: "Cargando la nube de partículas",
    sections: ["Inicio", "Sobre mí", "Trabajo", "Contacto"],
    cursor: { go: "Ir", home: "Inicio", view: "Ver", study: "Ver caso", close: "Cerrar", write: "Escribir", hi: "Hola", chat: "Chatear", open: "Abrir", up: "Subir", download: "Bajar" },
    hero: {
      kicker: "Abierto a nuevas oportunidades — 2026",
      role: "Desarrollador Full Stack",
      sub: "Más de 3 años construyendo aplicaciones empresariales con SAP Fiori, y webs con movimiento y una obsesión incómoda por el detalle.",
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
        ["Especialidad", "Desarrollo full-stack con foco en interfaces y experiencia de usuario"],
        ["Busco", "Un equipo o proyecto donde el detalle importe"],
      ],
      exp: {
        label: "Trayectoria",
        jobs: {
          cft: {
            role: "Desarrollador Frontend",
            date: "Ene 2023 — Actualidad",
            points: [
              "Desarrollo y mantenimiento de aplicaciones web empresariales con SAP Fiori / SAPUI5 sobre SAP BAS, conectadas a sistemas internos mediante Cloud Connector.",
              "Desarrollo ABAP para mantenimiento y nuevas funcionalidades: transacciones, tablas y logs a medida.",
              "Del requerimiento funcional a las pruebas y la entrega en desarrollo y producción.",
            ],
          },
          freelance: {
            role: "Desarrollador Web",
            date: "Jul 2026 — Actualidad",
            points: [
              "Landing pages y sitios para negocios y profesionales con Astro y Tailwind CSS, como Forja y el portfolio de Jazmín B.",
              "Configurador interactivo de pulseras y dijes para una joyería en Tiendanube: dijes cargados desde el catálogo, integración con el carrito y pedido por WhatsApp.",
              "Procesamiento de ~870 imágenes de producto a PNG transparente, con puntos de anclaje calculados por análisis de píxeles.",
            ],
          },
        },
      },
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
      case: {
        label: "Caso de estudio",
        alt: "Vista previa de",
        role: "Rol",
        year: "Año",
        stack: "Stack",
        highlights: "Detalles técnicos",
        visit: "Visitar sitio",
        code: "Ver código",
        close: "Cerrar",
      },
      cases: {
        nula: {
          role: "Full stack: API, base de datos y frontend",
          summary: "Tienda online de una marca de indumentaria ficticia, con API REST propia, base de datos relacional y frontend desacoplado.",
          highlights: [
            "API REST con Express y Prisma sobre PostgreSQL (Neon).",
            "Catálogo con stock por talle y color, carrito y checkout transaccional.",
            "Autenticación con JWT y panel de administración.",
            "Frontend en Astro SSR + React; backend en Render y frontend en Vercel.",
          ],
        },
        forja: {
          role: "Diseño y desarrollo frontend",
          summary: "Sitio institucional para una cadena de gimnasios.",
          highlights: [
            "Pizarra de clases filtrable por sede.",
            "Secciones de planes y presentación de la app del gimnasio.",
            "Carruseles, secciones con scroll animado y diseño responsive con Astro y Tailwind CSS.",
          ],
        },
        jaz: {
          role: "Desarrollo web (freelance)",
          summary: "Portfolio para una diseñadora gráfica.",
          highlights: [
            "Sitio multipágina con React y React Router: papelería, experimentación, diseño digital y posters.",
            "Deploy en Cloudflare Pages.",
            "Trabajo iterativo con la clienta: primero una demo, después la versión final.",
          ],
        },
      },
      more: {
        title: "Otros proyectos",
        items: {
          bruma: {
            tag: "Proyecto personal",
            desc: "Sistema de turnos online para una peluquería: varios profesionales con agenda propia, seña simulada, recordatorios por email y panel con estadísticas.",
          },
          condor: {
            tag: "Universidad (FIUBA)",
            desc: "Reserva de asientos de vuelos con backend concurrente en Elixir sin frameworks (un GenServer por vuelo, DynamicSupervisor y Registry) y comunicación en tiempo real por WebSockets.",
          },
          pulseras: {
            name: "Configurador de pulseras",
            tag: "Cliente",
            desc: "Configurador interactivo de pulseras y dijes integrado al carrito de una tienda Tiendanube.",
          },
        },
      },
    },
    contact: {
      label: "(03) Contacto",
      line1: "¿Hacemos algo",
      em: "increíble",
      line2: "juntos?",
      subject: "Hagamos algo increíble juntos",
      cv: "Descargar CV",
      copied: "Copiado ✓",
      up: "Volver arriba ↑",
    },
  },

  en: {
    meta: {
      title: "Juan Ignacio Darsaut — Full Stack Developer",
      description:
        "Portfolio of Juan Ignacio Darsaut: full stack developer with over 3 years of experience in SAP Fiori and web projects. Buenos Aires, Argentina.",
    },
    switchLabel: "Language",
    pre: "Loading the particle cloud",
    sections: ["Home", "About", "Work", "Contact"],
    cursor: { go: "Go", home: "Home", view: "View", study: "Case", close: "Close", write: "Write", hi: "Hi", chat: "Chat", open: "Open", up: "Top", download: "Get" },
    hero: {
      kicker: "Open to new opportunities — 2026",
      role: "Full Stack Developer",
      sub: "Over 3 years building enterprise applications with SAP Fiori, and websites with motion and an uncomfortable obsession with detail.",
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
        ["Focus", "Full-stack development focused on interfaces and user experience"],
        ["Looking for", "A team or project where detail matters"],
      ],
      exp: {
        label: "Experience",
        jobs: {
          cft: {
            role: "Frontend Developer",
            date: "Jan 2023 — Present",
            points: [
              "Development and maintenance of enterprise web applications with SAP Fiori / SAPUI5 on SAP BAS, connected to internal systems through Cloud Connector.",
              "ABAP development for maintenance and new features: custom transactions, tables and logs.",
              "From functional requirements through testing and delivery to development and production.",
            ],
          },
          freelance: {
            role: "Web Developer",
            date: "Jul 2026 — Present",
            points: [
              "Landing pages and sites for businesses and professionals with Astro and Tailwind CSS, like Forja and Jazmín B.'s portfolio.",
              "Interactive bracelet and charm configurator for a jewelry store on Tiendanube: charms loaded from the catalog, cart integration and order handoff via WhatsApp.",
              "Processed ~870 product images into transparent PNGs, with anchor points computed through pixel analysis.",
            ],
          },
        },
      },
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
      case: {
        label: "Case study",
        alt: "Preview of",
        role: "Role",
        year: "Year",
        stack: "Stack",
        highlights: "Technical highlights",
        visit: "Visit site",
        code: "View code",
        close: "Close",
      },
      cases: {
        nula: {
          role: "Full stack: API, database and frontend",
          summary: "Online store for a fictional clothing brand, with its own REST API, relational database and decoupled frontend.",
          highlights: [
            "REST API with Express and Prisma on PostgreSQL (Neon).",
            "Catalog with stock per size and color, cart and transactional checkout.",
            "JWT authentication and admin dashboard.",
            "Astro SSR + React frontend; backend on Render and frontend on Vercel.",
          ],
        },
        forja: {
          role: "Frontend design and development",
          summary: "Website for a gym chain.",
          highlights: [
            "Class schedule filterable by location.",
            "Membership plans and a showcase of the gym's app.",
            "Carousels, scroll-animated sections and responsive design with Astro and Tailwind CSS.",
          ],
        },
        jaz: {
          role: "Web development (freelance)",
          summary: "Portfolio for a graphic designer.",
          highlights: [
            "Multi-page site with React and React Router: stationery, experimentation, digital design and posters.",
            "Deployed on Cloudflare Pages.",
            "Iterative work with the client: a demo first, then the final version.",
          ],
        },
      },
      more: {
        title: "More projects",
        items: {
          bruma: {
            tag: "Personal project",
            desc: "Online booking system for a hair salon: multiple professionals with their own schedules, simulated deposit, email reminders and a stats dashboard.",
          },
          condor: {
            tag: "University (FIUBA)",
            desc: "Flight seat booking with a concurrent Elixir backend built without frameworks (one GenServer per flight, DynamicSupervisor and Registry) and real-time WebSocket communication.",
          },
          pulseras: {
            name: "Bracelet configurator",
            tag: "Client",
            desc: "Interactive bracelet and charm configurator integrated with a Tiendanube store's cart.",
          },
        },
      },
    },
    contact: {
      label: "(03) Contact",
      line1: "Shall we make something",
      em: "incredible",
      line2: "together?",
      subject: "Let's make something incredible together",
      cv: "Download CV",
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
