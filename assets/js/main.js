document.addEventListener("DOMContentLoaded", function () {

  /*
   * Illustration Lightbox
   */

  const cards = Array.from(
    document.querySelectorAll(".illustration-card")
  );

  const lightbox = document.getElementById(
    "illustration-lightbox"
  );

  const image = document.getElementById(
    "lightbox-image"
  );

  const title = document.getElementById(
    "lightbox-title"
  );

  const closeButton = document.querySelector(
    ".lightbox-close"
  );

  const prevButton = document.querySelector(
    ".lightbox-prev"
  );

  const nextButton = document.querySelector(
    ".lightbox-next"
  );

  let currentIndex = 0;


  /*
   * Stop here if lightbox elements do not exist
   */

  if (
    !lightbox ||
    !image ||
    !title ||
    !closeButton ||
    !prevButton ||
    !nextButton ||
    cards.length === 0
  ) {
    return;
  }


  /*
   * Show image
   */

  function showImage(index) {

    currentIndex =
      (index + cards.length) % cards.length;

    const card = cards[currentIndex];

    image.src = card.dataset.image;
    image.alt = card.dataset.title || "";

    title.textContent =
      card.dataset.title || "";
  }


  /*
   * Open lightbox
   */

  function openLightbox(index) {

    showImage(index);

    lightbox.classList.add("is-open");
    lightbox.setAttribute(
      "aria-hidden",
      "false"
    );
  }


  /*
   * Close lightbox
   */

  function closeLightbox() {

    lightbox.classList.remove("is-open");

    lightbox.setAttribute(
      "aria-hidden",
      "true"
    );

    image.src = "";
    image.alt = "";
    title.textContent = "";
  }


  /*
   * Click on illustration
   */

  cards.forEach(function (card, index) {

    card.addEventListener("click", function () {

      openLightbox(index);

    });

  });


  /*
   * Previous image
   */

  prevButton.addEventListener(
    "click",
    function (event) {

      event.stopPropagation();

      showImage(currentIndex - 1);

    }
  );


  /*
   * Next image
   */

  nextButton.addEventListener(
    "click",
    function (event) {

      event.stopPropagation();

      showImage(currentIndex + 1);

    }
  );


  /*
   * Close button
   */

  closeButton.addEventListener(
    "click",
    function () {

      closeLightbox();

    }
  );


  /*
   * Click outside image
   */

  lightbox.addEventListener(
    "click",
    function (event) {

      if (event.target === lightbox) {
        closeLightbox();
      }

    }
  );


  /*
   * Keyboard navigation
   */

  document.addEventListener(
    "keydown",
    function (event) {

      if (
        !lightbox.classList.contains("is-open")
      ) {
        return;
      }

      if (event.key === "ArrowLeft") {

        event.preventDefault();

        showImage(currentIndex - 1);

      }

      if (event.key === "ArrowRight") {

        event.preventDefault();

        showImage(currentIndex + 1);

      }

      if (event.key === "Escape") {

        closeLightbox();

      }

    }
  );


  /*
   * Show more / Show less
   */

  const toggleButton =
    document.getElementById(
      "illustrations-toggle"
    );

  if (toggleButton) {

    toggleButton.addEventListener(
      "click",
      function () {

        const expanded =
          toggleButton.dataset.expanded === "true";


        document
          .querySelectorAll(".illustration-card")
          .forEach(function (card, index) {

            if (index >= 4) {

              if (expanded) {

                card.classList.add(
                  "illustration-hidden"
                );

              } else {

                card.classList.remove(
                  "illustration-hidden"
                );

              }

            }

          });


        toggleButton.dataset.expanded =
          expanded ? "false" : "true";


        toggleButton.textContent =
          expanded
            ? "Show more"
            : "Show less";

      }
    );

  }

});