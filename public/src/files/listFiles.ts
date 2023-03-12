import { File } from "./File";
import { getFileName } from "./getFileName";

export function listFiles() {
  var files: File[] = [];
  for (let i = 0; i < localStorage.length; i++) {
    const element = localStorage.key(i)!;
    if (element.slice(0, 5) == "file:") {
      let path = element.slice(5);
      files.push({ path, name: getFileName(path) });
    }
  }
  return files;
}
