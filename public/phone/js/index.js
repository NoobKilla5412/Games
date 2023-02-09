var apps = {};
var defaultApps = {};
var games = {};
var settings = { darkMode: false };
if (!localStorage.getItem('settings')) {
  localStorage.setItem('settings', JSON.stringify(settings));
} else {
  settings = JSON.parse(localStorage.getItem('settings'));
}

if (settings.darkMode) {
  document.body.style.background = 'black';
  document.body.style.color = 'white';
} else {
  document.body.style.background = 'white';
  document.body.style.color = 'black';
}
var activeApp;
var appLibrary = {};
function mouseX(e) {
  if (e.pageX) {
    return e.pageX;
  } else if (e.clientX) {
    return e.clientX + (document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft);
  } else {
    return null;
  }
}

function mouseY(e) {
  if (e.pageY) {
    return e.pageY;
  } else if (e.clientY) {
    return e.clientY + (document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop);
  } else {
    return null;
  }
}
function load(game) {
  if (game.title == 'Update') {
    location.reload();
  } else {
    if (game.options) {
      document.getElementById('game').innerHTML = `<iframe src="${game.link}" ${game.options} />`;
    } else {
      document.getElementById('game').innerHTML = `<iframe src="${game.link}" />`;
    }
    document.getElementById('containerGames').style.display = 'none';
    document.getElementById('containerApps').style.display = 'none';
    document.title = `${game.title} ${game.version ? 'v' + game.version : ''}`;
  }
  activeApp = game.title;
  document.head.removeChild(document.getElementsByTagName('title')[0]);
  let newTitle = document.createElement('title');
  newTitle.innerHTML = `${game.title} &#8211; Noob Killa&rsquo;s OS`;
  document.head.appendChild(newTitle);
  document.getElementById('game').style.display = 'block';
  document.getElementById('container').style.display = 'none';
}

