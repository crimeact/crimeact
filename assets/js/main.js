var fails = 0;
var music_setting;
var main_theme = $("#main_theme")[0];
var music_icon = $("#music_icon")[0];
var pages = $("core-animated-pages")[0];
var pos;
var section = $("section")[0];
var time;
var timeSetter;

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

var round_two_decimals = function (what) {
  return (Math.round(what*100))/100;
};

var fade_volume = function () {

  if (round_two_decimals(section.getAttribute("volume")) > main_theme.volume) {

    setTimeout(function () {
      main_theme.volume = round_two_decimals(round_two_decimals(main_theme.volume) + 0.01);
      console.log(main_theme.volume);
      fade_volume();
    }, 20);

  } else if (round_two_decimals(section.getAttribute("volume")) < main_theme.volume) {

    setTimeout(function () {
      main_theme.volume = round_two_decimals(round_two_decimals(main_theme.volume) - 0.01);
      console.log(main_theme.volume);
      fade_volume();
    }, 20);

  } else {
    console.log("to be = is");
  }

};

var goTo = function (where) {
	where = parseInt(where);
	pos = where;
	setCookie("pos", where);
  
  if (pages.selected !== 1 && where === 0) {
    fails++;
    setCookie("fails", fails);
    $(".fails").html(fails);
  }

	pages.selected = where;
  console.log("New: " + pages.selected);

  if (where === 0) {
    $("#info-btn").fadeIn("fast");
  } else if (where === 35) {
    clearTimeout(timeSetter);
    $(".time").html(Math.round(time/60));
    $("#info-btn").fadeOut("fast");
  } else {
    $("#info-btn").fadeOut("fast");
  }

  if (where === 2) {
    timeSetter = setInterval(function () {
      time += 10;
      setCookie("time", time);
      $(".time").html(Math.round(time/60));
    },10000);
  }

  section = $("section")[where];
  console.log(section);
  if (section.getAttribute("volume") !== null) {
    fade_volume();
  } else {
    main_theme.volume = 1;
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

var goHome = function () {
  goTo(0);
  fails--;
  setCookie("fails", fails);
  $(".fails").html(fails);
};

var init = function () {

  if (getCookie("fails") !== null) {
    fails = parseInt(getCookie("fails"));
  }

  $(".fails").html(fails);
  
  pos = getCookie("pos");
  if (pos !== null && pos !== undefined) {
  	pos = parseInt(pos);
  }

  time = getCookie("time");
  if (pos !== null && pos !== undefined) {
    time = parseInt(time);
  } else {
    time = 0;
    setCookie("time", 0);
  }

  console.log("postion: " + pos);

  if (pos !== null && pos !== undefined && pos !== 1 && pos !== 0) {
    goTo(pos);
  } else if (pos === 0) {
    goHome();
  } else if (pos === 1) {
    goHome();
  } else {
    goHome(0);
  }

  load_music_setting();

  if (music_setting === false) {
    main_theme.pause();
    music_icon.icon = "av:volume-off";
  }

  for (var i = 0; i < $("section").length; i++) {
    if ($("section")[i].getAttribute("volume") === null) {
      $("section")[i].setAttribute("volume", 1);
    }
  }

};

document.addEventListener('polymer-ready', function() {
  init();
});