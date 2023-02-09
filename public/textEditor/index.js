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
openFile(false);
edit.innerHTML = localStorage.getItem(file) || "";
document.getElementById("open").addEventListener("click", () => {
  openFile(true);
});
document.getElementById("delete").addEventListener("click", () => {
  deleteFile();
});
/**
 * @param {string} filePath
 */
function getFileName(filePath) {
  return filePath.split("/")[filePath.split("/").length - 1] || "";
}

document.getElementById("rename").addEventListener("click", () => {
  rename(file, prompt(`Rename file ${getFileName(file.slice(5))} to`));
});
window.addEventListener("keydown", (e) => {
  if (e.key == "s" && e.ctrlKey)
    try {
      e.preventDefault();
      save(edit.value);
    } catch (e) {
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
