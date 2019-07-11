(function() {
  window.send = function(id, href) {
    var xhr;
    if (window.XMLHttpRequest)
      xhr = new XMLHttpRequest();
    else
      // eslint-disable-next-line no-undef
      xhr = new ActiveXObject("Microsoft.XMLHTTP");
    xhr.open("POST", "/api/redirect/code?id=" + id, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send({ href: href });
  }
})(window);
