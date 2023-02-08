const desktop = document.getElementById("desktop")!;
const fileContextmenu = document.getElementById("file-contextmenu")!;
function loadDesktopFiles() {
  desktop.innerHTML = "";
  var desktopFiles: string[] = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)!;
    if (key.slice(0, 13) == "file:desktop/") {
      desktopFiles.push(key.slice(5));
    } else if (key.slice(0, 4) == "app:") {
      desktopFiles.push(key);
    }
  }
  desktopFiles.forEach((file) => {
    var tempElem = document.createElement("div");
    tempElem.style.display = "inline-block";
    tempElem.style.textAlign = "center";
    tempElem.className = "file";
    tempElem.innerHTML = `<img src="file.png" width="50px" /><br>${file.slice(8).length >= 13 ? file.slice(8, 8 + 13) + "..." : file.slice(8)}`;
    tempElem.addEventListener("dblclick", () => {
      openApp(`/textEditor/?file=${file}`, "Text Editor");
    });
    tempElem.addEventListener("contextmenu", (e) => {
      e.preventDefault();
      fileContextmenu.innerHTML = `<div id="delete-${file}" class="menu-item">Delete</div>`;
      document.getElementById(`delete-${file}`)!.addEventListener("click", () => {
        deleteFile(file);
        desktopContextmenu.classList.toggle("hide", true);
        fileContextmenu.classList.toggle("hide", true);
        loadDesktopFiles();
      });
      fileContextmenu.style.left = e.x + "px";
      fileContextmenu.style.top = e.y + "px";
      fileContextmenu.classList.toggle("hide", false);
    });
    desktop.append(tempElem);
  });
}
