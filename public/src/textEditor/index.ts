namespace textEditor {
 export function reloadText() {
    var filePath = file.slice(5);
    var fileName = filePath.split("/")[filePath.split("/").length - 1];
    document.title = (fileName == "untitled.txt" ? "" : fileName + " - ") + "Text Editor" + (saved ? "" : " *");
    // document.getElementById("currentFile")!.innerHTML = fileName;
  }

 export const edit = <HTMLTextAreaElement>document.getElementById("edit")!;
  // setInterval(() => {
  // var options = Parse2.parse2DefaultOptions;
  // options.spellCheck = false;
 export var saved = false;
 export var file = "file:untitled.txt";
  openFile(false);
  edit.innerHTML = localStorage.getItem(file) || "";
  document.getElementById("open")!.addEventListener("click", () => {
    openFile(true);
  });
  document.getElementById("delete")!.addEventListener("click", () => {
    deleteFile();
  });

  // document.getElementById("rename")!.addEventListener("click", () => {
  //   rename1(file, prompt(`Rename file ${getFileName1(file.slice(5))} to`) || "");
  // });
  window.addEventListener("keydown", (e) => {
    if (!e.ctrlKey && !e.altKey && !e.metaKey && !e.key.includes("Arrow") && e.key != "Tab") saved = false;
    if (e.key == "s" && e.ctrlKey) {
      e.preventDefault();
      save(edit.value);
    }
    reloadText();
  });
  reloadText();
  // });
  // for (let i = 0; i < localStorage.length; i++) {
  //   const element = localStorage.key(i);
  //   document.write(element + "<br>");
  // }
}
