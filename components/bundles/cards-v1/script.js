(function () {
  if (window.__COC_BUNDLES_CARDS_V1_INITED__) return;
  window.__COC_BUNDLES_CARDS_V1_INITED__ = true;

  document.querySelectorAll(".coc-bundles-cards-v1").forEach(function (section) {
    var toggleButtons = section.querySelectorAll("[data-coc-bundle-tab]");
    var planGroups = section.querySelectorAll("[data-coc-bundle-panel]");

    function setPlan(planType) {
      toggleButtons.forEach(function (button) {
        var isActive = button.getAttribute("data-coc-bundle-tab") === planType;

        button.classList.toggle("is-active", isActive);
        button.setAttribute("aria-selected", isActive ? "true" : "false");
      });

      planGroups.forEach(function (group) {
        var isActive = group.getAttribute("data-coc-bundle-panel") === planType;
        group.classList.toggle("is-active", isActive);
      });
    }

    toggleButtons.forEach(function (button) {
      button.addEventListener("click", function () {
        setPlan(button.getAttribute("data-coc-bundle-tab"));
      });
    });

    setPlan("subscription");
  });
})();