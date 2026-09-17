(() => {
  // <stdin>
  document.addEventListener("DOMContentLoaded", function() {
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
    function showImage(index) {
      if (cards.length === 0 || !image || !title) {
        return;
      }
      currentIndex = (index + cards.length) % cards.length;
      const card = cards[currentIndex];
      image.src = card.dataset.image || "";
      image.alt = card.dataset.title || "";
      title.textContent = card.dataset.title || "";
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
      if (!lightbox || !image || !title) {
        return;
      }
      lightbox.classList.remove("is-open");
      lightbox.setAttribute(
        "aria-hidden",
        "true"
      );
      image.src = "";
      image.alt = "";
      title.textContent = "";
    }
    if (lightbox && image && title && closeButton && prevButton && nextButton && cards.length > 0) {
      cards.forEach(function(card, index) {
        card.addEventListener(
          "click",
          function() {
            openLightbox(index);
          }
        );
      });
      prevButton.addEventListener(
        "click",
        function(event) {
          event.stopPropagation();
          showImage(currentIndex - 1);
        }
      );
      nextButton.addEventListener(
        "click",
        function(event) {
          event.stopPropagation();
          showImage(currentIndex + 1);
        }
      );
      closeButton.addEventListener(
        "click",
        function() {
          closeLightbox();
        }
      );
      lightbox.addEventListener(
        "click",
        function(event) {
          if (event.target === lightbox) {
            closeLightbox();
          }
        }
      );
      document.addEventListener(
        "keydown",
        function(event) {
          if (!lightbox.classList.contains("is-open")) {
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
    }
    document.querySelectorAll(".illustration-category").forEach(function(category) {
      const toggleButton = category.querySelector(
        ".illustrations-toggle"
      );
      if (!toggleButton) {
        return;
      }
      const categoryCards = category.querySelectorAll(
        ".illustration-card"
      );
      toggleButton.addEventListener(
        "click",
        function() {
          const expanded = toggleButton.dataset.expanded === "true";
          categoryCards.forEach(
            function(card, index) {
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
            }
          );
          toggleButton.dataset.expanded = expanded ? "false" : "true";
          toggleButton.textContent = expanded ? "Show more" : "Show less";
        }
      );
    });
  });
})();
