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
        document.querySelector(`${keys[0] == 'generic' ? '' : '#' + keys[0]} #${keys[1]}${keys[2] ? ' #' + keys[2] : ''}`).innerHTML = element;
      }
    }
    document.title = currentLang["menu.title"];
  } else {
    for (const key in langs['en-US']) {
      if (Object.hasOwnProperty.call(langs['en-US'], key)) {
        const keys = key.split('.');
        const element = langs['en-US'][key];
        document.querySelector(`${keys[0] == 'generic' ? '' : '#' + keys[0]} #${keys[1]}${keys[2] ? ' #' + keys[2] : ''}`).innerHTML = key;
      }
    }
    document.title = "menu.title";
  }
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
  console.log(langSetting[0] == 'dev' ? 'menu.creditsBtn' : langs[langSetting[0]]["menu.creditsBtn"]);
});
//#endregion menu
//#region options
document.querySelector('#options #back').addEventListener('click', (e) => {
  document.getElementById('options').style.display = 'none';
  document.getElementById('menu').style.display = 'block';
});
document.querySelector('#options #lang').addEventListener('change', (e) => {
  const select = document.querySelector('#options #lang');
  loadText([select.options[select.options.selectedIndex].id, select.options.selectedIndex]);
});
  //#endregion options