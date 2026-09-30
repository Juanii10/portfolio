// Editá este archivo: todo el contenido del sitio sale de acá.
export const profile = {
  name: "Juan Ignacio Darsaut",
  role: "Desarrollador web creativo",
  city: "Buenos Aires, AR",
  photo: "/foto.svg", // TODO: reemplazar por tu foto real (retrato vertical 4:5)
  email: "darsaut.juani@gmail.com",
  phone: "+54 9 11 2356-3236",
  whatsapp: "https://wa.me/5491123563236",
  links: [
    { label: "GitHub", href: "https://github.com/Juanii10" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/juan-ignacio-darsaut-86ba88247" },
  ],
};

// `image` es opcional (archivo dentro de /public); sin imagen se genera una tarjeta con gradiente.
export const projects = [
  {
    title: "NULA",
    desc: "E-commerce de indumentaria full-stack",
    tags: "Astro · React · Prisma · Postgres",
    year: "2026",
    image: "/nula.jpg",
    href: "https://nula-one.vercel.app/",
  },
  {
    title: "FORJA",
    desc: "Sitio para gimnasio: clases, planes y app",
    tags: "Astro · Tailwind",
    year: "2026",
    image: "/forja.png",
    href: "https://forja-gym-eta.vercel.app/",
  },
];

export const stack = [
  "React", "Three.js", "GSAP", "Astro", "Node.js", "Prisma", "PostgreSQL", "TypeScript", "Tailwind", "SAP Fiori", "UI5", "Python", "Java", "JavaScript", "CSS",
];

export const manifesto =
  "Diseño y programo sitios que se sienten *vivos*. Me obsesiona el espacio entre lo que funciona y lo que *emociona*: el detalle de una transición, la física de un scroll, el peso exacto de una tipografía. Desde lo más profundo del backend hasta el último detalle del frontend, construyo la experiencia completa.";

// Cifras grandes junto a la foto.
export const stats = [
  { n: "22", title: "Años", sub: "Buenos Aires, Argentina" },
  { n: "4º", title: "Año de Ingeniería en Informática", sub: "Universidad de Buenos Aires (UBA)" },
  { n: "+3", title: "Años de experiencia con SAP", sub: "Front-end con SAP Fiori" },
];

export const facts = [
  ["Base", "Buenos Aires, Argentina"],
  ["Hago", "Front-end creativo y full-stack"],
  ["Busco", "Proyectos donde el detalle importa"],
];
