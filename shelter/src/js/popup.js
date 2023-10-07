import orphansArray from '../assets/jsons/pets.json';

document.addEventListener("DOMContentLoaded", function () {
  const SWIPER_LISTS = document.querySelectorAll('.swiper__pictures');
  const DARK_BACKGROUND = document.querySelector('.modal-background')
  const MODAL_ORPHANS = document.querySelector('.modal-aboutorphans')
  const CLOSE_BTN = document.querySelector('.modal-aboutorphans__closebtn')

  function openPopup(event) {
    const swiperItem = event.target.closest('.swiper__item')

    if (swiperItem) {
      const swiperTitle = swiperItem.querySelector('.swiper__title').innerHTML
      if (swiperTitle) {
        fillItemInfo(swiperTitle)
        event.preventDefault()
        DARK_BACKGROUND.classList.add('block')
        MODAL_ORPHANS.classList.add('is-active')

        const windowHeight = window.innerHeight;
        const windowWidth = window.innerWidth;

        const modalOrphansHeight = MODAL_ORPHANS.offsetHeight;
        const modalOrphansWidth = MODAL_ORPHANS.offsetWidth;

        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
        let top = scrollTop + (windowHeight - modalOrphansHeight) / 2;
        let left = scrollLeft + (windowWidth - modalOrphansWidth) / 2;


        MODAL_ORPHANS.style.top = top + 'px'
        MODAL_ORPHANS.style.left = left + 'px'
        DARK_BACKGROUND.style.top = scrollTop + 'px'
        CLOSE_BTN.addEventListener('click', closePopup)
        DARK_BACKGROUND.addEventListener('click', closePopup)
        changeBodyOverlay()
      }
    }
  }

  function fillItemInfo(currentCardTitle) {
    const TITLE_CARD = document.querySelector('.animalinfo__title');
    const SUBTITLE_CARD = document.querySelector('.animalinfo__subtitle');
    const ABOUT_ORPHAN_INFO = document.querySelector('.animalinfo__about');
    const ORPHAN_AGE = document.querySelector('.animalinfo__item-age');
    const ORPHAN_INOCULATIONS = document.querySelector('.animalinfo__item-inoculations');
    const ORPHAN_DISEASES = document.querySelector('.animalinfo__item-diseases');
    const ORPHAN_PARASITES = document.querySelector('.animalinfo__item-parasites');
    const ORPHAN_IMG = document.querySelector('.animalinfo__img');
    let filterOrphansArray = orphansArray.filter(el => el['name'] === currentCardTitle);
    let objOfFilterOrph = filterOrphansArray[0]

    TITLE_CARD.textContent = objOfFilterOrph['name'];
    SUBTITLE_CARD.textContent = objOfFilterOrph['type'] + ' - ' + objOfFilterOrph['breed'];
    ABOUT_ORPHAN_INFO.textContent = objOfFilterOrph['description'];
    ORPHAN_AGE.textContent = objOfFilterOrph['age'];
    ORPHAN_INOCULATIONS.textContent = objOfFilterOrph['inoculations'].join(', ')
    ORPHAN_DISEASES.textContent = objOfFilterOrph['diseases'].join(', ')
    ORPHAN_PARASITES.textContent = objOfFilterOrph['parasites'].join(', ')
    ORPHAN_IMG.src = objOfFilterOrph['src'];
    ORPHAN_IMG.alt = objOfFilterOrph['alt'];
  }

  function closePopup() {
    DARK_BACKGROUND.style.top = 0
    DARK_BACKGROUND.classList.remove('block')
    MODAL_ORPHANS.classList.remove('is-active')
    CLOSE_BTN.removeEventListener('click', closePopup)
    DARK_BACKGROUND.removeEventListener('click', closePopup)
    changeBodyOverlay()
  }

  function changeBodyOverlay() {
    const bodyStyleValue = window.getComputedStyle(document.body).overflowY;

    (bodyStyleValue === 'overlay') ? document.body.style.overflowY = 'hidden' : document.body.style.overflowY = 'overlay';
  }


  SWIPER_LISTS.forEach(list => list.addEventListener('click', openPopup));
});