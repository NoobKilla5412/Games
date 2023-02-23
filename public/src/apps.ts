export interface App {
  name: string;
  link: ((file?: string) => string) | string;
  icon?: string;
  dev?: string;
}

export function installApp(app: App) {
  localStorage.setItem("app:" + app.name, "true");
  location.reload();
}

export function deleteApp(app: App) {
  if (confirm(`Are you sure you want to delete "${app.name}"?`)) {
    localStorage.setItem("app:" + app.name, "false");
    location.reload();
  }
}

export function hasApp(app: App): boolean {
  if (localStorage.getItem("app:" + app.name) == "true") return true;
  for (let i = 0; i < nativeApps.length; i++) {
    const app1 = nativeApps[i];
    if (app.name == app1.name) return true;
  }
  return false;
}

export const nativeApps: readonly App[] = [
  {
    name: "Notepad",
    link: (file?: string) => `/apps/Notepad/${file ? "?file=" + file : ""}`,
    icon: "/file.png"
  },
  {
    name: "App Store",
    link: `/apps/App Store/`,
    icon: "/apps/App Store/icon.png"
  }
];

export const apps: readonly App[] = [
  {
    name: "Slides",
    link: `/apps/Slides/`,
    icon: ""
  },
  // {
  //   name: "BeepBox",
  //   link: `https://www.beepbox.co`,
  //   icon: "https://www.beepbox.co/apple-touch-icon.png"
  // },
  {
    name: "Guesser",
    link: `/apps/Guesser/`,
    icon: ""
  },
  {
    name: "Bird",
    link: `/games/Bird/`,
    icon: "/image/bird.svg"
  },
  // {
  //   name: "Emoji Match",
  //   link: `/games/Emoji Match/`,
  //   icon: "/image/emojiMatch.svg"
  // },
  {
    name: "Europe Takeover",
    link: `/games/Europe Takeover/`,
    icon: "/image/europe.svg"
  },
  {
    name: "Gold Miner",
    link: `/games/Gold Miner/`,
    icon: "/image/goldMiner.svg"
  },
  {
    name: "Idle Taco",
    link: `/games/Idle Taco/`,
    icon: "/image/taco.svg"
  },
  {
    name: "Idle Taco 2",
    link: `/games/Idle Taco 2/`,
    icon: "/image/taco.svg"
  },
  {
    name: "Pig Farmer",
    link: `/games/Pig Farmer/`,
    icon: "/image/pigFarmer.svg",
    dev: "Snowman 8326"
  },
  {
    name: "Taco Clicker",
    link: `/games/Taco Clicker/`,
    icon: "/image/taco.svg"
  }
];

export function getIndexOfAppByName(name: string): number {
  for (let i = 0; i < apps.length; i++) {
    const app = apps[i];
    if (app.name == name) return i;
  }
  for (let i = 0; i < nativeApps.length; i++) {
    const app = nativeApps[i];
    if (app.name == name) return i;
  }
  return -1;
}

export function getAppByName(name: string): App | null {
  for (let i = 0; i < apps.length; i++) {
    const app = apps[i];
    if (app.name == name) return app;
  }
  for (let i = 0; i < nativeApps.length; i++) {
    const app = nativeApps[i];
    if (app.name == name) return app;
  }
  return null;
}
