export const CONFIDANT_INTERACTIONS = {
  'Fool': {
    bestGifts: [],
    tips: "Automatic progression. No action required.",
    ranks: { 1: "Automatic", 2: "Automatic", 3: "Automatic", 4: "Automatic", 5: "Automatic", 6: "Automatic", 7: "Automatic", 8: "Automatic", 9: "Automatic", 10: "Automatic" }
  },
  'Magician': {
    bestGifts: [],
    tips: "Automatic progression. No action required.",
    ranks: { 1: "Automatic", 2: "Automatic", 3: "Automatic", 4: "Automatic", 5: "Automatic", 6: "Automatic", 7: "Automatic", 8: "Automatic", 9: "Automatic", 10: "Automatic" }
  },
  'Priestess': {
    bestGifts: ["Book Cover (Shibuya)", "Classical Hits (Shibuya)", "Heart Ring (Shibuya)", "Motorbike Figure (Akihabara)"],
    tips: "Requires Knowledge 3 to start. Charm 5 needed for Rank 6.",
    ranks: {
      2: ["1: 'You're very serious.'", "2: 'I can help.'"],
      3: ["1: 'You have very broad interests.'", "2: 'That sounds difficult.'"],
      4: ["1: 'That's not true.'", "2: 'I agree.'"],
      5: ["1: 'He sounds like a jerk.'", "2: 'Why is that?'"],
      6: ["1: 'Love is a complicated thing.'", "2: 'I can imagine.'"],
      7: ["1: 'That's a good idea.'", "2: 'He's not a bad person.'"],
      8: ["1: 'He's just worried about you.'", "2: 'That's admirable.'"],
      9: [
        "1: 'That's a good decision.'",
        "2: 'I'll be your study partner.' (FRIENDSHIP) OR 'I love you.' (ROMANCE)"
      ],
      10: ["Final event."]
    }
  },
  'Empress': {
    bestGifts: ["Flower Basket (Shinjuku)", "Glass Vase (Shibuya)", "Heart Muffler (Shibuya)"],
    tips: "Starts 10/31. Requires Proficiency 5 for Rank 2.",
    ranks: {
      2: ["1: 'Are you opening a café?'", "2: 'That's a noble goal.'"],
      3: ["1: 'I'm impressed.'", "2: 'It sounds difficult.'"],
      4: ["1: 'That's wonderful.'", "2: 'I'm happy for you.'"],
      5: ["1: 'You're so hard-working.'", "2: 'I'll help you.'"],
      6: ["1: 'That's fascinating.'", "2: 'You're so studious.'"],
      7: ["1: 'That's a good point.'", "2: 'I agree.'"],
      8: ["1: 'You're very brave.'", "2: 'I'll support you.'"],
      9: ["1: 'I want to see you succeed.'", "2: 'I like you too, Haru.' (ROMANCE)"],
      10: ["Final event."]
    }
  },
  'Emperor': {
    bestGifts: ["Silver Bangle (Shinjuku)", "Classical Hits (Shibuya)", "Uji Matcha (Shibuya)"],
    tips: "Proficiency 4 needed for Rank 6.",
    ranks: {
      2: ["1: 'It's novel.' OR 'It's enigmatic.'", "2: 'I can't wait.'"],
      3: ["1: 'Don't let it bother you.'", "3: 'This isn't like you.'"],
      4: ["1: 'Why are we in a boat?'", "2: 'Love comes in all forms.'"],
      5: ["1: 'Do you want me to strip?'", "2: 'I'm sure you will.'"],
      6: ["1: 'It feels nostalgic.'", "4: 'Maybe he was sympathetic.'"],
      7: ["1: 'What do you mean?'", "2: 'The truth is within you.'"],
      8: ["1: 'It has to be Ann.'", "2: 'You've really grown, Yusuke.'"],
      9: ["1: 'Her love for her son.'", "2: 'You've really changed, Yusuke.'"],
      10: ["3: 'He was a good father.'"]
    }
  },
  'Hierophant': {
    bestGifts: ["Fountain Pen (Shinjuku)", "Cigar Cutter (Shibuya)", "Electric Toothbrush (Akihabara)"],
    tips: "Gated at Rank 4 until 8/21. Kindness 5 for Rank 7.",
    ranks: {
      2: ["1: 'Making coffee.'", "2: 'That guy seemed suspicious.'"],
      3: ["1: 'Medium-fine.'", "2: 'Is he a frequent customer?'"],
      4: ["1: 'Tell me more.'", "2: 'Call me next time.'"],
      5: ["1: 'It's rewarding.'", "3: 'I agree.'"],
      6: ["1: 'To each his own.'", "3: 'Shut it.'"],
      7: ["1: 'You might be right.'", "2: 'I'm with you.'"],
      8: ["1: 'Something with curry.'", "2: 'I was just protecting Futaba.'"],
      9: ["1: 'It's great.'", "2: 'You have a great daughter.'"],
      10: ["Final event."]
    }
  },
  'Lovers': {
    bestGifts: ["Heart Muffler (Shibuya)", "Heart Ring (Shibuya)", "Uji Matcha (Shibuya)", "Rose Bouquet (Shibuya)"],
    tips: "Kindness 2 needed to start.",
    ranks: {
      2: ["1: 'She's so strong.'", "2: 'You might be right.'"],
      3: ["1: 'Can we stop?'", "2: 'Has that happened to you?'"],
      4: ["1: 'I know what you mean.'", "2: 'That's hilarious.'"],
      5: ["1: 'Give it up.'", "2: 'She's amazing, huh...'"],
      6: ["1: 'It looks good on you.'", "2: 'Show her your strength.'"],
      7: ["1: 'She admires you.'", "2: 'Go get 'em, tiger.'"],
      8: ["1: 'You have some great ideas.'", "2: 'Good luck with that.'"],
      9: [
        "1: 'You have the others.' (FRIENDSHIP)",
        "2: 'You have me.' (ROMANCE)"
      ],
      10: ["Final event."]
    }
  },
  'Chariot': {
    bestGifts: ["Protein Powder (Shibuya)", "Sporty Watch (Shibuya)", "Smartphone Case (Shibuya)"],
    tips: "Rank 7 Insta-kill is the most important grinding skill.",
    ranks: {
      2: ["1: 'I'm counting on you.'", "2: 'You seem pretty excited.'"],
      3: ["1: 'Let's not fight.'", "2: 'Calm down, Ryuji.'"],
      4: ["1: 'Are you worried about him?'", "2: 'But you're doing great.'"],
      5: ["1: 'Protein powder?'", "2: 'You seem conflicted.'"],
      6: ["1: 'We can train at my place.'", "2: 'You guys should trust Nakaoka.'"],
      7: ["1: 'Let's talk to Takeishi.'", "2: 'I think it's cool, Ryuji.'"],
      8: ["1: 'All I did was watch.'", "2: 'You weren't cool though.'"],
      9: ["1: 'Are you satisfied now?'", "2: 'Don't do it.'"],
      10: ["Final event."]
    }
  },
  'Hermit': {
    bestGifts: ["Motorbike Figure (Akihabara)", "Local Mascot (Akihabara)", "Uji Matcha (Shibuya)"],
    tips: "Starts 8/31. Kindness 4 needed to start.",
    ranks: {
      2: ["1: 'That's a great idea.'", "2: 'I'll help you.'"],
      3: ["1: 'I was about to come find you.'", "2: 'Good to see you again.'"],
      4: ["1: 'Let's do this together.'", "2: 'I think it's cute.'"],
      5: ["1: 'I think you're right.'", "2: 'He's the protagonist.'"],
      6: ["1: 'That must have been a shock.'", "2: 'You're extremely talented.'"],
      7: ["1: 'You didn't do anything wrong.'", "2: 'We'll protect you.'"],
      8: ["1: 'That's incredible.'", "2: 'You worked really hard.'"],
      9: [
        "1: 'You've really grown.'",
        "2: 'I love you.' (ROMANCE) OR 'We'll be teammates forever.' (FRIENDSHIP)"
      ],
      10: ["Final event."]
    }
  },
  'Hanged': {
    bestGifts: ["Cigar Cutter (Shibuya)", "Smartphone Case (Shibuya)", "Silver Bangle (Shinjuku)"],
    tips: "Guts 4 needed to start; Guts 5 for Rank 8.",
    ranks: {
      2: ["1: 'Maybe I should call him.'", "3: 'You seem sick.'"],
      3: ["1: 'I always knew you were a thug.'", "3: 'We made a deal, didn't we?'"],
      4: ["2: 'Where's my reward?'", "3: 'I agree.'"],
      5: ["2: 'You're pathetic.'", "3: 'I'll stick around for the guns.'"],
      6: ["3: 'Girls?'", "4: 'You should buy us something.'"],
      7: ["1: 'Absolutely.'", "2: 'He's clever.'"],
      8: ["1: 'I did it for the guns.'", "2: 'I want to help you.'"],
      9: ["1: 'Are you sure he's alive?'", "2: 'Tell him the truth.'"],
      10: ["1: 'It's up to you now, Iwai.'", "2: 'Kaoru won't lose.'"]
    }
  },
  'Devil': {
    bestGifts: ["Black Mug (Shinjuku)", "Classical Hits (Shibuya)", "Fountain Pen (Shinjuku)"],
    tips: "Charm 3 needed to start. Reduces Palace security.",
    ranks: {
      2: ["1: 'Mishima might…'", "2: 'It's for the article.'"],
      3: ["1: 'You shouldn't make assumptions.'", "2: 'She was falsely accused?'"],
      4: ["1: 'Of course we are.' (ROMANCE implied)", "2: 'Leave it to me.'"],
      5: ["1: 'That's unforgivable.'", "2: 'I don't mind.'"],
      6: ["1: 'That's the spirit.'", "2: 'You're a great journalist.'"],
      7: ["1: 'Don't let him provoke you.'", "2: 'You're charming as you are.'"],
      8: ["1: 'That's the spirit.'", "2: 'I'll help you look for him.'"],
      9: ["1: 'You're not giving up, are you?'", "2: 'I can't leave you alone.' (ROMANCE)"],
      10: ["Final event."]
    }
  },
  'Tower': {
    bestGifts: ["Local Mascot (Akihabara)", "Motorbike Figure (Akihabara)", "Smartphone Case (Shibuya)"],
    tips: "Starts 9/4. Kindness 3 needed.",
    ranks: {
      2: ["1: 'Don't compare me to him.'", "2: 'Do you admire them?'"],
      3: ["1: 'That's the spirit.'", "2: 'You're really mature.'"],
      4: ["1: 'Yeah, you tell him!'", "2: 'Get your revenge.'"],
      5: ["1: 'It was pretty weird.'", "2: 'I'm sure you can do it.'"],
      6: ["1: 'I believe in you.'", "2: 'Not at all.'"],
      7: ["1: 'I don't think so.'", "2: 'You just need to practice.'"],
      8: ["1: 'No, she's not.'", "2: 'Believe in them.'"],
      9: ["1: 'I'm glad to hear that.'", "2: 'It means you've matured.'"],
      10: ["Final event."]
    }
  },
  'Star': {
    bestGifts: ["Book Cover (Shibuya)", "Classical Hits (Shibuya)", "Uji Matcha (Shibuya)"],
    tips: "Charm 3 to start; Knowledge 5 for Rank 8.",
    ranks: {
      2: ["1: 'That's interesting.'", "2: 'But you don't want to, right?'"],
      3: ["1: 'Describes you perfectly.'", "2: 'Having a difficult time?'"],
      4: ["1: 'Must be the Shogi.'", "2: 'They're cool.'"],
      5: ["1: 'She's scary.'", "2: 'You should stop then.'"],
      6: ["1: 'Is that frustrating?'", "2: 'Do what you love.'"],
      7: ["1: 'It may come down to luck.'", "2: 'I believe in you.'"],
      8: ["1: 'That won't work.'", "2: 'I support it.'"],
      9: ["1: 'Give it your all.'", "2: 'I want to stay by your side.' (ROMANCE)"],
      10: ["Final event."]
    }
  },
  'Moon': {
    bestGifts: [],
    tips: "Ranks up via Mementos requests. Just complete the missions he gives you.",
    ranks: { 
      1: "Automatic", 
      2: "1: 'You're just gonna take that?' | 2: 'Believe in yourself.'",
      3: "1: 'You're really hyped.' | 2: 'It's all thanks to you.'", 
      4: "1: 'It makes me feel safe.' | 2: 'I'm counting on you.'",
      5: "1: 'That's a good idea.' | 2: 'You're doing great.'",
      6: "1: 'You're absolutely right.' | 2: 'I'm impressed.'",
      7: "1: 'Maybe you should change.' | 2: 'You're the protagonist.'",
      8: "1: 'You're really dedicated.' | 2: 'Don't worry about it.'",
      9: "1: 'You've really grown.' | 2: 'I'm proud of you.'",
      10: "Final Request" 
    }
  },
  'Sun': {
    bestGifts: ["Fountain Pen (Shinjuku)", "Electric Toothbrush (Akihabara)", "Smartphone Case (Shibuya)"],
    tips: "Sunday nights ONLY. Deadline 11/13. Best for early money grinding.",
    ranks: {
      2: ["1: 'I want to help.'", "2: 'I'm interested.'"],
      3: ["1: 'I'll do my best.'", "2: 'That sounds like fun.'"],
      4: ["1: 'I agree.'", "2: 'That's interesting.'"],
      5: ["1: 'I'm impressed.'", "2: 'I see.'"],
      6: ["1: 'I'll think about it.'", "2: 'I'm sure you will.'"],
      7: ["1: 'That's not true.'", "2: 'I'm surprised.'"],
      8: ["1: 'I'll do my best.'", "2: 'I'm happy to help.'"],
      9: ["1: 'I'll keep that in mind.'", "2: 'I'm sure you will.'"],
      10: ["Final event."]
    }
  },
  'Faith': {
    bestGifts: ["Heart Muffler (Shibuya)", "Glass Vase (Shibuya)", "Flower Basket (Shinjuku)"],
    tips: "Rank 5 is mandatory for 3rd Semester content. Deadline 12/22.",
    ranks: {
      2: ["1: 'We're just getting started.'", "2: 'I bet you will.'"],
      3: ["1: 'Making bento?'", "2: 'It looks delicious.'"],
      4: ["1: 'You're shopping?'", "2: 'That looks good on you.'"],
      5: ["1: 'It's a surprise.'", "2: 'Go ahead.'"],
      10: ["Automatic in 3rd Semester."]
    }
  },
  'Judgement': {
    bestGifts: [],
    tips: "Automatic progression. No action required.",
    ranks: { 1: "Automatic", 2: "Automatic", 3: "Automatic", 4: "Automatic", 5: "Automatic", 6: "Automatic", 7: "Automatic", 8: "Automatic", 9: "Automatic", 10: "Automatic" }
  },
  'Temperance': {
    bestGifts: ["Hand Wrap (Shibuya)", "Best Seller (Shibuya)", "Idol Poster (Shibuya)", "Star Mirror (Shinjuku)"],
    tips: "Always call her on Friday/Saturday nights. Rank 10 is school-locked (finish before 7/24).",
    ranks: {
      2: ["1: 'It does.'", "2: 'Absolutely not!'", "3: 'I'll request you.'"],
      3: ["1: 'Yeah.'", "2: 'I'll keep that in mind.'"],
      4: ["1: 'How rude.'", "2: 'You need to love yourself.'"],
      5: ["1: 'It's fun.'", "2: 'I want to know more.'"],
      6: ["1: 'Want to rest?'", "2: 'Are you okay?'"],
      7: ["1: 'Don't pay them.'", "2: 'Think about it.'"],
      8: ["1: 'That's wrong.'", "2: 'Is that really what you want?'", "3: 'If that's what you decided.'"],
      9: [
        "1: 'Nonsense.'",
        "2: 'I want to keep seeing you.' (ROMANCE PATH) OR 'Not as a teacher.' (FRIENDSHIP PATH)",
        "3: 'I love you.' (ROMANCE PATH) OR 'I mean as a teacher.' (FRIENDSHIP PATH)"
      ],
      10: ["Automatic if request 'A Teacher Maid in Hell' is cleared."]
    }
  },
  'Fortune': {
    bestGifts: ["Flower Basket (Shinjuku)", "Star Mirror (Shinjuku)", "Local Mascot (Akihabara)"],
    tips: "Rank 5 (Affinity Reading) is the #1 run priority. Unlocks at Rank 5.",
    ranks: {
      2: ["1: 'Suggest she gives up.'", "2: 'I'm not interested.'"],
      3: ["1: 'I'm a believer.'", "2: 'You're so hard-working.'"],
      4: ["1: 'Trust in yourself.'", "2: 'Tell her she's cool.'"],
      5: ["1: 'You're such a hard worker.'", "2: 'I'll come back again.'"],
      6: ["1: 'I'm glad you're safe.'", "2: 'It was all you.'"],
      7: ["1: 'You're not a monster.'", "2: 'It's your hard work.'"],
      8: ["1: 'I know.'", "2: 'I'm here for you.'"],
      9: [
        "1: 'You've really changed.'",
        "2: 'I like you.' (ROMANCE) OR 'You're a great fortune teller.' (FRIENDSHIP)"
      ],
      10: ["Automatic after Mementos mission."]
    }
  },
  'Councillor': {
    bestGifts: ["Mini Cactus (Shibuya)", "Donut-Worry (Home Shopping)", "Best Seller (Shibuya)"],
    tips: "MANDATORY Rank 9 by 11/17 for 3rd Semester. Capped at Rank 5 until 9/20.",
    ranks: {
      2: ["1: 'It's a deal.'", "2: 'That sounds like fun.'"],
      3: ["1: 'So they say.'", "2: 'Of course.'"],
      4: ["1: 'That would be great.'", "3: 'I agree.'"],
      5: ["1: 'This is delicious.'", "3: 'I see.'"],
      6: ["1: 'Another cookie?'", "3: 'I'll do my best.'"],
      7: ["1: 'That's not true.'", "3: 'I'll think about it.'"],
      8: ["1: 'What do you mean?'", "3: 'I'm sure you will.'"],
      9: ["1: 'I'll do my best.'", "2: 'I'm happy to help.'"],
      10: ["Automatic on 11/18 if Rank 9 reached."]
    }
  },
  'Justice': {
    bestGifts: ["High-end Manicure (Shibuya)", "Smartphone Case (Shibuya)", "Silver Bangle (Shinjuku)"],
    tips: "Rank 8 by 11/17 for True Ending content. Ranks 7-8 time-gated to November.",
    ranks: {
      2: ["1: 'You always seem busy.'", "2: 'I'm used to it.'"],
      3: ["1: 'I'll do my best.'", "3: 'I'm not sure.'"],
      4: ["1: 'I'll keep that in mind.'", "2: 'That sounds like fun.'"],
      5: ["1: 'I see.'", "2: 'That's interesting.'"],
      6: ["1: 'I'm not sure.'", "3: 'That's a good idea.'"],
      7: ["1: 'You're my rival.' (CRITICAL)", "2: 'I agree.'"],
      8: ["1: 'I accept.' (CRITICAL)", "2: 'I'll do my best.'"],
      9: ["Automatic progression."],
      10: ["Automatic progression."]
    }
  },
  'Death': {
    bestGifts: ["Mini Cactus (Shibuya)", "Black Mug (Shinjuku)", "Classical Hits (Shibuya)"],
    tips: "Rank 5/7 for SP Adhesives. Rank 7 gives 50% discount.",
    ranks: {
      2: ["1: 'I'll do my best.'", "2: 'I'm fine.'"],
      3: ["1: 'That sounds like fun.'", "2: 'I'm interested.'"],
      4: ["1: 'I agree.'", "2: 'That's interesting.'"],
      5: ["1: 'I'm impressed.'", "2: 'I see.'"],
      6: ["1: 'I'll think about it.'", "2: 'I'm sure you will.'"],
      7: ["1: 'That's not true.'", "2: 'I'm surprised.'"],
      8: ["1: 'I'll do my best.'", "2: 'I'm happy to help.'"],
      9: ["1: 'I like you.'", "2: 'I want to see you.' (ROMANCE START)"],
      10: ["Final event."]
    }
  },
  'Strength': {
    bestGifts: [],
    tips: "Fusion based. Does not consume time. Just bring the required Persona with the required skill.",
    ranks: {
      1: "Jack Frost with Mabufu",
      2: "Ame-no-Uzume with Frei",
      3: "Flauros with Tarukaja",
      4: "Phoenix with Counter",
      5: "Setanta with Rakukaja",
      6: "Dakini with High Counter",
      7: "Pazuzu with Tetraja",
      8: "Hecatoncheires with Masukunda",
      9: "Bugs with Samarearm",
      10: "Seth with High Counter"
    }
  }
};