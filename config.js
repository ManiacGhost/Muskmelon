// ✏️ EDIT THIS FILE to personalise the website — everything else updates automatically.

const CONFIG = {
  herName: "Muski",            // her name (shown in the big birthday title)
  nickname: "Muski",           // what you call her (used in the letter and ending)
  yourName: "Nikku",           // your name, used to sign the letter
  togetherSince: "2023-06-11", // the date you started dating (YYYY-MM-DD)

  // Optional: put your song in the "music" folder (e.g. music/our-song.mp3).
  // A little music button appears only if the file exists.
  music: "music/our-song.mp3",

  // The surprise video that appears after she blows out the candles.
  // Best: put the file in the "videos" folder (e.g. "videos/surprise.mp4") — it autoplays with sound.
  // Also works: a Google Drive share link (https://drive.google.com/file/d/.../view) set to
  // "Anyone with the link", but Drive doesn't allow autoplay, so she'll have to press play.
  surpriseVideo: "videos/surprise.mp4",

  // "Wherever I am → Delhi" section
  distance: {
    yourCity: "Wherever I am",
    herCity: "Delhi",
    message: [
      "Last year bhi tumhare paas aa gaya tha…",
      "…aur hamesha yahi hoga.",
      "Wherever I am, with whoever I am — you should know, and the world should know…",
      "Nikku toh 23 October ko Muski ke paas hi hoga. 💗",
    ],
  },

  letter: [
    "Happy birthday, my love. 🎂",
    "Do you remember last year? I still came to you on your birthday. People asked me why I'd travel that far for one day. The answer was simple: because it was your day, and you are the most special person in my life. Wherever I am, with whoever I am, I'll always find my way to you — I'd cross any distance a hundred times over just to see you smile when you see me.",
    "But I want you to know something: not a single day goes by without you on my mind. When something funny happens, you're the first person I want to tell. When something goes wrong, your voice is the only thing that fixes it. Every good morning and every good night with you is my favourite part of the day.",
    "Since 11th June 2023, you've made my life softer, happier, and so much more beautiful. You've loved me on my good days and held on to me on my bad ones — even through a phone screen. I don't take that for granted, not even for a second.",
    "No distance, no city and no amount of kilometres will ever keep me away from you on the days that matter. Wherever you are, that's where I want to be. You and me? That's forever.",
    "Until then, I hope you feel how loved you are — today, and every day. You are my favourite person in the whole world, Muski. Happy birthday. ❤️",
  ],

  // Put your pictures inside the "photos" folder and list them here.
  // Missing files show a cute placeholder until you add them.
  photos: [
    // "focus" (optional) picks which part of the photo stays visible in the square polaroid
    { src: "photos/web/concert.jpg", caption: "Cheek to cheek under the lights ✨" },
    { src: "photos/web/riverside.jpg", caption: "Riverside nights with you 🌉", focus: "50% 48%" },
    { src: "photos/web/station.jpg", caption: "Every station leads back to you 🚉" },
    { src: "photos/web/bingecentral.jpg", caption: "Our very London Christmas 🎄", focus: "50% 45%" },
    { src: "photos/web/carf.jpg", caption: "My co-pilot's best pout 😗" },
    { src: "photos/web/bnb.jpg", caption: "Café dates & silly grins ☕", focus: "40% 70%" },
    { src: "photos/web/Clayfigures.jpg", caption: "My little artist & her clay piggy 🐷", focus: "50% 25%" },
    { src: "photos/web/snap1.jpg", caption: "My favourite chapter is us 📚", focus: "50% 42%" },
    { src: "photos/web/snap2.jpg", caption: "Two smiles, one heart 😊", focus: "50% 45%" },  ],

  // "Open when…" letters
  openWhen: [
    { icon: "🥺", title: "you miss me", message: "Close your eyes and remember our last hug. I'm still holding you, Muski — and I'll always find my way back to you. I miss you too, every single minute. Call me, even if it's 3 am. 📞" },
    { icon: "😢", title: "you're sad", message: "Hey. Whatever it is, it's not bigger than you. You're the strongest, sweetest person I know, and I'm right here — always on your side, no matter what. Now go drink some water and send me a selfie 😌" },
    { icon: "🌙", title: "you can't sleep", message: "Look outside at the moon. I've probably looked at it tonight too, thinking about you. Put on our song, cuddle your pillow and pretend it's me. Goodnight, my love. 😴💗" },
    { icon: "😤", title: "you're mad at me", message: "I'm sorry. Really. I'd rather lose an argument than lose a moment with you. Let's fix it — I love you more than I love being right. (Also you look cute when you're angry.)" },
    { icon: "🤍", title: "you doubt yourself", message: "You are smart, beautiful, kind and so much more capable than you think. I see it every single day. I'm so, so proud of you." },
    { icon: "🎁", title: "it's your birthday", message: "That's today! 🎉 Another year of you existing — the best thing that ever happened to me. I hope you smile a lot today. And remember — on your day, I'll always find my way to you. 🎂" },
  ],

  reasons: [
    { front: "💖", back: "Your smile makes my whole day better" },
    { front: "🌸", back: "You're kind to everyone, always" },
    { front: "😂", back: "You laugh at my terrible jokes" },
    { front: "📞", back: "Your voice on a call fixes my worst days" },
    { front: "🌙", back: "Talking to you never gets old" },
    { front: "💞", back: "Wherever I am, you're worth every kilometre" },
    { front: "🏡", back: "You feel like home" },
    { front: "✨", back: "You make me want to be better" },
    { front: "🤞", back: "You never gave up on us, not even once" },
    { front: "🥰", back: "Just... everything about you" },
  ],

  // Stars in the night sky — each one hides a wish or a promise
  stars: [
    "I promise to always pick up your calls, even the 2 am ones.",
    "I wish you a year full of laughter that makes your tummy hurt.",
    "I promise no distance will ever keep me away from you on your birthday.",
    "I wish every dream you've been quietly holding comes true this year.",
    "I promise to love you on your good days and even more on the hard ones.",
    "I wish you peace, good health, and lots of chocolate. 🍫",
    "I promise you'll never have to wonder if I love you.",
    "I wish to celebrate your next birthday right beside you. 🤍",
  ],
};
