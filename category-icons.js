// Maps each product category code to a part-type icon.
// Each icon is a clean, brand-neutral illustration representing that part type —
// used as a generic picture for every product in the category, since exact
// supplier photos aren't available. Swap CATEGORY_ICON_TYPE values or extend
// ICONS below if real product photos become available later.

window.CATEGORY_ICON_TYPE = {
  BATACE: "battery", BATAPP: "battery", BATASU: "battery", BATDEL: "battery",
  BATHP: "battery", BATLEN: "battery", BATSAM: "battery", BATSON: "battery", BATTOS: "battery",
  CHRACE: "charger", CHRAPP: "charger", CHRASU: "charger", CHRDEL: "charger",
  CHRHP: "charger", CHRLEN: "charger", CHRSAM: "charger", CHRSON: "charger", CHRTOS: "charger",
  CABOEM: "cable",
  CARCAN: "cartridge", CAREPS: "cartridge",
  DRASU: "ribbon", DRDEL: "ribbon", DRHP: "ribbon",
  DWROEM: "dvd",
  FANACE: "fan", FANASU: "fan", FANDEL: "fan", FANHP: "fan",
  FANLEN: "fan", FANMSI: "fan", FANSAM: "fan", FANTOS: "fan",
  HDDLEX: "storage", HDDWD: "storage",
  HOUDEL: "housing", HOUHP: "housing", HOULEN: "housing", HOUOEM: "housing",
  KEYACE: "keyboard", KEYASU: "keyboard", KEYDEL: "keyboard", KEYHP: "keyboard",
  KEYLEN: "keyboard", KEYSAM: "keyboard", KEYSON: "keyboard", KEYTOS: "keyboard",
  LHDEL: "hinge", LHHP: "hinge",
  RAMKIG: "ram",
  SPEACE: "speaker", SPEASU: "speaker", SPEDEL: "speaker",
  SPEHP: "speaker", SPELEN: "speaker", SPETOS: "speaker",
  SCROEM: "screen",
  ITEM: "generic",
};

const ICON_COLORS = {
  battery: "#0F6B5C", charger: "#C97B2E", cable: "#6B7280", cartridge: "#7C3AED",
  ribbon: "#2563EB", dvd: "#0891B2", fan: "#DC2626", storage: "#111827",
  housing: "#92400E", keyboard: "#1D4ED8", hinge: "#4B5563", ram: "#16A34A",
  speaker: "#DB2777", screen: "#0EA5E9", generic: "#6B7280",
};

