// Vars - Snowman/Noob Killa
var slideNum = 1;
var hasDoneIntro = false;
load();
if (!hasDoneIntro) {
  document.getElementById('slide1').style.display = 'block';
  document.getElementById('next').style.display = 'block';
} else {
  document.getElementById('menu').style.display = 'block';
}
setInterval(() => {
  save();
}, 2500);