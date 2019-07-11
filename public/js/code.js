(function() {
  window.send = function(id, href) {
    var xhr;
    xhr.setRequestHeader("Content-Type", "application/json");
    if (window.XMLHttpRequest)
      xhr = new XMLHttpRequest();
    else
      // eslint-disable-next-line no-undef
      xhr = new ActiveXObject("Microsoft.XMLHTTP");
    xhr.open("POST", "/api/redirect/code?id=" + id, true);
    xhr.send({ href: href });
  }
})(window);
