function emailFormHandler() {
  var sendEmailBtn = document.getElementById('squatch-send-email');
  var emailInput = document.getElementById('squatch-user-email');

  handleClicks(sendEmailBtn, function() {
    if (!isValidEmail(emailInput.value)) {
      my_addClass(emailInput, 'invalid');
      emailInput.onkeypress = function() {
        if (isValidEmail(this.value)) {
          my_removeClass(this, 'invalid');
          my_addClass(this, 'valid');
        }
      }
    } else {
      my_removeClass(emailInput, 'invalid');

      if (window.frameElement && window.frameElement.squatchJsApi) {
        var widget = window.frameElement.squatchJsApi;

        if (window.parent.squatch && window.parent.squatch.widgets().eventBus) {
          window.parent.squatch.widgets().eventBus.dispatch('submit_email', this, widget, emailInput.value);
        } else {
          window.frameElement.squatchJsApi.reload(emailInput.value);
        }
      }
    }
  });
}

function messengerHandler() {
  var messengerBtn = document.getElementsByClassName('messengerShare')[0];

  if (!messengerBtn) return;

  var messengerUrl = 'https://www.facebook.com/dialog/send?app_id=' + squatch.user.facebook.appId + '&link=' + squatch.user.facebook.link + '&redirect_uri=' + squatch.user.facebook.redirectUrl;
  messengerBtn.href = messengerUrl;

  handleClicks(messengerBtn, function(e) {
    // If it's not mobile, don't use href link
    if (e.type != 'touchstart') {
      e.preventDefault();

      var url = messengerUrl + "&display=popup";
      window.open(url, 'fb-messenger', 'status=0,width=620,height=400');
    }

    if (window.frameElement && window.frameElement.squatchJsApi) {
      window.frameElement.squatchJsApi._shareEvent(window.squatch, 'FBMESSENGER');
    }
  });
}

function smsHandler() {
  var smsBtn = document.getElementsByClassName('smsShare')[0];

  if (!smsBtn) return;

  // Test url
  var smsUrl = 'sms:?&body=' + squatch.user.sms.body;
  smsBtn.href = smsUrl;

  var md = new MobileDetect('Version/4.0 Mobile Safari/534.30');
  var UA = md.userAgent();

  if (UA === 'Safari') {
    smsBtn.target = '_parent';
  }

  handleClicks(smsBtn, function(e) {
    if (window.frameElement && window.frameElement.squatchJsApi) {
      window.frameElement.squatchJsApi._shareEvent(window.squatch, 'SMS');
    }
  });
}

function whatsappHandler() {
  var whatsappBtn = document.getElementsByClassName('whatsappShare')[0];

  if (!whatsappBtn) return;

  var whatsappUrl = 'whatsapp://send?text=' + squatch.user.whatsapp.body;
  whatsappBtn.href = whatsappUrl;

  handleClicks(whatsappBtn, function(e) {
    if (window.frameElement && window.frameElement.squatchJsApi) {
      window.frameElement.squatchJsApi._shareEvent(window.squatch, 'WHATSAPP');
    }
  });
}

function facebookHandler() {
  var facebookBtn = document.getElementsByClassName('fbShare')[0];

  if (!facebookBtn) return;

  var pictureString = (squatch.user.facebook.shareImage == "" || squatch.user.facebook.shareImage === null) ? "" : "&picture="+squatch.user.facebook.shareImage;
  var fbUrl = "https://www.facebook.com/dialog/feed?app_id=" + squatch.user.facebook.appId + "&link=" + squatch.user.facebook.link + "&name=" + squatch.user.facebook.title + "&description=" + squatch.user.facebook.summary + pictureString+ "&redirect_uri=" + squatch.user.facebook.redirectUrl;
  facebookBtn.href = fbUrl;

  handleClicks(facebookBtn, function(e) {
    // If it's not mobile, don't use href link
    if (e.type != 'touchstart') {
      e.preventDefault();

      var url = fbUrl + "&display=popup";
      window.open(url, 'fb', 'status=0,width=620,height=400');
    }

    if (window.frameElement && window.frameElement.squatchJsApi) {
      window.frameElement.squatchJsApi._shareEvent(window.squatch, 'FACEBOOK');
    }
  });
}

function twitterHandler() {
  var twitterBtn = document.getElementsByClassName('twShare')[0];
  var twUrl = "https://twitter.com/intent/tweet?source=webclient&text=" + squatch.user.twitter.message;

  if (!twitterBtn) return;
  twitterBtn.href = twUrl;

  handleClicks(twitterBtn, function(e) {
    if (e.type != 'touchstart') {
      e.preventDefault();
      window.open(twUrl, 'twitter', 'status=1,width=575,height=400');
    }

    if (window.frameElement && window.frameElement.squatchJsApi) {
      window.frameElement.squatchJsApi._shareEvent(window.squatch, 'TWITTER');
    }
  });
}

function emailHandler() {
  var emailBtn = document.getElementsByClassName('emailShare')[0];
  var emailUrl = squatch.user.email.share.mailToLink;

  if(!emailBtn) return;
  // emailBtn.href = emailUrl;

  var md = new MobileDetect('Version/4.0 Mobile Safari/534.30');
  var UA = md.userAgent();

  emailBtn.href = emailUrl;

  if (UA === 'Safari') {
    emailBtn.target = '_parent';

    handleClicks(emailBtn, function(e) {
      if (window.frameElement && window.frameElement.squatchJsApi) {
        window.frameElement.squatchJsApi._shareEvent(window.squatch, 'EMAIL');
      }
    });
  } else {
    handleClicks(emailBtn, function(e) {
      if (e.type != 'touchstart') {
        e.preventDefault();

        var mailurl = emailUrl;
        mailTo(mailurl);
      }

      if (window.frameElement && window.frameElement.squatchJsApi) {
        window.frameElement.squatchJsApi._shareEvent(window.squatch, 'EMAIL');
      }
    });
  }
}
