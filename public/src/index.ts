namespace OS {
  import windows = OS.windowMngr.windows;

  export const desktopContextmenu = document.getElementById("desktop-contextmenu")!;

  desktop.desktop.addEventListener("contextmenu", (e) => {
    e.preventDefault();
    desktopContextmenu.style.left = e.x + "px";
    desktopContextmenu.style.top = e.y + "px";
    desktopContextmenu.classList.toggle("hide", false);
  });
  desktop.desktop.addEventListener("click", (e) => {
    desktopContextmenu.classList.toggle("hide", true);
    desktop.fileContextmenu.classList.toggle("hide", true);
  });
  const newFile = document.getElementById("new-file")!;
  newFile.addEventListener("click", () => {
    files.createFile("desktop/");
    desktopContextmenu.classList.toggle("hide", true);
    desktop.fileContextmenu.classList.toggle("hide", true);
  });

  taskbar.loadApps();
  desktop.loadFiles();
}
