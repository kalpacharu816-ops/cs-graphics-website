export type Collaborator = {
  id: string;
  name: string;
  logo: string;
};

/** Replace logos in /public/content/collaborators/ — see content/CUSTOMIZATION_GUIDE.md */
export const COLLABORATORS: Collaborator[] = [
  { id: "infotel", name: "INFOTEL", logo: "/content/collaborators/infotel.svg" },
  { id: "moment", name: "MOMENT Photography", logo: "/content/collaborators/moment.svg" },
  { id: "oshadha", name: "Oshadha Ekanayake Films", logo: "/content/collaborators/oshadha.svg" },
  { id: "southside", name: "South Side", logo: "/content/collaborators/southside.svg" },
  { id: "lmg", name: "LMG", logo: "/content/collaborators/lmg.svg" },
  { id: "gammiris", name: "GAMMIRIS Restaurant & Bar", logo: "/content/collaborators/gammiris.svg" },
  { id: "msi", name: "MSI Sri Lanka", logo: "/content/collaborators/msi.svg" },
  { id: "brother-sister", name: "Brother & Sister Productions", logo: "/content/collaborators/brother-sister.svg" },
  { id: "triple-a", name: "triple A", logo: "/content/collaborators/triple-a.svg" },
  { id: "growmore", name: "GROW MORE", logo: "/content/collaborators/growmore.svg" },
  { id: "maxmedia", name: "MaxMedia", logo: "/content/collaborators/maxmedia.svg" },
  { id: "maximum", name: "Maximum E-Sports", logo: "/content/collaborators/maximum-esports.svg" },
];
