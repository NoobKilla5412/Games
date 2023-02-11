"use strict";
var OS;
(function (OS) {
    var files;
    (function (files_1) {
        var files = [];
        function deleteFile(fileToDelete) {
            for (let i = 0; i < localStorage.length; i++) {
                const element = localStorage.key(i);
                if (element.slice(0, 5) == "file:") {
                    files.push(element.slice(5));
                }
            }
            var filePath = fileToDelete;
            var fileName = filePath.split("/")[filePath.split("/").length - 1];
            if (localStorage.getItem("file:" + fileToDelete) == null) {
                alert("That file does not exist.");
            }
            else if (confirm('Are you sure you want to delete "' + fileName + '"?')) {
                localStorage.removeItem("file:" + fileToDelete);
            }
        }
        files_1.deleteFile = deleteFile;
        function openFile(userOpen, elem) {
            var files = [];
            for (let i = 0; i < localStorage.length; i++) {
                const element = localStorage.key(i);
                if (element.slice(0, 5) == "file:") {
                    files.push(element.slice(5));
                }
            }
            if (userOpen)
                var tempFileName = prompt("file\n" + files.join("\n"));
            else {
                var tempFileName = new URL(location.href).searchParams.get("file");
            }
            if (!tempFileName)
                return;
            if (localStorage.getItem("file:" + tempFileName) == null) {
                if (!confirm("This file does not exist, create it?")) {
                    return;
                }
            }
        }
        files_1.openFile = openFile;
        function createFile(dir) {
            var tempFileName = prompt("Name of the file?");
            if (!tempFileName)
                return;
            if (localStorage.getItem("file:" + dir + tempFileName) == null) {
                localStorage.setItem("file:" + dir + tempFileName, "");
                OS.desktop.loadFiles();
            }
            else {
                alert("That file already exists.");
            }
        }
        files_1.createFile = createFile;
        function getFileName(filePath) {
            return filePath.split("/")[filePath.split("/").length - 1] || "";
        }
        files_1.getFileName = getFileName;
        function getFileExt(fileName) {
            var names = fileName.split(".");
            if (names.length > 1)
                return names[names.length - 1];
            return "";
        }
        function rename(filePath, to) {
            if (localStorage.getItem("file:" + to) != null) {
                alert("That file already exists.");
            }
            else if (to && localStorage.getItem("file:" + filePath) != null) {
                if (getFileExt(getFileName(to)) != getFileExt(getFileName(filePath))) {
                    if (!confirm("This file has a different file extension than the old name. Are you sure that you want to do this?"))
                        return;
                }
                var data = localStorage.getItem("file:" + filePath);
                localStorage.removeItem("file:" + filePath);
                localStorage.setItem("file:" + to, data);
            }
        }
        files_1.rename = rename;
    })(files = OS.files || (OS.files = {}));
})(OS || (OS = {}));
