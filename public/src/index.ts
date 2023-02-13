import { desktop, fileContextmenu, loadDesktopFiles } from "./desktop";
import { createFile } from "./files";
import { loadTaskbarApps } from "./taskbar";
export const desktopContextmenu = document.getElementById("desktop-contextmenu")!;

desktop.addEventListener("contextmenu", (e) => {
  e.preventDefault();
  desktopContextmenu.style.left = e.x + "px";
  desktopContextmenu.style.top = e.y + "px";
  desktopContextmenu.classList.toggle("hide", false);
});
desktop.addEventListener("click", (e) => {
  desktopContextmenu.classList.toggle("hide", true);
  fileContextmenu.classList.toggle("hide", true);
});
const newFile = document.getElementById("new-file")!;
newFile.addEventListener("click", () => {
  createFile("desktop/");
  desktopContextmenu.classList.toggle("hide", true);
  fileContextmenu.classList.toggle("hide", true);
});
setInterval(() => {
  loadTaskbarApps();
  loadDesktopFiles();
}, 1000);
