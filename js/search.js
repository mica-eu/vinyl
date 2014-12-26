var Search = function (keywords) {

  var jqxhr = $.getJSON('http://vinyl-api.herokuapp.com/?a=' + keywords);
  
  return jqxhr;

};
