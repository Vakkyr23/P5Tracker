/* Unified hard-deadline list (Palace clear-by dates, Confidant windows, endgame point-of-no-return).
   Sorted in game order; the UI computes the countdown from your active day.
   `id` is the stable check-state key (v3.5.3) — never reuse or rename one, or saved ticks detach. */
export const DEADLINES = [
 {
  "id": "kamoshida-calling-card",
  "due": "4/27",
  "category": "Palace",
  "item": "Send the Calling Card",
  "flaggedOn": "4/27"
 },
 {
  "id": "madarame-calling-card",
  "due": "5/24",
  "category": "Palace",
  "item": "Send the Calling Card",
  "flaggedOn": "5/24"
 },
 {
  "id": "kaneshiro-calling-card",
  "due": "6/27",
  "category": "Palace",
  "item": "Send the Calling Card",
  "flaggedOn": "6/27"
 },
 {
  "id": "futaba-calling-card",
  "due": "8/2",
  "category": "Palace",
  "item": "Send the Calling Card",
  "flaggedOn": "8/2"
 },
 {
  "id": "okumura-calling-card",
  "due": "9/29",
  "category": "Palace",
  "item": "Send the Calling Card",
  "flaggedOn": "9/29"
 },
 {
  "id": "yoshida-rank10",
  "due": "11/13",
  "category": "Confidant",
  "item": "Sun (Yoshida) must be Rank 10 — political-rally window closes",
  "flaggedOn": "11/13"
 },
 {
  "id": "akechi-rank8",
  "due": "11/17",
  "category": "Confidant",
  "item": "Justice (Akechi) must be Rank 8 before the Casino arc",
  "flaggedOn": "11/17"
 },
 {
  "id": "maruki-rank9",
  "due": "11/17",
  "category": "Confidant",
  "item": "Councillor (Maruki) must be Rank 9 — required for 3rd semester",
  "flaggedOn": "11/17"
 },
 {
  "id": "niijima-calling-card",
  "due": "11/18",
  "category": "Palace",
  "item": "Send the Calling Card",
  "flaggedOn": "11/18"
 },
 {
  "id": "shido-calling-card",
  "due": "12/10",
  "category": "Palace",
  "item": "Send the biggest Calling Card",
  "flaggedOn": "12/10"
 },
 {
  "id": "kasumi-rank5",
  "due": "12/18",
  "category": "Confidant",
  "item": "Faith (Kasumi) must be Rank 5 before December lock",
  "flaggedOn": "12/18"
 },
 {
  "id": "endgame-last-shopping",
  "due": "12/24",
  "category": "Endgame",
  "item": "If you haven’t maxed out the Strength Confidant, or need to buy weapons and supplies; this is your LAST CHANCE! After the Prison of Regressi",
  "flaggedOn": "12/24"
 },
 {
  "id": "maruki-calling-card",
  "due": "2/2",
  "category": "Palace",
  "item": "Send the last Calling card",
  "flaggedOn": "2/2"
 }
];
