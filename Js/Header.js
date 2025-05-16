document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".main-nav");
  const overlay = document.querySelector(".nav-overlay");
  const closeBtn = document.querySelector(".close-nav");

  function closeNav() {
    nav.classList.remove("nav-open");
    menuToggle.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    overlay.classList.remove("active");
  }

  if (menuToggle && nav && overlay) {
    menuToggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("nav-open");
      menuToggle.classList.toggle("open");
      menuToggle.setAttribute("aria-expanded", isOpen);
      overlay.classList.toggle("active", isOpen);
    });

    overlay.addEventListener("click", closeNav);

    if (closeBtn) {
      closeBtn.addEventListener("click", closeNav);
    }

    nav.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", closeNav);
    });
  }
  document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeNav();
});
});
