import { File } from "./File";

export class Files {
  value: File[] = [];

  public constructor(value?: File[]) {
    this.value = value || [];
  }

  public names() {
    let res: string[] = [];
    for (let i = 0; i < this.value.length; i++) {
      const file = this.value[i];
      res.push(file.name);
    }
    return res;
  }

  public paths() {
    let res: string[] = [];
    for (let i = 0; i < this.value.length; i++) {
      const file = this.value[i];
      res.push(file.path);
    }
    return res;
  }

  public push = this.value.push;

  public join(separator?: string) {
    return this.value.map((value) => value.path).join(separator);
  }
}
