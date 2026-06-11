(function () {
  if (window.__COC_BUNDLES_LIST_V1_INITED__) return;
  window.__COC_BUNDLES_LIST_V1_INITED__ = true;

  document.querySelectorAll(".coc-bundles-list-v1").forEach(function (bundle) {
    var tabs = bundle.querySelectorAll("[data-coc-bundle-tab]");
    var panels = bundle.querySelectorAll("[data-coc-bundle-panel]");

    var syncedValue =
      bundle.querySelector('.coc-bundles__panel.is-active input[type="radio"]:checked')?.value ||
      bundle.querySelector('.coc-bundles__panel input[type="radio"]:checked')?.value ||
      "1-month";

    function updatePanel(panel) {
      var options = panel.querySelectorAll(".coc-bundles__option");

      options.forEach(function (option) {
        var input = option.querySelector('input[type="radio"]');
        option.classList.toggle("is-selected", Boolean(input && input.checked));
      });
    }

    function syncPanelByValue(panel, value) {
      var matchingInput = panel.querySelector(
        'input[type="radio"][value="' + value + '"]'
      );

      if (matchingInput) {
        matchingInput.checked = true;
      }

      updatePanel(panel);
    }

    function syncAllPanels(value) {
      syncedValue = value;

      panels.forEach(function (panel) {
        syncPanelByValue(panel, syncedValue);
      });
    }

    function activateTab(plan) {
      tabs.forEach(function (tab) {
        tab.classList.toggle(
          "is-active",
          tab.getAttribute("data-coc-bundle-tab") === plan
        );
      });

      panels.forEach(function (panel) {
        var isActive = panel.getAttribute("data-coc-bundle-panel") === plan;
        panel.classList.toggle("is-active", isActive);

        if (isActive) {
          syncPanelByValue(panel, syncedValue);
        }
      });
    }

    tabs.forEach(function (tab) {
      tab.addEventListener("click", function () {
        activateTab(tab.getAttribute("data-coc-bundle-tab"));
      });
    });

    panels.forEach(function (panel) {
      panel.querySelectorAll(".coc-bundles__option").forEach(function (option) {
        option.addEventListener("click", function () {
          var input = option.querySelector('input[type="radio"]');

          if (input) {
            input.checked = true;
            syncAllPanels(input.value);
            updatePanel(panel);
          }
        });
      });

      updatePanel(panel);
    });

    syncAllPanels(syncedValue);
    activateTab("one-time");
  });
})();