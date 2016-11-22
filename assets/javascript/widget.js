(function() {
  'use strict';


  domready(function() {

    var scrollElements = document.querySelectorAll('[data-scroll-element]');

    emailFormHandler();
    facebookHandler();
    twitterHandler();
    emailHandler();

    var inValidRange = function(offset, limit) {
      return offset >= 0 && offset < limit;
    };

    var setVisibility = function(element, nextOffset, limit) {
      if(inValidRange(nextOffset, limit)) {
        my_removeClass(element, 'disabled');
      } else {
        my_addClass(element, 'disabled');
      }
    };

    var setVisibilityAll = function(elements, newOffset) {
      var
        scrollElement,
        increment,
        nextOffset,
        limit;

      each(elements, function(el) {
        if (isDOMElement(el)) {
          scrollElement = document.querySelector(el.dataset.scrollElement);
          increment  = parseInt(el.dataset.scrollIncrement);
          nextOffset = newOffset + increment;
          limit      = parseInt(scrollElement.dataset.scrollLimit);

          setVisibility(el, nextOffset, limit);
        }
      });
    };

    var resetScroll = function(element) {
      element.scrollTop = 0;
      element.dataset.scrollOffset = 0;
    };

    each(document.querySelectorAll('[data-clipboard-target]'), function(el) {
      if (isDOMElement(el)) {
        try {
          var clipboard = new Clipboard(el);
          var notification;

          var notify = function(clipboardNotification, notificationText) {
            notification = document.getElementById(clipboardNotification.slice(1));
            notification.textContent = notificationText;
            my_addClass(notification, 'in');
            setTimeout(function() {
              my_removeClass(notification, 'in');
            }, 1400);
          };

          var notifySuccess = function(e) {
            notify(e.trigger.dataset.clipboardNotification, "Copied!");
          };

          var notifyFailure = function(e) {
            //if the copy function failed the text should still be selected, so just ask the user to hit ctrl+c
            notify(e.trigger.dataset.clipboardNotification, "Press Ctrl+C to copy");
          };

          clipboard.on('success', notifySuccess);
          clipboard.on('error', notifyFailure);
          handleClicks(el, function(e) {
            if (window.frameElement && window.frameElement.squatchJsApi) {
              window.frameElement.squatchJsApi._shareEvent(window.squatch, 'DIRECT');
            }
          });
        } catch(err) {}
      }
    });

    each(scrollElements, function(el) {
      if (isDOMElement(el)) {
        var element = document.querySelector(el.dataset.scrollElement);
        var increment = parseInt(el.dataset.scrollIncrement);
        var limit     = parseInt(element.dataset.scrollLimit.valueOf());
        var offset    = parseInt(element.dataset.scrollOffset.valueOf());
        var newOffset;

        element.dataset.scrollLimit = limit;

        var nextOffset = offset + increment;

        setVisibility(el, nextOffset, limit);

        // Force IE to forget previous scroll top value
        resetScroll(element);

        listenToClick(el, 'click', function() {
          offset = parseInt(element.dataset.scrollOffset);

          newOffset = offset + increment;

          if (inValidRange(newOffset, limit)) {
            scrollTop(element, document.getElementById(newOffset).offsetTop, 400);
            element.dataset.scrollOffset = newOffset;

            setVisibilityAll(scrollElements, newOffset);
          }
        });
      }
    });

    each(document.querySelectorAll('[data-moment]'), function(el) {
      if (isDOMElement(el)) {
        var time = moment(parseInt(el.textContent));
        el.textContent = time.fromNow();
      }
    });

    each(document.getElementsByClassName('squatch-header-close'), function(el) {
      if (isDOMElement(el)) {
        handleClicks(el, function(e) {
          if (window.frameElement && window.frameElement.squatchJsApi) {
            window.frameElement.squatchJsApi.close();
          }
        });
      }
    });

    // Popup stuff
    each(document.querySelectorAll('[data-open-panel]'), function(el) {
      if (isDOMElement(el)) {
        var element = document.getElementById(el.dataset.openPanel.slice(1));
        if (element) {
          el.onclick = function() {
            my_addClass(element, 'open');
          };
        }
      }
    });

    each(document.querySelectorAll('[data-close-panel]'), function(el) {
      if (isDOMElement(el)) {
        var element = document.getElementById(el.dataset.closePanel.slice(1));
        if (element) {
          el.onclick = function() {
            my_removeClass(element, 'open');
          };
        }
      }
    });


    var setContainerHeight = function(containerEl) {
      var bodyEl           = document.getElementsByClassName('squatch-body')[0];
      var titleEl          = document.getElementsByClassName('squatch-title')[0];
      var titleStyle       = getComputedStyle(titleEl);
      var panelEl          = document.getElementById('squatch-panel');
      var referralsEl      = document.getElementsByClassName('squatch-referrals')[0];
      var referralsTitleEl = document.getElementsByClassName('squatch-referrals-title')[0];

      var bodyHeight = bodyEl.offsetHeight;
      var bodyHeightWithoutTitle = bodyHeight - titleEl.offsetHeight - parseInt(titleStyle.marginTop || '0') - parseInt(titleStyle.marginBottom || '0') - titleEl.offsetTop;
      var panelHeight = panelEl ? panelEl.offsetHeight : 0;

      if (referralsEl && referralsEl.style.display !== 'none') {
        panelHeight = panelHeight - referralsEl.offsetHeight;
      }

      if (referralsTitleEl && referralsTitleEl.style.display !== 'none') {
        panelHeight = panelHeight - referralsTitleEl.offsetHeight;
      }

      containerEl.style.height = bodyHeight + panelHeight + "px";

      var stylesheet = document.createElement('style');
      stylesheet.type = 'text/css';

      var css = '#squatch-panel.open {' +
        '-webkit-transform: translate(0, -' + bodyHeightWithoutTitle + 'px);' +
        '-ms-transform: translate(0, -' + bodyHeightWithoutTitle + 'px);' +
        '-o-transform: translate(0, -' + bodyHeightWithoutTitle + 'px);' +
        'transform: translate(0, -' + bodyHeightWithoutTitle + 'px);' +
        '}' +
        'html.lt-ie9 #squatch-panel.open {' +
        'top: -' + bodyHeightWithoutTitle + 'px;' +
        '}';

      if (stylesheet.styleSheet){
        // IE
        stylesheet.styleSheet.cssText = css;
      } else {
        // W3C Standard
        stylesheet.appendChild(document.createTextNode(css));
      }

      document.querySelector('head').appendChild(stylesheet);
    };

    var containerEl = document.getElementsByClassName('squatch-container-popup')[0];

    if (containerEl) {
      window.onload = function() {

        var setContainerHeightIfWideEnough = function () {
          var width = window.innerWidth;

          if (width === 500) {
            setContainerHeight(containerEl);
          } else {
            setTimeout(function() {
              setContainerHeightIfWideEnough();
            }, 50);
          }
        };

        setContainerHeightIfWideEnough();
      }
    }
  });

})();
