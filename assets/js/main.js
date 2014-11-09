var pages = $("core-animated-pages")[0];
var pos;
var music_setting;
var main_theme = $("#main_theme")[0];
var music_icon = $("#music_icon")[0];

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

var load_music_setting = function () {
  music_setting = getCookie("music_setting");
  if (music_setting === "true") {
    music_setting = true;
  } else if (music_setting === "false") {
    music_setting = false;
  } else {
    setCookie("music_setting", true);
    music_setting = true;
  }
};

var toggleMusic = function () {
  console.log("running too");
  if (music_setting === true) {
    setCookie("music_setting", false);
    load_music_setting();
    main_theme.pause();
    music_icon.icon = "av:volume-off";
  } else {
    setCookie("music_setting", true);
    load_music_setting();
    main_theme.play();
    music_icon.icon = "av:volume-up";
  }
};

var init = function () {
  
  pos = getCookie("pos");
  if (pos !== null && pos !== undefined) {
  	pos = parseInt(pos);
  }

  console.log("postion: "+pos);

  if (pos !== null && pos !== undefined && pos !== 1) {
    goTo(pos);
  } else if (pos === 1) {
    goTo(0);
  } else {
    goTo(0);
  }
  load_music_setting();
  if (music_setting === false) {
    main_theme.pause();
    music_icon.icon = "av:volume-off";
  }
};

document.addEventListener('polymer-ready', function() {
  init();
});