function escapeHTML(html) {
  return html
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}
var parse2Data = {
  "numbersLt10": [
    "zero",
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine"
  ],
  "numbersGt10": {
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
  "spellWords": {
    "Avocadoe*s": "Avocados",
    "Bea+tle": "Beetle",
    "Me+t+ings": "Meetings",
    "Rain\\s*forests": "Rain forests",
    "Va+gas": "Vegas",
    "Vocan*b*n*ulary": "Vocabulary",
    "[the]{3}": "the",
    "abrige": "abridge",
    "achie*ve": "achieve",
    "alot": "a lot",
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
    "me*t+ings": "meetings",
    "napoleon": "Napoleon",
    "s*dismantled": "dismantled",
    "sg+ortened": "shortened",
    "sin+m*ging": "singing",
    "t[ri]+nomi[la]*": "trinomial",
    "tgat": "that",
    "thier": "their",
    "tom*or+ow": "tomorrow",
    "twinkies": "Twinkies",
    "wierd": "weird",
    "lo+king": "looking"
  }
}
var parse2Options = {
  "addSpacesTo-And+": true,
  "replaceExponents": true,
  "replaceHTML%Codes": true,
  "replaceNewLines": true,
  "replaceNumbers": true,
  "replaceTabs": true,
  "spellCheck": true,
  "useFancyQuotes": true,
  "lineSpacing": 1
};
/**
 * @param {string} str The string to parse
 */
function parse2(str) {
  if (parse2Options["replaceHTML%Codes"]) {
    str = str
      .replace(/%h1\[style=\"([^]*)\"\]([^]*)%h1/g, '<h1 style=\\"$1">$2</h1>')
      .replace(/%h1([^]*)%h1/g, '<h1>$1</h1>')
      .replace(/%a\[href=\"([^]*)\"\]([^]*)%a/g, '<a href=\\"$1">$2</a>');
  }
  if (parse2Options.replaceExponents) {
    str = str
      .replace(/(\^)\{(\d*)\}/g, '<sup>$2</sup>')
      .replace(/(\^)(\d)/g, '<sup>$2</sup>');
  }
  if (parse2Options["addSpacesTo-And+"]) {
    str = str
      .replace(/([^\(])\+([^\)])/g, '$1 &plus; $2')
      .replace(/([^\(])- ([^\)])/g, '$1 &minus; $2');
  }
  if (parse2Options.useFancyQuotes) {
    str = str
      .replace(/([^\\])"([^"]*)"/g, '$1&ldquo;$2&rdquo;')
      .replace(/([^\\])\{'([^]*)'\}/g, '$1&lsquo;$2&rsquo;')
      .replace(/([^\\])'/g, '$1&rsquo;')
      .replace(/\\"/g, '"');
  }
  if (parse2Options.replaceTabs) {
    str = str.replace(/\t/g, '&nbsp;'.repeat(2));
  }
  if (parse2Options.replaceNewLines) {
    str = str.replace(/\n/g, '<br>'.repeat(parse2Options.lineSpacing));
  }
  str = str
    .replace(/\\"([^]*)"/g, '"$1"')
    .replace(/\\'/g, "'")
    .replace(/--/g, '&mdash;')
    .replace(/TV/g, 'television');
  if (parse2Options.replaceNumbers) {
    parse2Data.numbersLt10.forEach((num, i) => {
      var regex = '([^\\\\])%';
      regex += i;
      // regex += '';
      str = str
        .replace(RegExp(regex, 'g'), `$1${num}`);
    });
    // parse2Data.numbersLt10.forEach((num, i) => {
    //   var regex = '\\\\%';
    //   regex += i;
    //   // regex += '';
    //   str = str
    //     .replace(RegExp(regex, 'g'), `%${i}`);
    // });
    str = str.replace(/\\%(\d)/, '%$1');
    parse2Data.numbersLt10.forEach((num, i) => {
      var regex = '%_';
      regex += i;
      regex += '';
      str = str
        .replace(RegExp(regex, 'g'), num[0].toUpperCase() + num.slice(1));
    });
    for (const i in parse2Data.numbersGt10) {
      if (Object.hasOwnProperty.call(parse2Data.numbersGt10, i)) {
        const num = parse2Data.numbersGt10[i];
        var regex = '([^\\\\])%\\{';
        regex += i;
        regex += '\\}';
        str = str
          .replace(RegExp(regex, 'g'), `$1${num}`);
      }
    }
    str = str.replace(/\\%\{(\d+)\}/g, '%{$1}');
    // for (const i in parse2Data.numbersGt10) {
    //   if (Object.hasOwnProperty.call(parse2Data.numbersGt10, i)) {
    //     const num = parse2Data.numbersGt10[i];
    //     var regex = '\\\\%\\{';
    //     regex += i;
    //     regex += '\\}';
    //     str = str
    //       .replace(RegExp(regex, 'g'), `%{${i}}`);
    //   }
    // }
    for (const i in parse2Data.numbersGt10) {
      if (Object.hasOwnProperty.call(parse2Data.numbersGt10, i)) {
        const num = parse2Data.numbersGt10[i];
        var regex = '%_\\{';
        regex += i;
        regex += '\\}';
        str = str
          .replace(RegExp(regex, 'g'), num[0].toUpperCase() + num.slice(1));
      }
    }
    str = str.replace(/([^\\])%\{\d{1...20}\}/g, `$1That number is greater than 20`)
  }
  if (parse2Options.spellCheck) {
    for (const key in parse2Data.spellWords) {
      if (Object.hasOwnProperty.call(parse2Data.spellWords, key)) {
        const element = parse2Data.spellWords[key];
        var regex = '\\b';
        regex += key;
        regex += '\\b';
        str = str.replace(RegExp(regex, 'g'), element);
      }
    }
  }
  return str;
}
const defaultOptions = {
  "text": {
    "bold": true
  },
  "p": {
    "list": false,
    "bold": false
  },
  "ol": {
    "type": "1",
    "bold": true
  },
  "ul": {
    "bold": true
  },
  "link": {
    "target": ""
  }
};
var done1 = true;
function makeList(list, type = 'ol', options = { type: '1', lineSpacing: 1, id: '' }) {
  if (!initiated)
    throw new Error('Not initiated')
  if (options.id) {
    var listHTML = document.getElementById(options.id);
  } else if (type == 'ol') {
    var isDiv = false;
    var listHTML = document.createElement('ol');
  } else if (type == 'ul') {
    var isDiv = false;
    var listHTML = document.createElement('ul');
  } else if (type == 'div') {
    var isDiv = true;
    var listHTML = document.createElement('div');
  }
  listHTML.type = options.type;
  var answers = '';
  for (const question in list) {
    if (Object.hasOwnProperty.call(list, question)) {
      let value = list[question];
      if (value.type != 'link' && !/* parse2( */value.answer/* , true) */) {
        value.answer = `${done1 ? '' : '<span style=\\"color:blue;\\">'}I don\'t know the answer.${done1 ? '' : '</span>'}`;
        unanswered++;
        var answered = false;
      } else
        var answered = true;
      if (value.type == 'ul') {
        if (!value.options)
          value.options = defaultOptions.ul;
        answers = `<${isDiv ? 'p' : 'li'}>${parse2(question)}<ul>`;
        value.answer.forEach(answer => {
          answers += `<li>${value.options.bold ? '<b>' : ''}${parse2(answer, options.lineSpacing, !answered)}${value.options.bold ? '</b>' : ''}</li>`;
        });
        listHTML.innerHTML += answers + `</ul></${isDiv ? 'p' : 'li'}>`;
      } else if (value.type == 'ol') {
        if (!value.options)
          value.options = defaultOptions.ol;
        answers = `<${isDiv ? 'p' : 'li'}>${parse2(question)}<ol type="${value.options.type}">`;
        value.answer.forEach(answer => {
          answers += `<li>${value.options.bold ? '<b>' : ''}${parse2(answer, options.lineSpacing, !answered)}${value.options.bold ? '</b>' : ''}</li>`;
        });
        listHTML.innerHTML += answers + `</ol></${isDiv ? 'p' : 'li'}>`;
      } else if (value.type == 'p') {
        if (!value.options)
          value.options = defaultOptions.p;
        if (!value.options.list)
          listHTML.innerHTML += `<${isDiv ? 'p' : 'li'}>${isDiv ? parse2(question) : ''}${isDiv ? '' : '<br>'}${value.options.bold ? '<b>' : ''}<p>${parse2(value.answer, options.lineSpacing, !answered)}${value.options.bold ? '</b>' : ''}</p></${isDiv ? 'p' : 'li'}>`;
        else {
          answers = `<${isDiv ? 'p' : 'li'}>${parse2(question)}<br>`;
          value.answer.forEach(answer => {
            answers += `<p>${value.options.bold ? '<b>' : ''}${parse2(answer, options.lineSpacing, !answered)}${value.options.bold ? '</b>' : ''}</p>`;
          });
          listHTML.innerHTML += answers + `</${isDiv ? 'p' : 'li'}>`;
        }
      } else if (value.type == 'link') {
        if (!value.options)
          value.options = defaultOptions.link;
        listHTML.innerHTML += `<${isDiv ? 'p' : 'li'}>${isDiv ? parse2(question) : ''}${isDiv ? '' : '<br>'}${value.options.bold ? '<b>' : ''}<a href="${value.link}" target="${value.options.target}">${parse2(value.text, options.lineSpacing, !answered) || "link"}</a>${value.options.bold ? '</b>' : ''}</${isDiv ? 'p' : 'li'}>`;
      } else {
        if (!value.options)
          value.options = defaultOptions.text;
        listHTML.innerHTML += `<${isDiv ? 'p' : 'li'}>${isDiv ? parse2(question) : ''}${isDiv ? '' : '<br>'}${value.options.bold ? '<b>' : ''}${parse2(value.answer, options.lineSpacing, !answered)}${value.options.bold ? '</b>' : ''}</${isDiv ? 'p' : 'li'}>`;
      }
    }
  }
  done1 || console.log(`unanswered: ${unanswered}`);
  options.id || document.body.appendChild(listHTML);
  done1 || console.log(`unanswered: ${unanswered}`);
}