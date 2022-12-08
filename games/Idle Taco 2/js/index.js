var version = "0.2";
// var testing = true;
var testing = false;
if (testing) {
  document.getElementById('intro1').style.display = 'none';
  document.getElementById('intro2').style.display = 'none';
  document.getElementById('menu').style.display = 'block';
  document.body.style.backgroundColor = 'white';
} else {
  setTimeout(() => {
    document.getElementById('intro1').style.display = 'none';
    document.getElementById('intro2').style.display = 'flex';
    document.body.style.backgroundColor = 'turquoise';
    setTimeout(() => {
      document.getElementById('intro2').style.display = 'none';
      document.getElementById('menu').style.display = 'block';
      document.body.style.backgroundColor = 'white';
    }, 4000);
  }, 4000);
}
function loadText(lang) {
  var currentLang = langs[lang[0]];
  if (lang[0] != 'dev') {
    for (const key in currentLang) {
      if (Object.hasOwnProperty.call(currentLang, key)) {
        const keys = key.split('.');
        const element = currentLang[key];
        if (keys[1] != 'back')
          document.querySelector(`${keys[0] == 'generic' ? '' : '#' + keys[0]} #${keys[1]}${keys[2] ? ' #' + keys[2] : ''}`).innerHTML = element;
        else {
          for (let i = 0; i < backBtns.length; i++) {
            const btn = backBtns[i];
            btn.innerHTML = currentLang["generic.back"];
          }
        }
      }
    }
    document.title = currentLang["menu.title"];
  } else {
    for (const key in langs['en-US']) {
      if (Object.hasOwnProperty.call(langs['en-US'], key)) {
        const keys = key.split('.');
        const element = langs['en-US'][key];
        if (keys[1] != 'back')
          document.querySelector(`${keys[0] == 'generic' ? '' : '#' + keys[0]} #${keys[1]}${keys[2] ? ' #' + keys[2] : ''}`).innerHTML = key;
        else {
          for (let i = 0; i < backBtns.length; i++) {
            const btn = backBtns[i];
            btn.innerHTML = "generic.back";
          }
        }
      }
    }
    document.title = "menu.title";
  }
  document.getElementById('version').innerHTML += version;
  langSetting = lang;
  localStorage.setItem('tacoGame2:lang', JSON.stringify(langSetting));
}
/**
 * 
 * @param {string} command 
 */
function parseCommand(command) {
  command = command.split(' ');
  if (command[0] == 'give') {
    if (!command[1]) {
      throw new Error('Missing second arg of command.');
    }
    document.write(command[1]);
  }
}
// loadText('dev');
// parseCommand('give')
var langSetting = JSON.parse(localStorage.getItem('tacoGame2:lang')) || ['en-US', 0];
const select = document.querySelector('#options #lang');
select.options.selectedIndex = langSetting[1];
const backBtns = document.getElementsByClassName('back');
loadText(langSetting);
// loadText('es-ES');
//#region menu
document.querySelector('#menu #startBtn').addEventListener('click', (e) => {
  console.log(langSetting[0] == 'dev' ? 'menu.startBtn' : langs[langSetting[0]]["menu.startBtn"]);
});
document.querySelector('#menu #optionsBtn').addEventListener('click', (e) => {
  document.getElementById('menu').style.display = 'none';
  document.getElementById('options').style.display = 'block';
});
document.querySelector('#menu #creditsBtn').addEventListener('click', (e) => {
  document.getElementById('menu').style.display = 'none';
  document.getElementById('credits').style.display = 'block';
});
//#endregion menu
for (let i = 0; i < backBtns.length; i++) {
  const btn = backBtns[i];
  btn.addEventListener('click', (e) => {
    document.getElementById('options').style.display = 'none';
    document.getElementById('credits').style.display = 'none';
    document.getElementById('menu').style.display = 'block';
  });
  // btn.innerHTML = langs[langSetting[0]]["generic.back"];
}
//#region options
document.querySelector('#options #lang').addEventListener('change', (e) => {
  const select = document.querySelector('#options #lang');
  loadText([select.options[select.options.selectedIndex].id, select.options.selectedIndex]);
});
//#endregion options
//#region credits

//#endregion credits