// Animation.js
document.addEventListener("DOMContentLoaded", () => {

  // -- Gallery lightbox logic --
  const galleryLinks = Array.from(document.querySelectorAll(".gallery-link"));
  let currentIndex = 0;

  // Remove only the modal element
  function removeModalElement() {
    const existing = document.querySelector(".gallery-modal");
    if (existing) existing.remove();
  }

  // Open modal at a given index
  function openModal(index) {
    removeModalElement();
    const link = galleryLinks[index];
    const {
      href,
      dataset: { caption = "" },
    } = link;

    const modal = document.createElement("div");
    modal.className = "gallery-modal";
    modal.innerHTML = `
      <div class="gallery-modal-content">
        <button class="gallery-close" aria-label="Close">×</button>
        <img src="${href}" alt="">
        ${caption ? `<p>${caption}</p>` : ""}
      </div>
    `;
    document.body.appendChild(modal);

    // close on × button or outside click
    modal
      .querySelector(".gallery-close")
      .addEventListener("click", removeModalElement);
    modal.addEventListener("click", (e) => {
      if (e.target === modal) removeModalElement();
    });
  }

  // Delegate click on any thumbnail
  document.body.addEventListener("click", (e) => {
    const link = e.target.closest(".gallery-link");
    if (!link) return;
    e.preventDefault();
    currentIndex = galleryLinks.indexOf(link);
    openModal(currentIndex);
  });

  // Global keydown: Esc to close, ←/→ to navigate
  document.addEventListener("keydown", (e) => {
    if (!document.querySelector(".gallery-modal")) return;
    if (e.key === "Escape") {
      removeModalElement();
    } else if (e.key === "ArrowRight") {
      currentIndex = (currentIndex + 1) % galleryLinks.length;
      openModal(currentIndex);
    } else if (e.key === "ArrowLeft") {
      currentIndex =
        (currentIndex - 1 + galleryLinks.length) % galleryLinks.length;
      openModal(currentIndex);
    }
  });
});
