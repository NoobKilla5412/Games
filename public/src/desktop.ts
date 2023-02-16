import { apps, getAppByName, getIndexOfAppByName } from "./apps";
import { deleteFile, getFileName, rename } from "./files";
import { desktopContextmenu } from "./index";
import { loadTaskbarApps } from "./taskbar";
import { openApp } from "./windowMngr/index";

export const desktop = document.getElementById("desktop")!;
export const fileContextmenu = document.getElementById("file-contextmenu")!;
export function loadDesktopFiles() {
  desktop.innerHTML = "";
  var desktopFiles = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)!;
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
        openApp({ name: file.slice(0, file.length - 4), link: () => "data://video/mp4," + localStorage.getItem("file:" + file), icon: "" });
      // else if (file.endsWith(".lnk")) openApp(localStorage.getItem("file:" + file)!, localStorage.getItem("file:" + file)!);
      else openApp(getAppByName("Notepad")!, file);
    });
    tempElem.addEventListener("contextmenu", (e) => {
      fileContextmenuListener(e, file);
    });
    desktop.append(tempElem);
  });
}

function fileContextmenuListener(e: MouseEvent, file: string) {
  e.preventDefault();
  fileContextmenu.innerHTML = `<div id="delete-${file}" class="menu-item">Delete</div>
      <div id="rename-${file}" class="menu-item">Rename</div>
      <div id="edit-${file}" class="menu-item">Edit with text editor</div>`;
  document.getElementById(`delete-${file}`)!.addEventListener("click", () => {
    deleteFile(file);
    desktopContextmenu.classList.toggle("hide", true);
    fileContextmenu.classList.toggle("hide", true);
    loadDesktopFiles();
  });
  document.getElementById(`rename-${file}`)!.addEventListener("click", () => {
    // document.write(file);
    var newName = prompt('Rename "' + getFileName(file) + '" to?');
    if (newName) {
      rename(file, "desktop/" + newName);
    }
    desktopContextmenu.classList.toggle("hide", true);
    fileContextmenu.classList.toggle("hide", true);
    loadDesktopFiles();
  });
  document.getElementById(`edit-${file}`)!.addEventListener("click", () => {
    openApp(apps[getIndexOfAppByName("Text Editor")], file);
    fileContextmenu.classList.toggle("hide", true);
    desktopContextmenu.classList.toggle("hide", true);
  });
  fileContextmenu.style.left = e.x + "px";
  fileContextmenu.style.top = e.y + "px";
  fileContextmenu.classList.toggle("hide", false);
}

window.addEventListener("keydown", (e) => {
  if ((e.key == "r" && e.ctrlKey) || e.key == "F5") {
    e.preventDefault();
    loadDesktopFiles();
    loadTaskbarApps();
  }
});
