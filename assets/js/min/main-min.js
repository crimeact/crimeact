var pages=$("core-animated-pages")[0],pos,getCookie=function(o){var e;return e=void 0,(e=new RegExp("(?:^|; )"+encodeURIComponent(o)+"=([^;]*)").exec(document.cookie))?e[1]:null},setCookie=function(o,e){var n;n=new Date(1e15),document.cookie=o+"="+e+";expires="+n.toGMTString()},goTo=function(o){console.log("running goTo with "+o),o=parseInt(o),pos=o,setCookie("pos",o),pages.selected=o},init=function(){pos=getCookie("pos"),null!==pos&&void 0!==pos&&(pos=parseInt(pos)),null!==pos&&void 0!==pos?pages.selected=pos:goTo(0)};document.addEventListener("polymer-ready",function(){init()});