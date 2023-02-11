"use strict";
var textEditor;
(function (textEditor) {
    function reloadText() {
        var filePath = textEditor.file.slice(5);
        var fileName = filePath.split("/")[filePath.split("/").length - 1];
        document.title = (fileName == "untitled.txt" ? "" : fileName + " - ") + "Text Editor" + (textEditor.saved ? "" : " *");
        // document.getElementById("currentFile")!.innerHTML = fileName;
    }
    textEditor.reloadText = reloadText;
    textEditor.edit = document.getElementById("edit");
    // setInterval(() => {
    // var options = Parse2.parse2DefaultOptions;
    // options.spellCheck = false;
    textEditor.saved = false;
    textEditor.file = "file:untitled.txt";
    textEditor.openFile(false);
    textEditor.edit.innerHTML = localStorage.getItem(textEditor.file) || "";
    document.getElementById("open").addEventListener("click", () => {
        textEditor.openFile(true);
    });
    document.getElementById("delete").addEventListener("click", () => {
        textEditor.deleteFile();
    });
    // document.getElementById("rename")!.addEventListener("click", () => {
    //   rename1(file, prompt(`Rename file ${getFileName1(file.slice(5))} to`) || "");
    // });
    window.addEventListener("keydown", (e) => {
        if (!e.ctrlKey && !e.altKey && !e.metaKey && !e.key.includes("Arrow") && e.key != "Tab")
            textEditor.saved = false;
        if (e.key == "s" && e.ctrlKey) {
            e.preventDefault();
            textEditor.save(textEditor.edit.value);
        }
        reloadText();
    });
    reloadText();
    // });
    // for (let i = 0; i < localStorage.length; i++) {
    //   const element = localStorage.key(i);
    //   document.write(element + "<br>");
    // }
})(textEditor || (textEditor = {}));
