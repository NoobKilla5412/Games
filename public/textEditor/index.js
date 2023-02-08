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
var file = "file:untitled.txt";
openFile(false);
edit.innerHTML = localStorage.getItem(file) || "";
document.getElementById("open").addEventListener("click", () => {
    openFile(true);
});
document.getElementById("delete").addEventListener("click", () => {
    deleteFile();
});
document.getElementById("rename").addEventListener("click", () => {
    rename(file, prompt(`Rename file ${file.slice(5)} to`) || "");
});
edit.addEventListener("keydown", (e) => {
    if (e.key == "s" && e.ctrlKey)
        try {
            e.preventDefault();
            save(edit.innerHTML);
        }
        catch (e) {
            document.write(e);
        }
    reloadText();
});
reloadText();
// });
// for (let i = 0; i < localStorage.length; i++) {
//   const element = localStorage.key(i);
//   document.write(element + "<br>");
// }