function deleteGame(game, type = 'game') {
  if (confirm(`Are you sure you want to delete ${game.title}?`)) {
    appLibrary[game.title] = false;
    localStorage.setItem('apps', JSON.stringify(appLibrary));
    if (type == 'game') {
      if (!confirm(`Do you want to keep save data for ${game.title}? Ok for save, Cancel for delete`)) {
        localStorage.removeItem(game.id);
        if (game.otherData) {
          game.otherData.forEach((dataName) => {
            localStorage.removeItem(dataName);
          });
        }
        game?.delAction();
      }
    }
    location.reload();
  }
}
function home() {
  if (activeApp != 'App Store' && activeApp != 'Settings') {
    document.getElementById('game').innerHTML = '';
    document.getElementById('containerGames').style.display = 'flex';
    document.getElementById('containerApps').style.display = 'flex';
  } else {
    location.reload();
  }
  document.head.removeChild(document.getElementsByTagName('title')[0]);
  let newTitle = document.createElement('title');
  newTitle.innerHTML = "Noob Killa's OS";
  document.head.appendChild(newTitle);
  document.getElementById('game').style.display = 'none';
  document.getElementById('container').style.display = 'block';
}
fetch('json/apps.json')
  .then((response) => response.json())
  .then((data) => {
    apps = data;
    fetch('json/defaultApps.json')
      .then((response) => response.json())
      .then((data1) => {
        defaultApps = data1;
        fetch('json/games.json')
          .then((response) => response.json())
          .then((data2) => {
            games = data2;
            if (!localStorage.getItem('apps')) {
              localStorage.setItem('apps', JSON.stringify(appLibrary));
            } else {
              appLibrary = JSON.parse(localStorage.getItem('apps'));
            }
            for (const game in games) {
              if (Object.hasOwnProperty.call(games, game)) {
                const value = games[game];
                if (appLibrary[value.title]) {
                  document.getElementById('containerGames').innerHTML += `
            <br style="display:none" id="${game}Br" />
            <div class="app">
              <img src="${value.image}" id="${game}" class="image" /><br>
              <caption>
                ${value.title} ${value.version ? 'v' + value.version : ''}
              </caption>
            </div>`;
                  document.getElementById('r-click-div').innerHTML += `
            <div class="hide" id="rmenu-${game}">
              <button id="delete-${game}">Delete</button>
            </div>`;
                }
              }
            }
            for (const app in defaultApps) {
              if (Object.hasOwnProperty.call(defaultApps, app)) {
                const value = defaultApps[app];
                document.getElementById('containerApps').innerHTML += `
            <br style="display:none" id="${app}Br" />
            <div class="app">
              <img src="${value.image}" id="${app}" class="image" ><br>
              <caption>
                ${value.title} ${value.version ? 'v' + value.version : ''}
              </caption>
            </div>`;
              }
            }
            for (const app in apps) {
              if (Object.hasOwnProperty.call(apps, app)) {
                const value = apps[app];
                if (appLibrary[value.title]) {
                  document.getElementById('containerApps').innerHTML += `
            <br style="display:none" id="${app}Br" />
            <div class="app">
              <img src="${value.image}" id="${app}" class="image" ><br>
              <caption>
                ${value.title} ${value.version ? 'v' + value.version : ''}
              </caption>
            </div>`;
                  document.getElementById('r-click-div').innerHTML += `
            <div class="hide" id="rmenu-${app}">
              <button id="delete-${app}">Delete</button>
            </div>`;
                }
              }
            }

            for (const game in games) {
              if (Object.hasOwnProperty.call(games, game)) {
                const value = games[game];
                if (!value.link) value.link = `games/${value.title}/Launch.html`;

                if (appLibrary[value.title]) {
                  document.getElementById(game).onclick = () => load(value);
                  document.getElementById('delete-' + game).onclick = () => deleteGame(value);
                }
              }
            }

            for (const app in defaultApps) {
              if (Object.hasOwnProperty.call(defaultApps, app)) {
                const value = defaultApps[app];
                document.getElementById(app).onclick = () => load(value);
              }
            }
            for (const app in apps) {
              if (Object.hasOwnProperty.call(apps, app)) {
                const value = apps[app];
                if (!value.link) value.link = `apps/${value.title}/Launch.html`;
                if (appLibrary[value.title]) {
                  document.getElementById(app).onclick = () => load(value);
                  document.getElementById('delete-' + app).onclick = () => deleteGame(value, 'app');
                }
              }
            }

            updateBr.style.display = 'initial';

            for (const game in games) {
              if (Object.hasOwnProperty.call(games, game)) {
                const value = games[game];
                if (appLibrary[value.title]) {
                  document.getElementById(game).addEventListener('contextmenu', (e) => {
                    e.preventDefault();
                    document.getElementById(`rmenu-${game}`).className = 'show';
                    document.getElementById(`rmenu-${game}`).style.top = mouseY(event) + 'px';
                    document.getElementById(`rmenu-${game}`).style.left = mouseX(event) + 'px';
                  });
                }
              }
            }
            for (const app in apps) {
              if (Object.hasOwnProperty.call(apps, app)) {
                const value = apps[app];
                if (appLibrary[value.title]) {
                  document.getElementById(app).addEventListener('contextmenu', (e) => {
                    e.preventDefault();
                    document.getElementById(`rmenu-${app}`).className = 'show';
                    document.getElementById(`rmenu-${app}`).style.top = mouseY(event) + 'px';
                    document.getElementById(`rmenu-${app}`).style.left = mouseX(event) + 'px';
                  });
                }
              }
            }
            for (const app in defaultApps) {
              if (Object.hasOwnProperty.call(defaultApps, app)) {
                const value = defaultApps[app];
                document.getElementById(app).addEventListener('contextmenu', (e) => {
                  e.preventDefault();
                });
              }
            }

            document.addEventListener('click', (e) => {
              for (const game in games) {
                if (Object.hasOwnProperty.call(games, game)) {
                  const value = games[game];
                  if (appLibrary[value.title]) document.getElementById(`rmenu-${game}`).className = 'hide';
                }
              }
              for (const app in apps) {
                if (Object.hasOwnProperty.call(apps, app)) {
                  const value = apps[app];
                  if (appLibrary[value.title]) document.getElementById(`rmenu-${app}`).className = 'hide';
                }
              }
            });
          });
      });
  });
