"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Files = void 0;
class Files {
    value = [];
    constructor(value) {
        this.value = value || [];
    }
    names() {
        let res = [];
        for (let i = 0; i < this.value.length; i++) {
            const file = this.value[i];
            res.push(file.name);
        }
        return res;
    }
    paths() {
        let res = [];
        for (let i = 0; i < this.value.length; i++) {
            const file = this.value[i];
            res.push(file.path);
        }
        return res;
    }
    push = this.value.push;
    join(separator) {
        return this.value.map((value) => value.path).join(separator);
    }
}
exports.Files = Files;
