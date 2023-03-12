import { loadDesktopFiles } from "../desktop";
import { File } from "./File";
import { getFileName } from "./getFileName";
import { listFiles } from "./listFiles";

export function deleteFile(fileToDelete: string) {
  let files: File[] = [];
  for (let i = 0; i < localStorage.length; i++) {
    const element = localStorage.key(i)!;
    if (element.slice(0, 5) == "file:") {
      let path = element.slice(5);
      files.push({ path, name: getFileName(path) });
    }
  }
  let filePath = fileToDelete;
  let fileName = filePath.split("/")[filePath.split("/").length - 1];
  if (localStorage.getItem("file:" + fileToDelete) == null) {
    alert("That file does not exist.");
  } else if (confirm('Are you sure you want to delete "' + fileName + '"?')) {
    localStorage.removeItem("file:" + fileToDelete);
  }
}

export function openFile(userOpen: boolean) {
  let files = listFiles();
  if (userOpen) var tempFileName = prompt("file\n" + files.map((value) => value.path).join("\n"));
  else {
    var tempFileName = new URL(location.href).searchParams.get("file");
  }
  if (!tempFileName) return;
  if (localStorage.getItem("file:" + tempFileName) == null) {
    if (!confirm("This file does not exist, create it?")) {
      return;
    }
  }
}

export function createFile(dir: string) {
  let tempFileName = prompt("Name of the file?");
  if (!tempFileName) return;
  if (localStorage.getItem("file:" + dir + tempFileName) == null) {
    localStorage.setItem("file:" + dir + tempFileName, "");
    loadDesktopFiles();
  } else {
    alert("That file already exists.");
  }
}

export function getFilePath(filePath: string) {
  let arr = filePath.split("/");
  arr.pop();
  return arr.join("/") + "/";
}

function getFileExt(fileName: string) {
  var names = fileName.split(".");
  if (names.length > 1) return names[names.length - 1];
  return "";
}

export function rename(filePath: string, to: string) {
  if (localStorage.getItem("file:" + to) != null && filePath != to) {
    alert("That file already exists.");
  } else if (to && localStorage.getItem("file:" + filePath) != null) {
    if (getFileExt(getFileName(to)) != getFileExt(getFileName(filePath))) {
      if (!confirm("This file has a different file extension than the old name. Are you sure that you want to do this?")) return;
    }
    var data = localStorage.getItem("file:" + filePath)!;
    localStorage.removeItem("file:" + filePath);
    localStorage.setItem("file:" + to, data);
  }
}
