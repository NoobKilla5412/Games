"use strict";
const desktopContextmenu = document.getElementById("desktop-contextmenu");
var windows = [];
const windowsElem = document.getElementById("windows");
desktop.addEventListener("contextmenu", (e) => {
    e.preventDefault();
    desktopContextmenu.style.left = e.x + "px";
    desktopContextmenu.style.top = e.y + "px";
    desktopContextmenu.classList.toggle("hide", false);
});
desktop.addEventListener("click", (e) => {
    desktopContextmenu.classList.toggle("hide", true);
    fileContextmenu.classList.toggle("hide", true);
});
const newFile = document.getElementById("new-file");
newFile.addEventListener("click", () => {
    createFile("desktop/");
    desktopContextmenu.classList.toggle("hide", true);
    fileContextmenu.classList.toggle("hide", true);
});
function openApp(app, appName) {
    var i = windows.length;
    var frame = document.createElement("div");
    frame.style.position = "absolute";
    frame.style.width = "500px";
    frame.style.height = "420px";
    frame.style.left = "calc(50% - 250px)";
    frame.style.top = "calc(50vh - 210px)";
    frame.style.background = "white";
    frame.style.border = "1px lightblue solid";
    var titleBar = document.createElement("div");
    titleBar.style.width = "calc(100% - 10px)";
    titleBar.style.height = "10px";
    titleBar.innerHTML = `<span>${appName}</span>`;
    var xBtn = document.createElement("img");
    xBtn.src = "/x.png";
    xBtn.style.float = "right";
    xBtn.height = 20;
    xBtn.addEventListener("click", () => {
        windows.splice(i, 1);
        updateWindows();
    });
    titleBar.append(xBtn);
    titleBar.style.padding = "5px";
    function drag(e) {
        e.preventDefault();
        frame.style.left = e.pageX + "px";
        frame.style.top = e.pageY + "px";
    }
    titleBar.addEventListener("dragend", drag, { capture: true });
    titleBar.addEventListener("drag", drag, { capture: true });
    titleBar.classList.toggle("prevent-select", true);
    frame.append(titleBar, document.createElement("hr"));
    var iframe = document.createElement("iframe");
    iframe.width = "500px";
    iframe.height = "400px";
    iframe.src = app;
    iframe.style.border = "none";
    frame.append(iframe);
    windows.push({ frame, i });
    updateWindows();
}
function updateWindows() {
    windowsElem.innerHTML = "";
    windows.forEach((window) => {
        windowsElem.append(window.frame);
    });
}
loadDesktopFiles();
