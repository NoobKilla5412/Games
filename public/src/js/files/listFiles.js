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
