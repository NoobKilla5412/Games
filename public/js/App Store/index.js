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
