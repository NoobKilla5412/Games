// Vars - Snowman/Noob Killa
var slideNum = 1;
var hasDoneIntro = parseBool(localStorage.getItem('hasDonePigIntro'));
var id = 0;
var screen = 'slide1';
load();
if (!hasDoneIntro) {
  document.getElementById('slide1').style.display = 'block';
  document.getElementById('next').style.display = 'block';
} else {
  document.getElementById('menu').style.display = 'block';
  music.menu[0].play();
}
setInterval(() => {
  save(id);
}, 2500);