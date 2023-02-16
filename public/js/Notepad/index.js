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
exports.edit.addEventListener("keydown", (e) => {
    if (!e.ctrlKey && !e.altKey && !e.metaKey && !e.key.includes("Arrow") && e.key != "Tab")
        exports.saved = false;
});
reloadText();
// });
// for (let i = 0; i < localStorage.length; i++) {
//   const element = localStorage.key(i);
//   document.write(element + "<br>");
// }
