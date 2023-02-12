export const apps = {
  "Text Editor": {
    link: (file?: string) => `/textEditor/index.html${file ? "?file=" + file : ""}`,
    icon: "/file.png"
  },
  Gmail: {
    link: () => `https://gmail.com`,
    icon: "https://www.youtube.com/s/desktop/5191a190/img/favicon_144x144.png"
  },
  Bird: {
    link: () => `/games/Bird/index.html`,
    icon: "/image/bird.svg"
  },
  "Emoji Match": {
    link: () => `/games/Emoji Match/index.html`,
    icon: "/image/emojiMatch.svg"
  },
  "Europe Takeover": {
    link: () => `/games/Europe Takeover/index.html`,
    icon: "/image/europe.svg"
  },
  "Gold Miner": {
    link: () => `/games/Gold Miner/index.html`,
    icon: "/image/goldMiner.svg"
  },
  "Idle Taco": {
    link: () => `/games/Idle Taco/index.html`,
    icon: "/image/taco.svg"
  },
  "Idle Taco 2": {
    link: () => `/games/Idle Taco 2/index.html`,
    icon: "/image/taco.svg"
  },
  "Pig Farmer": {
    link: () => `/games/Pig Farmer/index.html`,
    icon: "/image/pigFarmer.svg"
  },
  "Taco Clicker": {
    link: () => `/games/Taco Clicker/index.html`,
    icon: "/image/taco.svg"
  }
};
