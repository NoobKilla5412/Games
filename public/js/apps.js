"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAppByName = exports.getIndexOfAppByName = exports.apps = exports.nativeApps = exports.hasApp = exports.deleteApp = exports.installApp = void 0;
function installApp(app) {
    localStorage.setItem("app:" + app.name, "true");
    location.reload();
}
exports.installApp = installApp;
function deleteApp(app) {
    if (confirm(`Are you sure you want to delete "${app.name}"?`)) {
        localStorage.setItem("app:" + app.name, "false");
        location.reload();
    }
}
exports.deleteApp = deleteApp;
function hasApp(app) {
    if (localStorage.getItem("app:" + app.name) == "true")
        return true;
    for (let i = 0; i < exports.nativeApps.length; i++) {
        const app1 = exports.nativeApps[i];
        if (app.name == app1.name)
            return true;
    }
    return false;
}
exports.hasApp = hasApp;
exports.nativeApps = [
    {
        name: "Notepad",
        link: (file) => `/apps/Notepad/${file ? "?file=" + file : ""}`,
        icon: "/file.png"
    },
    {
        name: "App Store",
        link: `/apps/App Store/`,
        icon: "/apps/App Store/icon.png"
    }
];
exports.apps = [
    {
        name: "Grapher",
        link: `/apps/Grapher/`,
        icon: ""
    },
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
function getIndexOfAppByName(name) {
    for (let i = 0; i < exports.apps.length; i++) {
        const app = exports.apps[i];
        if (app.name == name)
            return i;
    }
    for (let i = 0; i < exports.nativeApps.length; i++) {
        const app = exports.nativeApps[i];
        if (app.name == name)
            return i;
    }
    return -1;
}
exports.getIndexOfAppByName = getIndexOfAppByName;
function getAppByName(name) {
    for (let i = 0; i < exports.apps.length; i++) {
        const app = exports.apps[i];
        if (app.name == name)
            return app;
    }
    for (let i = 0; i < exports.nativeApps.length; i++) {
        const app = exports.nativeApps[i];
        if (app.name == name)
            return app;
    }
    return null;
}
exports.getAppByName = getAppByName;
