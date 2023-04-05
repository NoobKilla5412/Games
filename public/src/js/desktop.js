"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadDesktopFiles = exports.fileContextmenu = exports.desktop = void 0;
const _1 = require(".");
const apps_1 = require("./apps");
const files_1 = require("./files/files");
const getFileName_1 = require("./files/getFileName");
const taskbar_1 = require("./taskbar");
const windowMngr_1 = require("./windowMngr");
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
                (0, windowMngr_1.openApp)({
                    name: file.slice(0, file.length - 4),
                    link: () => "data://video/mp4," + localStorage.getItem("file:" + file),
                    icon: ""
                });
            // else if (file.endsWith(".lnk")) openApp(localStorage.getItem("file:" + file)!, localStorage.getItem("file:" + file)!);
            else
                (0, windowMngr_1.openApp)((0, apps_1.getAppByName)("Notepad"), file);
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
        _1.desktopContextmenu.classList.toggle("hide", true);
        exports.fileContextmenu.classList.toggle("hide", true);
        loadDesktopFiles();
    });
    document.getElementById(`rename-${file}`).addEventListener("click", () => {
        // document.write(file);
        var newName = prompt('Rename "' + (0, getFileName_1.getFileName)(file) + '" to?', (0, getFileName_1.getFileName)(file));
        if (newName) {
            (0, files_1.rename)(file, "desktop/" + newName);
        }
        _1.desktopContextmenu.classList.toggle("hide", true);
        exports.fileContextmenu.classList.toggle("hide", true);
        loadDesktopFiles();
    });
    document.getElementById(`edit-${file}`).addEventListener("click", () => {
        (0, windowMngr_1.openApp)(apps_1.apps[(0, apps_1.getIndexOfAppByName)("Text Editor")], file);
        exports.fileContextmenu.classList.toggle("hide", true);
        _1.desktopContextmenu.classList.toggle("hide", true);
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
