export const APP_DATA = {
  confidants: [
    { arcana: 'Fool', name: 'Igor', target: 10, notes: 'Automatic progression.', monthlyTargets: { july: 6 } },
    { arcana: 'Magician', name: 'Morgana', target: 10, notes: 'Automatic progression.', monthlyTargets: { july: 5 } },
    {
      arcana: 'Priestess',
      name: 'Makoto Niijima',
      target: 10,
      notes: 'Knowledge 3 to start; Charm 5 for Rank 6.',
      monthlyTargets: { july: 4, august: 10 }
    },
    {
      arcana: 'Empress',
      name: 'Haru Okumura',
      target: 10,
      notes: 'Starts 10/31. Proficiency 5 needed for Rank 2.',
      monthlyTargets: { december: 10 }
    },
    {
      arcana: 'Emperor',
      name: 'Yusuke Kitagawa',
      target: 10,
      notes: 'Proficiency 4 for Rank 6.',
      monthlyTargets: { july: 6, august: 10 }
    },
    {
      arcana: 'Hierophant',
      name: 'Sojiro Sakura',
      target: 10,
      notes: 'Gated at Rank 4 until 8/21. Kindness 5 for Rank 7.',
      monthlyTargets: { april: 2, august: 5 }
    },
    {
      arcana: 'Lovers',
      name: 'Ann Takamaki',
      target: 10,
      notes: 'Kindness 2 needed to start.',
      monthlyTargets: { april: 2, june: 5, july: 8, august: 10 }
    },
    {
      arcana: 'Chariot',
      name: 'Ryuji Sakamoto',
      target: 10,
      notes: 'Rank 7 Insta-kill is the most important grinding skill.',
      monthlyTargets: { april: 3, may: 5, july: 7 }
    },
    {
      arcana: 'Justice',
      name: 'Goro Akechi',
      target: 8,
      deadline: '11/17',
      notes: 'Rank 8 required for True End extra content.',
      monthlyTargets: { june: 2, july: 5, october: 6, november: 8 }
    },
    {
      arcana: 'Hermit',
      name: 'Futaba Sakura',
      target: 10,
      notes: 'Starts 8/31. Kindness 4 needed to start.',
      monthlyTargets: { august: 2, september: 5, december: 10 }
    },
    {
      arcana: 'Fortune',
      name: 'Chihaya Mifune',
      target: 10,
      notes: 'Rank 5 (Affinity Reading) is vital for finishing others.',
      monthlyTargets: { june: 1, july: 5, august: 7 }
    },
    {
      arcana: 'Strength',
      name: 'Caroline & Justine',
      target: 10,
      notes: 'Fusion based. Does not consume time.',
      monthlyTargets: { july: 5 }
    },
    {
      arcana: 'Hanged',
      name: 'Munehisa Iwai',
      target: 10,
      notes: 'Guts 4 needed to start; Guts 5 for Rank 8.',
      monthlyTargets: { august: 5, november: 10 }
    },
    {
      arcana: 'Death',
      name: 'Tae Takemi',
      target: 10,
      notes: 'Rank 7 discount on SP Adhesives.',
      monthlyTargets: { april: 2, may: 5, july: 7 }
    },
    {
      arcana: 'Temperance',
      name: 'Sadayo Kawakami',
      target: 10,
      notes: 'Rank 10 (Massage) allows night actions after Palaces.',
      monthlyTargets: { june: 8, july: 10 }
    },
    {
      arcana: 'Devil',
      name: 'Ichiko Ohya',
      target: 10,
      notes: 'Charm 3 needed to start.',
      monthlyTargets: { august: 5, november: 10 }
    },
    {
      arcana: 'Tower',
      name: 'Shinya Oda',
      target: 10,
      notes: 'Starts 9/4. Kindness 3 needed.',
      monthlyTargets: { september: 3 }
    },
    {
      arcana: 'Star',
      name: 'Hifumi Togo',
      target: 10,
      notes: 'Charm 3 to start; Knowledge 5 for Rank 8.',
      monthlyTargets: { october: 8 }
    },
    {
      arcana: 'Moon',
      name: 'Yuuki Mishima',
      target: 10,
      notes: 'Ranks up via Mementos requests.',
      monthlyTargets: { july: 7 }
    },
    {
      arcana: 'Sun',
      name: 'Toranosuke Yoshida',
      target: 10,
      deadline: '11/13',
      notes: 'Sunday nights only. Best money skill.',
      monthlyTargets: { may: 2, july: 5, august: 9, september: 10, november: 10 }
    },
    { arcana: 'Judgement', name: 'Sae Niijima', target: 10, notes: 'Automatic progression.', monthlyTargets: {} },
    {
      arcana: 'Faith',
      name: 'Kasumi Yoshizawa',
      target: 5,
      deadline: '12/18',
      notes: 'Rank 5 is mandatory for 3rd Semester content.',
      monthlyTargets: { july: 4, november: 5, january: 10 }
    },
    {
      arcana: 'Councillor',
      name: 'Takuto Maruki',
      target: 9,
      deadline: '11/17',
      notes: 'MANDATORY Rank 9 for 3rd Semester access.',
      monthlyTargets: { may: 2, july: 5, september: 7, october: 9 }
    }
  ],
  months: [
    {
      id: 'april',
      name: 'April',
      palace: 'Castle of Lust (Kamoshida)',
      tasks: [
        { id: 'apr_pal_sec', text: 'DEADLINE: Secure Route (Kamoshida) by 4/20', isMissable: true },
        { id: 'apr_pal_strat', text: 'Strategy: Clear Palace early (by 4/18)', isMissable: true },
        { id: 'apr_q1', text: '4/12 Answer: "Villains" (+1 Knowledge)', isMissable: true },
        { id: 'apr_q2', text: '4/19 Answer: "They\'re the same" (+1 Knowledge)', isMissable: true },
        { id: 'apr_q3', text: '4/23 Answer: "All of them" (+1 Knowledge)', isMissable: true },
        { id: 'apr_q4', text: '4/25 Answer: "You unquestionably support it" -> "You have a duty to correct it" (+1 Knowledge/Charm)', isMissable: true },
        { id: 'apr_q5', text: '4/27 Answer: "Four color theorem" (+1 Knowledge)', isMissable: true },
        { id: 'apr_q6', text: '4/30 Answer: "Wonder" -> "Child" -> "A prodigy" (+1 Knowledge)', isMissable: true },
        { id: 'apr_cw1', text: '4/18 Crossword: "Semesters" (+1 Knowledge)', isMissable: true },
        { id: 'apr_cw2', text: '4/27 Crossword: "Blossom" (+1 Knowledge)', isMissable: true },
        { id: 'apr_tip1', text: 'Optimization: Clean room early to unlock TV/Console', isMissable: true }
      ]
    },
    {
      id: 'may',
      name: 'May',
      palace: 'Museum of Vanity (Madarame)',
      tasks: [
        { id: 'may_pal_strat', text: 'Strategy: Clear Madarame early (by 5/20)', isMissable: true },
        { id: 'may_unlock_maruki', text: '5/13: Councillor (Maruki) Unlocks (PRIORITY)' },
        { id: 'may_unlock_kawakami', text: '5/24: Operation Maidwatch (Starts Temperance)' },
        { id: 'may_unlock_kasumi', text: '5/30: Faith (Yoshizawa) Rank 1' },
        { id: 'may_exams', text: '5/11-5/14: Midterm Exams (Requires Knowledge 3)', isMissable: true },
        { id: 'may_q1', text: '5/11 Exam: "Yoshitsune" -> "Yoritomo" -> "Yoritomo won" -> "The weak"', isMissable: true },
        { id: 'may_q2', text: '5/12 Exam: "Cognition" -> "Both"', isMissable: true },
        { id: 'may_q3', text: '5/13 Exam: "The Devil\'s Dictionary" -> "Femme Fatale"', isMissable: true },
        { id: 'may_q4', text: '5/16 Answer: "The placebo effect" (+1 Knowledge)', isMissable: true },
        { id: 'may_q5', text: '5/19 Answer: "Hokusai Katsushika" (+1 Knowledge)', isMissable: true },
        { id: 'may_q6', text: '5/21 Answer: "1:1.414" (+1 Knowledge)', isMissable: true },
        { id: 'may_q7', text: '5/23 Answer: "Together" -> "Senses" -> "Senses coming together" (+1 Knowledge)', isMissable: true },
        { id: 'may_q8', text: '5/26 Answer: "Arthur Conan Doyle" (+1 Knowledge)', isMissable: true },
        { id: 'may_q9', text: '5/31 Answer: "John Silver" (+1 Knowledge)', isMissable: true }
      ]
    },
    {
      id: 'june',
      name: 'June',
      palace: 'Bank of Gluttony (Kaneshiro)',
      tasks: [
        { id: 'may_pal_dead', text: 'DEADLINE: Secure Route (Madarame) by 6/4', isMissable: true },
        { id: 'jun_pal_strat', text: 'Strategy: Secure Route (Kaneshiro) ASAP', isMissable: true },
        { id: 'jun_fortune', text: '6/21: Unlock Fortune (Chihaya) - Need 100k Yen (CRITICAL)' },
        { id: 'jun_justice', text: '6/10: Justice (Akechi) Unlocks (Night, Kichijoji)' },
        { id: 'jun_priestess', text: '6/24: Priestess (Makoto) Unlocks' },
        { id: 'jun_star', text: '6/25: Star (Hifumi) Unlocks' },
        { id: 'jun_darts', text: 'Activity: Play Darts to reach Baton Pass Rank 3', isMissable: true },
        { id: 'jun_q1', text: '6/4 Answer: "The halo effect" (+1 Knowledge)', isMissable: true },
        { id: 'jun_q2', text: '6/8 Answer: "Controlling public thought" (+1 Knowledge)', isMissable: true },
        { id: 'jun_q3', text: '6/13 Answer: "Green" (+1 Knowledge)', isMissable: true },
        { id: 'jun_q4', text: '6/15 Answer: "Coins" (+1 Knowledge)', isMissable: true },
        { id: 'jun_q5', text: '6/20 Answer: "Smartphone" (+1 Knowledge)', isMissable: true },
        { id: 'jun_q6', text: '6/23 Answer: "A pope" (+1 Knowledge)', isMissable: true },
        { id: 'jun_q7', text: '6/27 Answer: "Dogs" (+1 Knowledge)', isMissable: true },
        { id: 'jun_q8', text: '6/29 Answer: "Gold" (+1 Knowledge)', isMissable: true }
      ]
    },
    {
      id: 'july',
      name: 'July',
      palace: 'Pyramid (Futaba)',
      tasks: [
        { id: 'jun_pal_dead', text: 'DEADLINE: Secure Route (Kaneshiro) by 7/9', isMissable: true },
        { id: 'july_exams', text: '7/13-7/15: Finals (Requires Knowledge 4/5)', isMissable: true },
        { id: 'july_kawakami_10', text: 'CRITICAL: Reach Kawakami Rank 10 before 7/24', isMissable: true },
        { id: 'july_speed_reading', text: '7/25: Go to Jinbocho Bookstore for Speed Reading', isMissable: true },
        { id: 'pal4_start', text: 'Strategy: Begin Futaba Palace Infiltration', isMissable: true },
        { id: 'j1', text: 'Borrow "Speed Reading" from Shujin Library (7/1)', isMissable: true },
        { id: 'j2', text: '7/11: Trader Sakai: Trade Soothing Soba for Koedo Sword', isMissable: true },
        { id: 'j3', text: '7/24: Last day to borrow school books before summer', isMissable: true },
        { id: 'j4', text: '7/26: Trader Sakai: Trade MRE Ration for Factorization Study Method', isMissable: true },
        { id: 'j5', text: 'Mementos: Complete "The Money-grubbing Uncle" (Kawakami Lock)' },
        { id: 'july_q1', text: '7/1 Answer: "Barbarian\'s head" (+1 Knowledge)', isMissable: true },
        { id: 'july_q2', text: '7/4 Answer: "Julius and Augustus" (+1 Knowledge)', isMissable: true },
        { id: 'july_q3', text: '7/7 Answer: "The Milky Way" -> "Soumen noodles" (+1 Knowledge)', isMissable: true },
        { id: 'july_q4', text: '7/9 Answer: "A triangle" (+1 Knowledge)', isMissable: true },
        { id: 'july_q5', text: '7/11 Answer: "Memories that last a long time" (+1 Knowledge)', isMissable: true },
        { id: 'july_q6', text: '7/12 Answer: "180 degrees" -> "Luciferin" -> "Ishikawa Goemon" (+1 Knowledge)', isMissable: true },
        { id: 'july_exam_ans', text: 'Exam: "Nouveau riche" -> "Gentleman-thief" -> "Hideyoshi" -> "Boiled alive"', isMissable: true }
      ]
    },
    {
      id: 'august',
      name: 'August',
      palace: 'Summer Break',
      tasks: [
        { id: 'pal4_secure', text: 'DEADLINE: Secure Route (Futaba) by 8/20', isMissable: true },
        { id: 'pal4_card', text: 'DEADLINE: Send Calling Card (Futaba) by 8/21', isMissable: true },
        { id: 'a1', text: '8/14 Jazz Jin: Matarukaja (Team Offense)', isMissable: true },
        { id: 'a2', text: '8/28 Jazz Jin: Marakukaja (Team Defense)', isMissable: true },
        { id: 'a3', text: 'Strategy: Clear Palace early (Early Aug) to maximize free time', isMissable: true },
        { id: 'aug_stats', text: 'Strategy: Max out Social Stats using Chihaya Luck Reading', isMissable: true },
        { id: 'aug_mementos', text: 'Mementos: Clear piled-up requests (Batch 3-5 at once)' },
        { id: 'aug_unlock_futaba', text: '8/31: Hermit (Futaba) Unlocks (Need Kindness 4)' },
        { id: 'aug_q1', text: '8/3 Crossword: "Island"', isMissable: true },
        { id: 'aug_q2', text: '8/8 Crossword: "Courage"', isMissable: true },
        { id: 'aug_q3', text: '8/17 Crossword: "Sunburn"', isMissable: true },
        { id: 'aug_q4', text: '8/25 Crossword: "Sweltering"', isMissable: true }
      ]
    },
    {
      id: 'september',
      name: 'September',
      palace: 'Spaceport (Okumura)',
      tasks: [
        { id: 'pal5_strat', text: 'Strategy: Secure Route (Okumura) ASAP', isMissable: true },
        { id: 'sep_okumura_fix', text: 'Boss Strategy: If struggling, switch to MERCILESS', isMissable: true },
        { id: 'sep_maruki_5', text: '9/20: Maruki\'s rank lock lifts. Priority 1.' },
        { id: 'sep_unlock_tower', text: '9/4: Tower (Shinya) Unlocks' },
        { id: 's1', text: '9/4 Jazz Jin: Charge (Essential for Phys)', isMissable: true },
        { id: 's2', text: '9/25 Jazz Jin: Concentrate (Essential for Magic)', isMissable: true },
        { id: 's3', text: '9/19: School Trip Dates', isMissable: true },
        { id: 's4', text: 'Unlock Shinya (Tower) via Mementos' },
        { id: 'sep_q1', text: '9/3 Answer: "Prosperity" (+1 Knowledge)', isMissable: true },
        { id: 'sep_q2', text: '9/6 Answer: "Chronostasis" (+1 Knowledge)', isMissable: true },
        { id: 'sep_q3', text: '9/14 Answer: "Loans for collateral" (+1 Knowledge)', isMissable: true },
        { id: 'sep_q4', text: '9/17 Answer: "Cats eating tongues" (+1 Knowledge)', isMissable: true },
        { id: 'sep_q5', text: '9/21 Answer: "Central Europe" (+1 Knowledge)', isMissable: true },
        { id: 'sep_q6', text: '9/24 Answer: "20 white, 12 black" (+1 Knowledge)', isMissable: true }
      ]
    },
    {
      id: 'october',
      name: 'October',
      palace: 'Casino (Sae)',
      tasks: [
        { id: 'pal5_secure', text: 'DEADLINE: Secure Route (Okumura) by 10/10', isMissable: true },
        { id: 'pal5_dead', text: 'DEADLINE: Send Calling Card (Okumura) by 10/11', isMissable: true },
        { id: 'oct_haru_prof', text: '10/31: Empress (Haru) Unlocks (Need Max Proficiency)' },
        { id: 'oct_q1', text: '10/3 Answer: "Stars" (+1 Knowledge)', isMissable: true },
        { id: 'oct_q2', text: '10/6 Answer: "Joseph-Ignace Guillotin" (+1 Knowledge)', isMissable: true },
        { id: 'oct_q3', text: '10/11 Answer: "Bouba" (+1 Knowledge)', isMissable: true },
        { id: 'oct_exams', text: '10/17-10/20: Midterm Exams (Requires Knowledge 5)', isMissable: true },
        { id: 'o1', text: '10/2: Buy "Donut-Worry" from Home Shopping', isMissable: true },
        { id: 'o2', text: 'Exams: 10/17-10/20 (Knowledge 4 Required)', isMissable: true },
        { id: 'o3', text: '10/30: Cultural Festival Events', isMissable: true }
      ]
    },
    {
      id: 'november',
      name: 'November',
      palace: 'The Heist (Niijima)',
      tasks: [
        { id: 'pal6_dead', text: 'DEADLINE: Secure Route (Sae) by 11/17', isMissable: true },
        { id: 'nov_pal_strat', text: 'Strategy: Secure Route (Sae) early to free up social time', isMissable: true },
        { id: 'nov_deadline_maruki', text: '11/17 DEADLINE: Maruki MUST be Rank 9', isMissable: true },
        { id: 'nov_deadline_akechi', text: '11/17 DEADLINE: Akechi MUST be Rank 8', isMissable: true },
        { id: 'nov_deadline_yoshida', text: '11/13 DEADLINE: Yoshida MUST be Rank 10', isMissable: true },
        { id: 'nov_interrogation', text: '11/20 TRAP: Do NOT sell out friends.', isMissable: true },
        { id: 'nov_akechi_choices', text: 'Akechi Choices: Rank 7: "You\'re my rival" | Rank 8: "I accept"', isMissable: true },
        { id: 'n1', text: '11/13: LAST DAY for Yoshida (Sun)', isMissable: true },
        { id: 'n4', text: '11/20: DO NOT sell out your friends', isMissable: true }
      ]
    },
    {
      id: 'december',
      name: 'December',
      palace: 'Cruiser (Shido)',
      tasks: [
        { id: 'pal7_dead', text: 'DEADLINE: Secure Route (Shido) by 12/16', isMissable: true },
        { id: 'dec_pal_strat', text: 'Strategy: Secure Route (Shido) early to minimize late-game stress', isMissable: true },
        { id: 'dec_faith', text: '12/18 DEADLINE: Kasumi MUST be Rank 5', isMissable: true },
        { id: 'dec_mementos', text: '12/24: Clear Mementos Depths entirely' },
        { id: 'dec_akechi', text: 'Post-Shido: Say "I want to keep our promise" to Akechi', isMissable: true },
        { id: 'd1', text: '12/11: Jazz Jin (Debilitate)', isMissable: true },
        { id: 'd2', text: '12/22: Last day for Kasumi (Faith) Rank 5', isMissable: true },
        { id: 'd3', text: '12/24: Christmas Eve Special Date', isMissable: true }
      ]
    },
    {
      id: 'january',
      name: 'January',
      palace: 'Laboratory (Maruki)',
      tasks: [
        { id: 'pal9_dead', text: 'DEADLINE: Secure Route (Maruki) by 2/2', isMissable: true },
        { id: 'jan_pal_strat', text: 'Strategy: Secure Route (Maruki) ASAP to focus on Tier 3 Awakenings', isMissable: true },
        { id: 'jan_awakenings', text: 'Focus: Dedicate afternoons to Tier 3 Personas', isMissable: true },
        { id: 'j1_jan', text: 'Talk to friends for 3rd Tier Personas' },
        { id: 'j2_jan', text: '1/22 Jazz Jin: Ali Dance', isMissable: true },
        { id: 'j3_jan', text: '1/29 Jazz Jin: Arms Master', isMissable: true },
        { id: 'jan_q1', text: '1/11 Answer: "How numerous they are" -> "The Eight Million Gods"', isMissable: true },
        { id: 'jan_q2', text: '1/14 Answer: "Iwate"', isMissable: true }
      ]
    }
  ],
  mementos: [
    {
      id: 'mem0',
      path: 'Path of Qimranut',
      timing: 'May',
      targetLvl: '10-15',
      requests: [
        { id: 'r0', name: 'Beware the Clingy Ex-boyfriend', reward: 'Adhesive Bandage', tip: 'Tutorial mission.' }
      ]
    },
    {
      id: 'mem_a',
      path: 'Path of Aiyatsbus',
      timing: 'May/June',
      targetLvl: '15-25',
      requests: [
        { id: 'ra1', name: 'The Bark and Bite of a Bully', reward: 'Physical Ointment', tip: 'Available 5/9.' },
        { id: 'ra2', name: 'One Who Bullies Bullies', reward: 'Black Frost Unlock', tip: 'Identify at school gate.' },
        { id: 'ra3', name: 'If Cats Disappeared from the City', reward: 'Koma-Inu', tip: 'Identify at Yongen-Jaya.' }
      ]
    },
    {
      id: 'mem_c',
      path: 'Path of Chemdah',
      timing: 'June/July',
      targetLvl: '25-32',
      requests: [
        { id: 'rc1', name: 'Part-time Job, Full-time Hell', reward: 'Chinese Sweets', tip: 'Unlocks at Moon Rank 4.' },
        { id: 'rc2', name: 'Phantom Thieves VS Burglary Ring', reward: 'Miracle Punch', tip: 'Available 6/18.' },
        { id: 'rc3', name: 'Sadism Is Just a Sign of Love', reward: 'Chemdah Area 7', tip: 'Available 6/6.' }
      ]
    },
    {
      id: 'mem1',
      path: 'Path of Akzeriyyuth',
      timing: 'July/August',
      targetLvl: '32-35',
      requests: [
        { id: 'r1', name: 'The Money-grubbing Uncle', reward: 'Kawakami Lock Clear', tip: 'Essential to finish Temperance.' },
        { id: 'r2', name: 'Who’s Been Assaulting People?', reward: 'Sticky Paste', tip: 'Target is on middle floors.' }
      ]
    },
    {
      id: 'mem2',
      path: 'Path of Adyeshach',
      timing: 'September/October',
      targetLvl: '42-45',
      requests: [
        { id: 'r3', name: 'Winners Don’t Use Cheats', reward: 'Tower Unlock', tip: 'Talk to Shinya in Akihabara after losing.' },
        { id: 'r4', name: 'A Teacher Maid in Hell', reward: 'Kawakami Rank 9', tip: 'Essential story mission for Kawakami.' }
      ]
    },
    {
      id: 'mem3',
      path: 'Path of Sheriruth',
      timing: 'November/December',
      targetLvl: '55-65',
      requests: [
        { id: 'r5', name: 'A Mother’s Aggression', reward: 'Futaba Lock Clear', tip: 'Needed for Hermit progression.' },
        { id: 'r6', name: 'The Killer Who Cleans Up', reward: 'High-end Armor', tip: 'Target is in the deep areas.' }
      ]
    },
    {
      id: 'mem4',
      path: 'Path of Da\'at',
      timing: 'January (Royal)',
      targetLvl: '85-99',
      requests: [
        { id: 'r7', name: 'Ending the Nightmare', reward: 'Ultimate Gear', tip: '3rd Semester exclusive mission.' }
      ]
    }
  ],
  palaces: [
    {
      id: 'pal_kamo',
      name: 'Castle of Lust (Kamoshida)',
      lvl: '10-12',
      threat: 'Captain Kidd (Phys/Elec)',
      seeds: [
        { id: 'pks1', name: 'Red Lust Seed', text: 'East Building Annex. Mona will guide you.' },
        { id: 'pks2', name: 'Green Lust Seed', text: 'Castle Roof tower. Grapple through first window.' },
        { id: 'pks3', name: 'Blue Lust Seed', text: 'Secret room elevator. Pull lever behind painting.' }
      ],
      personas: [
        { id: 'pkp1', name: 'Berith', text: 'Resistance to Phys is vital.' },
        { id: 'pkp2', name: 'Agathion', text: 'Early source of Elec for weaknesses.' }
      ],
      tips: 'Abuse cover to ambush. Use physical skills to save SP.',
      monthId: 'april'
    },
    {
      id: 'pal_mada',
      name: 'Museum of Vanity (Madarame)',
      lvl: '18-20',
      threat: 'Elemental Clones',
      seeds: [
        { id: 'pms1', name: 'Red Vanity Seed', text: 'Museum 2F. Grapple to central rafter walkway.' },
        { id: 'pms2', name: 'Green Vanity Seed', text: 'Treasure Hall Gallery. Grapple up to press button.' },
        { id: 'pms3', name: 'Blue Vanity Seed', text: 'Museum Main Hall. Enter vent in right hallway to reach balcony.' }
      ],
      personas: [
        { id: 'pmp1', name: 'Jack Frost', text: 'Mabufu for clones.' },
        { id: 'pmp2', name: 'Matador', text: 'Magaru for clones.' }
      ],
      tips: 'Bring all 4 basic elements. The boss is an elemental DPS check.',
      monthId: 'may'
    },
    {
      id: 'pal_kane',
      name: 'Bank of Gluttony (Kaneshiro)',
      lvl: '25-28',
      threat: 'Piggytron (Phys/Gimmick)',
      deadlineMonth: 'july',
      seeds: [
        { id: 'pks1_k', name: 'Red Gluttony Seed', text: 'Bankers Passageway. Grapple point near vault.' },
        { id: 'pks2_k', name: 'Green Gluttony Seed', text: 'Laundering Office. Crawl space near money room.' },
        { id: 'pks3_k', name: 'Blue Gluttony Seed', text: 'Lock room puzzle. Mini-boss weak to Ice.' }
      ],
      personas: [
        { id: 'pkp1_k', name: 'White Rider', text: 'Triple Down is extremely powerful.' },
        { id: 'pkp2_k', name: 'Take-Minakata', text: 'Resists Elec/Phys.' }
      ],
      tips: 'Throw expensive items at Piggytron to stall its ultimate attack.',
      monthId: 'june'
    },
    {
      id: 'pal1',
      name: 'Pyramid (Futaba)',
      lvl: '34-36',
      threat: 'Anubis (Bless/Curse)',
      deadlineMonth: 'august',
      seeds: [
        { id: 'p1s1', name: 'Red Will Seed', text: 'Chamber of Rejection. Jump on sarcophagi near chest to find hidden path.' },
        { id: 'p1s2', name: 'Green Will Seed', text: 'Chamber of Guilt. After solving the hologram puzzle, go through the red door.' },
        { id: 'p1s3', name: 'Blue Will Seed', text: 'Chamber of Sanctuary. On floating platforms, grapple up to a statue.' }
      ],
      personas: [
        { id: 'p1p1', name: 'Isis', text: 'Nulls Bless/Curse from Anubis.' },
        { id: 'p1p2', name: 'Thoth', text: 'Early source of Nuclear damage.' }
      ],
      tips: 'Cure Despair immediately. If it lasts 3 turns, you die instantly.',
      monthId: 'july'
    },
    {
      id: 'pal2',
      name: 'Spaceport (Okumura)',
      lvl: '43-45',
      threat: 'Green Robots (DPS Race)',
      deadlineMonth: 'october',
      seeds: [
        { id: 'p2s1', name: 'Red Will Seed', text: 'Facility Area. Vent in circular hall near start.' },
        { id: 'p2s2', name: 'Green Will Seed', text: 'Export Line. Grapple to moving cargo tops.' },
        { id: 'p2s3', name: 'Blue Will Seed', text: 'Transfer Line. Guarded by mini-boss in airlock maze.' }
      ],
      personas: [
        { id: 'p2p1', name: 'Girimehkala', text: 'REPEL PHYSICAL. Makes the boss mobs much easier.' }
      ],
      tips: 'SWITCH TO MERCILESS. Weakness damage becomes 3x. Use items for Baton Passes.',
      monthId: 'september'
    },
    {
      id: 'pal3',
      name: 'Casino (Sae)',
      lvl: '52-54',
      threat: 'Shadow Sae (Gimmicks)',
      deadlineMonth: 'november',
      seeds: [
        { id: 'p3s1', name: 'Red Will Seed', text: 'Staff Area. Near first security room behind crates.' },
        { id: 'p3s2', name: 'Green Will Seed', text: 'Slot Room. High grapple above giant slot machine.' },
        { id: 'p3s3', name: 'Blue Will Seed', text: 'High Limit Area. Behind column on far right of entrance stairs.' }
      ],
      personas: [
        { id: 'p3p1', name: 'Rangda', text: 'Repel Phys/Gun. Makes the arena matches trivial.' }
      ],
      tips: 'Do not attack during roulette spin. If you lose, she drains HP/SP.',
      monthId: 'october'
    },
    {
      id: 'pal4',
      name: 'Cruiser (Shido)',
      lvl: '63-65',
      threat: 'Gauntlet of Bosses',
      deadlineMonth: 'december',
      seeds: [
        { id: 'p4s1', name: 'Red Will Seed', text: 'Mid-Starboard Hallway. Grapple from chandelier to a vent.' },
        { id: 'p4s2', name: 'Green Will Seed', text: 'Lower Port Hallway. In the mouse puzzle room, use a small vent.' },
        { id: 'p4s3', name: 'Blue Will Seed', text: 'Side Deck. Climb up the side of the ship and grapple backward.' }
      ],
      personas: [
        { id: 'p4p1', name: 'Trumpeter', text: 'Must have Debilitate to reduce boss stats.' }
      ],
      tips: 'Use the Ring of Pride for free Charge. Debilitate the boss every 3 turns.',
      monthId: 'november'
    },
    {
      id: 'pal5',
      name: 'Laboratory (Maruki)',
      lvl: '90+',
      threat: 'Final Boss',
      seeds: [
        { id: 'p5s1', name: 'Red Will Seed', text: 'Monitoring. Stairs to bottom floor, then vent near chest.' },
        { id: 'p5s2', name: 'Green Will Seed', text: 'Research Lab. Spiral staircase -> Rafter grapple -> Break cracked window.' },
        { id: 'p5s3', name: 'Blue Will Seed', text: 'Twilight Corridor. Complex floating platform puzzle at end.' }
      ],
      personas: [
        { id: 'p5p1', name: 'Yoshitsune', text: 'Hassou Tobi is the strongest physical move.' },
        { id: 'p5p2', name: 'Maria', text: 'Best healer for endurance fight.' }
      ],
      tips: 'Max Baton Pass required. Break tentacles with elements to reach the boss.',
      monthId: 'january'
    }
  ],
  tips: {
    daily: [
      { text: 'Feed Plant (Room)', note: 'Free Kindness. Use Bio Nutrients from Shibuya/Shinjuku.', icon: 'leaf' },
      { text: 'Crossword (Leblanc)', note: 'Evenings. Free +1 Knowledge. Check table near stairs.', icon: 'book' },
      { text: 'Vending Machines', note: 'Buy SP drinks (Arginade/Water of Rebirth). Restock weekly.', icon: 'zap' },
      { text: 'Matching Persona', note: 'ALWAYS equip a Persona of the same Arcana before hanging out.', icon: 'users' },
      { text: 'Chihaya Affinity', note: 'Use "Affinity Reading" to boost Confidant points without spending time.', icon: 'star' }
    ],
    weekly: [
      { text: 'Sunday Aojiru', note: 'Underground Walkway. Costs 5000 yen. +1 Random Stat (no time spent).', icon: 'coffee' },
      { text: 'Yoshida (Sun)', note: 'Sunday nights ONLY. Station Square. Easy Charm/Money.', icon: 'sun' },
      { text: 'Home Shopping', note: 'Sundays on TV in Leblanc. Unique items/gifts.', icon: 'shopping-bag' },
      { text: 'Jazz Jin (Sun)', note: 'Kichijoji. Sunday evening drinks give specific skills to party members.', icon: 'music' }
    ],
    weather: [
      { text: 'Rainy Days', note: 'Study at Diner for extra Knowledge. Bathhouse for Charm/Guts.', icon: 'cloud-rain' },
      { text: 'Flu Season', note: 'Nov/Dec. Reaper is NOT affected in Royal. Do not farm him.', icon: 'skull' },
      { text: 'Heat Wave', note: 'Extra charm in Bathhouse.', icon: 'sun' }
    ],
    combat: [
      { text: 'Mementos Farming', note: 'Wait for multiple requests. Use Ryuji Rank 7 Insta-kill on green enemies.', icon: 'car' },
      { text: 'Technical Rank', note: 'Play Billiards in Kichijoji. Rank 4 guarantees knockdown on technicals.', icon: 'target' },
      { text: 'Baton Pass', note: 'Play Darts in Kichijoji. Rank 3 restores SP and boosts damage massively.', icon: 'arrow-up-right' },
      { text: 'SP Adhesives', note: 'Buy from Takemi (Death Rank 5). 7 SP/turn is infinite sustain.', icon: 'battery-charging' }
    ]
  }
};