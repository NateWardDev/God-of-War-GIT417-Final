// Light / Dark page controls
const lightDarkModeBtnToggle = document.querySelectorAll(
  ".site-theme-switch-btn",
);

lightDarkModeBtnToggle.forEach((btn) => {
  btn.addEventListener("click", () => {
    const body = document.body;
    const currentTheme = body.getAttribute("data-theme");

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

// Simple Lightbox Effect for Gallery Images
const galleryCards = document.querySelectorAll(".gallery-card img");

// Create lightbox container dynamically
const lightbox = document.createElement("div");
lightbox.id = "image-lightbox";
lightbox.style.cssText = `
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s ease;
`;

const lightboxImg = document.createElement("img");
lightboxImg.style.cssText = `
  max-width: 90%;
  max-height: 90vh;
  object-fit: contain;
  border-radius: 8px;
  box-shadow: 0 0 30px rgba(0,0,0,0.8);
`;

lightbox.appendChild(lightboxImg);
document.body.appendChild(lightbox);

galleryCards.forEach((img) => {
  img.addEventListener("click", () => {
    lightboxImg.src = img.src;
    lightbox.style.opacity = "1";
    lightbox.style.pointerEvents = "auto";
  });
});

lightbox.addEventListener("click", () => {
  lightbox.style.opacity = "0";
  lightbox.style.pointerEvents = "none";
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
