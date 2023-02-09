"use strict";
//                                   ___     _
//                                  |__ \   | |
//    _ __    __ _  _ __  ___   ___    ) |  | |_  ___
//   | '_ \  / _` || '__|/ __| / _ \  / /   | __|/ __|
//   | |_) || (_| || |   \__ \|  __/ / /_  _| |_ \__ \
//   | .__/  \__,_||_|   |___/ \___||____|(_)\__||___/
//   | |
//   |_|
// loaded["parse2.js"] = true;
class Parse2 {
  /**
   * @param {string} html An html string
   * @returns Escaped html string
   */
  static escapeHTML(html) {
    return html.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }
  static write(type, options = { border: "1px" }, ...data) {
    // const type = ...args[0];
    for (let i = 0; i < data.length; i++) {
      const element = data[i];
      const elem = document.createElement(type);
      // if (elem.tagName == 'HTMLTableElement') elem.border = options.border;
      elem.innerHTML = element;
      document.body.append(elem);
    }
    return void 0;
  }
  static logError(err) {
    console.error(err);
    this.write(`<span style="color:red">${err}</span>`);
    console.log(`<span style="color:red">${err}</span>`);
  }
  static parse2Data = {
    numbersLt10: ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"],
    numbersGt10: {
      10: "ten",
      11: "eleven",
      12: "twelve",
      13: "thirteen",
      14: "fourteen",
      15: "fifteen",
      16: "sixteen",
      17: "seventeen",
      18: "eighteen",
      19: "nineteen",
      20: "twenty"
    },
    spellWords: {
      "Avocadoe*s": "Avocados",
      // "Bea+tle": "Beetle",
      "Me+t+ings": "Meetings",
      "Rain\\s*forests": "Rain forests",
      "Va+gas": "Vegas",
      "Vocan*b*n*ulary": "Vocabulary",
      "[the]{3}": "the",
      abrige: "abridge",
      "achie*ve": "achieve",
      alot: "a lot",
      "asses+ment": "assessment",
      "auth[eu]r": "author",
      "aw*kward": "awkward",
      "belie*ve": "believe",
      "biog[ro]*pha*y": "biography",
      "chro+mebook[’']s": "Chromebook's",
      "conco*i*liatory": "conciliatory",
      "cool+y": "coolly",
      "defin[aeiou]*tely": "definitely",
      "end[aeiou]*vour": "endeavour",
      "flamingoe+s": "flamingos",
      "gr[ea]*t[ae]*ful": "grateful",
      "lo+king": "looking",
      "me*t+ings": "meetings",
      napoleon: "Napoleon",
      "s*dismantled": "dismantled",
      "sg+ortened": "shortened",
      "sin+m*ging": "singing",
      "t[ri]+nomi[la]*(s*)": "trinomial$1",
      tgat: "that",
      thier: "their",
      "tom*or+ow": "tomorrow",
      twinkies: "Twinkies",
      wierd: "weird",
      "coeffici*ent(s*)": "coefficient$1",
      "eqn(s*)": "equation$1",
      "mole*[uc]*lu*[le]*s": "molecules",
      "wat[er]*": "water",
      i: "I"
    }
  };
  // console.log = (str1) => {
  //  var element = document.createElement('pre');
  //  element.innerHTML = str1;
  //  element.style.display = 'block';
  //  document.body.appendChild(element);
  // };
  static assignment = false;
  static done1 = false;
  static initiated = false;
  static canvas1 = "https://csd509j.instructure.com/";
  static makeHead({ favicon = "", canvas, title, styles = "", done = false, editable = false }) {
    this.done1 = done;
    var elem = document.createElement("link");
    elem.rel = "shortcut icon";
    elem.type = "image/x-icon";
    elem.href = favicon;
    document.head.appendChild(elem);
    this.canvas1 = canvas || this.canvas1;
    document.title = title;
    this.assignment = true;
    this.initiated = true;
    if (!this.done1) {
      const a = document.createElement("a");
      a.href = this.canvas1;
      a.innerHTML = "Canvas";
      a.target = "_blank";
      a.style.display = "block";
      document.body.appendChild(a);
    }
    if (editable) document.querySelector("html").contentEditable = "true";
    const stylesElem = document.createElement("style");
    stylesElem.innerHTML = styles || "";
    document.head.append(stylesElem);
  }
  static parse2DefaultOptions = {
    formatMath: false,
    lineSpacing: 1,
    replaceExponents: true,
    "replaceHTML%Codes": true,
    replaceNewLines: true,
    replaceNumbers: true,
    replaceSubScript: true,
    replaceTabs: true,
    spellCheck: true,
    tabSize: 2,
    useDoubleDashes: true,
    useFancyQuotes: true,
    deleteChars: {
      enable: false,
      chars: ["a", "e", "i", "o", "u"]
    },
    customReplace: {
      enable: false,
      values: []
    },
    fixGrammar: true
  };
  /**
   * @param {string} str The string to parse
   */
  static parse2(str, options = this.parse2DefaultOptions) {
    if (options.deleteChars.enable) {
      str = str
        .replace(/style/g, "!1!")
        .replace(/href/g, "!2!")
        .replace(RegExp(`\\B[${options.deleteChars.chars}]`, "gi"), "")
        .replace(/!1!/g, "style")
        .replace(/!2!/g, "href");
    }
    if (options.customReplace.enable)
      options.customReplace.values.forEach((value) => {
        value.flags = value.flags || "";
        if (!value.flags?.includes("g")) {
          value.flags += "g";
        }
        str = str.replace(RegExp(value.searchValue, value.flags), value.replaceValue);
      });
    if (Array.isArray(str)) str = str.join("");
    if (options.useDoubleDashes) str = str.replace(/--/g, "&mdash;");
    if (options.formatMath) {
      str = str
        .replace(/([^(])\+([^\)])/g, "$1 &plus; $2")
        .replace(/([^(])\+([^\)])/g, "$1 &plus; $2")
        .replace(/([^])- ([^])/g, "$1 &minus; $2")
        .replace(/([^(])\*([^\)])/g, "$1 &bullet; $2")
        .replace(/([^(])\*([^\)])/g, "$1 &bullet; $2")
        .replace(/([^(\\])\=([^\)>])/g, "$1 &equals; $2")
        .replace(/([^(\\])\=([^\)>])/g, "$1 &equals; $2");
    }
    str = str.replace(/\\=/g, "=");
    if (options["replaceHTML%Codes"]) {
      str = str
        .replace(/%h1\n/, "%h1")
        .replace(/%h1\[style=\"([^]*)\"\]([^]*)%h1/g, `<h1 style=\\"$1">$2</h1>`)
        .replace(/%h1([^]*)%h1/g, "<h1>$1</h1>")
        .replace(/%h2\[style=\"([^]*)\"\]([^]*)%h2/g, `<h2 style=\\"$1">$2</h2>`)
        .replace(/%h2([^]*)%h2/g, "<h2>$1</h2>")
        .replace(/%h3\[style=\"([^]*)\"\]([^]*)%h3/g, `<h3 style=\\"$1">$2</h3>`)
        .replace(/%h3([^]*)%h3/g, "<h3>$1</h3>")
        .replace(/%a\[href=\"([^]*)\"\]([^]*)%a/g, `<a href=\\"$1">$2</a>`)
        .replace(/%b([^]*)%b/g, "<b>$1</b>");
      // .replace(/%p([^]*)%p/g, '<p>$1</p>');
    }
    if (options.replaceSubScript) {
      str = str.replace(/_\{([^]*)\}/g, "<sub>$1</sub>").replace(/_(\d)/g, "<sub>$1</sub>");
    }
    if (options.replaceExponents) {
      str = str.replace(/\^\{([^]*)\}/g, "<sup>$1</sup>").replace(/\^(\d)/g, "<sup>$1</sup>");
    }
    if (options.useFancyQuotes) {
      str = str
        .replace(/([^\\])"([^"“”]*)"/g, "$1&ldquo;$2&rdquo;")
        .replace(/([^\\])\{'([^\{\}]*)'\}/g, "$1&lsquo;$2&rsquo;")
        .replace(/([^\\])'/g, "$1&rsquo;")
        .replace(/\\'/g, "'")
        .replace(/\\\{'([^]*)'\}/g, "{'$1'}");
    }
    if (options.replaceTabs) {
      str = str.replace(/\t/g, "&nbsp;".repeat(options.tabSize));
    }
    if (options.replaceNewLines) {
      str = str.replace(/\n/g, "<br>".repeat(options.lineSpacing));
    }
    str = str.replace(/\\"([^]*)"/g, '"$1"');
    if (options.replaceNumbers) {
      this.parse2Data.numbersLt10.forEach((num, i) => {
        var regex = "([^\\\\])%";
        regex += i;
        str = str.replace(RegExp(regex, "g"), `$1${num}`);
      });
      // this.parse2Data.numbersLt10.forEach((num, i) => {
      //   var regex = '\\\\%';
      //   regex += i;
      //   // regex += '';
      //   str = str
      //     .replace(RegExp(regex, 'g'), `%${i}`);
      // });
      str = str.replace(/\\%(\d)/g, "%$1");
      this.parse2Data.numbersLt10.forEach((num, i) => {
        var regex = "%_";
        regex += i;
        regex += "";
        str = str.replace(RegExp(regex, "g"), num[0].toUpperCase() + num.slice(1));
      });
      for (const i in this.parse2Data.numbersGt10) {
        if (Object.hasOwnProperty.call(this.parse2Data.numbersGt10, i)) {
          const num = this.parse2Data.numbersGt10[i];
          var regex = "([^\\\\])%\\{";
          regex += i;
          regex += "\\}";
          str = str.replace(RegExp(regex, "g"), `$1${num}`);
        }
      }
      // for (const i in this.parse2Data.numbersGt10) {
      //   if (Object.hasOwnProperty.call(this.parse2Data.numbersGt10, i)) {
      //     const num = this.parse2Data.numbersGt10[i];
      //     var regex = '\\\\%\\{';
      //     regex += i;
      //     regex += '\\}';
      //     str = str
      //       .replace(RegExp(regex, 'g'), `%{${i}}`);
      //   }
      // }
      for (const i in this.parse2Data.numbersGt10) {
        if (Object.hasOwnProperty.call(this.parse2Data.numbersGt10, i)) {
          const num = this.parse2Data.numbersGt10[i];
          var regex = "%_\\{";
          regex += i;
          regex += "\\}";
          str = str.replace(RegExp(regex, "g"), num[0].toUpperCase() + num.slice(1));
        }
      }
      str = str.replace(/([^\\])%\{\d*\}/g, `$1<font color="red">That number is greater than 20</font>`);
      str = str.replace(/\\%\{(\d+)\}/g, "%{$1}");
    }
    if (options.spellCheck) {
      for (const key in this.parse2Data.spellWords) {
        if (Object.hasOwnProperty.call(this.parse2Data.spellWords, key)) {
          const element = this.parse2Data.spellWords[key];
          var regex = "\\b";
          regex += key;
          regex += "\\b";
          str = str.replace(RegExp(regex, "g"), element);
        }
      }
    }
    str = str.replace(/,([^ ])/g, ", $1");
    // console.log("Words: ", str.split(' '));
    // console.log(str.split(' ').filter(value => value).join(' '));
    // console.log(str.split(/[aeiou]/).filter(value => value).join(''));
    // str.split(' ').filter(value => value)
    // return ;
    // return str.split(' ').filter(value => value).join(' ');
    return str;
  }
  static defaultOptions = {
    text: {
      bold: true
    },
    p: {
      list: false,
      bold: false
    },
    ol: {
      type: "1",
      bold: true
    },
    ul: {
      bold: true
    },
    link: {
      target: ""
    }
  };
  static makeList(list, type = "ol", options = { type: "1", lineSpacing: 1, parseOptions: this.parse2DefaultOptions }) {
    var unanswered = 0;
    // if (!initiated)
    //   throw new Error('Not initiated')
    var listHTML = document.createElement("ol");
    var isDiv = false;
    /* if (options.id) {
        listHTML = document.getElementById(options.id);
      } else  */ if (type == "ol") {
      isDiv = false;
      listHTML = document.createElement("ol");
    } else if (type == "ul") {
      isDiv = false;
      listHTML = document.createElement("ul");
    } /* else if (type == 'div') {
        isDiv = true;
        listHTML = document.createElement<'div'>('div');
      } */
    listHTML.type = options.type || "1";
    var answers = "";
    list.forEach((value) => {
      var question = value.question;
      if (value.type != "link" && !(/* this.parse2( */ value.answer) /* , true) */) {
        value.answer = `${this.done1 ? "" : '<span style=\\"color:blue;\\">'}I don't have an answer.${this.done1 ? "" : "</span>"}`;
        unanswered++;
        var answered = false;
      } else var answered = true;
      if (value.type == "ul") {
        if (!value.options) value.options = this.defaultOptions.ul;
        answers = `<${isDiv ? "p" : "li"}>${this.parse2(question, options.parseOptions)}<ul>`;
        if (Array.isArray(value.answer))
          value.answer.forEach((answer) => {
            // @ts-ignore
            answers += `<li>${value.options.bold ? "<b>" : ""}${this.parse2(answer, options.parseOptions)}${value.options.bold ? "</b>" : ""}</li>`;
          });
        listHTML.innerHTML += answers + `</ul></${isDiv ? "p" : "li"}>`;
      } else if (value.type == "ol") {
        if (!value.options) value.options = this.defaultOptions.ol;
        // @ts-ignore
        answers = `<${isDiv ? "p" : "li"}>${this.parse2(question, options.parseOptions)}<ol type="${value.options.type}">`;
        if (Array.isArray(value.answer))
          value.answer.forEach((answer) => {
            // @ts-ignore
            answers += `<li>${value.options.bold ? "<b>" : ""}${this.parse2(answer, options.parseOptions)}${value.options.bold ? "</b>" : ""}</li>`;
          });
        listHTML.innerHTML += answers + `</ol></${isDiv ? "p" : "li"}>`;
      } else if (value.type == "p") {
        if (!value.options) value.options = this.defaultOptions.p;
        // @ts-ignore
        if (!value.options.list) listHTML.innerHTML += `<${isDiv ? "p" : "li"}>${isDiv ? "" : this.parse2(question, options.parseOptions)}${isDiv ? "" : "<br>"}${value.options.bold ? "<b>" : ""}<p>${this.parse2(Array.isArray(value.answer) ? value.answer.join(", ") : value.answer, options.parseOptions)}${value.options.bold ? "</b>" : ""}</p></${isDiv ? "p" : "li"}>`;
        else {
          answers = `<${isDiv ? "p" : "li"}>${this.parse2(question, options.parseOptions)}<br>`;
          if (Array.isArray(value.answer))
            value.answer.forEach((answer) => {
              // @ts-ignore
              answers += `<p>${value.options.bold ? "<b>" : ""}${this.parse2(answer, options.parseOptions)}${value.options.bold ? "</b>" : ""}</p>`;
            });
          listHTML.innerHTML += answers + `</${isDiv ? "p" : "li"}>`;
        }
      } else if (value.type == "link") {
        if (!value.options) value.options = this.defaultOptions.link;
        // @ts-ignore
        listHTML.innerHTML += `<${isDiv ? "p" : "li"}>${isDiv ? "" : this.parse2(question, options.parseOptions)}${isDiv ? "" : "<br>"}${value.options.bold ? "<b>" : ""}<a href="${value.link}" target="${value.options.target}">${this.parse2(value.text ? value.text : "") || "link"}</a>${value.options.bold ? "</b>" : ""}</${isDiv ? "p" : "li"}>`;
      } else {
        if (!value.options) value.options = this.defaultOptions.text;
        // @ts-ignore
        listHTML.innerHTML += `<${isDiv ? "p" : "li"}>${isDiv ? "" : this.parse2(question, options.parseOptions)}${isDiv ? "" : "<br>"}${value.options.bold ? "<b>" : ""}${this.parse2(Array.isArray(value.answer) ? value.answer.join(", ") : value.answer, options.parseOptions)}${value.options.bold ? "</b>" : ""}</${isDiv ? "p" : "li"}>`;
      }
    });
    this.done1 || console.log(`unanswered: ${unanswered}`);
    document.body.appendChild(listHTML);
    this.done1 || console.log(`unanswered: ${unanswered}`);
  }
}
