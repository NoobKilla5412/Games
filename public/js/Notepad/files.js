"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.save = exports.openFile = exports.deleteFile = void 0;
const files_1 = require("../files");
const index_1 = require("./index");
function deleteFile() {
    var files = [];
    for (let i = 0; i < localStorage.length; i++) {
        const element = localStorage.key(i);
        if (element.slice(0, 5) == "file:") {
            files.push(element.slice(5));
        }
    }
    var fileToDelete = prompt("File to delete\n" + files.join("\n"), index_1.file.slice(5));
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
    var tempFileName = userOpen
        ? prompt("file\n" + files.join("\n"), (0, files_1.getFilePath)(index_1.file.slice(5)))
        : new URL(location.href).searchParams.get("file");
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
function save(content) {
    // var caretPos = getCaretPosition(edit);
    if (localStorage.getItem(index_1.file) != null)
        localStorage.setItem(index_1.file, content);
    else {
        var tempName = prompt("Save as...\n" + (0, files_1.listFiles)().paths().join("\n"));
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
// function getFileDir(filePath: string) {
//   var fileDir = filePath.split("/");
//   fileDir.splice(fileDir.length - 1, 1);
//   return fileDir.join("/") + "/";
// }
// function getFileName(filePath: string) {
//   return filePath.split("/")[filePath.split("/").length - 1] || "";
// }
// function getFileExt(fileName: string) {
//   var names = fileName.split(".");
//   if (names.length > 1) return names[names.length - 1];
//   return "";
// }
// function rename(filePath: string, to: string) {
//   if (localStorage.getItem("file:" + to) != null) {
//     alert("That file already exists.");
//   } else if (to && localStorage.getItem("file:" + filePath) != null) {
//     if (getFileExt(getFileName(to)) != getFileExt(getFileName(filePath))) {
//       if (!confirm("This file has a different file extension than the old name. Are you sure that you want to do this?")) return;
//     }
//     var data = localStorage.getItem("file:" + filePath)!;
//     localStorage.removeItem("file:" + filePath);
//     localStorage.setItem("file:" + to, data);
//     setFile("file:" + to);
//     reloadText();
//     save(edit.value);
//   }
// }
