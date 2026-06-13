(function () {
  function initHeroGallery() {
    var heroes = document.querySelectorAll("[data-coc-hero]");

    heroes.forEach(function (hero) {
      var track = hero.querySelector(".coc-hero__gallery-track");
      var slides = Array.prototype.slice.call(hero.querySelectorAll(".coc-hero__slide"));
      var thumbs = Array.prototype.slice.call(hero.querySelectorAll(".coc-hero__thumb"));
      var prev = hero.querySelector(".coc-hero__arrow--prev");
      var next = hero.querySelector(".coc-hero__arrow--next");
      var index = 0;

      if (!track || !slides.length) return;

      function goTo(newIndex) {
        if (newIndex < 0) newIndex = slides.length - 1;
        if (newIndex >= slides.length) newIndex = 0;

        index = newIndex;
        track.style.transform = "translateX(-" + index * 100 + "%)";

        slides.forEach(function (slide, i) {
          slide.classList.toggle("is-active", i === index);
        });

        thumbs.forEach(function (thumb, i) {
          thumb.classList.toggle("is-active", i === index);
        });
      }

      thumbs.forEach(function (thumb, i) {
        thumb.addEventListener("click", function () {
          goTo(i);
        });
      });

      if (prev) {
        prev.addEventListener("click", function () {
          goTo(index - 1);
        });
      }

      if (next) {
        next.addEventListener("click", function () {
          goTo(index + 1);
        });
      }

      goTo(0);
    });
  }

  function initHeroOffers() {
    var offers = document.querySelectorAll(".coc-hero__offer");

    offers.forEach(function (offer) {
      offer.addEventListener("click", function () {
        offers.forEach(function (item) {
          item.classList.remove("is-active");

          var input = item.querySelector("input");
          if (input) input.checked = false;
        });

        offer.classList.add("is-active");

        var currentInput = offer.querySelector("input");
        if (currentInput) currentInput.checked = true;
      });
    });
  }

  function initHeroAccordion() {
    var groups = document.querySelectorAll(".coc-hero__accordion");

    groups.forEach(function (group) {
      var items = Array.prototype.slice.call(group.querySelectorAll("details"));

      items.forEach(function (item) {
        item.removeAttribute("open");
      });

      items.forEach(function (item) {
        var summary = item.querySelector("summary");

        if (!summary) return;

        summary.addEventListener("click", function (event) {
          event.preventDefault();

          var wasOpen = item.hasAttribute("open");

          items.forEach(function (other) {
            other.removeAttribute("open");
          });

          if (!wasOpen) {
            item.setAttribute("open", "");
          }
        });
      });
    });
  }

  function initHero() {
    initHeroGallery();
    initHeroOffers();
    initHeroAccordion();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initHero);
  } else {
    initHero();
  }
})();