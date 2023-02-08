// Noob Killa's file
document.getElementById('next').addEventListener('click', (e) => {
  slideNum++;
  document.getElementById('slide1').style.display = 'none';
  if (slideNum == 2) {
    document.getElementById('slide2').style.display = 'block';
    screen = 'slide2';
  } else if (slideNum > 2) {
    document.getElementById('slide2').style.display = 'none';
    document.getElementById('menu').style.display = 'block';
    document.getElementById('next').style.display = 'none';
    if (options.music)
      music.menu[0].play();
    hasDoneIntro = true;
    localStorage.setItem('hasDonePigIntro', hasDoneIntro);
  }
});

document.getElementById('start').addEventListener('click', (e) => {
  document.getElementById('menu').style.display = 'none';
  document.getElementById('saves').style.display = 'block';
});

document.getElementById('save1').addEventListener('click', (e) => {
  id = 0;
  load(id);
});
document.getElementById('save2').addEventListener('click', (e) => {
  id = 1;
  load(id);
});
document.getElementById('save3').addEventListener('click', (e) => {
  id = 2;
  load(id);
});
document.getElementById('credits').addEventListener('click', (e) => {
  document.getElementById('menu').style.display = 'none';
  document.getElementById('creditsScreen').style.display = 'block';
});
document.getElementById('options').addEventListener('click', (e) => {
  document.getElementById('menu').style.display = 'none';
  document.getElementById('optionsScreen').style.display = 'block';
});
document.getElementById('music').addEventListener('click', (e) => {
  if (!options.music) {
    options.music = true;
    music.menu[0].stop();
    music.menu[0].play();
  } else {
    options.music = false;
    music.menu[0].stop();
  }
  saveOptions();
});

document.addEventListener('keydown', (e) => {
  if (e.key == 'Escape') {
    clearInterval(interval);
    if (loaded) {
      save(id);
      music.menu[0].stop();
      if (options.music) {
        music.menu[0].play();
      }
      loaded = false;
    }
    document.getElementById('game').style.display = 'none';
    document.getElementById('creditsScreen').style.display = 'none';
    document.getElementById('optionsScreen').style.display = 'none';
    document.getElementById('saves').style.display = 'none';
    document.getElementById('menu').style.display = 'block';
  }
});

const maxButton = document.getElementById('max');
maxButton.addEventListener('click', (e) => {
  if (upgradeType == 'x1') {
    upgradeType = 'max';
    maxButton.innerHTML = 'Max';
  } else if (upgradeType == 'max') {
    upgradeType = 'x1';
    maxButton.innerHTML = 'x1';
  }
});