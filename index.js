"use strict";
// Light / Dark page controls
const lightDarkModeBtnToggle = document.querySelector(".site-theme-switch-btn");

lightDarkModeBtnToggle.addEventListener("click", () => {
  const body = document.body;
  const currentTheme = body.getAttribute("data-theme");

  const icons = lightDarkModeBtnToggle.querySelectorAll("i");
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

// --- CONTACT FORM VALIDATION & OBJECT CREATION ---
const contactForm = document.getElementById("contact-form");

contactForm.addEventListener("submit", function (e) {
  e.preventDefault();

  // Clear previous error messages
  document
    .querySelectorAll(".error-msg")
    .forEach((el) => (el.textContent = ""));

  // Grab field values
  const fullName = document.getElementById("fullname").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const message = document.getElementById("message").value.trim();

  const prefRadio = document.querySelector(
    'input[name="contact-pref"]:checked',
  );

  const preference = prefRadio ? prefRadio.value : "";

  let isValid = true;

  // Regex patterns
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const phoneRegex =
    /^(?:\+?[1-9]\d{1,14}|\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4})$/;

  // Validate Full Name
  if (fullName === "") {
    document.getElementById("error-fullname").textContent =
      "Full name is required.";
    isValid = false;
  }

  // Validate Preferred Contact Method
  if (preference === "") {
    document.getElementById("error-pref").textContent =
      "Please choose email or phone as your preferred contact method.";
    isValid = false;
  }

  // Validate Email
  if (email === "") {
    if (preference === "email") {
      document.getElementById("error-email").textContent =
        "Email is required since you chose email preference.";
      isValid = false;
    }
  } else if (!emailRegex.test(email)) {
    document.getElementById("error-email").textContent =
      "Please enter a valid email address (e.g., name@domain.com).";
    isValid = false;
  }

  // Validate Phone
  if (preference === "phone") {
    if (phone === "") {
      document.getElementById("error-phone").textContent =
        "Phone number is required when phone contact is selected.";
      isValid = false;
    } else if (!phoneRegex.test(phone)) {
      document.getElementById("error-phone").textContent =
        "Please enter a valid phone number format.";
      isValid = false;
    }
  } else if (phone !== "" && !phoneRegex.test(phone)) {
    document.getElementById("error-phone").textContent =
      "Please enter a valid phone number format.";
    isValid = false;
  }

  // Validate Comments / Message
  if (message === "") {
    document.getElementById("error-message").textContent =
      "Comments/message are required.";
    isValid = false;
  }

  // If valid, create customer object and display success info
  if (isValid) {
    const customer = {
      fullName: fullName,
      email: email ? email : "N/A",
      phone: phone ? phone : "N/A",
      message: message,
      preference: preference,
    };

    // Hide form and show success message with object data
    contactForm.style.display = "none";

    const successBox = document.getElementById("form-success-box");
    const infoList = document.getElementById("submitted-info-list");

    infoList.innerHTML = `
      <li><strong>Name:</strong> ${customer.fullName}</li>
      <li><strong>Email:</strong> ${customer.email}</li>
      <li><strong>Phone:</strong> ${customer.phone}</li>
      <li><strong>Preferred Contact:</strong> ${customer.preference}</li>
      <li><strong>Message:</strong> ${customer.message}</li>
    `;

    successBox.style.display = "flex";

    // Reset form data internally
    contactForm.reset();
  }
});

const anotherMessageButton = document.querySelector(".another-message-btn");
const successBox = document.getElementById("form-success-box");

anotherMessageButton.addEventListener("click", function () {
  // Hide success message and show the form again
  successBox.style.display = "none";
  contactForm.style.display = "flex";

  // Reset the form for a new message
  contactForm.reset();

  // Clear any previous error messages
  document
    .querySelectorAll(".error-msg")
    .forEach((el) => (el.textContent = ""));

  // Place focus on the first field
  document.getElementById("fullname").focus();
});

// --- SHOPPING CART & COST CALCULATOR LOGIC ---
let cart = [];

// Cache DOM elements globally using querySelector
const cartTriggers = document.querySelectorAll(".shopping-cart");
const cartPopup = document.querySelector("#cartPopup");
const cartCloseBtn = document.querySelector(".cart-close-btn");
const container = document.querySelector("#cart-items-container");
const subtotalEl = document.querySelector("#cart-subtotal");
const taxEl = document.querySelector("#cart-tax");
const totalEl = document.querySelector("#cart-total");
const checkoutMsg = document.querySelector(".checkout-msg-box");
const checkoutBtn = document.querySelector("#checkout-btn");

// Toggle Cart Popup Open/Close
cartTriggers.forEach((btn) =>
  btn.addEventListener("click", () => cartPopup.classList.add("open")),
);
cartCloseBtn.addEventListener("click", () =>
  cartPopup.classList.remove("open"),
);
cartPopup.addEventListener("click", (e) => {
  if (e.target === cartPopup) cartPopup.classList.remove("open");
});

// Grab product items from the #games section dynamically
document.querySelectorAll(".saga-card").forEach((card) => {
  const title = card.querySelector(".game-title").textContent;
  const price = parseFloat(
    card
      .querySelector(".cart-btn span:last-child")
      .textContent.replace(/[^0-9.]/g, ""),
  );

  card.querySelector(".cart-btn").addEventListener("click", () => {
    if (cart.some((item) => item.name === title)) {
      checkoutMsg.style.display = "block";
      checkoutMsg.innerHTML = `<p>"${title}" is already in your cart!</p>`;
      cartPopup.classList.add("open");
      return;
    }

    cart.push({ name: title, price: price });
    updateCartDisplay();
    cartPopup.classList.add("open");
  });
});

function updateCartDisplay() {
  updateCartCount();

  if (!checkoutMsg.innerHTML.includes("already in your cart")) {
    checkoutMsg.style.display = "none";
  }

  if (cart.length === 0) {
    container.innerHTML = `<p class="empty-cart-msg">Your cart is currently empty.</p>`;
    subtotalEl.textContent = "$0.00";
    taxEl.textContent = "$0.00";
    totalEl.textContent = "$0.00";
    return;
  }

  // Render items
  container.innerHTML = "";
  let subtotal = 0;

  cart.forEach((item, index) => {
    subtotal += item.price;
    const row = document.createElement("div");
    row.className = "cart-item-row";
    row.innerHTML = `
      <span>${item.name}</span>
      <div class="cart-item-details">
        <span>$${item.price.toFixed(2)}</span>
        <button class="cart-item-remove" data-index="${index}" title="Remove item">&times;</button>
      </div>
    `;
    container.appendChild(row);
  });

  // Attach event listeners to remove buttons
  container.querySelectorAll(".cart-item-remove").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      cart.splice(parseInt(e.target.dataset.index), 1);
      updateCartDisplay();
    });
  });

  // Calculations
  const tax = subtotal * 0.08;
  subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
  taxEl.textContent = `$${tax.toFixed(2)}`;
  totalEl.textContent = `$${(subtotal + tax).toFixed(2)}`;
}

