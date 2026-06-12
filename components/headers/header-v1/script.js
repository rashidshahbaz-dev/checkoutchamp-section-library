(function () {
  function initCocHeaderV1() {
    var headers = document.querySelectorAll("[data-coc-header]");

    headers.forEach(function (header) {
      if (header.dataset.cocHeaderReady === "true") return;

      header.dataset.cocHeaderReady = "true";
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initCocHeaderV1);
  } else {
    initCocHeaderV1();
  }
})();