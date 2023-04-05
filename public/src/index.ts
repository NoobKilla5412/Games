import { getAppByName } from "./apps";
import { desktop, fileContextmenu, loadDesktopFiles } from "./desktop";
import { createFile } from "./files/files";
import { system } from "./system";
import { loadTaskbarApps } from "./taskbar";
import { openApp } from "./windowMngr";

export const desktopContextmenu = document.getElementById("desktop-contextmenu")!;

desktop?.addEventListener("contextmenu", (e) => {
  e.preventDefault();
  desktopContextmenu.style.left = e.x + "px";
  desktopContextmenu.style.top = e.y + "px";
  desktopContextmenu.classList.toggle("hide", false);
});
desktop?.addEventListener("click", () => {
  desktopContextmenu.classList.toggle("hide", true);
  fileContextmenu.classList.toggle("hide", true);
});
const newFile = document.getElementById("new-file")!;
newFile?.addEventListener("click", () => {
  createFile("desktop/");
  desktopContextmenu.classList.toggle("hide", true);
  fileContextmenu.classList.toggle("hide", true);
});

system.on("fileOpener", (file) => {
  openApp(getAppByName("File Explorer")!, undefined);
  return "";
});

// window.addEventListener("click", () => {
//   bringToFront(-1);
// });
setInterval(() => {
  loadTaskbarApps();
  loadDesktopFiles();
}, 1000);
