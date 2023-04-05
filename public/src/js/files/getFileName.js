"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFileName = void 0;
function getFileName(filePath) {
    return filePath.split("/")[filePath.split("/").length - 1] || "";
}
exports.getFileName = getFileName;
