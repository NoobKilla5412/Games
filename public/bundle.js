(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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

},{}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadDesktopFiles = exports.fileContextmenu = exports.desktop = void 0;
const apps_1 = require("./apps");
const files_1 = require("./files");
const index_1 = require("./index");
const taskbar_1 = require("./taskbar");
const index_2 = require("./windowMngr/index");
exports.desktop = document.getElementById("desktop");
exports.fileContextmenu = document.getElementById("file-contextmenu");
function loadDesktopFiles() {
    exports.desktop.innerHTML = "";
    var desktopFiles = [];
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.slice(0, 13) == "file:desktop/") {
            desktopFiles.push(key.slice(5));
        }
    }
    desktopFiles.forEach((file) => {
        var tempElem = document.createElement("div");
        tempElem.style.display = "inline-block";
        tempElem.style.textAlign = "center";
        tempElem.className = "file";
        tempElem.innerHTML = `<img src="file.png" width="50px" /><br>${file.slice(8)}`;
        tempElem.addEventListener("dblclick", () => {
            // if (file.endsWith(".exe"))
            //   openApp(
            //     "/" +
            //       file
            //         .split("/")
            //         [file.split("/").length - 1].slice(
            //           0,
            //           file.split("/")[file.split("/").length - 1].length - 4
            //         ) +
            //       "/index.html",
            //     file
            //       .split("/")
            //       [file.split("/").length - 1].slice(
            //         0,
            //         file.split("/")[file.split("/").length - 1].length - 4
            //       )
            //   );
            if (file.endsWith(".mp4"))
                (0, index_2.openApp)({ name: file.slice(0, file.length - 4), link: () => "data://video/mp4," + localStorage.getItem("file:" + file), icon: "" });
            // else if (file.endsWith(".lnk")) openApp(localStorage.getItem("file:" + file)!, localStorage.getItem("file:" + file)!);
            else
                (0, index_2.openApp)((0, apps_1.getAppByName)("Notepad"), file);
        });
        tempElem.addEventListener("contextmenu", (e) => {
            fileContextmenuListener(e, file);
        });
        exports.desktop.append(tempElem);
    });
}
exports.loadDesktopFiles = loadDesktopFiles;
function fileContextmenuListener(e, file) {
    e.preventDefault();
    exports.fileContextmenu.innerHTML = `<div id="delete-${file}" class="menu-item">Delete</div>
      <div id="rename-${file}" class="menu-item">Rename</div>
      <div id="edit-${file}" class="menu-item">Edit with text editor</div>`;
    document.getElementById(`delete-${file}`).addEventListener("click", () => {
        (0, files_1.deleteFile)(file);
        index_1.desktopContextmenu.classList.toggle("hide", true);
        exports.fileContextmenu.classList.toggle("hide", true);
        loadDesktopFiles();
    });
    document.getElementById(`rename-${file}`).addEventListener("click", () => {
        // document.write(file);
        var newName = prompt('Rename "' + (0, files_1.getFileName)(file) + '" to?');
        if (newName) {
            (0, files_1.rename)(file, "desktop/" + newName);
        }
        index_1.desktopContextmenu.classList.toggle("hide", true);
        exports.fileContextmenu.classList.toggle("hide", true);
        loadDesktopFiles();
    });
    document.getElementById(`edit-${file}`).addEventListener("click", () => {
        (0, index_2.openApp)(apps_1.apps[(0, apps_1.getIndexOfAppByName)("Text Editor")], file);
        exports.fileContextmenu.classList.toggle("hide", true);
        index_1.desktopContextmenu.classList.toggle("hide", true);
    });
    exports.fileContextmenu.style.left = e.x + "px";
    exports.fileContextmenu.style.top = e.y + "px";
    exports.fileContextmenu.classList.toggle("hide", false);
}
window.addEventListener("keydown", (e) => {
    if ((e.key == "r" && e.ctrlKey) || e.key == "F5") {
        e.preventDefault();
        loadDesktopFiles();
        (0, taskbar_1.loadTaskbarApps)();
    }
});

},{"./apps":1,"./files":3,"./index":4,"./taskbar":5,"./windowMngr/index":6}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rename = exports.getFileName = exports.listFiles = exports.createFile = exports.openFile = exports.deleteFile = exports.Files = void 0;
const desktop_1 = require("./desktop");
class Files {
    value = [];
    constructor(value) {
        this.value = value || [];
    }
    names() {
        let res = [];
        for (let i = 0; i < this.value.length; i++) {
            const file = this.value[i];
            res.push(file.name);
        }
        return res;
    }
    paths() {
        let res = [];
        for (let i = 0; i < this.value.length; i++) {
            const file = this.value[i];
            res.push(file.path);
        }
        return res;
    }
    push = this.value.push;
}
exports.Files = Files;
function deleteFile(fileToDelete) {
    let files = [];
    for (let i = 0; i < localStorage.length; i++) {
        const element = localStorage.key(i);
        if (element.slice(0, 5) == "file:") {
            let path = element.slice(5);
            files.push({ path, name: getFileName(path) });
        }
    }
    let filePath = fileToDelete;
    let fileName = filePath.split("/")[filePath.split("/").length - 1];
    if (localStorage.getItem("file:" + fileToDelete) == null) {
        alert("That file does not exist.");
    }
    else if (confirm('Are you sure you want to delete "' + fileName + '"?')) {
        localStorage.removeItem("file:" + fileToDelete);
    }
}
exports.deleteFile = deleteFile;
function openFile(userOpen) {
    let files = listFiles();
    if (userOpen)
        var tempFileName = prompt("file\n" + files.paths().join("\n"));
    else {
        var tempFileName = new URL(location.href).searchParams.get("file");
    }
    if (!tempFileName)
        return;
    if (localStorage.getItem("file:" + tempFileName) == null) {
        if (!confirm("This file does not exist, create it?")) {
            return;
        }
    }
}
exports.openFile = openFile;
function createFile(dir) {
    let tempFileName = prompt("Name of the file?");
    if (!tempFileName)
        return;
    if (localStorage.getItem("file:" + dir + tempFileName) == null) {
        localStorage.setItem("file:" + dir + tempFileName, "");
        (0, desktop_1.loadDesktopFiles)();
    }
    else {
        alert("That file already exists.");
    }
}
exports.createFile = createFile;
function listFiles() {
    var files = new Files();
    for (let i = 0; i < localStorage.length; i++) {
        const element = localStorage.key(i);
        if (element.slice(0, 5) == "file:") {
            let path = element.slice(5);
            files.push({ path, name: getFileName(path) });
        }
    }
    return files;
}
exports.listFiles = listFiles;
function getFileName(filePath) {
    return filePath.split("/")[filePath.split("/").length - 1] || "";
}
exports.getFileName = getFileName;
function getFileExt(fileName) {
    var names = fileName.split(".");
    if (names.length > 1)
        return names[names.length - 1];
    return "";
}
function rename(filePath, to) {
    if (localStorage.getItem("file:" + to) != null) {
        alert("That file already exists.");
    }
    else if (to && localStorage.getItem("file:" + filePath) != null) {
        if (getFileExt(getFileName(to)) != getFileExt(getFileName(filePath))) {
            if (!confirm("This file has a different file extension than the old name. Are you sure that you want to do this?"))
                return;
        }
        var data = localStorage.getItem("file:" + filePath);
        localStorage.removeItem("file:" + filePath);
        localStorage.setItem("file:" + to, data);
    }
}
exports.rename = rename;

},{"./desktop":2}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.desktopContextmenu = void 0;
const desktop_1 = require("./desktop");
const files_1 = require("./files");
const taskbar_1 = require("./taskbar");
exports.desktopContextmenu = document.getElementById("desktop-contextmenu");
desktop_1.desktop.addEventListener("contextmenu", (e) => {
    e.preventDefault();
    exports.desktopContextmenu.style.left = e.x + "px";
    exports.desktopContextmenu.style.top = e.y + "px";
    exports.desktopContextmenu.classList.toggle("hide", false);
});
desktop_1.desktop.addEventListener("click", () => {
    exports.desktopContextmenu.classList.toggle("hide", true);
    desktop_1.fileContextmenu.classList.toggle("hide", true);
});
const newFile = document.getElementById("new-file");
newFile.addEventListener("click", () => {
    (0, files_1.createFile)("desktop/");
    exports.desktopContextmenu.classList.toggle("hide", true);
    desktop_1.fileContextmenu.classList.toggle("hide", true);
});
// window.addEventListener("click", () => {
//   bringToFront(-1);
// });
setInterval(() => {
    (0, taskbar_1.loadTaskbarApps)();
    (0, desktop_1.loadDesktopFiles)();
}, 1000);

},{"./desktop":2,"./files":3,"./taskbar":5}],5:[function(require,module,exports){
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

},{"./apps":1,"./windowMngr":6}],6:[function(require,module,exports){
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

},{"../apps":1}]},{},[4]);
