load();
var slideNum = 1;
if (!hasDoneIntro) {
  document.getElementById('slide1').style.display = 'block';
  document.getElementById('next').style.display = 'block';
} else {
  document.getElementById('menu').style.display = 'block';
}

document.getElementById('next').addEventListener('click', (e) => {
  slideNum++;
  document.getElementById('slide1').style.display = 'none';
  if (slideNum == 2)
    document.getElementById('slide2').style.display = 'block';
  else if (slideNum > 2) {
    document.getElementById('slide2').style.display = 'none';
    document.getElementById('menu').style.display = 'block';
    document.getElementById('next').style.display = 'none';
    hasDoneIntro = true;
    save();
  }
});
setInterval(() => {
  save();
}, 2500);