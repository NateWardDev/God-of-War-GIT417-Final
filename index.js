// light/ Dark page Controlls
const lightDarkModeBtnToggle = document.querySelectorAll(
  ".site-theme-switch-btn",
);

const themeSwitchHandler = (e) => {
  console.log(e);

  //   // 1. Correctly read the current theme from the dataset
  //   const currentTheme = document.body.dataset.theme;

  //   // 2. Correctly save the calculation to a new variable
  //   const newTheme = currentTheme === "dark" ? "light" : "dark";

  //   // 3. Apply the new theme to the <body> tag
  //   document.body.dataset.theme = newTheme;

  //   // 4. Save the preference to localStorage
  //   localStorage.setItem("theme", newTheme);
};

lightDarkModeBtnToggle.forEach((button) => {
  button.addEventListener("click", themeSwitchHandler);
});

// navigation controls
const topnav = document.querySelector(".topnav");
const scrollNav = document.querySelector(".scroll-nav");

const handleNavHide = () => {
  const topnavBottom = topnav.getBoundingClientRect().bottom;

  topnavBottom + 20 < 0
    ? scrollNav.classList.add("active")
    : scrollNav.classList.remove("active");
};

window.addEventListener("scroll", handleNavHide);

const hamMenu = document.querySelector(".menu-control-btn");
const overlayNav = document.querySelector(".overlay-menu");

hamMenu.addEventListener("click", () => {
  // switch button icon from menu lines to x
  const [openBtn, closeBtn] = hamMenu.children;

  openBtn.classList.toggle("active");
  closeBtn.classList.toggle("active");
  overlayNav.classList.toggle("active");
  scrollNav.classList.toggle("menu-open");
});

// header switch controls
const headerH1 = document.querySelectorAll(".head-text-container > div");
const headerText = document.querySelectorAll(".desc-text-container > div");
const headerBtns = document.querySelectorAll(".header-btn");
const headerImages = document.querySelectorAll(".header-img-bg");

const changeHeaderHandler = (e) => {
  const clickedBtn = e.target;

  // get indexes to set later
  const index = Array.from(headerBtns).indexOf(clickedBtn);

  // Loop through all sections and update classes
  headerBtns.forEach((btn) => btn.classList.remove("active"));
  headerImages.forEach((img) => img.classList.remove("active"));
  headerH1.forEach((h1) => h1.classList.remove("active"));
  headerText.forEach((txt) => txt.classList.remove("active"));

  // Add active class to the clicked items based on index
  clickedBtn.classList.add("active");
  headerImages[index].classList.add("active");
  headerH1[index].classList.add("active");
  headerText[index].classList.add("active");
};

headerBtns.forEach((button) => {
  button.addEventListener("click", changeHeaderHandler);
});

// popups for the game info section
const gameInfoBtns = document.querySelectorAll(".game-info");
const popups = document.querySelectorAll(".popup");
const closePopupBtns = document.querySelectorAll(".popup-close");

const popupHandler = (e, buttons, classControll) => {
  const clickedBtn = e.target;

  const index = Array.from(buttons).indexOf(clickedBtn);

  if (popups[index]) {
    popups[index].classList[classControll]("open");
  }
};

gameInfoBtns.forEach((button) => {
  button.addEventListener("click", (e) => {
    popupHandler(e, gameInfoBtns, "add");
  });
});

closePopupBtns.forEach((button) => {
  button.addEventListener("click", (e) => {
    popupHandler(e, closePopupBtns, "remove");
  });
});
