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
    music.menu[0].play();
    hasDoneIntro = true;
    save();
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