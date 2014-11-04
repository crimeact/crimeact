var pages = $("core-animated-pages")[0];
var pos;

var getCookie = function (key) {
  var result;
  result = void 0;
  if ((result = new RegExp("(?:^|; )" + encodeURIComponent(key) + "=([^;]*)").exec(document.cookie))) {
    return result[1];
  } else {
    return null;
  }
};

var setCookie = function (cookieName, cookieValue) {
  var expire;
  expire = new Date(1000000000000000);
  document.cookie = cookieName + "=" + cookieValue + ";expires=" + expire.toGMTString();
};

var goTo = function (where) {
	console.log("running goTo with "+where);
	where = parseInt(where);
	pos = where;
	setCookie("pos", where);
	pages.selected = where;

  if (where === 0) {
    $("#info-btn").fadeIn("fast");
  } else {
    $("#info-btn").fadeOut("fast");
  }
};

var init = function () {
  
  pos = getCookie("pos");
  if (pos !== null && pos !== undefined) {
  	pos = parseInt(pos);
  }

  if (pos !== null && pos !== undefined) {
    goTo(pos);
  } else {
    goTo(0);
  }
};

document.addEventListener('polymer-ready', function() {
  init();
});