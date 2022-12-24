const themeButtonArray = document.querySelectorAll('.switch');
const page = document.querySelector('.page');
const buttonOpenBurger = document.querySelector('.burger');
const popupBurger = document.querySelector('.popup_role_burger');
const buttonCloseBurger = popupBurger.querySelector('.popup__close');
const subscriptionForm = document.querySelector('.subscription__form');
const subscriptionInput = subscriptionForm.querySelector('.subscription__input');
const subscriptionButton = subscriptionForm.querySelector('.subscription__button');
const slider = document.querySelector('.section__wrapper_position_surface');
const sliderContent = slider.querySelector('.surface__slider_role_content');
const sliderImage = slider.querySelector('.surface__slider_role_image');
const slidesContentArray = sliderContent.querySelectorAll('.surface__slider-item');
const slidesImageArray = sliderImage.querySelectorAll('.surface__slider-item');
const sliderBtnPrev = slider.querySelector('.surface__button_direction_prev');
const sliderBtnNext = slider.querySelector('.surface__button_direction_next');
const bicycles = document.querySelector('.bicycles');
const bicyclesWrapper = bicycles.querySelector('.section__wrapper_position_bicycles');
const bicyclesSelect = bicycles.querySelector('.bicycles__select');
const bicyclesCards = bicycles.querySelectorAll('.bicycles__card');
const bicyclesItemsArray = bicycles.querySelectorAll('.bicycles__feed-item');
const bicyclesHighwayArray = bicycles.querySelectorAll('#highway');
const bicyclesGravelArray = bicycles.querySelectorAll('#gravel');
const bicyclesTtArray = bicycles.querySelectorAll('#tt');
const paginationTemplate = document.querySelector('#pagination').content.querySelector('.bicycles__pagination');
const mediaQueryPhone = window.matchMedia('(max-width: 768px)');
let userTheme = localStorage.getItem('theme') || '';
let isUserPrefersDarkMode = false;
let activeSlide = 0;
let paginationActive = 0;
let bicyclesIndex = 'highway';
const setTheme = (theme) => {
  localStorage.setItem('theme', theme);
  userTheme = theme;
  if (theme === 'dark') {
    page.classList.remove('page_theme_light');
    themeButtonArray.forEach((item) => item.classList.add('switch_active'));
  } else {
    page.classList.remove('page_theme_dark');
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
  slidesContentArray.forEach(item => item.classList.remove(activeClass));
  slidesImageArray.forEach(item => item.classList.remove(activeClass));
  slidesContentArray[slide].classList.add(activeClass);
  slidesImageArray[slide].classList.add(activeClass);
};
const moveContentSlider = (slide) => {
  return `translateX(calc(100% * ${slide} * -1)`;
};
const moveImageSlider = (slide) => {
  return `translateX(calc((50% + 20px) * ${slide} * -1)`;
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
    activeSlide++;
  }
  openSlide(activeSlide);
};
const slidePrev = (amount, position = 0) => {
  if (position === 0) {
    activeSlide = amount - 1;
  }
  if (position >= 1 && position < amount) {
    activeSlide--;
  }
  openSlide(activeSlide);
};
const changeBicyclesIndex = (index) => {
  bicyclesIndex = index;
};
const setPaginationActiveItem = (element) => {

}
const changeBicyclesActiveClass = (array, index, parent) => {
  if (parent === true) {
    array.forEach(item => {
      if (item.id === index) {
        item.classList.add('bicycles__feed-item_active');
      } else {
        item.classList.remove('bicycles__feed-item_active');
      }
    });
  } else {
    array.forEach(item => {
      if (item.id === index) {
        const bicyclesArray = item.querySelectorAll('.bicycles__item');
        bicyclesArray[paginationActive].classList.add('bicycles__item_active');
      } else {
        item.classList.remove('bicycles__item_active');
      }
    })
  }
};
const changeBicyclesActiveSlide = () => {

};
document.addEventListener('DOMContentLoaded', () => {
  findAppearance();
  changeBicyclesActiveClass(bicyclesItemsArray, bicyclesIndex, true);
  if (mediaQueryPhone.matches) {
    changeBicyclesActiveClass(bicyclesItemsArray, bicyclesIndex, false);
  }
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
bicyclesSelect.addEventListener('change', (e) => {
  changeBicyclesIndex(e.target.value);
  changeBicyclesActiveClass(bicyclesItemsArray, bicyclesIndex);
});
