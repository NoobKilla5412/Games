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
    } else if (confirm('Are you sure you want to delete "' + fileToDelete + '"?')) {
      localStorage.removeItem("file:" + fileToDelete);
      if (file == "file:" + fileToDelete) {
        edit.value = "";
        file = "file:untitled.txt";
        reloadText();
      }
    }
}

function openFile(userOpen) {
  var files = [];
  for (let i = 0; i < localStorage.length; i++) {
    const element = localStorage.key(i);
    if (element.slice(0, 5) == "file:") {
      files.push(element.slice(5));
    }
  }
  if (userOpen) var tempFileName = prompt("file\n" + files.join("\n"));
  else var tempFileName = new URL(location.href).searchParams.get("file");

  if (!tempFileName) return;
  if (localStorage.getItem("file:" + tempFileName) == null) {
    if (!confirm("This file does not exist, create it?")) {
      return;
    }
  }
  edit.contentEditable = true;
  file = "file:" + tempFileName;
  edit.value = localStorage.getItem(file);
  save(edit.value);
  reloadText();
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
function save(content) {
  // var caretPos = getCaretPosition(edit);
  if (localStorage.getItem(file) != null) localStorage.setItem(file, content);
  else {
    var tempName = prompt("Save as...\n" + listFiles().join("\n"));
    if (tempName) localStorage.setItem("file:" + tempName, content);
  }
  // setSelectionRange(edit, caretPos, caretPos);
}
/**
 * @param {string} filePath
 */
function getFileDir(filePath) {
  var fileDir = filePath.split("/");
  fileDir.splice(fileDir.length - 1, 1);
  return fileDir.join("/") + "/";
}

/**
 * @param {string} filePath
 * @param {string} to
 */
function rename(filePath, to) {
  if (localStorage.getItem("file:" + to) != null) {
    alert("That file arlready exists.");
  } else if (to && localStorage.getItem(filePath) != null) {
    if (
      to.split(".")[to.split(".").length - 1] != filePath.split(".")[filePath.split(".").length - 1]
    ) {
      if (
        !confirm(
          "This file has a different file extsion than the old name. Are you sure that you want to do this?"
        )
      )
        return;
    }
    var data = localStorage.getItem(filePath);
    localStorage.removeItem(filePath);
    localStorage.setItem(getFileDir(filePath) + to, data);
    file = "file:" + to;
    reloadText();
  }
}
