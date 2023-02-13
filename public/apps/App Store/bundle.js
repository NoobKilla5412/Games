(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apps_1 = require("../apps");
const appElem = document.getElementById("apps");
function addApp(app, i) {
    let tempElem = document.createElement("div");
    tempElem.className = "appRow col-3";
    tempElem.innerHTML = `<img src="${app.icon}"> <div>${app.name}<br> <div>${app.dev ? app.dev : "Noob Killa Studios"}</div></div> ${(0, apps_1.hasApp)(i) ? `<button class="get" id="app-delete-${i}">Delete</button>` : `<button class="get" id="app-get-${i}">Get</button>`}`;
    appElem.append(tempElem);
    document.getElementById(`app-get-${i}`)?.addEventListener("click", () => {
        (0, apps_1.installApp)(i);
    });
    document.getElementById(`app-delete-${i}`)?.addEventListener("click", () => {
        (0, apps_1.deleteApp)(i);
    });
}
apps_1.apps.forEach((app, i) => {
    if (app.name != "App Store")
        addApp(app, i);
});
// `<div class="appRow col-3">
// <img src="${app.image}"> <div>${app.title}<br> <div>${app.dev}</div></div> ${hasGame ? "" : `<button class="get" id="${game}">Get</button>`}
// </div>`

},{"../apps":2}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAppByName = exports.apps = exports.nativeApps = exports.hasApp = exports.deleteApp = exports.installApp = void 0;
function installApp(i) {
    localStorage.setItem("app:" + i, "true");
    location.reload();
}
exports.installApp = installApp;
function deleteApp(i) {
    if (confirm(`Are you sure you want to delete "${exports.apps[i].name}"?`)) {
        localStorage.setItem("app:" + i, "false");
        location.reload();
    }
}
exports.deleteApp = deleteApp;
function hasApp(i) {
    return localStorage.getItem("app:" + i) == "true";
}
exports.hasApp = hasApp;
exports.nativeApps = [
    {
        name: "App Store",
        link: () => `/apps/App Store/`,
        icon: ""
    }
];
exports.apps = [
    {
        name: "Notepad",
        link: (file) => `/apps/Notepad/${file ? "?file=" + file : ""}`,
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
function findAppByName(name) {
    for (let i = 0; i < exports.apps.length; i++) {
        const app = exports.apps[i];
        if (app.name == name)
            return i;
    }
    return -1;
}
exports.findAppByName = findAppByName;

},{}]},{},[1]);
