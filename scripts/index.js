const themeButtonArray = document.querySelectorAll('.switch');
const page = document.querySelector('.page');
const buttonOpenBurger = document.querySelector('.burger');
const popupBurger = document.querySelector('.popup_role_burger');
const buttonCloseBurger = popupBurger.querySelector('.popup__close');
const subscriptionForm = document.querySelector('.subscription__form');
const subscriptionInput = subscriptionForm.querySelector('.subscription__input');
const subscriptionButton = subscriptionForm.querySelector('.subscription__button');
const slider = document.querySelector('.surface__wrapper');
const sliderContent = slider.querySelector('.surface__slider_role_content');
const sliderImage = slider.querySelector('.surface__slider_role_image');
const slidesContentArray = sliderContent.querySelectorAll('.surface__slider-item');
const slidesImageArray = sliderImage.querySelectorAll('.surface__slider-item');
const sliderBtnPrev = slider.querySelector('.surface__button_direction_prev');
const sliderBtnNext = slider.querySelector('.surface__button_direction_next');
const bicycles = document.querySelector('.bicycles');
const bicyclesButtons = bicycles.querySelectorAll('.bicycles__button');
const bicyclesSelect = bicycles.querySelector('.bicycles__select');
const bicyclesItemsArray = bicycles.querySelectorAll('.bicycles__feed-item');
const bicyclesHighwayArray = bicycles.querySelector('#highway').querySelectorAll('.bicycles__item');
const bicyclesGravelArray = bicycles.querySelector('#gravel').querySelectorAll('.bicycles__item');
const bicyclesTtArray = bicycles.querySelector('#tt').querySelectorAll('.bicycles__item');
const paginationWrapper = document.querySelectorAll('.bicycles__pagination');
const paginationItems = document.querySelectorAll('.bicycles__pagination-item');
const mediaQueryPhone = 768;
let userTheme = localStorage.getItem('theme') || '';
let isUserPrefersDarkMode = false;
let activeSlide = 0;
let paginationActiveSlide = 0;
let bicyclesIndex = 'highway';
let activeBicyclesArray = bicyclesHighwayArray;
const setTheme = (theme) => {
  localStorage.setItem('theme', theme);
  userTheme = theme;
  if (theme === 'dark') {
    page.classList.remove('page_theme_light');
    themeButtonArray.forEach((item) => item.setAttribute('aria-checked', 'true'));
    themeButtonArray.forEach((item) => item.classList.add('switch_active'));
  } else {
    page.classList.remove('page_theme_dark');
    themeButtonArray.forEach((item) => item.setAttribute('aria-checked', 'false'));
    themeButtonArray.forEach((item) => item.classList.remove('switch_active'));
  }
  page.classList.add(`page_theme_${theme}`);
};
const toggleTheme = () => {
  if (userTheme === 'light') {
    setTheme('dark');
  } else {
    setTheme('light');
  }
};
const setPreferenceTheme = () => {
  isUserPrefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
  if (isUserPrefersDarkMode) {
    userTheme = 'dark';
    setTheme('dark');
  } else {
    userTheme = 'light';
    setTheme('light');
  }
};
const setPresetTheme = (presetTheme) => {
  setTheme(presetTheme);
};
const findAppearance = () => {
  if (userTheme === '') {
    setPreferenceTheme();
  } else {
    setPresetTheme(userTheme);
  }
};
const openPopup = (popup) => popup.classList.add('popup_active');
const closePopup = (popup) => popup.classList.remove('popup_active');
const setSlideActive = (slide) => {
  const activeClass = 'surface__slider-item_active';
  slidesContentArray.forEach((item) => item.classList.remove(activeClass));
  slidesImageArray.forEach((item) => item.classList.remove(activeClass));
  slidesContentArray[slide].classList.add(activeClass);
  slidesImageArray[slide].classList.add(activeClass);
};
const moveContentSlider = (slide) => `translateX(calc(100% * ${slide} * -1)`;
const moveImageSlider = (slide) => {
  const gap = '40px';
  return `translateX(calc((50% + 10px + (${gap} / 2)) * ${slide} * -1)`;
};
const openSlide = (slide) => {
  setSlideActive(slide);
  sliderContent.style.transform = moveContentSlider(slide);
  sliderImage.style.transform = moveImageSlider(slide);
};
const slideNext = (amount, position) => {
  if (position === amount - 1) {
    activeSlide = 0;
  }
  if (position >= 0 && position < amount - 1) {
    activeSlide += 1;
  }
  openSlide(activeSlide);
};
const slidePrev = (amount, position = 0) => {
  if (position === 0) {
    activeSlide = amount - 1;
  }
  if (position >= 1 && position < amount) {
    activeSlide -= 1;
  }
  openSlide(activeSlide);
};
const changeBicyclesIndex = (index) => {
  bicyclesIndex = index;
};
const changeBicyclesActiveArray = (index) => {
  if (index === 'highway') {
    activeBicyclesArray = bicyclesHighwayArray;
  }
  if (index === 'gravel') {
    activeBicyclesArray = bicyclesGravelArray;
  }
  if (index === 'tt') {
    activeBicyclesArray = bicyclesTtArray;
  }
};
const changeBicyclesActiveClass = (array, index, parent) => {
  if (parent) {
    array.forEach((item) => {
      if (item.id === index) {
        item.classList.add('bicycles__feed-item_active');
      } else {
        item.classList.remove('bicycles__feed-item_active');
      }
    });
  }
  if (!parent) {
    array.forEach((item, arrayIndex) => {
      item.classList.remove('bicycles__item_active');
      if (arrayIndex === paginationActiveSlide) {
        item.classList.add('bicycles__item_active');
      }
    });
  }
};
const setInitialPaginationActiveClass = () => {
  [...paginationWrapper].forEach((item) => {
    [...item.children].forEach((inner) =>
      inner.classList.remove('bicycles__pagination-item_active')
    );
    [...item.children][0].classList.add('bicycles__pagination-item_active');
  });
};
const setPaginationActiveSlide = (target) => {
  const array = target.closest('.bicycles__pagination');
  const elements = [...array.children];
  elements.forEach((item) => item.classList.remove('bicycles__pagination-item_active'));
  target.classList.add('bicycles__pagination-item_active');
  paginationActiveSlide = elements.findIndex((item) =>
    item.classList.value.includes('bicycles__pagination-item_active')
  );
};
const setPagination = (query) => {
  changeBicyclesActiveClass(activeBicyclesArray, bicyclesIndex, false);
  if (window.innerWidth <= query) {
    setInterval(() => {
      // TODO: добавить автоматическую прокрутку
      // console.log('крутись');
    }, 5000);
  }
};
const setButtonActiveClass = (target) => {
  bicyclesButtons.forEach((item) => item.classList.remove('bicycles__button_active'));
  if (bicyclesIndex === target.attributes['data-name'].value) {
    target.classList.add('bicycles__button_active');
  }
};
const listenBicyclesSelect = (e) => {
  paginationActiveSlide = 0;
  setInitialPaginationActiveClass();
  changeBicyclesIndex(e.target.value);
  changeBicyclesActiveArray(e.target.value);
  changeBicyclesActiveClass(bicyclesItemsArray, bicyclesIndex, true);
  setPagination(mediaQueryPhone);
};
const listenPaginationItem = (e) => {
  setPaginationActiveSlide(e.currentTarget);
  changeBicyclesActiveClass(activeBicyclesArray, bicyclesIndex, false);
};
const listenBicyclesButtons = (e) => {
  changeBicyclesIndex(e.target.attributes['data-name'].value);
  setButtonActiveClass(e.target);
  changeBicyclesActiveClass(bicyclesItemsArray, bicyclesIndex, true);
};
document.addEventListener('DOMContentLoaded', () => {
  findAppearance();
  changeBicyclesActiveClass(bicyclesItemsArray, bicyclesIndex, true);
  setInitialPaginationActiveClass();
  setPagination(mediaQueryPhone);
});
themeButtonArray.forEach((item) => {
  item.addEventListener('click', () => {
    toggleTheme();
  });
});
buttonOpenBurger.addEventListener('click', () => openPopup(popupBurger));
buttonCloseBurger.addEventListener('click', () => closePopup(popupBurger));
subscriptionForm.addEventListener('submit', (e) => {
  e.preventDefault();
  subscriptionInput.value = 'Круто!';
  subscriptionInput.blur();
  subscriptionButton.blur();
  setTimeout(() => {
    subscriptionInput.value = '';
  }, 5000);
});
sliderBtnPrev.addEventListener('click', () => slidePrev(slidesContentArray.length, activeSlide));
sliderBtnNext.addEventListener('click', () => slideNext(slidesContentArray.length, activeSlide));
bicyclesSelect.addEventListener('change', listenBicyclesSelect);
paginationItems.forEach((item) => item.addEventListener('click', listenPaginationItem));
bicyclesButtons.forEach((item) => item.addEventListener('click', listenBicyclesButtons));
