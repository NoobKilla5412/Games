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
function dragElement(elmnt, i) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (document.getElementById(`title-${elmnt.id}`)) {
        // if present, the header is where you move the DIV from:
        document.getElementById(`title-${elmnt.id}`).onmousedown = dragMouseDown;
    }
    else {
        // otherwise, move the DIV from anywhere inside the DIV:
        elmnt.onmousedown = dragMouseDown;
    }
    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
    }
    function elementDrag(e) {
        if (windows[i].maximized) {
            maximize(elmnt, i, false);
            elmnt.style.left = e.clientX - 250 + "px";
            dragMouseDown(e);
        }
        if (+elmnt.style.top.replace(/px/, "") < 0) {
            maximize(elmnt, i);
            closeDragElement();
            return;
        }
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        elmnt.style.top = elmnt.offsetTop - pos2 + "px";
        elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
    }
    function closeDragElement() {
        // stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;
    }
}
function maximize(frame, i, move = true) {
    if (windows[i].maximized) {
        frame.style.width = "500px";
        frame.style.height = "420px";
        if (move) {
            frame.style.left = "calc(50% - 250px)";
            frame.style.top = "calc(50vh - 210px)";
        }
        frame.style.resize = "both";
        frame.style.border = "1px lightblue solid";
        windows[i].maximized = false;
    }
    else {
        frame.style.width = "100%";
        frame.style.height = "calc(100% - 40px)";
        if (move) {
            frame.style.top = "0px";
            frame.style.left = "0px";
        }
        frame.style.resize = "none";
        frame.style.border = "none";
        windows[i].maximized = true;
    }
}
function updateWindows() {
    windowsElem.innerHTML = "";
    windows.forEach((window) => {
        windowsElem.append(window.frame);
    });
}
loadTaskbarApps();
loadDesktopFiles();