const ICON_PATHS = {
  battery: `<rect x="80" y="40" width="20" height="14" rx="2"/><rect x="40" y="54" width="120" height="90" rx="10"/><rect x="60" y="80" width="80" height="16" rx="3" fill="#fff" opacity=".85"/><rect x="60" y="104" width="50" height="10" rx="3" fill="#fff" opacity=".6"/>`,
  charger: `<rect x="50" y="50" width="60" height="80" rx="10"/><circle cx="80" cy="70" r="8" fill="#fff"/><path d="M80 86 v18" stroke="#fff" stroke-width="6" stroke-linecap="round"/><path d="M110 90 h60 v10 h-40 v20 h-20 z"/>`,
  cable: `<path d="M40 90 q40 -50 80 0 t80 0" fill="none" stroke-width="10" stroke-linecap="round"/><circle cx="40" cy="90" r="10"/><circle cx="200" cy="90" r="10"/>`,
  cartridge: `<rect x="55" y="55" width="90" height="70" rx="8"/><rect x="70" y="40" width="60" height="20" rx="4"/><rect x="65" y="75" width="70" height="14" rx="3" fill="#fff" opacity=".8"/>`,
  ribbon: `<rect x="45" y="70" width="150" height="40" rx="6"/><rect x="55" y="78" width="130" height="6" fill="#fff" opacity=".7"/><rect x="55" y="90" width="130" height="6" fill="#fff" opacity=".5"/><rect x="55" y="102" width="130" height="6" fill="#fff" opacity=".3"/>`,
  dvd: `<rect x="40" y="60" width="160" height="60" rx="6"/><rect x="90" y="80" width="60" height="8" rx="2" fill="#fff" opacity=".8"/><circle cx="175" cy="90" r="6" fill="#fff" opacity=".6"/>`,
  fan: `<circle cx="100" cy="90" r="45"/><circle cx="100" cy="90" r="10" fill="#fff"/><path d="M100 90 L100 50 A40 40 0 0 1 138 72 Z" fill="#fff" opacity=".6"/><path d="M100 90 L138 108 A40 40 0 0 1 100 130 Z" fill="#fff" opacity=".6"/><path d="M100 90 L62 108 A40 40 0 0 1 62 72 Z" fill="#fff" opacity=".6"/>`,
  storage: `<rect x="45" y="55" width="150" height="70" rx="8"/><circle cx="85" cy="90" r="18" fill="#fff" opacity=".8"/><circle cx="85" cy="90" r="5" fill="#111"/><rect x="120" y="75" width="55" height="8" fill="#fff" opacity=".6"/><rect x="120" y="92" width="40" height="8" fill="#fff" opacity=".4"/>`,
  housing: `<path d="M45 60 h110 l20 20 v45 h-130 z"/><rect x="60" y="90" width="80" height="8" fill="#fff" opacity=".5"/>`,
  keyboard: `<rect x="35" y="55" width="170" height="70" rx="8"/>${Array.from({length:15},(_,i)=>`<rect x="${45+i*11}" y="65" width="8" height="8" rx="2" fill="#fff" opacity=".8"/>`).join("")}${Array.from({length:15},(_,i)=>`<rect x="${45+i*11}" y="78" width="8" height="8" rx="2" fill="#fff" opacity=".8"/>`).join("")}${Array.from({length:15},(_,i)=>`<rect x="${45+i*11}" y="91" width="8" height="8" rx="2" fill="#fff" opacity=".8"/>`).join("")}<rect x="70" y="104" width="90" height="10" rx="3" fill="#fff" opacity=".8"/>`,
  hinge: `<circle cx="70" cy="90" r="14"/><circle cx="130" cy="90" r="14"/><rect x="60" y="86" width="80" height="8" rx="4"/>`,
  ram: `<rect x="45" y="65" width="150" height="35" rx="4"/>${Array.from({length:10},(_,i)=>`<rect x="${55+i*14}" y="100" width="6" height="14" fill="currentColor"/>`).join("")}`,
  speaker: `<rect x="70" y="45" width="60" height="90" rx="10"/><circle cx="100" cy="70" r="12" fill="#fff" opacity=".85"/><circle cx="100" cy="105" r="18" fill="#fff" opacity=".7"/>`,
  screen: `<rect x="35" y="45" width="170" height="105" rx="8" fill="none" stroke-width="10"/><rect x="45" y="55" width="150" height="85" rx="3" opacity=".25"/>`,
  generic: `<rect x="55" y="55" width="110" height="80" rx="10"/><path d="M80 55 v-15 h60 v15" fill="none" stroke-width="8"/>`,
};

function categoryIcon(category, code) {
  const type = window.CATEGORY_ICON_TYPE[category] || "generic";
  const color = ICON_COLORS[type] || "#6B7280";
  const path = ICON_PATHS[type] || ICON_PATHS.generic;
  const label = String(code || "").slice(0, 20);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="900" height="650" viewBox="0 0 240 200">
    <rect width="240" height="200" fill="#F5F6F3"/>
    <g fill="${color}" stroke="${color}" color="${color}">${path}</g>
    <text x="120" y="175" text-anchor="middle" font-family="Arial" font-size="13" fill="#536159">${label.replace(/[&<>]/g, m => ({"&":"&amp;","<":"&lt;",">":"&gt;"}[m]))}</text>
  </svg>`;
  return "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(svg);
}

window.categoryIcon = categoryIcon;
