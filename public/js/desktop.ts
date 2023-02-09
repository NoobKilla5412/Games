const desktop = document.getElementById("desktop")!;
const fileContextmenu = document.getElementById("file-contextmenu")!;
function loadDesktopFiles() {
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
      if (file.endsWith(".mp4")) openApp("data://video/mp4," + localStorage.getItem("file:" + file), file.slice(0, file.length - 4));
      else if (file.endsWith(".lnk")) openApp(localStorage.getItem("file:" + file)!, localStorage.getItem("file:" + file)!);
      else openApp(apps["Text Editor"].link(file), "Text Editor");
    });
    tempElem.addEventListener("contextmenu", (e) => {
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
        openApp(apps["Text Editor"].link(file), "Text Editor");
        fileContextmenu.classList.toggle("hide", true);
        desktopContextmenu.classList.toggle("hide", true);
      });
      fileContextmenu.style.left = e.x + "px";
      fileContextmenu.style.top = e.y + "px";
      fileContextmenu.classList.toggle("hide", false);
    });
    desktop.append(tempElem);
  });
}
window.addEventListener("keydown", (e) => {
  if ((e.key == "r" && e.ctrlKey) || e.key == "F5") {
    e.preventDefault();
    loadDesktopFiles();
    loadTaskbarApps();
  }
});
