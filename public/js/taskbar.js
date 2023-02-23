"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadTaskbarApps = void 0;
const apps_1 = require("./apps");
const windowMngr_1 = require("./windowMngr");
const taskbar = document.getElementById("taskbar");
// function objectIncludes<T>(obj: T, key: keyof T) {
//   for (const key1 in obj) {
//     if (Object.hasOwnProperty.call(obj, key)) {
//       if (key1 != key) return false;
//     }
//   }
//   return true;
// }
function loadApp(app) {
    if (app) {
        var tempElem = document.createElement("img");
        tempElem.style.display = "inline-block";
        tempElem.style.marginRight = "5px";
        if (app.icon)
            tempElem.src = app.icon;
        tempElem.height = 35;
        tempElem.width = 35;
        tempElem.title = app.name;
        tempElem.addEventListener("click", () => {
            (0, windowMngr_1.openApp)(app);
        });
        taskbar.append(tempElem);
    }
}
function loadTaskbarApps() {
    taskbar.innerHTML = "";
    // var taskbarApps = [];
    // for (let i = 0; i < localStorage.length; i++) {
    //   const key = localStorage.key(i)!;
    //   if (key.slice(0, 4) == "app:") {
    //     taskbarApps.push(Number.parseInt(key.slice(4)));
    //   }
    // }
    for (let i = 0; i < apps_1.apps.length; i++) {
        const app = apps_1.apps[i];
        if ((0, apps_1.hasApp)(app))
            loadApp(app);
    }
    for (let i = 0; i < apps_1.nativeApps.length; i++) {
        const app = apps_1.nativeApps[i];
        loadApp(app);
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
