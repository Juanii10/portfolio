// Editá este archivo: todo el contenido del sitio sale de acá.
export const profile = {
  name: "Juan Ignacio Darsaut",
  city: "Buenos Aires, AR",
  photo: "/foto.jpg", // retrato 4:5
  email: "darsaut.juani@gmail.com",
  phone: "+54 9 11 2356-3236",
  whatsapp: "https://wa.me/5491123563236",
  // CV en PDF (public/cv): se descarga la versión del idioma activo.
  cv: {
    es: "/cv/CV_Juan_Darsaut_Developer_ES.pdf",
    en: "/cv/CV_Juan_Darsaut_Developer_EN.pdf",
  },
  links: [
    { label: "GitHub", icon: "github", href: "https://github.com/Juanii10" },
    { label: "LinkedIn", icon: "linkedin", href: "https://www.linkedin.com/in/juan-ignacio-darsaut-86ba88247" },
  ],
};

// `image` es opcional (archivo dentro de /public); sin imagen se genera una tarjeta con gradiente.
export const projects = [
  {
    id: "forja",
    title: "Forja",
    tags: "Astro · Tailwind CSS · JavaScript",
    year: "2026",
    image: "/forja.jpg",
    href: "https://forja-gym-eta.vercel.app/",
    repo: "https://github.com/Juanii10/forja-gym",
  },
  {
    id: "jaz",
    title: "Jazmín B.",
    tags: "React · Vite · React Router · Cloudflare Pages",
    year: "2026",
    image: "/jaz.jpg",
    href: "https://jazminbianchi-portfolio.pages.dev/",
    repo: "https://github.com/Juanii10/portfolio-Jazmin_Bianchi",
  },
  {
    id: "nula",
    title: "Nula",
    tags: "Astro SSR · React · Express · Prisma · PostgreSQL · JWT",
    year: "2026",
    image: "/nula.jpg",
    href: "https://nula-one.vercel.app/",
    repo: "https://github.com/Juanii10/nula-ecommerce",
  },
];

// Otros proyectos: sin demo pública, así que no llevan link. `name` solo va acá si no se traduce
// (si cambia según el idioma, sale de i18n.jsx → work.more.items[id].name).
export const archive = [
  { id: "bruma", name: "Bruma Barbería", stack: "Node.js · Express · Astro · React · Tailwind" },
  { id: "condor", name: "Cóndor del Sur", stack: "Elixir/OTP · WebSockets · React · Vite · Docker" },
  { id: "pulseras", stack: "HTML · CSS · JavaScript · Tiendanube" },
];

// Trayectoria: empresa y tecnologías acá; rol, fechas y viñetas en i18n.jsx → about.exp.jobs[id].
export const experience = [
  { id: "cft", company: "Clever For Tech", tags: ["SAP Fiori", "SAPUI5", "ABAP", "SAP BAS"] },
  { id: "freelance", company: "Freelance", tags: ["Astro", "Tailwind CSS", "JavaScript", "Tiendanube"] },
];

export const stack = [
  "React", "Three.js", "GSAP", "Astro", "Node.js", "Express", "Prisma", "PostgreSQL", "TypeScript", "Tailwind", "SAP Fiori", "UI5", "Python", "Java", "Elixir", "JavaScript", "Docker", "CSS",
];
