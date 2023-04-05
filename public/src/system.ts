export namespace system {
  export interface callTypes {
    fileOpener: (file: string) => string | null;
  }
  // @ts-ignore
  let listeners: callTypes = {};

  export async function emit<T extends keyof callTypes>(name: keyof callTypes, args: Parameters<callTypes[T]>) {
    return new Promise<ReturnType<callTypes[T]>>((resolve) => {
      let tempElem = document.getElementById("syscall");
      if (!tempElem) {
        tempElem = document.createElement("span");
        tempElem.id = "syscall";
        tempElem.style.display = "none";
        document.body.appendChild(tempElem);
      }
      tempElem.innerHTML = `${name}-${JSON.stringify(args)}`;
      let interval = setInterval(() => {
        let tempElem = document.getElementById("syscall-res");
        if (!tempElem) {
          tempElem = document.createElement("span");
          tempElem.id = "syscall-res";
          tempElem.style.display = "none";
          document.body.appendChild(tempElem);
        }
        if (tempElem.innerHTML) {
          clearInterval(interval);
          let value = tempElem.innerHTML;
          tempElem.innerHTML = "";
          resolve(JSON.parse(value));
        }
      });
    });
  }

  export function isType<T extends keyof callTypes>(syscall: string, type: T) {
    return syscall?.split("-")[0] == type;
  }

  // type ArgumentTypes<F extends () => any> = F extends (...args: infer A) => any ? A : never;
  export function call<T extends keyof callTypes>(name: T, document: Document, args: Parameters<callTypes[T]>) {
    let tempElem = document.getElementById("syscall-res");
    if (!tempElem) {
      tempElem = document.createElement("span");
      tempElem.id = "syscall-res";
      tempElem.style.display = "none";
      document.body.appendChild(tempElem);
    }
    // @ts-ignore
    tempElem.innerHTML = JSON.stringify(listeners[name](...args));
  }

  export function on<T extends keyof callTypes>(name: T, callback: callTypes[T]) {
    listeners[name] = callback;
  }
}
