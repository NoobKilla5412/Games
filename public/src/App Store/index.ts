import { App, apps, deleteApp, hasApp, installApp } from "../apps";

const appElem = document.getElementById("apps")!;

function addApp(app: App, i: number) {
  let tempElem = document.createElement("div");
  tempElem.className = "appRow col-3";
  tempElem.innerHTML = `<img src="${app.icon}"> <div>${app.name}<br> <div>${app.dev ? app.dev : "Noob Killa Studios"}</div></div> ${
    hasApp(i) ? `<button class="get" id="app-delete-${i}">Delete</button>` : `<button class="get" id="app-get-${i}">Get</button>`
  }`;
  appElem.append(tempElem);
  document.getElementById(`app-get-${i}`)?.addEventListener("click", () => {
    installApp(i);
  });
  document.getElementById(`app-delete-${i}`)?.addEventListener("click", () => {
    deleteApp(i);
  });
}

apps.forEach((app, i) => {
  if (app.name != "App Store") addApp(app, i);
});

// `<div class="appRow col-3">
// <img src="${app.image}"> <div>${app.title}<br> <div>${app.dev}</div></div> ${hasGame ? "" : `<button class="get" id="${game}">Get</button>`}
// </div>`
