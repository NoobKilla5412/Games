export function getFileName(filePath: string) {
  return filePath.split("/")[filePath.split("/").length - 1] || "";
}
