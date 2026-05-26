export type Collaborator = {
  id: string;
  name: string;
  logo: string;
};

/** Replace logos in /public/content/collaborators/ — see content/CUSTOMIZATION_GUIDE.md */
export const COLLABORATORS: Collaborator[] = [
  { id: "infotel", name: "INFOTEL", logo: "/content/collaborators/infotelW.png" },
  { id: "moment", name: "MOMENT Photography", logo: "/content/collaborators/moment.png" },
  { id: "oshadha", name: "Oshadha Ekanayake Films", logo: "/content/collaborators/oshadhaW.png" },
  { id: "southside", name: "South Side", logo: "/content/collaborators/southsideW.png" },
  { id: "lmg", name: "LMG", logo: "/content/collaborators/lmgW.png" },
  { id: "gammiris", name: "GAMMIRIS Restaurant & Bar", logo: "/content/collaborators/gammirisW.png" },
  { id: "msi", name: "MSI Sri Lanka", logo: "/content/collaborators/msiW.png" },
  { id: "brother-sister", name: "Brother & Sister Productions", logo: "/content/collaborators/brotherW.png" },
  { id: "triple-a", name: "triple A", logo: "/content/collaborators/tripleW.png" },
  { id: "growmore", name: "GROW MORE", logo: "/content/collaborators/growmoreW.png" },
  { id: "maxmedia", name: "MaxMedia", logo: "/content/collaborators/maxmedia.png" },
  { id: "maximum", name: "Maximum E-Sports", logo: "/content/collaborators/maximum.png" },
];
