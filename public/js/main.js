(() => {
  // <stdin>
  document.addEventListener("DOMContentLoaded", function() {
    const cards = Array.from(document.querySelectorAll(".artwork-card"));
    const lightbox = document.getElementById("artwork-lightbox");
    const image = document.getElementById("lightbox-image");
    const title = document.getElementById("lightbox-title");
    const closeButton = document.querySelector(".lightbox-close");
    const prevButton = document.querySelector(".lightbox-prev");
    const nextButton = document.querySelector(".lightbox-next");
    const toggleButton = document.querySelector(".artwork-toggle");
    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");
    let currentIndex = 0;
    let previousFocus = null;
    if (menuToggle && navLinks) {
      menuToggle.addEventListener("click", function() {
        const isOpen = navLinks.classList.toggle("is-open");
        menuToggle.setAttribute(
          "aria-expanded",
          String(isOpen)
        );
        menuToggle.setAttribute(
          "aria-label",
          isOpen ? "Close menu" : "Open menu"
        );
        menuToggle.classList.toggle("is-open", isOpen);
      });
      navLinks.querySelectorAll("a").forEach(function(link) {
        link.addEventListener("click", function() {
          navLinks.classList.remove("is-open");
          menuToggle.classList.remove("is-open");
          menuToggle.setAttribute(
            "aria-expanded",
            "false"
          );
          menuToggle.setAttribute(
            "aria-label",
            "Open menu"
          );
        });
      });
    }
    function showImage(index) {
      if (!cards.length || !image || !title) {
        return;
      }
      currentIndex = (index + cards.length) % cards.length;
      const card = cards[currentIndex];
      const imageUrl = card.dataset.image || "";
      const imageTitle = card.dataset.title || "";
      image.src = imageUrl;
      image.alt = imageTitle;
      title.textContent = imageTitle;
    }
    function openLightbox(index) {
      if (!lightbox) {
        return;
      }
      previousFocus = document.activeElement;
      showImage(index);
      lightbox.classList.add("is-open");
      lightbox.setAttribute("aria-hidden", "false");
      if (closeButton) {
        closeButton.focus();
      }
    }
    function closeLightbox() {
      if (!lightbox) {
        return;
      }
      lightbox.classList.remove("is-open");
      lightbox.setAttribute("aria-hidden", "true");
      if (image) {
        image.src = "";
        image.alt = "";
      }
      if (title) {
        title.textContent = "";
      }
      if (previousFocus && typeof previousFocus.focus === "function") {
        previousFocus.focus();
      }
      previousFocus = null;
    }
    cards.forEach(function(card, index) {
      card.addEventListener("click", function(event) {
        event.preventDefault();
        event.stopPropagation();
        openLightbox(index);
      });
    });
    if (prevButton) {
      prevButton.addEventListener("click", function(event) {
        event.preventDefault();
        event.stopPropagation();
        showImage(currentIndex - 1);
      });
    }
    if (nextButton) {
      nextButton.addEventListener("click", function(event) {
        event.preventDefault();
        event.stopPropagation();
        showImage(currentIndex + 1);
      });
    }
    if (closeButton) {
      closeButton.addEventListener("click", function(event) {
        event.preventDefault();
        event.stopPropagation();
        closeLightbox();
      });
    }
    if (lightbox) {
      lightbox.addEventListener("click", function(event) {
        if (event.target === lightbox) {
          closeLightbox();
        }
      });
    }
    document.addEventListener("keydown", function(event) {
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
    });
    if (toggleButton) {
      const hiddenItems = document.querySelectorAll(
        ".artwork-preview-hidden"
      );
      toggleButton.addEventListener("click", function() {
        const expanded = toggleButton.dataset.expanded === "true";
        hiddenItems.forEach(function(item) {
          item.classList.toggle(
            "artwork-preview-hidden",
            expanded
          );
        });
        toggleButton.dataset.expanded = String(!expanded);
        toggleButton.textContent = expanded ? "Show more" : "Show less";
      });
    }
  });
})();
