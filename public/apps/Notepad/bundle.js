(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.save = exports.openFile = exports.deleteFile = void 0;
const listFiles_1 = require("../files/listFiles");
const system_1 = require("../system");
const index_1 = require("./index");
function deleteFile() {
    var files = (0, listFiles_1.listFiles)();
    var fileToDelete = prompt("File to delete\n" + files.map((value) => value.path).join("\n"), index_1.file.slice(5));
    if (fileToDelete)
        if (localStorage.getItem("file:" + fileToDelete) == null) {
            alert("That file does not exist.");
        }
        else if (confirm('Are you sure you want to delete "' + fileToDelete + '"?')) {
            localStorage.removeItem("file:" + fileToDelete);
            if (index_1.file == "file:" + fileToDelete) {
                index_1.edit.value = "";
                (0, index_1.setFile)("file:untitled.txt");
                (0, index_1.reloadText)();
            }
        }
}
exports.deleteFile = deleteFile;
async function openFile(userOpen) {
    // var files = [];
    // for (let i = 0; i < localStorage.length; i++) {
    //   const element = localStorage.key(i)!;
    //   if (element.slice(0, 5) == "file:") {
    //     files.push(element.slice(5));
    //   }
    // }
    var tempFileName = userOpen ? await system_1.system.emit("fileOpener", [index_1.file]) : new URL(location.href).searchParams.get("file");
    console.log("tempFileName: ", tempFileName);
    if (!tempFileName)
        return;
    if (localStorage.getItem("file:" + tempFileName) == null) {
        if (!confirm("This file does not exist, create it?")) {
            return;
        }
        else {
            localStorage.setItem("file:" + tempFileName, "");
        }
    }
    index_1.edit.contentEditable = true + "";
    (0, index_1.setFile)("file:" + tempFileName);
    index_1.edit.value = localStorage.getItem(index_1.file);
    save(index_1.edit.value);
    (0, index_1.reloadText)();
}
exports.openFile = openFile;
function save(content) {
    // var caretPos = getCaretPosition(edit);
    if (localStorage.getItem(index_1.file) != null)
        localStorage.setItem(index_1.file, content);
    else {
        var tempName = prompt("Save as...\n" +
            (0, listFiles_1.listFiles)()
                .map((value) => value.path)
                .join("\n"));
        if (tempName) {
            localStorage.setItem("file:" + tempName, content);
            (0, index_1.setFile)("file:" + tempName);
            (0, index_1.reloadText)();
        }
    }
    if (localStorage.getItem(index_1.file) != null)
        (0, index_1.setSaved)(true);
    // setSelectionRange(edit, caretPos, caretPos);
}
exports.save = save;
// function getFileDir(filePath: string) {
//   var fileDir = filePath.split("/");
//   fileDir.splice(fileDir.length - 1, 1);
//   return fileDir.join("/") + "/";
// }
// function getFileName(filePath: string) {
//   return filePath.split("/")[filePath.split("/").length - 1] || "";
// }
// function getFileExt(fileName: string) {
//   var names = fileName.split(".");
//   if (names.length > 1) return names[names.length - 1];
//   return "";
// }
// function rename(filePath: string, to: string) {
//   if (localStorage.getItem("file:" + to) != null) {
//     alert("That file already exists.");
//   } else if (to && localStorage.getItem("file:" + filePath) != null) {
//     if (getFileExt(getFileName(to)) != getFileExt(getFileName(filePath))) {
//       if (!confirm("This file has a different file extension than the old name. Are you sure that you want to do this?")) return;
//     }
//     var data = localStorage.getItem("file:" + filePath)!;
//     localStorage.removeItem("file:" + filePath);
//     localStorage.setItem("file:" + to, data);
//     setFile("file:" + to);
//     reloadText();
//     save(edit.value);
//   }
// }

},{"../files/listFiles":4,"../system":5,"./index":2}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setFile = exports.file = exports.setSaved = exports.saved = exports.edit = exports.reloadText = void 0;
const files_1 = require("./files");
function reloadText() {
    var filePath = exports.file.slice(5);
    var fileName = filePath.split("/")[filePath.split("/").length - 1];
    document.title = (fileName == "untitled.txt" ? "" : fileName + " - ") + "Notepad" + (!exports.saved && exports.edit.value ? " *" : "");
    // document.getElementById("currentFile")!.innerHTML = fileName;
}
exports.reloadText = reloadText;
exports.edit = document.getElementById("edit");
// setInterval(() => {
// var options = Parse2.parse2DefaultOptions;
// options.spellCheck = false;
exports.saved = false;
const setSaved = (value) => {
    exports.saved = value;
};
exports.setSaved = setSaved;
exports.file = "file:untitled.txt";
const setFile = (value) => {
    exports.file = value;
};
exports.setFile = setFile;
(async () => {
    await (0, files_1.openFile)(false);
    exports.edit.innerHTML = localStorage.getItem(exports.file) || "";
    document.getElementById("open").addEventListener("click", async () => {
        await (0, files_1.openFile)(true);
    });
    document.getElementById("delete").addEventListener("click", () => {
        (0, files_1.deleteFile)();
    });
    // document.getElementById("rename")!.addEventListener("click", () => {
    //   rename1(file, prompt(`Rename file ${getFileName1(file.slice(5))} to`) || "");
    // });
    window.addEventListener("keydown", (e) => {
        if (e.ctrlKey) {
            e.preventDefault();
            switch (e.key) {
                case "s":
                    (0, files_1.save)(exports.edit.value);
                    break;
                case "o":
                    (0, files_1.openFile)(true);
                    break;
            }
        }
        reloadText();
    });
    exports.edit.addEventListener("keydown", (e) => {
        if (!e.ctrlKey && !e.altKey && !e.metaKey && !e.key.includes("Arrow") && e.key != "Tab")
            exports.saved = false;
    });
    reloadText();
})();
// });
// for (let i = 0; i < localStorage.length; i++) {
//   const element = localStorage.key(i);
//   document.write(element + "<br>");
// }

},{"./files":1}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFileName = void 0;
function getFileName(filePath) {
    return filePath.split("/")[filePath.split("/").length - 1] || "";
}
exports.getFileName = getFileName;

},{}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listFiles = void 0;
const getFileName_1 = require("./getFileName");
function listFiles() {
    var files = [];
    for (let i = 0; i < localStorage.length; i++) {
        const element = localStorage.key(i);
        if (element.slice(0, 5) == "file:") {
            let path = element.slice(5);
            files.push({ path, name: (0, getFileName_1.getFileName)(path) });
        }
    }
    return files;
}
exports.listFiles = listFiles;

},{"./getFileName":3}],5:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.system = void 0;
var system;
(function (system) {
    // @ts-ignore
    let listeners = {};
    async function emit(name, args) {
        return new Promise((resolve) => {
            let tempElem = document.getElementById("syscall");
            if (!tempElem) {
                tempElem = document.createElement("span");
                tempElem.id = "syscall";
                tempElem.style.display = "none";
                document.body.appendChild(tempElem);
            }
            tempElem.innerHTML = `${name}-${JSON.stringify(args)}`;
            let interval = setInterval(() => {
                let tempElem = document.getElementById("syscall-res");
                if (!tempElem) {
                    tempElem = document.createElement("span");
                    tempElem.id = "syscall-res";
                    tempElem.style.display = "none";
                    document.body.appendChild(tempElem);
                }
                if (tempElem.innerHTML) {
                    clearInterval(interval);
                    let value = tempElem.innerHTML;
                    tempElem.innerHTML = "";
                    resolve(JSON.parse(value));
                }
            });
        });
    }
    system.emit = emit;
    function isType(syscall, type) {
        return syscall?.split("-")[0] == type;
    }
    system.isType = isType;
    // type ArgumentTypes<F extends () => any> = F extends (...args: infer A) => any ? A : never;
    function call(name, document, args) {
        let tempElem = document.getElementById("syscall-res");
        if (!tempElem) {
            tempElem = document.createElement("span");
            tempElem.id = "syscall-res";
            tempElem.style.display = "none";
            document.body.appendChild(tempElem);
        }
        // @ts-ignore
        tempElem.innerHTML = JSON.stringify(listeners[name](...args));
    }
    system.call = call;
    function on(name, callback) {
        listeners[name] = callback;
    }
    system.on = on;
})(system = exports.system || (exports.system = {}));

},{}]},{},[2]);
