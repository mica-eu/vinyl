var Player = (function () {

  var audio = new Audio();

  audio.onplay = function () {
    $('.btn-play[played="true"]').html('<i class="fa fa-pause">');
  }

  audio.onpause = function () {
    $('.btn-play').html('<i class="fa fa-play">').attr('played', false);
  }

  audio.onended = function () {
    $('.btn-play').html('<i class="fa fa-play">').attr('played', false);
  }

  function _play (url, btn) {
    if (!audio.paused) {
      audio.pause();
    } else {
      audio.src = url;
      audio.play();

      $(btn).attr('played', true);
    }
  }

  return {
    play: _play
  };

}());
