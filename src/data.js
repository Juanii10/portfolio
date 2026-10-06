// Editá este archivo: todo el contenido del sitio sale de acá.
export const profile = {
  name: "Juan Ignacio Darsaut",
  city: "Buenos Aires, AR",
  photo: "/foto.jpg", // retrato 4:5
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
    id: "nula",
    title: "Nula",
    tags: "Astro SSR · React · Express · Prisma · PostgreSQL · JWT",
    year: "2026",
    image: "/nula.jpg",
    href: "https://nula-one.vercel.app/",
  },
  {
    id: "forja",
    title: "Forja",
    tags: "Astro · Tailwind CSS · JavaScript",
    year: "2026",
    image: "/forja.jpg",
    href: "https://forja-gym-eta.vercel.app/",
  },
  {
    id: "jaz",
    title: "Jazmín B.",
    tags: "React · Vite · React Router · Cloudflare Pages",
    year: "2026",
    image: "/jaz.jpg",
    href: "https://jazminbianchi-portfolio.pages.dev/",
  },
];

export const stack = [
  "React", "Three.js", "GSAP", "Astro", "Node.js", "Prisma", "PostgreSQL", "TypeScript", "Tailwind", "SAP Fiori", "UI5", "Python", "Java", "JavaScript", "CSS",
];
