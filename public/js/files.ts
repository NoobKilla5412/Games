function deleteFile(fileToDelete: string) {
  var filePath = fileToDelete;
  var fileName = filePath.split("/")[filePath.split("/").length - 1];
  if (localStorage.getItem("file:" + fileToDelete) == null) {
    alert("That file does not exist.");
  } else if (confirm('Are you sure you want to delete "' + fileName + '"?')) {
    localStorage.removeItem("file:" + fileToDelete);
  }
}

function openFile(userOpen: any, elem: { contentEditable: boolean; innerHTML: string | null }) {
  var files = listFiles();
  if (userOpen) var tempFileName = prompt("file\n" + files.join("\n"));
  else {
    var tempFileName = new URL(location.href).searchParams.get("file");
  }
  if (!tempFileName) return;
  if (localStorage.getItem("file:" + tempFileName) == null) {
    if (!confirm("This file does not exist, create it?")) {
      return;
    }
  }
  if (elem) elem.contentEditable = true;
  file = "file:" + tempFileName;
  if (elem) elem.innerHTML = localStorage.getItem(file);
}

function createFile(dir: string) {
  var tempFileName = prompt("What would you like to name this file?");
  if (!tempFileName) return;
  if (localStorage.getItem("file:" + dir + tempFileName) == null) {
    localStorage.setItem("file:" + dir + tempFileName, "");
    loadDesktopFiles();
  } else {
    alert("That file already exists.");
  }
}

function save(content: string) {
  localStorage.setItem(file, content);
}

function listFiles() {
  var files: string[] = [];
  for (let i = 0; i < localStorage.length; i++) {
    const element = localStorage.key(i)!;
    if (element.slice(0, 5) == "file:") {
      files.push(element.slice(5));
    }
  }
  return files;
}

/**
 * @param {string} filePath
 * @param {string} to
 */
function rename(filePath: string, to: string) {
  if (localStorage.getItem("file:" + to) != null) {
    alert("That file already exists.");
  } else if (to && localStorage.getItem(filePath) != null) {
    if (to.split(".")[to.split(".").length - 1] != filePath.split(".")[filePath.split(".").length - 1]) {
      if (!confirm("This file has a different file extension than the old name. Are you sure that you want to do this?")) return;
    }
    var data = localStorage.getItem(filePath) || "";
    localStorage.removeItem(filePath);
    localStorage.setItem("file:" + to, data);
    file = "file:" + to;
  }
}
var file = "file:untitled.txt";
