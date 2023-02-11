namespace OS.windowMngr {
  export var windows: {
    frame: HTMLDivElement;
    i: number;
    maximized: boolean;
  }[] = [];
  const windowsElem = document.getElementById("windows")!;
  export function openApp(app: string, appName: string) {
    var i = windows.length;
    var frame = document.createElement("div");
    frame.style.position = "absolute";
    frame.style.width = "500px";
    frame.style.height = "420px";
    frame.style.left = "calc(50% - 250px)";
    frame.style.top = "calc(50vh - 210px)";
    frame.style.background = "white";
    frame.style.overflow = "hidden";
    frame.style.border = "1px lightblue solid";
    frame.style.resize = "both";
    var titleBar = document.createElement("div");
    titleBar.style.width = "calc(100% - 10px)";
    titleBar.style.height = "10px";
    var nameElem = document.createElement("span");
    nameElem.innerHTML = `${appName}`;
    titleBar.appendChild(nameElem);
    titleBar.id = `title-${appName.replace(/ /, "-")}-${i}`;
    frame.id = appName.replace(/ /, "-") + "-" + i;
    titleBar.addEventListener("dblclick", () => {
      maximize(frame, i);
    });
    var xBtn = document.createElement("img");
    xBtn.src = "x.png";
    xBtn.style.float = "right";
    xBtn.height = 20;
    xBtn.addEventListener("click", () => {
      windows.splice(i, 1);
      windowsElem.removeChild(frame);
    });
    titleBar.appendChild(xBtn);
    titleBar.style.padding = "5px";
    var dragging = false;
    frame.classList.toggle("prevent-select", true);
    frame.append(titleBar, document.createElement("hr"));
    var iframe = document.createElement("object");
    iframe.style.width = "100%";
    iframe.style.height = "90%";
    iframe.data = app;
    iframe.style.border = "none";
    frame.append(iframe);
    setInterval(() => {
      nameElem.innerHTML = iframe.contentDocument?.title || appName;
    }, 100);
    windows.push({ frame, i, maximized: false });
    windowsElem.append(frame);
    dragElement(frame, i);
  }

  function dragElement(elmnt: HTMLDivElement, i: number) {
    var pos1 = 0,
      pos2 = 0,
      pos3 = 0,
      pos4 = 0;
    if (document.getElementById(`title-${elmnt.id}`)) {
      // if present, the header is where you move the DIV from:
      document.getElementById(`title-${elmnt.id}`)!.onmousedown = dragMouseDown;
    } else {
      // otherwise, move the DIV from anywhere inside the DIV:
      elmnt.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e: MouseEvent) {
      e = e || window.event;
      e.preventDefault();
      // get the mouse cursor position at startup:
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      // call a function whenever the cursor moves:
      document.onmousemove = elementDrag;
    }

    function elementDrag(e: MouseEvent) {
      if (windows[i].maximized) {
        maximize(elmnt, i, false);
        elmnt.style.left = e.clientX - 250 + "px";
        dragMouseDown(e);
      }
      if (+elmnt.style.top.replace(/px/, "") < 0) {
        maximize(elmnt, i);
        closeDragElement();
        return;
      }
      e = e || window.event;
      e.preventDefault();
      // calculate the new cursor position:
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      // set the element's new position:
      elmnt.style.top = elmnt.offsetTop - pos2 + "px";
      elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
    }

    function closeDragElement() {
      // stop moving when mouse button is released:
      document.onmouseup = null;
      document.onmousemove = null;
    }
  }

  function maximize(frame: HTMLDivElement, i: number, move: boolean = true) {
    if (windows[i].maximized) {
      frame.style.width = "500px";
      frame.style.height = "420px";
      if (move) {
        frame.style.left = "calc(50% - 250px)";
        frame.style.top = "calc(50vh - 210px)";
      }
      frame.style.resize = "both";
      frame.style.border = "1px lightblue solid";
      windows[i].maximized = false;
    } else {
      frame.style.width = "100%";
      frame.style.height = "calc(100% - 40px)";
      if (move) {
        frame.style.top = "0px";
        frame.style.left = "0px";
      }
      frame.style.resize = "none";
      frame.style.border = "none";
      windows[i].maximized = true;
    }
  }
}
