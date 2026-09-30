// Light / Dark page controls
const lightDarkModeBtnToggle = document.querySelectorAll(
  ".site-theme-switch-btn",
);

lightDarkModeBtnToggle.forEach((btn) => {
  btn.addEventListener("click", () => {
    const body = document.body;
    const currentTheme = body.getAttribute("data-theme");

    const icons = btn.querySelectorAll("i");
    // Toggle the 'active' class on each child
    icons.forEach((icon) => {
      icon.classList.toggle("active");
    });

    // Toggle between dark and light
    if (currentTheme === "dark") {
      body.setAttribute("data-theme", "light");
      localStorage.setItem("theme", "light");
    } else {
      body.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
    }
  });
});

// Optional: Load saved theme preference on page load
window.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    document.body.setAttribute("data-theme", savedTheme);
  }
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

const menuHandler = () => {
  const [openBtn, closeBtn] = hamMenu.children;

  openBtn.classList.toggle("active");
  closeBtn.classList.toggle("active");
  overlayNav.classList.toggle("active");
  scrollNav.classList.toggle("menu-open");
};

hamMenu.addEventListener("click", menuHandler);

// close mobile nav when clicking on link
const scrollNavLinks = document.querySelectorAll(".overlay-menu a");
scrollNavLinks.forEach((link) => {
  link.addEventListener("click", menuHandler);
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

// Character Section Tab Controller
const charNavBtns = document.querySelectorAll(".char-nav-btn");
const charPanels = document.querySelectorAll(".char-panel");

const charSwitchHandler = (e) => {
  const clickedBtn = e.target;
  const targetId = clickedBtn.getAttribute("data-target");

  // Remove active classes from all buttons and panels
  charNavBtns.forEach((btn) => btn.classList.remove("active"));
  charPanels.forEach((panel) => panel.classList.remove("active"));

  // Add active class to clicked button and target panel
  clickedBtn.classList.add("active");
  const targetPanel = document.getElementById(targetId);
  if (targetPanel) {
    targetPanel.classList.add("active");
  }
};

charNavBtns.forEach((button) => {
  button.addEventListener("click", charSwitchHandler);
});

// gallery expanded image
const lightbox = document.querySelector(".gallery-lightbox");
const lightboxImg = lightbox.querySelector("img");

document.querySelectorAll(".gallery-card").forEach((card) => {
  card.addEventListener("click", () => {
    const activeImg = card.querySelector("img");
    lightboxImg.src = activeImg.currentSrc || activeImg.src;
    lightbox.classList.add("active");
  });
});

// close on click
lightbox.addEventListener("click", () => {
  lightbox.classList.remove("active");
});

// footer items
document.addEventListener("DOMContentLoaded", () => {
  const reviewPanels = document.querySelectorAll(".review-panel");
  const dotButtons = document.querySelectorAll(".dot-btn");

  dotButtons.forEach((dot) => {
    dot.addEventListener("click", () => {
      const targetIndex = dot.getAttribute("data-index");

      // Remove active class from all panels and dots
      reviewPanels.forEach((panel) => panel.classList.remove("active"));
      dotButtons.forEach((btn) => btn.classList.remove("active"));

      // Add active class to target panel and dot
      const activePanel = document.querySelector(
        `.review-panel[data-index="${targetIndex}"]`,
      );
      if (activePanel) {
        activePanel.classList.add("active");
      }
      dot.classList.add("active");
    });
  });
});
