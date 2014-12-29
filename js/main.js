$(function () {
  var $input = $('#search-input'); //input de busca
  var $msgTxt = $('#msg-txt'); // mensagens e avisos
  var $msgLoading = $('#msg-loading'); // icone de espera
  var $results = $('#results'); // espaço para montar a lista de musicas
  var searchTimeout; // tempo retornado pelo setTimeout

  // busca recursiva
  $input.keypress(function () {
    if (searchTimeout != undefined) clearTimeout(searchTimeout);
    searchTimeout = setTimeout(function () {
      $msgTxt.hide();
      $msgLoading.show();

      // iniciando a consulta
      var search = Search($input.val());

      search.error(function (data) {
        $msgLoading.hide();
        $msgTxt.html('Desculpe, houve um erro!').show();
        console.log('Error: ' + data);
      });

      search.done(function (data) {
        $results.html('');

        if (data.length != 0) {
          $msgLoading.hide();
          $msgTxt.html('Encontramos ' + data.info.num_results + ' resultados.').show();

          data.tracks.forEach(function (track) {
            var $li = $('<li>')
            .addClass('track')
            .appendTo($results);

            var $btnPlay = $('<button>')
            .addClass('btn btn-play')
            .attr('url', track.direct)
            .html('<li class="fa fa-play">')
            .appendTo($li)
            .click(function () {
              Player.play($(this).attr('url'), $(this));
            });

            var $trackName = $('<div>')
            .addClass('track-name')
            .appendTo($li);

            $('<span>')
            .addClass('track-name-inner')
            .html('<p>' + track.track.replace('mp3', '') + '</p>')
            .appendTo($trackName);

            var $btnDown = $('<a download target="_blank">')
            .attr('href', track.direct)
            .html('<i class="fa fa-download">')
            .addClass('btn btn-down')
            .appendTo($li);

          });
        } else {
          $msgLoading.hide();
          $msgTxt.html('Desculpe, não encontramos nada!').show();
        }
      });
    }, 1000);
  });

});
