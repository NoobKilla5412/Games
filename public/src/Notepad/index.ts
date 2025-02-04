import { deleteFile, openFile, save } from "./files";

export function reloadText() {
  var filePath = file.slice(5);
  var fileName = filePath.split("/")[filePath.split("/").length - 1];
  document.title = (fileName == "untitled.txt" ? "" : fileName + " - ") + "Notepad" + (!saved && edit.value ? " *" : "");
  // document.getElementById("currentFile")!.innerHTML = fileName;
}

export const edit = <HTMLTextAreaElement>document.getElementById("edit")!;
// setInterval(() => {
// var options = Parse2.parse2DefaultOptions;
// options.spellCheck = false;
export var saved = false;
export const setSaved = (value: typeof saved) => {
  saved = value;
};
export var file = "file:untitled.txt";
export const setFile = (value: typeof file) => {
  file = value;
};

(async () => {
  await openFile(false);
  edit.innerHTML = localStorage.getItem(file) || "";
  document.getElementById("open")!.addEventListener("click", async () => {
    await openFile(true);
  });
  document.getElementById("delete")!.addEventListener("click", () => {
    deleteFile();
  });

  // document.getElementById("rename")!.addEventListener("click", () => {
  //   rename1(file, prompt(`Rename file ${getFileName1(file.slice(5))} to`) || "");
  // });
  window.addEventListener("keydown", (e) => {
    if (e.ctrlKey) {
      e.preventDefault();
      switch (e.key) {
        case "s":
          save(edit.value);
          break;
        case "o":
          openFile(true);
          break;
      }
    }
    reloadText();
  });

  edit.addEventListener("keydown", (e) => {
    if (!e.ctrlKey && !e.altKey && !e.metaKey && !e.key.includes("Arrow") && e.key != "Tab") saved = false;
  });
  reloadText();
})();
// });
// for (let i = 0; i < localStorage.length; i++) {
//   const element = localStorage.key(i);
//   document.write(element + "<br>");
// }
