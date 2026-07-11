/* Infiltration windows for the Palaces that appear on the Fusion Path.
   Dates are sourced from the in-app CALENDAR/DEADLINES (first Palace trip → treasure
   stolen) so the "Available now" highlight never contradicts the Calendar tab.
   Keyed by the exact `palace` string used in FUSION_PATH below. */
export const PALACE_WINDOWS = {
 "Castle of Lust (Kamoshida)": { open: "4/11", close: "4/28" },
 "Museum of Vanity (Madarame)": { open: "5/16", close: "5/25" },
 "Pyramid of Wrath (Futaba)": { open: "7/25", close: "8/2" },
 "Casino of Envy (Sae)": { open: "10/29", close: "11/19" }
};

/* Recommended Fusion Path (source: PSNProfiles). Ordered by appearance; alt=off-path alternative. */
export const FUSION_PATH = [
 {
  "result": "Agathion",
  "arcana": "Chariot",
  "level": 3,
  "recipe": "Arsene and Pixie",
  "palace": "Castle of Lust (Kamoshida)"
 },
 {
  "result": "Kushi Mitama",
  "arcana": "Councillor",
  "level": 12,
  "recipe": "Genbu and Succubus",
  "palace": "Castle of Lust (Kamoshida)"
 },
 {
  "result": "Flauros",
  "arcana": "Devil",
  "level": 19,
  "recipe": "Berith, Eligor, and Orobas",
  "palace": "Museum of Vanity (Madarame)"
 },
 {
  "result": "Yaksini",
  "arcana": "Empress",
  "level": 20,
  "recipe": "Hua Po and Jack-o'-Lantern",
  "palace": "Museum of Vanity (Madarame)"
 },
 {
  "result": "Sudama",
  "arcana": "Hermit",
  "level": 17,
  "recipe": "it with Mandrake",
  "palace": "Pyramid of Wrath (Futaba)"
 },
 {
  "result": "Neko Shogun",
  "arcana": "Star",
  "level": 30,
  "recipe": "Anzu, Sudama and Kodama in Advanced Fusion",
  "palace": "Pyramid of Wrath (Futaba)"
 },
 {
  "result": "Pisaca",
  "arcana": "Death",
  "level": 28,
  "recipe": "Sandman and Orobas",
  "palace": "Casino of Envy (Sae)"
 },
 {
  "result": "Bugs",
  "arcana": "Fool",
  "level": 49,
  "recipe": "Pixie, Hariti, and Pisaca",
  "palace": "Casino of Envy (Sae)"
 },
 {
  "result": "Horus",
  "arcana": "Sun",
  "level": 47,
  "recipe": "it with a Queen's Necklace",
  "palace": "Casino of Envy (Sae)"
 },
 {
  "result": "Thoth",
  "arcana": "Emperor",
  "level": 36,
  "recipe": "Eligor and Regent",
  "palace": "Casino of Envy (Sae)",
  "alt": true
 },
 {
  "result": "Anubis",
  "arcana": "Judgement",
  "level": 36,
  "recipe": "Tam Lin and Bicorn",
  "palace": "Casino of Envy (Sae)"
 },
 {
  "result": "Seth",
  "arcana": "Tower",
  "level": 51,
  "recipe": "Isis, Anubis, Thoth, and Horus",
  "palace": "Casino of Envy (Sae)"
 }
];
