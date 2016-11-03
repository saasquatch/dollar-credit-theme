(function() {
  'use strict';

  domready(function() {
    // CTA
    each(document.getElementsByClassName('cta-container'), function(el) {
      el.onclick = function(e) {
        if (window.parent.squatch && window.parent.squatch.eventBus) {
          window.parent.squatch.eventBus.dispatch('open_popup', e.type);
        }
      }
    });
  });

})();
