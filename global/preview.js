(function () {
  function initCopyButtons() {
    var buttons = document.querySelectorAll("[data-copy-target]");

    buttons.forEach(function (button) {
      button.addEventListener("click", function () {
        var targetId = button.getAttribute("data-copy-target");
        var target = document.getElementById(targetId);

        if (!target) return;

        var text = target.textContent;

        navigator.clipboard.writeText(text).then(function () {
          var originalText = button.textContent;

          button.textContent = "Copied!";

          setTimeout(function () {
            button.textContent = originalText;
          }, 1200);
        });
      });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initCopyButtons);
  } else {
    initCopyButtons();
  }
})();