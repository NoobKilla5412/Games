(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.save = exports.listFiles = exports.openFile = exports.deleteFile = void 0;
const index_1 = require("./index");
function deleteFile() {
    var files = [];
    for (let i = 0; i < localStorage.length; i++) {
        const element = localStorage.key(i);
        if (element.slice(0, 5) == "file:") {
            files.push(element.slice(5));
        }
    }
    var fileToDelete = prompt("File to delete\n" + files.join("\n"));
    if (fileToDelete)
        if (localStorage.getItem("file:" + fileToDelete) == null) {
            alert("That file does not exist.");
        }
        else if (confirm('Are you sure you want to delete "' + fileToDelete + '"?')) {
            localStorage.removeItem("file:" + fileToDelete);
            if (index_1.file == "file:" + fileToDelete) {
                index_1.edit.value = "";
                (0, index_1.setFile)("file:untitled.txt");
                (0, index_1.reloadText)();
            }
        }
}
exports.deleteFile = deleteFile;
function openFile(userOpen) {
    var files = [];
    for (let i = 0; i < localStorage.length; i++) {
        const element = localStorage.key(i);
        if (element.slice(0, 5) == "file:") {
            files.push(element.slice(5));
        }
    }
    var tempFileName = userOpen ? prompt("file\n" + files.join("\n")) : new URL(location.href).searchParams.get("file");
    if (!tempFileName)
        return;
    if (localStorage.getItem("file:" + tempFileName) == null) {
        if (!confirm("This file does not exist, create it?")) {
            return;
        }
        else {
            localStorage.setItem("file:" + tempFileName, "");
        }
    }
    index_1.edit.contentEditable = true + "";
    (0, index_1.setFile)("file:" + tempFileName);
    index_1.edit.value = localStorage.getItem(index_1.file);
    save(index_1.edit.value);
    (0, index_1.reloadText)();
}
exports.openFile = openFile;
function listFiles() {
    var files = [];
    for (let i = 0; i < localStorage.length; i++) {
        const element = localStorage.key(i);
        if (element.slice(0, 5) == "file:") {
            files.push(element.slice(5));
        }
    }
    return files;
}
exports.listFiles = listFiles;
function save(content) {
    // var caretPos = getCaretPosition(edit);
    if (localStorage.getItem(index_1.file) != null)
        localStorage.setItem(index_1.file, content);
    else {
        var tempName = prompt("Save as...\n" + listFiles().join("\n"));
        if (tempName) {
            localStorage.setItem("file:" + tempName, content);
            (0, index_1.setFile)("file:" + tempName);
            (0, index_1.reloadText)();
        }
    }
    if (localStorage.getItem(index_1.file) != null)
        (0, index_1.setSaved)(true);
    // setSelectionRange(edit, caretPos, caretPos);
}
exports.save = save;
function getFileDir(filePath) {
    var fileDir = filePath.split("/");
    fileDir.splice(fileDir.length - 1, 1);
    return fileDir.join("/") + "/";
}
function getFileName(filePath) {
    return filePath.split("/")[filePath.split("/").length - 1] || "";
}
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
        (0, index_1.setFile)("file:" + to);
        (0, index_1.reloadText)();
        save(index_1.edit.value);
    }
}

},{"./index":2}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setFile = exports.file = exports.setSaved = exports.saved = exports.edit = exports.reloadText = void 0;
const files_1 = require("./files");
function reloadText() {
    var filePath = exports.file.slice(5);
    var fileName = filePath.split("/")[filePath.split("/").length - 1];
    document.title = (fileName == "untitled.txt" ? "" : fileName + " - ") + "Notepad" + (!exports.saved && exports.edit.value ? " *" : "");
    // document.getElementById("currentFile")!.innerHTML = fileName;
}
exports.reloadText = reloadText;
exports.edit = document.getElementById("edit");
// setInterval(() => {
// var options = Parse2.parse2DefaultOptions;
// options.spellCheck = false;
exports.saved = false;
const setSaved = (value) => {
    exports.saved = value;
};
exports.setSaved = setSaved;
exports.file = "file:untitled.txt";
const setFile = (value) => {
    exports.file = value;
};
exports.setFile = setFile;
(0, files_1.openFile)(false);
exports.edit.innerHTML = localStorage.getItem(exports.file) || "";
document.getElementById("open").addEventListener("click", () => {
    (0, files_1.openFile)(true);
});
document.getElementById("delete").addEventListener("click", () => {
    (0, files_1.deleteFile)();
});
// document.getElementById("rename")!.addEventListener("click", () => {
//   rename1(file, prompt(`Rename file ${getFileName1(file.slice(5))} to`) || "");
// });
window.addEventListener("keydown", (e) => {
    if (!e.ctrlKey && !e.altKey && !e.metaKey && !e.key.includes("Arrow") && e.key != "Tab")
        exports.saved = false;
    if (e.ctrlKey) {
        e.preventDefault();
        switch (e.key) {
            case "s":
                (0, files_1.save)(exports.edit.value);
                break;
            case "o":
                (0, files_1.openFile)(true);
                break;
        }
    }
    reloadText();
});
reloadText();
// });
// for (let i = 0; i < localStorage.length; i++) {
//   const element = localStorage.key(i);
//   document.write(element + "<br>");
// }

},{"./files":1}]},{},[2]);
