// Vars - Snowman/Noob Killa
var slideNum = 1;
var hasDoneIntro = parseBool(localStorage.getItem('hasDonePigIntro'));
var id = 0;
var screen = 'slide1';
var money = 0;
var upgradeType = 'x1';
loadOptions(id);
// /Vars
if (!hasDoneIntro) {
  document.getElementById('slide1').style.display = 'block';
  document.getElementById('next').style.display = 'block';
} else {
  document.getElementById('menu').style.display = 'block';
  if (options.music)
    music.menu[0].play();
}