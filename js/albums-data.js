/**
 * Vinyl Universe - Album Data
 * Collection of classic albums with track information
 */

const albums = [
  {
    id: 1,
    title: "Dark Side of the Moon",
    artist: "Pink Floyd",
    year: 1973,
    coverUrl: "https://upload.wikimedia.org/wikipedia/en/3/3b/Dark_Side_of_the_Moon.png",
    tracks: [
      {
        title: "Speak to Me / Breathe",
        youtubeId: "k_JnCWT-uTY"
      },
      {
        title: "Time",
        youtubeId: "F_VjVqe3KJ0"
      },
      {
        title: "Money",
        youtubeId: "-0kcet4aPpQ"
      }
    ]
  },
  {
    id: 2,
    title: "Rumours",
    artist: "Fleetwood Mac",
    year: 1977,
    coverUrl: "https://upload.wikimedia.org/wikipedia/en/f/fb/FMacRumours.PNG",
    tracks: [
      {
        title: "Go Your Own Way",
        youtubeId: "6ul-cZyuYq4"
      },
      {
        title: "Dreams",
        youtubeId: "mrZRURcb1cM"
      },
      {
        title: "The Chain",
        youtubeId: "kBYHwH1Vb-c"
      }
    ]
  },
  {
    id: 3,
    title: "Thriller",
    artist: "Michael Jackson",
    year: 1982,
    coverUrl: "https://upload.wikimedia.org/wikipedia/en/5/55/Michael_Jackson_-_Thriller.png",
    tracks: [
      {
        title: "Billie Jean",
        youtubeId: "Zi_XLOBDo_Y"
      },
      {
        title: "Beat It",
        youtubeId: "oRdxUFDoQe0"
      },
      {
        title: "Thriller",
        youtubeId: "sOnqjkJTMaA"
      }
    ]
  },
  {
    id: 4,
    title: "Purple Rain",
    artist: "Prince",
    year: 1984,
    coverUrl: "https://upload.wikimedia.org/wikipedia/en/9/9c/Princepurplerain.jpg",
    tracks: [
      {
        title: "Purple Rain",
        youtubeId: "TvnYmWpD_T8"
      },
      {
        title: "When Doves Cry",
        youtubeId: "UG3VcCAlUgE"
      },
      {
        title: "Let's Go Crazy",
        youtubeId: "aXJhDltzYVQ"
      }
    ]
  },
  {
    id: 5,
    title: "Abbey Road",
    artist: "The Beatles",
    year: 1969,
    coverUrl: "https://upload.wikimedia.org/wikipedia/en/4/42/Beatles_-_Abbey_Road.jpg",
    tracks: [
      {
        title: "Come Together",
        youtubeId: "45cYwDMibGo"
      },
      {
        title: "Something",
        youtubeId: "UelDrZ1aFeY"
      },
      {
        title: "Here Comes The Sun",
        youtubeId: "KQetemT1sWc"
      }
    ]
  },
  {
    id: 6,
    title: "Nevermind",
    artist: "Nirvana",
    year: 1991,
    coverUrl: "https://upload.wikimedia.org/wikipedia/en/b/b7/NirvanaNevermindalbumcover.jpg",
    tracks: [
      {
        title: "Smells Like Teen Spirit",
        youtubeId: "hTWKbfoikeg"
      },
      {
        title: "Come As You Are",
        youtubeId: "vabnZ9-ex7o"
      },
      {
        title: "Lithium",
        youtubeId: "pkcJEvMcnEg"
      }
    ]
  },
  {
    id: 7,
    title: "The Chronic",
    artist: "Dr. Dre",
    year: 1992,
    coverUrl: "https://upload.wikimedia.org/wikipedia/en/1/19/Dr.DreTheChronic.jpg",
    tracks: [
      {
        title: "Nuthin' but a 'G' Thang",
        youtubeId: "6xjRdBjmePQ"
      },
      {
        title: "Let Me Ride",
        youtubeId: "S0Sp500ZVI0"
      },
      {
        title: "Dre Day",
        youtubeId: "h4UqMyldS7Q"
      }
    ]
  },
  {
    id: 8,
    title: "Back to Black",
    artist: "Amy Winehouse",
    year: 2006,
    coverUrl: "https://upload.wikimedia.org/wikipedia/en/6/67/Amy_Winehouse_-_Back_to_Black_%28album%29.png",
    tracks: [
      {
        title: "Rehab",
        youtubeId: "KUmZp8pR1uc"
      },
      {
        title: "Back to Black",
        youtubeId: "TJAfLE39ZZ8"
      },
      {
        title: "You Know I'm No Good",
        youtubeId: "b-I2s5zRbHg"
      }
    ]
  },
  {
    id: 9,
    title: "Random Access Memories",
    artist: "Daft Punk",
    year: 2013,
    coverUrl: "https://upload.wikimedia.org/wikipedia/en/a/a7/Random_Access_Memories.jpg",
    tracks: [
      {
        title: "Get Lucky",
        youtubeId: "5NV6Rdv1a3I"
      },
      {
        title: "Instant Crush",
        youtubeId: "a5uQMwRMHcs"
      },
      {
        title: "Lose Yourself to Dance",
        youtubeId: "NF-kLy44Hls"
      }
    ]
  },
  {
    id: 10,
    title: "Kind of Blue",
    artist: "Miles Davis",
    year: 1959,
    coverUrl: "https://upload.wikimedia.org/wikipedia/en/9/9c/MilesDavisKindofBlue.jpg",
    tracks: [
      {
        title: "So What",
        youtubeId: "ylXk1LBvIqU"
      },
      {
        title: "Blue in Green",
        youtubeId: "TLDflhhdPCg"
      },
      {
        title: "All Blues",
        youtubeId: "-488UORrfJ0"
      }
    ]
  },
  {
    id: 11,
    title: "OK Computer",
    artist: "Radiohead",
    year: 1997,
    coverUrl: "https://upload.wikimedia.org/wikipedia/en/b/ba/Radioheadokcomputer.png",
    tracks: [
      {
        title: "Paranoid Android",
        youtubeId: "fHiGbolFFGw"
      },
      {
        title: "Karma Police",
        youtubeId: "1uYWYWPc9HU"
      },
      {
        title: "No Surprises",
        youtubeId: "u5CVsCnxyXg"
      }
    ]
  },
  {
    id: 12,
    title: "To Pimp a Butterfly",
    artist: "Kendrick Lamar",
    year: 2015,
    coverUrl: "https://upload.wikimedia.org/wikipedia/en/f/f6/Kendrick_Lamar_-_To_Pimp_a_Butterfly.png",
    tracks: [
      {
        title: "Alright",
        youtubeId: "Z-48u_uWMHY"
      },
      {
        title: "King Kunta",
        youtubeId: "hRK7PVJFbS8"
      },
      {
        title: "Wesley's Theory",
        youtubeId: "s0QtSPl8cf0"
      }
    ]
  },
  {
    id: 13,
    title: "Led Zeppelin IV",
    artist: "Led Zeppelin",
    year: 1971,
    coverUrl: "https://upload.wikimedia.org/wikipedia/en/2/26/Led_Zeppelin_-_Led_Zeppelin_IV.jpg",
    tracks: [
      {
        title: "Stairway to Heaven",
        youtubeId: "QkF3oxziUI4"
      },
      {
        title: "Black Dog",
        youtubeId: "yBuub4Xe1mw"
      },
      {
        title: "Rock and Roll",
        youtubeId: "lncr2g9XJHU"
      }
    ]
  },
  {
    id: 14,
    title: "Blue",
    artist: "Joni Mitchell",
    year: 1971,
    coverUrl: "https://upload.wikimedia.org/wikipedia/en/e/e1/Bluealbumcover.jpg",
    tracks: [
      {
        title: "River",
        youtubeId: "3NH-ctddY9o"
      },
      {
        title: "A Case of You",
        youtubeId: "0YuaZcylk_o"
      },
      {
        title: "California",
        youtubeId: "Lm39YkGrHDg"
      }
    ]
  },
  {
    id: 15,
    title: "What's Going On",
    artist: "Marvin Gaye",
    year: 1971,
    coverUrl: "https://upload.wikimedia.org/wikipedia/en/0/0f/Marvin-gaye-whats-going-on.jpg",
    tracks: [
      {
        title: "What's Going On",
        youtubeId: "o5TmORitlKk"
      },
      {
        title: "Mercy Mercy Me (The Ecology)",
        youtubeId: "G5xpBCCJ3MM"
      },
      {
        title: "Inner City Blues (Make Me Wanna Holler)",
        youtubeId: "57Ykv1D0qEE"
      }
    ]
  },
  {
    id: 16,
    title: "Discovery",
    artist: "Daft Punk",
    year: 2001,
    coverUrl: "https://upload.wikimedia.org/wikipedia/en/2/27/Daft_Punk_-_Discovery.png",
    tracks: [
      {
        title: "One More Time",
        youtubeId: "FGBhQbmPwH8"
      },
      {
        title: "Harder Better Faster Stronger",
        youtubeId: "gAjR4_CbPpQ"
      },
      {
        title: "Digital Love",
        youtubeId: "4whD6uAryMs"
      }
    ]
  },
  {
    id: 17,
    title: "In Rainbows",
    artist: "Radiohead",
    year: 2007,
    coverUrl: "https://upload.wikimedia.org/wikipedia/en/1/14/Inrainbowscover.png",
    tracks: [
      {
        title: "15 Step",
        youtubeId: "WedRDYmtvX4"
      },
      {
        title: "Nude",
        youtubeId: "BbWBRnDK_AE"
      },
      {
        title: "Weird Fishes/Arpeggi",
        youtubeId: "V_Ydoe4Q-Gg"
      }
    ]
  },
  {
    id: 18,
    title: "Blonde",
    artist: "Frank Ocean",
    year: 2016,
    coverUrl: "https://upload.wikimedia.org/wikipedia/en/a/a0/Blonde_-_Frank_Ocean.jpeg",
    tracks: [
      {
        title: "Nikes",
        youtubeId: "diIFhc_Kzng"
      },
      {
        title: "Pink + White",
        youtubeId: "uzS3WG6__G4"
      },
      {
        title: "Self Control",
        youtubeId: "BME88lS6aVQ"
      }
    ]
  }
];