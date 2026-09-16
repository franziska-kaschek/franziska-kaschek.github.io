document.addEventListener("DOMContentLoaded", function () {
  const cards = document.querySelectorAll(".illustration-card");
  const lightbox = document.getElementById("illustration-lightbox");
  const image = document.getElementById("lightbox-image");
  const title = document.getElementById("lightbox-title");
  const closeButton = document.querySelector(".lightbox-close");

  /*
   * Illustration Lightbox
   */

  if (lightbox && image && title && closeButton) {
    cards.forEach(function (card) {
      card.addEventListener("click", function () {
        image.src = card.dataset.image;
        image.alt = card.dataset.title;
        title.textContent = card.dataset.title;

        lightbox.classList.add("is-open");
        lightbox.setAttribute("aria-hidden", "false");
      });
    });

    closeButton.addEventListener("click", function () {
      lightbox.classList.remove("is-open");
      lightbox.setAttribute("aria-hidden", "true");
      image.src = "";
    });

    lightbox.addEventListener("click", function (event) {
      if (event.target === lightbox) {
        lightbox.classList.remove("is-open");
        lightbox.setAttribute("aria-hidden", "true");
        image.src = "";
      }
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        lightbox.classList.remove("is-open");
        lightbox.setAttribute("aria-hidden", "true");
        image.src = "";
      }
    });
  }

  /*
   * Show more / Show less
   */

  const toggleButton = document.getElementById("illustrations-toggle");

  if (toggleButton) {
    toggleButton.addEventListener("click", function () {
      const expanded = toggleButton.dataset.expanded === "true";

      document.querySelectorAll(".illustration-card").forEach(function (card, index) {
        if (index >= 4) {
          if (expanded) {
            card.classList.add("illustration-hidden");
          } else {
            card.classList.remove("illustration-hidden");
          }
        }
      });

      if (expanded) {
        toggleButton.textContent = "Show more";
        toggleButton.dataset.expanded = "false";
      } else {
        toggleButton.textContent = "Show less";
        toggleButton.dataset.expanded = "true";
      }
    });
  }
});