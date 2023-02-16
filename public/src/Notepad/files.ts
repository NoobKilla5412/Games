import { listFiles } from "../files";
import { edit, file, reloadText, setFile, setSaved } from "./index";

export function deleteFile() {
  var files = [];
  for (let i = 0; i < localStorage.length; i++) {
    const element = localStorage.key(i)!;
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
        setFile("file:untitled.txt");
        reloadText();
      }
    }
}

export function openFile(userOpen: boolean) {
  var files = [];
  for (let i = 0; i < localStorage.length; i++) {
    const element = localStorage.key(i)!;
    if (element.slice(0, 5) == "file:") {
      files.push(element.slice(5));
    }
  }
  var tempFileName = userOpen ? prompt("file\n" + files.join("\n")) : new URL(location.href).searchParams.get("file");

  if (!tempFileName) return;
  if (localStorage.getItem("file:" + tempFileName) == null) {
    if (!confirm("This file does not exist, create it?")) {
      return;
    } else {
      localStorage.setItem("file:" + tempFileName, "");
    }
  }
  edit.contentEditable = true + "";
  setFile("file:" + tempFileName);
  edit.value = localStorage.getItem(file)!;
  save(edit.value);
  reloadText();
}

export function save(content: string) {
  // var caretPos = getCaretPosition(edit);
  if (localStorage.getItem(file) != null) localStorage.setItem(file, content);
  else {
    var tempName = prompt("Save as...\n" + listFiles().paths().join("\n"));
    if (tempName) {
      localStorage.setItem("file:" + tempName, content);
      setFile("file:" + tempName);
      reloadText();
    }
  }
  if (localStorage.getItem(file) != null) setSaved(true);
  // setSelectionRange(edit, caretPos, caretPos);
}
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
