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
