
// show features menu
document.querySelector('.hamburger-btn').addEventListener('click',() => {
document.querySelector('.features').classList.remove('hide');
});

document.querySelector('.features').addEventListener('click',(e) => {
  if (e.target.className == 'features') {
    document.querySelector('.features').classList.add('hide');

  }
});

// dropdown
const dropdownBtn = document.querySelectorAll('.dropdown-btn');
const dropdownContent = document.querySelectorAll('.dropdown-content');

dropdownBtn.forEach((btn,i)=> {
  dropdownContent[i].classList.add('hide');
  btn.addEventListener('click',(e) => {
   dropdownContent[i].classList.toggle('hide');
  });
});
