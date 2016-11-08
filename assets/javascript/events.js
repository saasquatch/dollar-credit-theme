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
      var registerForm = document.getElementsByClassName('squatch-register')[0];
      registerForm.style.paddingTop = '30px';
      registerForm.innerHTML = '<p><strong>' + emailInput.value + '</strong><br>Has been successfully registered</p>';

      if (window.frameElement && window.frameElement.squatchJsApi) {
        window.frameElement.squatchJsApi.reload(emailInput.value /*, JWT token if needed */);
      }
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
