"use strict";
function deleteFile() {
    var files = listFiles();
    var fileToDelete = prompt("File to delete\n" + files.join("\n"));
    if (fileToDelete)
        if (localStorage.getItem("file:" + fileToDelete) == null) {
            alert("That file does not exist.");
        }
        else if (confirm('Are you sure you want to delete "' + fileToDelete + '"?')) {
            localStorage.removeItem("file:" + fileToDelete);
            if (file == "file:" + fileToDelete) {
                edit.innerHTML = "";
                file = "file:untitled.txt";
                reloadText();
            }
        }
}
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
function openFile(userOpen) {
    var files = listFiles();
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
    edit.contentEditable = true + "";
    file = "file:" + tempFileName;
    let _a = localStorage.getItem(file);
    edit.innerHTML = _a == null ? "" : _a;
    save(edit.innerHTML);
    reloadText();
}
function save(content) {
    // var caretPos = getCaretPosition(edit);
    localStorage.setItem(file, content);
    // setSelectionRange(edit, caretPos, caretPos);
}
function rename(filePath, to) {
    if (localStorage.getItem("file:" + to) != null) {
        alert("That file already exists.");
    }
    else if (to && localStorage.getItem(filePath) != null) {
        if (to.split(".")[to.split(".").length - 1] != filePath.split(".")[filePath.split(".").length - 1]) {
            if (!confirm("This file has a different file extension than the old name. Are you sure that you want to do this?"))
                return;
        }
        var data = localStorage.getItem(filePath);
        localStorage.removeItem(filePath);
        localStorage.setItem("file:" + to, data == null ? "" : data);
        file = "file:" + to;
        reloadText();
    }
}
