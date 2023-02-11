"use strict";
var textEditor;
(function (textEditor) {
    function deleteFile() {
        var files = [];
        for (let i = 0; i < localStorage.length; i++) {
            const element = localStorage.key(i);
            if (element.slice(0, 5) == "file:") {
                files.push(element.slice(5));
            }
        }
        var fileToDelete = prompt("File to delete\n" + files.join("\n"));
        if (fileToDelete)
            if (localStorage.getItem("file:" + fileToDelete) == null) {
                alert("That file does not exist.");
            }
            else if (confirm('Are you sure you want to delete "' + fileToDelete + '"?')) {
                localStorage.removeItem("file:" + fileToDelete);
                if (textEditor.file == "file:" + fileToDelete) {
                    textEditor.edit.value = "";
                    textEditor.file = "file:untitled.txt";
                    textEditor.reloadText();
                }
            }
    }
    textEditor.deleteFile = deleteFile;
    function openFile(userOpen) {
        var files = [];
        for (let i = 0; i < localStorage.length; i++) {
            const element = localStorage.key(i);
            if (element.slice(0, 5) == "file:") {
                files.push(element.slice(5));
            }
        }
        if (userOpen)
            var tempFileName = prompt("file\n" + files.join("\n"));
        else
            var tempFileName = new URL(location.href).searchParams.get("file");
        if (!tempFileName)
            return;
        if (localStorage.getItem("file:" + tempFileName) == null) {
            if (!confirm("This file does not exist, create it?")) {
                return;
            }
        }
        textEditor.edit.contentEditable = true + "";
        textEditor.file = "file:" + tempFileName;
        textEditor.edit.value = localStorage.getItem(textEditor.file);
        save(textEditor.edit.value);
        textEditor.reloadText();
    }
    textEditor.openFile = openFile;
    function listFiles() {
        var files = [];
        for (let i = 0; i < localStorage.length; i++) {
            const element = localStorage.key(i);
            if (element.slice(0, 5) == "file:") {
                files.push(element.slice(5));
            }
        }
        return files;
    }
    textEditor.listFiles = listFiles;
    function save(content) {
        // var caretPos = getCaretPosition(edit);
        if (localStorage.getItem(textEditor.file) != null)
            localStorage.setItem(textEditor.file, content);
        else {
            var tempName = prompt("Save as...\n" + listFiles().join("\n"));
            if (tempName) {
                localStorage.setItem("file:" + tempName, content);
                textEditor.file = "file:" + tempName;
                textEditor.reloadText();
            }
        }
        textEditor.saved = true;
        // setSelectionRange(edit, caretPos, caretPos);
    }
    textEditor.save = save;
    function getFileDir(filePath) {
        var fileDir = filePath.split("/");
        fileDir.splice(fileDir.length - 1, 1);
        return fileDir.join("/") + "/";
    }
    function getFileName(filePath) {
        return filePath.split("/")[filePath.split("/").length - 1] || "";
    }
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
            textEditor.file = "file:" + to;
            textEditor.reloadText();
            save(textEditor.edit.value);
        }
    }
})(textEditor || (textEditor = {}));
