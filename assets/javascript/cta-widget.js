(function() {

  domready(function() {
    // CTA
    each(document.getElementsByClassName('cta-container'), function(el) {
      el.onclick = function(e) {
        if (window.frameElement && window.frameElement.squatchJsApi) {
          window.frameElement.squatchJsApi.open();
        }
      }
    });
  });

})();
