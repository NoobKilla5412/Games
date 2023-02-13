export interface App {
  name: string;
  link(file?: string): string;
  icon: string;
  dev?: string;
}

export function installApp(i: number) {
  localStorage.setItem("app:" + i, "true");
  location.reload();
}

export function deleteApp(i: number) {
  if (confirm(`Are you sure you want to delete "${apps[i].name}"?`)) {
    localStorage.setItem("app:" + i, "false");
    location.reload();
  }
}

export function hasApp(i: number): boolean {
  return localStorage.getItem("app:" + i) == "true";
}

export const nativeApps: readonly App[] = [
  {
    name: "App Store",
    link: () => `/apps/App Store/`,
    icon: ""
  }
];

export const apps: readonly App[] = [
  {
    name: "Notepad",
    link: (file?: string) => `/apps/Notepad/${file ? "?file=" + file : ""}`,
    icon: "/file.png"
  },
  {
    name: "Bird",
    link: () => `/games/Bird/`,
    icon: "/image/bird.svg"
  },
  // {
  //   name: "Emoji Match",
  //   link: () => `/games/Emoji Match/`,
  //   icon: "/image/emojiMatch.svg"
  // },
  {
    name: "Europe Takeover",
    link: () => `/games/Europe Takeover/`,
    icon: "/image/europe.svg"
  },
  {
    name: "Gold Miner",
    link: () => `/games/Gold Miner/`,
    icon: "/image/goldMiner.svg"
  },
  {
    name: "Idle Taco",
    link: () => `/games/Idle Taco/`,
    icon: "/image/taco.svg"
  },
  {
    name: "Idle Taco 2",
    link: () => `/games/Idle Taco 2/`,
    icon: "/image/taco.svg"
  },
  {
    name: "Pig Farmer",
    link: () => `/games/Pig Farmer/`,
    icon: "/image/pigFarmer.svg"
  },
  {
    name: "Taco Clicker",
    link: () => `/games/Taco Clicker/`,
    icon: "/image/taco.svg"
  }
];

export function findAppByName(name: string): number {
  for (let i = 0; i < apps.length; i++) {
    const app = apps[i];
    if (app.name == name) return i;
  }
  return -1;
}