// Function to update item count on all cart buttons/icons
function updateCartCount() {
  cartTriggers.forEach((btn) => {
    let badge = btn.querySelector(".cart-count-badge");
    if (cart.length > 0) {
      if (!badge) {
        badge = document.createElement("span");
        badge.className = "cart-count-badge";
        btn.appendChild(badge);
      }
      badge.textContent = cart.length;
    } else if (badge) {
      badge.remove();
    }
  });
}

// Checkout button handler
checkoutBtn.addEventListener("click", () => {
  if (cart.length === 0) {
    checkoutMsg.style.display = "block";
    checkoutMsg.innerHTML = `<p>Your cart is empty! Please add a game before checking out.</p>`;
    return;
  }

  const subtotal = cart.reduce((sum, item) => sum + item.price, 0);
  const grandTotal = subtotal + subtotal * 0.08;

  // Extract all item names into a comma-separated string
  const itemNames = cart.map((item) => item.name).join(", ");

  checkoutMsg.style.display = "block";
  checkoutMsg.innerHTML = `
    <h4>Thank You for Your Order!</h4>
    <p><strong>Items ordered:</strong> ${itemNames}</p>
    <p>Total cost: <strong>$${grandTotal.toFixed(2)}</strong> (Includes tax).</p>
  `;

  cart = [];
  updateCartCount();
  subtotalEl.textContent = "$0.00";
  taxEl.textContent = "$0.00";
  totalEl.textContent = "$0.00";
  container.innerHTML = `<p class="empty-cart-msg">Your cart is currently empty.</p>`;
});
