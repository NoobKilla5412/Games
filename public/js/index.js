"use strict";
var OS;
(function (OS) {
    OS.desktopContextmenu = document.getElementById("desktop-contextmenu");
    OS.desktop.desktop.addEventListener("contextmenu", (e) => {
        e.preventDefault();
        OS.desktopContextmenu.style.left = e.x + "px";
        OS.desktopContextmenu.style.top = e.y + "px";
        OS.desktopContextmenu.classList.toggle("hide", false);
    });
    OS.desktop.desktop.addEventListener("click", (e) => {
        OS.desktopContextmenu.classList.toggle("hide", true);
        OS.desktop.fileContextmenu.classList.toggle("hide", true);
    });
    const newFile = document.getElementById("new-file");
    newFile.addEventListener("click", () => {
        OS.files.createFile("desktop/");
        OS.desktopContextmenu.classList.toggle("hide", true);
        OS.desktop.fileContextmenu.classList.toggle("hide", true);
    });
    OS.taskbar.loadApps();
    OS.desktop.loadFiles();
})(OS || (OS = {}));
