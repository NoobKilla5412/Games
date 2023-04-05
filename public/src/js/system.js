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
