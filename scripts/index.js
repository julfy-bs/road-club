const appearance = document.querySelector('.appearance');
const modeButton = appearance.querySelector('.switch');
const page = document.querySelector('.page');

let userTheme = localStorage.getItem('theme') || '';
let isUserPrefersDarkMode = false;
const setTheme = (theme) => {
  localStorage.setItem('theme', theme);
  userTheme = theme;
  if (theme === 'dark') {
    page.classList.remove('page_theme_light');
    modeButton.classList.add('switch_active');
  } else {
    page.classList.remove('page_theme_dark');
    modeButton.classList.remove('switch_active');
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

modeButton.addEventListener('click', () => {
  toggleTheme();
});
