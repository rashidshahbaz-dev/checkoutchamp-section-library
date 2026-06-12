(function () {
  function getOuterHTMLFromSelector(htmlText, selector) {
    if (!selector) return htmlText;

    var parser = new DOMParser();
    var doc = parser.parseFromString(htmlText, "text/html");
    var selected = doc.querySelector(selector);

    if (!selected) return htmlText;

    return selected.outerHTML;
  }

  function loadCodeBlocks() {
    var blocks = document.querySelectorAll("[data-code-src]");

    blocks.forEach(function (block) {
      var filePath = block.getAttribute("data-code-src");
      var selector = block.getAttribute("data-code-selector");

      if (!filePath) return;

      fetch(filePath)
        .then(function (response) {
          if (!response.ok) {
            throw new Error("Unable to load " + filePath);
          }

          return response.text();
        })
        .then(function (code) {
          if (selector) {
            code = getOuterHTMLFromSelector(code, selector);
          }

          block.textContent = code.trim();
        })
        .catch(function () {
          block.textContent = "Unable to load code from: " + filePath;
        });
    });
  }

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

  function initPreview() {
    loadCodeBlocks();
    initCopyButtons();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initPreview);
  } else {
    initPreview();
  }
})();