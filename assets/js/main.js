document.addEventListener("DOMContentLoaded", function () {

  /*
   * Illustration Lightbox
   */

  const lightbox = document.getElementById("illustration-lightbox");
  const image = document.getElementById("lightbox-image");
  const title = document.getElementById("lightbox-title");
  const closeButton = document.querySelector(".lightbox-close");

  if (lightbox && image && title && closeButton) {

    document.addEventListener("click", function (event) {

      const card = event.target.closest(".illustration-card");

      if (!card) {
        return;
      }

      event.preventDefault();

      const imageUrl = card.dataset.image;
      const imageTitle = card.dataset.title || "";

      if (!imageUrl) {
        return;
      }

      image.src = imageUrl;
      image.alt = imageTitle;
      title.textContent = imageTitle;

      lightbox.classList.add("is-open");
      lightbox.setAttribute("aria-hidden", "false");
    });


    function closeLightbox() {
      lightbox.classList.remove("is-open");
      lightbox.setAttribute("aria-hidden", "true");

      image.src = "";
      image.alt = "";
      title.textContent = "";
    }


    closeButton.addEventListener("click", function () {
      closeLightbox();
    });


    lightbox.addEventListener("click", function (event) {

      if (event.target === lightbox) {
        closeLightbox();
      }

    });


    document.addEventListener("keydown", function (event) {

      if (event.key === "Escape") {
        closeLightbox();
      }

    });

  }


  /*
   * Show more / Show less
   */

  const toggleButton = document.getElementById("illustrations-toggle");

  if (toggleButton) {

    toggleButton.addEventListener("click", function () {

      const expanded =
        toggleButton.dataset.expanded === "true";

      document.querySelectorAll(".illustration-card").forEach(function (card, index) {

        if (index >= 4) {

          card.classList.toggle(
            "illustration-hidden",
            expanded
          );

        }

      });

      toggleButton.dataset.expanded =
        expanded ? "false" : "true";

      toggleButton.textContent =
        expanded ? "Show more" : "Show less";

    });

  }

});