const taskbar = document.getElementById("taskbar");
/**
 * @param {string} app
 * @param {string} appName
 * @param {boolean} isNativeApp
 */
function openApp(app, appName, isNativeApp = false) {
  var i = windows.length;
  var x, y;
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
  titleBar.innerHTML = `${appName}`;
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
    updateWindows();
  });
  titleBar.appendChild(xBtn);
  titleBar.style.padding = "5px";
  var dragging = false;
  frame.classList.toggle("prevent-select", true);
  frame.append(titleBar, document.createElement("hr"));
  var iframe = document.createElement("iframe");
  iframe.style.width = "100%";
  iframe.style.height = "100%";
  iframe.src = app;
  iframe.style.border = "none";
  frame.append(iframe);
  windows.push({ frame, i });
  updateWindows();
  dragElement(frame, i);
}

const apps = {
  "Text Editor": {
    link: (file) =>
      `file:///home/chronos/u-80fe660182c0fb240a4aa8897e206d40598ab3be/MyFiles/1%20School8%20S2/30-Minute%20OS/textEditor/index.html${
        file ? "?file=" + file : ""
      }`
  }
};

function objectIncludes(obj, key) {
  for (const key1 in obj) {
    if (Object.hasOwnProperty.call(obj, key)) {
      if (key1 != key) return false;
    }
  }
  return true;
}

function loadTaskbarApps() {
  taskbar.innerHTML = "";
  var taskbarApps = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key.slice(0, 4) == "app:") {
      taskbarApps.push(key.slice(4));
    }
  }
  for (const app in apps) {
    if (Object.hasOwnProperty.call(apps, app)) {
      const data = apps[app];
      var tempElem = document.createElement("img");
      tempElem.style.display = "inline-block";
      tempElem.style.marginRight = "5px";
      tempElem.src = "file.png";
      tempElem.height = 35;
      tempElem.width = 35;
      tempElem.title = app;
      tempElem.addEventListener("click", () => {
        openApp(data.link(), app);
      });
      taskbar.append(tempElem);
    }
  }
  var dateElem = document.createElement("div");
  dateElem.style.float = "right";
  dateElem.style.marginRight = "5px";
  dateElem.style.textAlign = "center";
  var time = new Date().toLocaleTimeString();
  var date = new Date().toDateString();
  dateElem.innerHTML = `${time}<br>${date}`;
  clearInterval();
  setInterval(() => {
    var time = new Date().toLocaleTimeString();
    var date = new Date().toDateString();
    dateElem.innerHTML = `${time}<br>${date}`;
  }, 100);
  taskbar.append(dateElem);
}
