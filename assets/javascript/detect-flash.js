// Detect if client supports flash and if so remove the `no-flash` class from the html element
(function() {
  'use strict';

  var hasFlash = false;

  try {
    var fo = new ActiveXObject('ShockwaveFlash.ShockwaveFlash');
    if (fo) {
      hasFlash = true;
    }
  } catch (e) {
    if (navigator.mimeTypes &&
      navigator.mimeTypes['application/x-shockwave-flash'] !== undefined &&
      navigator.mimeTypes['application/x-shockwave-flash'].enabledPlugin) {
      hasFlash = true;
    }
  }

  if (hasFlash) {
    var html = document.getElementsByTagName('html')[0];
    html.className = html.className.replace('no-flash', '');
  }
})();
