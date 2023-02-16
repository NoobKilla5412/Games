"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.openApp = exports.windows = void 0;
const apps_1 = require("../apps");
exports.windows = [];
const windowsElem = document.getElementById("windows");
const iframeType = "iframe";
function openApp(app, file) {
    if (!(0, apps_1.hasApp)(app))
        return;
    var i = exports.windows.length;
    var frame = document.createElement("div");
    frame.className = "window";
    var titleBar = document.createElement("div");
    titleBar.className = "titleBar";
    var nameElem = document.createElement("span");
    nameElem.innerHTML = `${app.name}`;
    titleBar.appendChild(nameElem);
    titleBar.id = `title-${app.name.replace(/ /, "-")}-${i}`;
    frame.id = app.name.replace(/ /, "-") + "-" + i;
    titleBar.addEventListener("dblclick", () => {
        maximize(frame, i);
    });
    var xBtn = document.createElement("img");
    xBtn.src = "x.png";
    xBtn.style.float = "right";
    xBtn.height = 20;
    titleBar.appendChild(xBtn);
    titleBar.style.padding = "5px";
    frame.classList.toggle("prevent-select", true);
    titleBar.append(document.createElement("hr"));
    frame.append(titleBar);
    var iframe = document.createElement(iframeType);
    iframe.style.width = "100%";
    iframe.style.height = "calc(100% - 30px)";
    iframe.src = typeof app.link == "function" ? app.link(file) : app.link;
    iframe.style.border = "none";
    frame.append(iframe);
    setInterval(() => {
        nameElem.innerHTML = iframe.contentDocument?.title || app.name;
    }, 100);
    exports.windows.push({ frame, i, maximized: false, app });
    windowsElem.append(frame);
    addEventListeners(i);
    bringToFront(i);
    removeWindows();
}
exports.openApp = openApp;
function addEventListeners(i) {
    const frame = exports.windows[i]?.frame;
    dragElement(frame, i);
    frame.addEventListener("mouseenter", () => {
        bringToFront(i);
    });
    frame.addEventListener("mouseleave", () => {
        bringToFront(-1);
    });
    // frame.querySelector(iframeType)?.addEventListener("focus", () => {
    //   bringToFront(i);
    // });
    // frame.addEventListener("click", () => {
    //   bringToFront(i);
    // });
    frame.addEventListener("keydown", (e) => {
        if (e.ctrlKey && e.key == "q") {
            e.preventDefault();
            close(i);
        }
    });
    const xBtn = frame.querySelector("img");
    xBtn.addEventListener("click", () => {
        close(i);
    });
}
function bringToFront(i) {
    for (let j = 0; j < exports.windows.length; j++) {
        const element = exports.windows[j];
        if (j != i) {
            element?.frame.classList.toggle("front", false);
            element?.frame.querySelector(iframeType)?.blur();
            // (<HTMLElement>document.activeElement)?.blur();
        }
    }
    exports.windows[i]?.frame.classList.toggle("front", true);
    exports.windows[i]?.frame.querySelector(iframeType)?.focus();
}
function close(i) {
    var currentWindow = exports.windows[i];
    if (currentWindow) {
        if (currentWindow.frame.querySelector("span")?.innerHTML.endsWith("*") &&
            currentWindow.frame
                .querySelector(iframeType)
                ?.contentDocument?.getElementById("edit")?.value &&
            currentWindow.app.name == "Notepad") {
            if (!confirm("You have unsaved changes, are you sure you want to close this window?")) {
                return;
            }
        }
        windowsElem.removeChild(currentWindow.frame);
        exports.windows[i] = null;
    }
    removeWindows();
}
function removeWindows() {
    for (let i = 0; i < exports.windows.length; i++) {
        const element = exports.windows[i];
        if (element != null)
            return;
    }
    exports.windows = [];
}
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
        if (exports.windows[i]?.maximized) {
            maximize(elmnt, i, false);
            elmnt.style.left = e.clientX - 250 + "px";
            dragMouseDown(e);
        }
        if (e.clientY <= 0) {
            maximize(elmnt, i);
            closeDragElement();
            return;
        }
        if (e.clientX <= 0) {
            maximizeSide(elmnt, i, "left");
            closeDragElement();
            return;
        }
        if (e.clientX >= +getComputedStyle(document.body).width.replace(/[^\d.]/g, "") - 1) {
            maximizeSide(elmnt, i, "right");
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
    if (exports.windows[i]?.maximized) {
        frame.style.width = "500px";
        frame.style.height = "420px";
        if (move) {
            frame.style.left = "calc(50% - 250px)";
            frame.style.top = "calc(50vh - 210px)";
        }
        frame.style.resize = "both";
        frame.style.border = "1px lightblue solid";
        exports.windows[i].maximized = false;
    }
    else {
        frame.style.width = "100%";
        frame.style.height = "calc(100% - 40.5px)";
        if (move) {
            frame.style.top = "0px";
            frame.style.left = "0px";
        }
        frame.style.resize = "none";
        frame.style.border = "none";
        exports.windows[i].maximized = true;
    }
}
function maximizeSide(frame, i, side) {
    if (exports.windows[i]?.maximized) {
        frame.style.width = "500px";
        frame.style.height = "420px";
        frame.style.left = "calc(50% - 250px)";
        frame.style.top = "calc(50vh - 210px)";
        frame.style.resize = "both";
        frame.style.border = "1px lightblue solid";
        exports.windows[i].maximized = false;
    }
    else {
        frame.style.width = "50%";
        frame.style.height = "calc(100% - 40px)";
        frame.style.top = "0px";
        if (side == "left") {
            frame.style.right = "unset";
            frame.style.left = "0px";
        }
        else {
            frame.style.left = "unset";
            frame.style.right = "0px";
        }
        frame.style.resize = "both";
        frame.style.border = "none";
        exports.windows[i].maximized = true;
    }
}
