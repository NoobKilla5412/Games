import { openApp } from './windowMngr/index';
import { apps } from './apps';
const taskbar = document.getElementById("taskbar")!;

function objectIncludes<T>(obj: T, key: keyof T) {
  for (const key1 in obj) {
    if (Object.hasOwnProperty.call(obj, key)) {
      if (key1 != key) return false;
    }
  }
  return true;
}

export function loadTaskbarApps() {
  taskbar.innerHTML = "";
  var taskbarApps = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)!;
    if (key.slice(0, 4) == "app:") {
      taskbarApps.push(key.slice(4));
    }
  }
  for (const app in apps) {
    if (Object.hasOwnProperty.call(apps, app)) {
      // @ts-ignore
      const data = apps[app];
      var tempElem = document.createElement("img");
      tempElem.style.display = "inline-block";
      tempElem.style.marginRight = "5px";
      tempElem.src = data.icon;
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
  clearInterval(undefined);
  setInterval(() => {
    var time = new Date().toLocaleTimeString();
    var date = new Date().toDateString();
    dateElem.innerHTML = `${time}<br>${date}`;
  }, 100);
  taskbar.append(dateElem);
}
