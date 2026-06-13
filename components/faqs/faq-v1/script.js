(function () {
  function initFaqAccordion() {
    var groups = document.querySelectorAll("[data-coc-faq]");

    groups.forEach(function (group) {
      var items = Array.prototype.slice.call(group.querySelectorAll(".coc-faq__item"));

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

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initFaqAccordion);
  } else {
    initFaqAccordion();
  }
})();