// Noob Killa's file
var data = [
]
function save(id) {
  if (!localStorage.getItem('pigFarmer')) {
    localStorage.setItem('pigFarmer', JSON.stringify(data));
  } else {
    data = [
    ]
    localStorage.setItem('pigFarmer', JSON.stringify(data));
    localStorage.setItem('hasDonePigIntro', hasDoneIntro);
  }
  console.log('Saved');
}
function load(id) {
  data = JSON.parse(localStorage.getItem('pigFarmer')) || data;
}
function newSave(id) {
  if (!localStorage.getItem('pigFarmer')) {
    localStorage.setItem('pigFarmer', JSON.stringify(data));
  } else {
    data = [
    ]
    localStorage.setItem('pigFarmer', JSON.stringify(data));
    localStorage.setItem('hasDonePigIntro', hasDoneIntro);
  }
  console.log('Saved');
}