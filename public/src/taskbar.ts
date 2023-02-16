import { App, apps, hasApp, nativeApps } from "./apps";
import { openApp } from "./windowMngr";

const taskbar = document.getElementById("taskbar")!;

// function objectIncludes<T>(obj: T, key: keyof T) {
//   for (const key1 in obj) {
//     if (Object.hasOwnProperty.call(obj, key)) {
//       if (key1 != key) return false;
//     }
//   }
//   return true;
// }

function loadApp(app: App) {
  if (app) {
    var tempElem = document.createElement("img");
    tempElem.style.display = "inline-block";
    tempElem.style.marginRight = "5px";
    tempElem.src = app.icon;
    tempElem.height = 35;
    tempElem.width = 35;
    tempElem.title = app.name;
    tempElem.addEventListener("click", () => {
      openApp(app);
    });
    taskbar.append(tempElem);
  }
}

export function loadTaskbarApps() {
  taskbar.innerHTML = "";
  // var taskbarApps = [];
  // for (let i = 0; i < localStorage.length; i++) {
  //   const key = localStorage.key(i)!;
  //   if (key.slice(0, 4) == "app:") {
  //     taskbarApps.push(Number.parseInt(key.slice(4)));
  //   }
  // }

  for (let i = 0; i < apps.length; i++) {
    const app = apps[i];
    if (hasApp(app)) loadApp(app);
  }

  for (let i = 0; i < nativeApps.length; i++) {
    const app = nativeApps[i];
    loadApp(app);
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
