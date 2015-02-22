$(document).ready(function() {
  var scrollElements = $('[data-scroll-element]');

  var inValidRange = function(offset, limit) {
    return offset >= 0 && offset < limit;
  };

  var setVisibility = function(element, nextOffset, limit) {
    if(inValidRange(nextOffset, limit)) {
      element.removeClass('disabled');
    } else {
      element.addClass('disabled');
    }
  };

  var setVisibilityAll = function(elements, newOffset) {
    elements.each(function() {
      var $this, increment, nextOffset, limit;

      $this      = $(this);
      increment  = $this.data('scroll-increment');
      nextOffset = newOffset + increment;
      limit      = $this.data('scroll-limit');

      setVisibility($this, nextOffset, limit);
    });
  };

  var resetScroll = function(element) {
    element[0].scrollTop = 0;
    element.data('scroll-offset', 0);
  };

  $('[data-clipboard-target]').each(function() {
    var zeroClipboard;

    ZeroClipboard.config({
      hoverClass : 'hover',
      activeClass: 'active'
    });

    zeroClipboard = new ZeroClipboard(this);
    zeroClipboard.on('ready', function(readyEvent) {
      zeroClipboard.on('aftercopy', function(e) {
        notification = $($(e.target).data('clipboard-notification'));
        notification.addClass('in').delay(1400).queue(function() {
          notification.removeClass('in');
          $(this).dequeue();
        });
      });
    });
  });

  scrollElements.each(function() {
    var $this, element, increment, limit, offset;

    $this     = $(this);
    element   = $($this.data('scroll-element'));
    increment = $this.data('scroll-increment');
    limit     = element.data('scroll-limit');
    offset    = element.data('scroll-offset');

    $this.data('scroll-limit', limit);

    nextOffset = offset + increment;
    setVisibility($this, nextOffset, limit);

    // Force IE to forget previous scroll top value
    resetScroll(element);

    $this.on('click', function() {
      offset = element.data('scroll-offset');

      newOffset = offset + increment;
      if (inValidRange(newOffset, limit)) {
        element.animate({
            scrollTop: $('#' + newOffset).position().top
        }, 400);
        element.data('scroll-offset', newOffset);

        setVisibilityAll(scrollElements, newOffset);
      }
    });
  });

  $('[data-open-panel]').each(function() {
    var $this, element;

    $this   = $(this);
    element = $($this.data('open-panel'));

    $this.on('click', function() {
      element.addClass('open');
    });
  });

  $('[data-close-panel]').each(function() {
    var $this, element;

    $this   = $(this);
    element = $($this.data('close-panel'));

    $this.on('click', function() {
      element
        .one('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd', function() {
          $this.trigger('panel:closed');
        }).removeClass('open');
    });
  });

  $('[data-scroll-reset]').each(function() {
    var $this, element;

    $this   = $(this);
    element = $($this.data('scroll-reset'));

    $this.on('click', function() {
      $this.one('panel:closed', function() {
        resetScroll(element);
        setVisibilityAll(scrollElements, 0);
      });
    });
  });

  $('[data-moment]').each(function(index){
    var $this;

    $this   = $(this);

    var time = moment(parseInt($this.text()));
    $this.text(time.fromNow());
  });
});
