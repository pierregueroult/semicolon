import { Pages } from "../interfaces";

export const menuPages: Pages = [
  {
    href: "/",
    name: "Accueil",
    Icon: <i className="fa-solid fa-bullhorn"></i>,
  },
  {
    href: "/search",
    name: "Rechercher",
    Icon: <i className="fa-solid fa-magnifying-glass"></i>,
  },
  {
    href: "/account",
    name: "Mon compte",
    Icon: <i className="fa-solid fa-user"></i>,
  },
  {
    href: "/content",
    name: "Mon contenus",
    Icon: <i className="fa-solid fa-chart-line"></i>,
  },
];

export const allPages: Pages = [
  { href: "/", name: "Accueil" },
  { href: "/search", name: "Rechercher" },
  { href: "/account", name: "Mon compte" },
  { href: "/content", name: "Mon contenu" },
];
