"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadTaskbarApps = void 0;
const index_1 = require("./windowMngr/index");
const apps_1 = require("./apps");
const taskbar = document.getElementById("taskbar");
function objectIncludes(obj, key) {
    for (const key1 in obj) {
        if (Object.hasOwnProperty.call(obj, key)) {
            if (key1 != key)
                return false;
        }
    }
    return true;
}
function loadTaskbarApps() {
    taskbar.innerHTML = "";
    var taskbarApps = [];
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.slice(0, 4) == "app:") {
            taskbarApps.push(key.slice(4));
        }
    }
    for (const app in apps_1.apps) {
        if (Object.hasOwnProperty.call(apps_1.apps, app)) {
            // @ts-ignore
            const data = apps_1.apps[app];
            var tempElem = document.createElement("img");
            tempElem.style.display = "inline-block";
            tempElem.style.marginRight = "5px";
            tempElem.src = data.icon;
            tempElem.height = 35;
            tempElem.width = 35;
            tempElem.title = app;
            tempElem.addEventListener("click", () => {
                (0, index_1.openApp)(data.link(), app);
            });
            taskbar.append(tempElem);
        }
    }
    var dateElem = document.createElement("div");
    dateElem.style.float = "right";
    dateElem.style.marginRight = "5px";
    dateElem.style.textAlign = "center";
    var time = new Date().toLocaleTimeString();
    var date = new Date().toDateString();
    dateElem.innerHTML = `${time}<br>${date}`;
    clearInterval(undefined);
    setInterval(() => {
        var time = new Date().toLocaleTimeString();
        var date = new Date().toDateString();
        dateElem.innerHTML = `${time}<br>${date}`;
    }, 100);
    taskbar.append(dateElem);
}
exports.loadTaskbarApps = loadTaskbarApps;
