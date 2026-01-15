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
      2: ["1: 'You're very well informed.'", "2: 'That was dangerous.'"],
      3: ["1: 'You have the wrong idea.'", "2: 'You can change.'"],
      4: ["1: 'That's unlike you.'", "2: 'Why do you use it?'"],
      5: ["1: 'He sounds suspicious.'", "2: 'I got this.'"],
      6: ["1: 'Love comes in many forms.'"],
      7: ["1: 'That's a horrible story.'", "2: 'That's admirable.'"],
      8: ["1: 'He says that to all his girls.'", "2: 'Absolutely.'"],
      9: [
        "1: 'Get away from her!'",
        "2: 'I'm a regular here.' (FRIENDSHIP) OR 'I love you.' (ROMANCE)"
      ],
      10: ["Final event."]
    }
  },
  'Empress': {
    bestGifts: ["Flower Basket (Shinjuku)", "Glass Vase (Shibuya)", "Heart Muffler (Shibuya)"],
    tips: "Starts 10/31. Requires Proficiency 5 for Rank 2.",
    ranks: {
      2: ["1: 'Are you opening a café?'", "2: 'He sounds suspicious.'", "3: 'Moonlight Carrot.'"],
      3: ["1: 'They won't find out.'", "2: 'I don't want to go with you.'", "3: 'Not yet.'"],
      4: ["1: 'That's pricey.'", "2: 'I can't let you do that.'", "3: 'Let's ask him.'"],
      5: ["1: 'Trust no one.'", "2: 'There has to be another way.'"],
      6: ["1: 'That's fascinating'", "2: 'You're so studious.'", "3: 'Can you make some for me?'"],
      7: ["1: 'That sounds really tough…'", "2: 'What do you want to do?'", "3: 'That's the spirit.'"],
      8: ["1: 'The soil?'", "2: 'It'll help him understand you.'", "3: 'He's going to love it.'"],
      9: [
        "1: 'I'm sure you'll do great.'",
        "2: 'Give it all you've got, Haru.'",
        "3: 'I like you too, Haru.' (ROMANCE)"
      ],
      10: ["Final event."]
    }
  },
  'Emperor': {
    bestGifts: ["Silver Bangle (Shinjuku)", "Classical Hits (Shibuya)", "Uji Matcha (Shibuya)"],
    tips: "Proficiency 4 needed for Rank 6.",
    ranks: {
      2: ["1: 'It's novel.'", "2: 'I can't wait.'"],
      3: ["1: 'Don't let it bother you.'", "2: 'This isn't like you.'"],
      4: ["1: 'Why are we in a boat?'", "2: 'Love comes in all forms.'"],
      5: ["1: 'Do you want me to strip?'", "2: 'I'm sure you will.'"],
      6: ["1: 'It feels nostalgic.'", "2: 'Maybe he was sympathetic.'"],
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
      2: ["1: 'Making coffee.'", "2: 'That guy seemed suspicious.'", "3: 'I want the ladies to love me.'"],
      3: ["1: 'Medium-fine.'", "2: 'I'm ready to work.'"],
      4: ["1: 'Tell me more.'", "2: 'Call Sojiro's phone.'"],
      5: ["1: 'I think I'm addicted!'", "2: 'She wasn't normal, huh?'"],
      6: ["1: 'To each his own.'", "2: 'Shut your mouth.'"],
      7: ["1: 'You might be right.'", "2: 'Feel like a real dad now?'"],
      8: ["1: 'Something with curry.'", "2: 'I was just protecting Futaba.'"],
      9: ["1: 'It's great.'", "2: 'You have a great daughter.'", "3: 'You did great.'"],
      10: ["Final event."]
    }
  },
  'Lovers': {
    bestGifts: ["Heart Muffler (Shibuya)", "Heart Ring (Shibuya)", "Uji Matcha (Shibuya)", "Rose Bouquet (Shibuya)"],
    tips: "Kindness 2 needed to start.",
    ranks: {
      2: ["1: 'She's so strong.'", "2: 'You might be right.'"],
      3: ["1: 'Can we stop yet?'"],
      4: ["1: 'I know what you mean.'", "2: 'That's hilarious.'"],
      5: ["1: 'Give it up.'"],
      6: ["1: 'It seems that way.'", "2: 'Show her your own strength.'"],
      7: ["1: 'She admires you.'", "2: 'Go get 'em, tiger.'"],
      8: ["1: 'You have some real guts.'", "2: 'There's no doubt in my mind.'"],
      9: [
        "1: 'Hang in there.'",
        "2: 'I believe in you, Ann.'",
        "3: 'You have me.' (ROMANCE)"
      ],
      10: ["Final event."]
    }
  },
  'Chariot': {
    bestGifts: ["Protein Powder (Shibuya)", "Sporty Watch (Shibuya)", "Smartphone Case (Shibuya)"],
    tips: "Rank 7 Insta-kill is the most important grinding skill.",
    ranks: {
      2: ["1: 'I'm counting on you.'", "2: 'You seem pretty excited.'", "3: 'Do you want to go back?'"],
      3: ["1: 'Let's not fight.'", "2: 'Calm down, Ryuji.'"],
      4: ["1: 'Are you worried about him?'", "2: 'But you're doing great.'"],
      5: ["1: 'Protein powder?'", "2: 'You seem conflicted.'", "3: 'So he's an asshole?'"],
      6: ["1: 'We can train at my place.'", "2: 'You guys should trust Nakaoka.'", "3: 'Absolutely.'"],
      7: ["1: 'Let's talk to Takeishi.'", "2: 'I think it's cool, Ryuji.'"],
      8: ["1: 'Things turned out for the best.'", "2: 'All I did was watch.'", "3: 'You weren't cool though.'"],
      9: ["1: 'Are you satisfied now?'", "2: 'Don't do it.'", "3: 'Congratulations.'"],
      10: ["1: 'I'm looking forward to it.'"]
    }
  },
  'Hermit': {
    bestGifts: ["Motorbike Figure (Akihabara)", "Local Mascot (Akihabara)", "Uji Matcha (Shibuya)"],
    tips: "Starts 8/31. Kindness 4 needed to start.",
    ranks: {
      2: ["1: 'If we work together.'", "2: 'I bet it will.'"],
      3: ["1: 'I was about to come find you.'", "2: 'Good to see you again.'"],
      4: ["1: 'Let's do this together.'", "2: 'I think it's cute.'"],
      5: ["1: 'I think you're right.'", "2: 'He's the protagonist.'"],
      6: ["1: 'That must have been a shock.'", "2: 'You didn't know any better.'"],
      7: ["1: 'I'll do it, for you.'", "2: 'We'll show them the truth.'"],
      8: ["1: 'That's incredible.'", "2: 'You worked really hard too.'"],
      9: [
        "1: 'You've really matured.'",
        "2: 'Are you OK, Futaba?'",
        "3: 'I love you.' (ROMANCE) OR 'We'll be teammates forever.' (FRIENDSHIP)"
      ],
      10: ["Final event."]
    }
  },
  'Hanged': {
    bestGifts: ["Cigar Cutter (Shibuya)", "Smartphone Case (Shibuya)", "Silver Bangle (Shinjuku)"],
    tips: "Guts 4 needed to start; Guts 5 for Rank 8.",
    ranks: {
      2: ["1: 'How's your cold?'", "2: 'Maybe I should call him.'"],
      3: ["1: 'I always knew you were a thug.'", "2: 'We made a deal, didn't we?'"],
      4: ["1: 'Where's my reward.'", "2: 'I agree.'"],
      5: ["1: 'You're pathetic.'", "2: 'I'll stick around for the guns.'"],
      6: ["1: 'Girls.'", "2: 'You should buy us something.'"],
      7: ["1: 'Absolutely.'", "2: 'He's clever.'"],
      8: ["1: 'I guess I could consider it.'", "2: 'If you pay me well.'"],
      9: ["1: 'Are you sure he's alive?'", "2: 'Tell him the truth.'", "3: 'You need to trust your son.'"],
      10: ["1: 'It's up to you now, Iwai.'"]
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
      6: ["1: 'He must not like you.'", "2: 'You should trust in her.'", "3: 'That's the spirit.'"],
      7: ["1: 'Don't let him provoke you.'", "2: 'You're charming as you are.'"],
      8: ["1: 'That's not like you.'", "2: 'I'll help you look for him.'"],
      9: ["1: 'You're not giving up, are you?'", "2: 'I can't leave you alone.' (ROMANCE)"],
      10: ["Final event."]
    }
  },
  'Tower': {
    bestGifts: ["Local Mascot (Akihabara)", "Motorbike Figure (Akihabara)", "Smartphone Case (Shibuya)"],
    tips: "Starts 9/4. Kindness 3 needed.",
    ranks: {
      2: ["1: 'Don't compare me to you.'", "2: 'So do I.'"],
      3: ["1: 'That's the spirit.'"],
      4: ["1: 'Yeah, you tell him!'"],
      5: ["1: 'It was pretty weird.'", "2: 'He must've rigged it.'"],
      6: ["1: 'I believe in you.'"],
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
      3: ["1: 'Describes you perfectly.'"],
      4: ["1: 'I don't mind.'"],
      5: ["1: 'You should stop then.'"],
      6: ["1: 'Is that frustrating?'", "2: 'Do what you love.'"],
      7: ["1: 'It may come down to luck.'", "2: 'I believe in you.'"],
      8: ["1: 'I'm glad her heart changed.'", "2: 'I support it.'"],
      9: ["1: 'Give it all you go.'", "2: 'A very queenly decision.'", "3: 'I want to stay by your side.' (ROMANCE)"],
      10: ["Final event."]
    }
  },
  'Moon': {
    bestGifts: [],
    tips: "Ranks up via Mementos requests. Just complete the missions he gives you.",
    ranks: { 
      1: "Automatic", 
      2: ["1: 'You've done good, kid.'"],
      3: ["1: 'Great idea.'", "2: 'It's not your fault.'"], 
      4: ["1: 'Steak sounds good.'", "2: 'You're amazing.'"],
      5: ["1: 'Is it for me?'", "2: 'That's a good idea.'"],
      6: ["1: 'You sure are fired up…'"],
      7: ["1: 'Maybe the Phan-Site?'", "2: 'You were super cool.'"],
      8: ["1: 'I'm not leaving.'", "2: 'Did you find your answer?'"],
      9: ["1: 'You showed some real courage.'"],
      10: ["Final Request"] 
    }
  },
  'Sun': {
    bestGifts: ["Fountain Pen (Shinjuku)", "Electric Toothbrush (Akihabara)", "Smartphone Case (Shibuya)"],
    tips: "Sunday nights ONLY. Deadline 11/13. Best for early money grinding.",
    ranks: {
      2: ["1: 'I want to improve my speech.'", "2: 'One with conviction.'"],
      3: ["1: 'His message.'", "2: 'His speaking skills.'"],
      4: ["1: 'I couldn't help myself.'", "2: 'Yeah, you tell him!'"],
      5: ["1: 'The media doesn't matter.'", "2: 'I think so.'"],
      6: ["1: 'I'm for them.'", "2: 'I'd decline.'"],
      7: ["1: 'You should decline.'", "2: 'That's a difficult decision.'"],
      8: ["1: 'That's a difficult decision.'", "2: 'Stick to your beliefs.'"],
      9: ["1: 'Do your best.'", "2: 'You had a change of heart.'"],
      10: ["1: 'Your true self was revealed.'"]
    }
  },
  'Faith': {
    bestGifts: ["Heart Muffler (Shibuya)", "Glass Vase (Shibuya)", "Flower Basket (Shinjuku)", "Crimson Lipstick (Underground Mall)"],
    tips: "Rank 5 is mandatory for 3rd Semester content. Deadline 12/22.",
    ranks: {
      2: ["1: 'We're just getting started.'", "2: 'Next time, then.'"],
      3: ["1: 'Making bento?'", "2: 'I'm touched!'", "3: 'Is that all for you?'"],
      4: ["1: 'You're looking to buy?'", "2: 'A pretty modern look.'", "3: 'Of course.'"],
      5: ["1: 'It's a surprise, yea.'", "2: 'Go ahead. I'll watch.'", "3: 'Congratulations.'"],
      6: ["1: 'You have to face it.'"],
      7: ["1: 'You okay?'", "2: 'Of course.'", "3: 'I love a good challenge.'"],
      8: ["1: 'Walk up to Sumire.'", "2: 'I'm here for you.'", "3: 'Sounds like progress.'"],
      9: [
        "1: 'It's no problem.'",
        "2: 'Definitely.'",
        "3: 'Of course I do.'",
        "4: 'I love you too.' (ROMANCE) OR 'Let's stay friends.' (FRIENDSHIP)"
      ],
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
      2: ["1: 'It does.'", "2: 'Absolutely not!'"],
      3: ["1: 'Yeah, they do.'", "2: 'I'll request you more often.'"],
      4: ["1: 'How rude.'", "2: 'You need to love yourself.'"],
      5: ["1: 'It's fun.'", "2: 'I want to know more.'"],
      6: ["1: 'Want to rest a bit?'", "2: 'Are you all right?'"],
      7: ["1: 'Don't pay them.'", "2: 'Think about it.'"],
      8: ["1: 'Is this really what you want?'", "2: 'If that's what you decided.'"],
      9: [
        "1: 'Nonsense.'",
        "2: 'Thank you for your service.'",
        "3: 'I love you.' (ROMANCE PATH) OR 'I mean as a teacher.' (FRIENDSHIP PATH)"
      ],
      10: ["Automatic if request 'A Teacher Maid in Hell' is cleared."]
    }
  },
  'Fortune': {
    bestGifts: ["Flower Basket (Shinjuku)", "Star Mirror (Shinjuku)", "Local Mascot (Akihabara)"],
    tips: "Rank 5 (Affinity Reading) is the #1 run priority. Unlocks at Rank 5.",
    ranks: {
      2: ["1: 'Open your mind to change.'", "2: 'Of course I am.'"],
      3: ["1: 'Go for the money.'", "2: 'She'll be sad if you break it off.'"],
      4: ["1: 'Trust in yourself.'", "2: 'Do you want to test it again?'"],
      5: ["1: 'You're such a hard worker.'", "2: 'What about divine power?'"],
      6: ["1: 'I like fortune-telling.'", "2: 'You're just Chihaya to me.'"],
      7: ["1: 'I don't think so.'", "2: 'You shouldn't have tricked them.'"],
      8: ["1: 'I know.'", "2: 'I'm glad to hear that.'"],
      9: [
        "1: 'Well, fate can be changed.'",
        "2: 'I like having my fortune read.' (FRIENDSHIP) OR 'I want to be with you.' (ROMANCE)"
      ],
      10: ["Automatic after Mementos mission."]
    }
  },
  'Councillor': {
    bestGifts: ["Mini Cactus (Shibuya)", "Donut-Worry (Home Shopping)", "Best Seller (Shibuya)"],
    tips: "MANDATORY Rank 9 by 11/17 for 3rd Semester. Capped at Rank 5 until 9/20.",
    ranks: {
      2: ["1: 'We made a deal.'", "2: 'But it sounds right.'"],
      3: ["1: 'So they have, huh?'", "2: 'Of course.'", "3: 'That one seems necessary.'", "4: 'Did that help?'"],
      4: ["1: 'I know, right...?'", "2: 'Is that what you're researching?'", "3: 'That's a grand plan.'", "4: 'That sounds fun.'"],
      5: ["1: 'This looks great!'", "2: 'You know, you're right.'", "3: 'My senses lied to me!'", "4: 'I guess so.'"],
      6: ["1: 'Another cup?'", "2: 'I can do that.'", "3: 'So give up.'"],
      7: ["1: 'You really are dedicated.'", "2: 'No idea.'", "3: 'The change of heart...?'", "4: 'I have no clue.'"],
      8: ["1: 'What do you mean?'", "2: 'Ooh, really?'", "3: 'Thanks for the food!'", "4: 'We've made a deal.'", "5: 'Congratulations.'", "6: 'I sure do.'"],
      9: ["1: 'Kind of sad...'"],
      10: ["Automatic on 11/18 if Rank 9 reached."]
    }
  },
  'Justice': {
    bestGifts: ["High-end Manicure (Shibuya)", "Smartphone Case (Shibuya)", "Silver Bangle (Shinjuku)"],
    tips: "Rank 8 by 11/17 for True Ending content. Ranks 7-8 time-gated to November.",
    ranks: {
      2: ["1: 'I see a lot of things.'", "2: 'You always seem so busy.'"],
      3: ["1: 'Should've figured.'", "2: 'Wasn't it fun?'"],
      4: ["1: 'Now this is my kind of club.'", "2: 'Any recommendations?'", "3: 'I can use a microwave.'"],
      5: ["1: 'Are you used to gunplay?'", "2: 'I see.'"],
      6: ["1: 'A while, huh?'", "2: 'I'll stay until you're ready.'", "3: 'Same.'", "4: 'I think you're right.'"],
      7: ["1: 'You're my rival.' (CRITICAL)", "2: 'I couldn't let myself lose.'"],
      8: ["1: 'I accept.' (CRITICAL)", "2: 'I definitely won't lose.'"],
      9: ["Automatic progression."],
      10: ["Automatic progression."]
    }
  },
  'Death': {
    bestGifts: ["Mini Cactus (Shibuya)", "Black Mug (Shinjuku)", "Classical Hits (Shibuya)"],
    tips: "Rank 5/7 for SP Adhesives. Rank 7 gives 50% discount.",
    ranks: {
      2: ["1: 'I have a bad heart.'", "2: 'I agree.'", "3: 'I'm totally fine.'"],
      3: ["1: 'I don't mind.'", "2: 'Of course not.'"],
      4: ["1: 'Dr. Takemi will help.'", "2: 'You seem happy.'"],
      5: ["1: 'That's good.'", "2: 'About Miwa-chan?'"],
      6: ["1: 'It suits you.'", "2: 'You can count on me.'"],
      7: ["1: 'This is harassment.'", "2: 'We all do sometimes.'"],
      8: ["1: 'It's for Miwa-chan'", "2: 'I'll be cheering you on.'"],
      9: [
        "1: 'It was rough.'",
        "2: 'It isn't a joke.' (ROMANCE) OR 'It was for my exams.' (FRIENDSHIP)"
      ],
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