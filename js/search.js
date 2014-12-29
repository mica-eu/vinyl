var Search = function (keywords) {

  var jqxhr = $.getJSON('http://vinyl-api.herokuapp.com/search?q=' + keywords);

  return jqxhr;

};
