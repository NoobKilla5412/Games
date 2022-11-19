var data = {
  hasDoneIntro: false
};
function save() {
  if (!localStorage.getItem('pigFarmer')) {
    localStorage.setItem('pigFarmer', JSON.stringify(data));
  } else {
    data = {
      hasDoneIntro
    }
    localStorage.setItem('pigFarmer', JSON.stringify(data));
  }
}
function load() {
  data = JSON.parse(localStorage.getItem('pigFarmer')) || data;
  hasDoneIntro = data.hasDoneIntro;
}