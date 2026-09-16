(() => {
  // <stdin>
  document.addEventListener("DOMContentLoaded", function() {
    const cards = document.querySelectorAll(".illustration-card");
    const lightbox = document.getElementById("illustration-lightbox");
    const image = document.getElementById("lightbox-image");
    const title = document.getElementById("lightbox-title");
    const closeButton = document.querySelector(".lightbox-close");
    if (!lightbox || !image || !title || !closeButton) {
      return;
    }
    cards.forEach(function(card) {
      card.addEventListener("click", function() {
        image.src = card.dataset.image;
        image.alt = card.dataset.title;
        title.textContent = card.dataset.title;
        lightbox.classList.add("is-open");
        lightbox.setAttribute("aria-hidden", "false");
      });
    });
    closeButton.addEventListener("click", function() {
      lightbox.classList.remove("is-open");
      lightbox.setAttribute("aria-hidden", "true");
      image.src = "";
    });
    lightbox.addEventListener("click", function(event) {
      if (event.target === lightbox) {
        lightbox.classList.remove("is-open");
        lightbox.setAttribute("aria-hidden", "true");
        image.src = "";
      }
    });
    document.addEventListener("keydown", function(event) {
      if (event.key === "Escape") {
        lightbox.classList.remove("is-open");
        lightbox.setAttribute("aria-hidden", "true");
        image.src = "";
      }
    });
  });
})();
