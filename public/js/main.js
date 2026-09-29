(() => {
  // <stdin>
  document.addEventListener("DOMContentLoaded", function() {
    const cards = Array.from(
      document.querySelectorAll(".artwork-card")
    );
    const lightbox = document.getElementById(
      "artwork-lightbox"
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
    function showImage(index) {
      if (!cards.length) {
        return;
      }
      if (!image || !title) {
        return;
      }
      currentIndex = (index + cards.length) % cards.length;
      const card = cards[currentIndex];
      image.src = card.getAttribute("data-image") || "";
      image.alt = card.getAttribute("data-title") || "";
      title.textContent = card.getAttribute("data-title") || "";
    }
    function openLightbox(index) {
      if (!lightbox) {
        return;
      }
      showImage(index);
      lightbox.classList.add("is-open");
      lightbox.setAttribute(
        "aria-hidden",
        "false"
      );
    }
    function closeLightbox() {
      if (!lightbox) {
        return;
      }
      lightbox.classList.remove("is-open");
      lightbox.setAttribute(
        "aria-hidden",
        "true"
      );
      if (image) {
        image.src = "";
        image.alt = "";
      }
      if (title) {
        title.textContent = "";
      }
    }
    cards.forEach(function(card, index) {
      card.addEventListener("click", function(event) {
        event.preventDefault();
        event.stopPropagation();
        openLightbox(index);
      });
    });
    if (prevButton) {
      prevButton.addEventListener(
        "click",
        function(event) {
          event.preventDefault();
          event.stopPropagation();
          showImage(currentIndex - 1);
        }
      );
    }
    if (nextButton) {
      nextButton.addEventListener(
        "click",
        function(event) {
          event.preventDefault();
          event.stopPropagation();
          showImage(currentIndex + 1);
        }
      );
    }
    if (closeButton) {
      closeButton.addEventListener(
        "click",
        function(event) {
          event.preventDefault();
          event.stopPropagation();
          closeLightbox();
        }
      );
    }
    if (lightbox) {
      lightbox.addEventListener(
        "click",
        function(event) {
          if (event.target === lightbox) {
            closeLightbox();
          }
        }
      );
    }
    document.addEventListener(
      "keydown",
      function(event) {
        if (!lightbox || !lightbox.classList.contains("is-open")) {
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
          event.preventDefault();
          closeLightbox();
        }
      }
    );
    const toggleButton = document.querySelector(
      ".artwork-toggle"
    );
    if (toggleButton) {
      const hiddenItems = document.querySelectorAll(
        ".artwork-preview-hidden"
      );
      toggleButton.addEventListener(
        "click",
        function() {
          const expanded = toggleButton.dataset.expanded === "true";
          if (expanded) {
            hiddenItems.forEach(
              function(item) {
                item.classList.add(
                  "artwork-preview-hidden"
                );
              }
            );
            toggleButton.dataset.expanded = "false";
            toggleButton.textContent = "Show more";
          } else {
            hiddenItems.forEach(
              function(item) {
                item.classList.remove(
                  "artwork-preview-hidden"
                );
              }
            );
            toggleButton.dataset.expanded = "true";
            toggleButton.textContent = "Show less";
          }
        }
      );
    }
  });
})();
