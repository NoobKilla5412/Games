// Noob Killa's file
var data = {
  hasDoneIntro: false
};
function save() {
  if (!localStorage.getItem('pigFarmer')) {
    localStorage.setItem('pigFarmer', JSON.stringify(data));
  } else {
    data = {
      hasDoneIntro: hasDoneIntro
    }
    localStorage.setItem('pigFarmer', JSON.stringify(data));
  }
  console.log('Saved');
}
function load() {
  data = JSON.parse(localStorage.getItem('pigFarmer')) || data;
  hasDoneIntro = data.hasDoneIntro;
}