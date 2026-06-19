/* Shared P5R route + label data (consumed by CalendarView and other tabs) */

export const STAT = { Knowledge:"#3b82f6", Guts:"#f97316", Proficiency:"#a855f7", Kindness:"#ec4899", Charm:"#06b6d4" };
export const STAT_DESC = {
  Knowledge:"gates class answers, exams, and some Confidants",
  Guts:"needed to start/raise several Confidants and some shops",
  Proficiency:"unlocks crafting volume and a few Confidants",
  Kindness:"required for Confidants like Hermit (Futaba) and perks",
  Charm:"opens dialogue, some Confidants, and discounts",
};
export const ARC_NAME = {
  Magician:"Morgana", Priestess:"Makoto", Empress:"Haru", Emperor:"Yusuke", Hierophant:"Sojiro",
  Lovers:"Ann", Chariot:"Ryuji", Justice:"Akechi", Hermit:"Futaba", Fortune:"Chihaya",
  Strength:"Twins", Hanged:"Iwai", Death:"Takemi", Temperance:"Kawakami", Devil:"Ohya",
  Star:"Hifumi", Faith:"Sumire", Councillor:"Maruki", Tower:"Shinya", Moon:"Mishima", Sun:"Yoshida", Fool:"",
};

export const ROMANCE = [
  { key:"Platonic", name:"Platonic (no romance)", arcana:null },
  { key:"Ann", name:"Ann Takamaki", arcana:"Lovers" },
  { key:"Makoto", name:"Makoto Niijima", arcana:"Priestess" },
  { key:"Haru", name:"Haru Okumura", arcana:"Empress", note:"starts late (10/31), so it's a late-game romance" },
  { key:"Futaba", name:"Futaba Sakura", arcana:"Hermit" },
  { key:"Takemi", name:"Tae Takemi", arcana:"Death" },
  { key:"Chihaya", name:"Chihaya Mifune", arcana:"Fortune" },
  { key:"Hifumi", name:"Hifumi Togo", arcana:"Star" },
  { key:"Ohya", name:"Ichiko Ohya", arcana:"Devil" },
  { key:"Kawakami", name:"Sadayo Kawakami", arcana:"Temperance" },
  { key:"Sumire", name:"Sumire Yoshizawa", arcana:"Faith", note:"third semester only — cannot romance before Christmas" },
];
export const routeOf = (key) => ROMANCE.find((r) => r.key === key) || ROMANCE[0];
