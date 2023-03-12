"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.desktopContextmenu = void 0;
const apps_1 = require("./apps");
const desktop_1 = require("./desktop");
const files_1 = require("./files/files");
const system_1 = require("./system");
const taskbar_1 = require("./taskbar");
const windowMngr_1 = require("./windowMngr");
exports.desktopContextmenu = document.getElementById("desktop-contextmenu");
desktop_1.desktop?.addEventListener("contextmenu", (e) => {
    e.preventDefault();
    exports.desktopContextmenu.style.left = e.x + "px";
    exports.desktopContextmenu.style.top = e.y + "px";
    exports.desktopContextmenu.classList.toggle("hide", false);
});
desktop_1.desktop?.addEventListener("click", () => {
    exports.desktopContextmenu.classList.toggle("hide", true);
    desktop_1.fileContextmenu.classList.toggle("hide", true);
});
const newFile = document.getElementById("new-file");
newFile?.addEventListener("click", () => {
    (0, files_1.createFile)("desktop/");
    exports.desktopContextmenu.classList.toggle("hide", true);
    desktop_1.fileContextmenu.classList.toggle("hide", true);
});
system_1.system.on("fileOpener", (file, parent) => {
    (0, windowMngr_1.openApp)((0, apps_1.getAppByName)("File Explorer"), undefined, parent);
});
// window.addEventListener("click", () => {
//   bringToFront(-1);
// });
setInterval(() => {
    (0, taskbar_1.loadTaskbarApps)();
    (0, desktop_1.loadDesktopFiles)();
}, 1000);
