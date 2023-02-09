"use strict";
const taskbar = document.getElementById("taskbar");
function openApp(app, appName) {
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
const apps = {
    "Text Editor": {
        link: (file) => `/textEditor/index.html${file ? "?file=" + file : ""}`,
        icon: "/file.png"
    },
    Gmail: {
        link: () => `https://gmail.com`,
        icon: "https://www.youtube.com/s/desktop/5191a190/img/favicon_144x144.png"
    },
    Bird: {
        link: () => `/games/Bird/index.html`,
        icon: "/image/bird.svg"
    },
    "Emoji Match": {
        link: () => `/games/Emoji Match/index.html`,
        icon: "/image/emojiMatch.svg"
    },
    "Europe Takeover": {
        link: () => `/games/Europe Takeover/index.html`,
        icon: "/image/europe.svg"
    },
    "Gold Miner": {
        link: () => `/games/Gold Miner/index.html`,
        icon: "/image/goldMiner.svg"
    },
    "Idle Taco": {
        link: () => `/games/Idle Taco/index.html`,
        icon: "/image/taco.svg"
    },
    "Idle Taco 2": {
        link: () => `/games/Idle Taco 2/index.html`,
        icon: "/image/taco.svg"
    },
    "Pig Farmer": {
        link: () => `/games/Pig Farmer/index.html`,
        icon: "/image/pigFarmer.svg"
    },
    "Taco Clicker": {
        link: () => `/games/Taco Clicker/index.html`,
        icon: "/image/taco.svg"
    }
};
function objectIncludes(obj, key) {
    for (const key1 in obj) {
        if (Object.hasOwnProperty.call(obj, key)) {
            if (key1 != key)
                return false;
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
