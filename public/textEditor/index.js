"use strict";
function reloadText() {
    var filePath = file.slice(5);
    var fileName = filePath.split("/")[filePath.split("/").length - 1];
    document.title = (fileName == "untitled.txt" ? "" : fileName + " - ") + "Text Editor";
    document.getElementById("currentFile").innerHTML = fileName;
}
const edit = document.getElementById("edit");
// setInterval(() => {
// var options = Parse2.parse2DefaultOptions;
// options.spellCheck = false;
var saved = false;
var file = "file:untitled.txt";
openFile1(false);
edit.innerHTML = localStorage.getItem(file) || "";
document.getElementById("open").addEventListener("click", () => {
    openFile1(true);
});
document.getElementById("delete").addEventListener("click", () => {
    deleteFile1();
});
document.getElementById("rename").addEventListener("click", () => {
    rename1(file, prompt(`Rename file ${getFileName1(file.slice(5))} to`) || "");
});
window.addEventListener("keydown", (e) => {
    if (e.key == "s" && e.ctrlKey) {
        e.preventDefault();
        save1(edit.value);
    }
    reloadText();
});
reloadText();
// });
// for (let i = 0; i < localStorage.length; i++) {
//   const element = localStorage.key(i);
//   document.write(element + "<br>");
// }
