const themeButtonArray = document.querySelectorAll('.switch');
const page = document.querySelector('.page');
const buttonOpenBurger = document.querySelector('.burger');
const popupBurger = document.querySelector('.popup_role_burger');
const buttonCloseBurger = popupBurger.querySelector('.popup__close');

let userTheme = localStorage.getItem('theme') || '';
let isUserPrefersDarkMode = false;

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

document.addEventListener('DOMContentLoaded', () => {
  findAppearance();
});

themeButtonArray.forEach((item) =>
  item.addEventListener('click', () => {
    toggleTheme();
  })
);

const openPopup = (popup) => popup.classList.add('popup_active');
const closePopup = (popup) => popup.classList.remove('popup_active');

buttonOpenBurger.addEventListener('click', () => openPopup(popupBurger));
buttonCloseBurger.addEventListener('click', () => closePopup(popupBurger));
