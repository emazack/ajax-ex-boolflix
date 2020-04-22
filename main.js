$(document).ready(function(){

  var source = $("#template-film").html();
  var template = Handlebars.compile(source);

  $("#bottone-ricerca").click(
    function() {
      // cancello la pagina
      $("main").html("");
      // prendi il valore che si trova in input
      var queryInserita = $(".hdestra input").val();
      $.ajax({
        url : "https://api.themoviedb.org/3/search/movie",
        data: {
          api_key: "e99307154c6dfb0b4750f6603256716d",
          language: "it-IT",
          query: queryInserita
        },
        method : "GET",
        success: function (data,stato) {
          var risultati = data.results;
          generaRicerca(risultati, "movie");
          var html = template(context);
          $("main").append(html);
        },
        error : function (richiesta, stato, errore) {
          // quello che succede se c'è un errore. Ex:
          alert("E' avvenuto un errore. " + errore);
        }

      });
      //
      $.ajax({
        url : "https://api.themoviedb.org/3/search/tv",
        data: {
          api_key: "e99307154c6dfb0b4750f6603256716d",
          language: "it-IT",
          query: queryInserita
        },
        method : "GET",
        success: function (data,stato) {
          var risultati = data.results;
          generaRicerca(risultati, "tv");
          var html = template(context);
          $("main").append(html);
        },
        error : function (richiesta, stato, errore) {
          // quello che succede se c'è un errore. Ex:
          alert("E' avvenuto un errore. " + errore);
        }

      });

    };

  );



  // funzioni //
  function generaRicerca(ArrayDiDati, type) {
    if (type == "movie") {
      for (var i = 0; i < ArrayDiDati.length; i++) {
        // trasformo in voto in numero e lo divido per 2 e dopo lo arrotondo al numero più vicino
        var votoStellina = Math.round( ( parseInt( ArrayDiDati[i]["vote_average"] ) / 2 ) );
        // sistema di sostituzione di numero con stellina piena
        if (votoStellina == 1) {
          votoStellina = "<img src='img/stellapiena.png' alt='Stellina'>"
        } else if (votoStellina == 2){
          votoStellina = "<img src='img/stellapiena.png' alt='Stellina'><img src='img/stellapiena.png' alt='Stellina'>"
        } else if (votoStellina == 3){
          votoStellina = "<img src='img/stellapiena.png' alt='Stellina'><img src='img/stellapiena.png' alt='Stellina'><img src='img/stellapiena.png' alt='Stellina'>"
        } else if (votoStellina == 4){
          votoStellina = "<img src='img/stellapiena.png' alt='Stellina'><img src='img/stellapiena.png' alt='Stellina'><img src='img/stellapiena.png' alt='Stellina'><img src='img/stellapiena.png' alt='Stellina'>"
        } else if (votoStellina == 5){
          votoStellina = "<img src='img/stellapiena.png' alt='Stellina'><img src='img/stellapiena.png' alt='Stellina'><img src='img/stellapiena.png' alt='Stellina'><img src='img/stellapiena.png' alt='Stellina'><img src='img/stellapiena.png' alt='Stellina'>"
        } else if (votoStellina == 0){
          votoStellina = "N/d"
        }
        var context = {
          titolo: ArrayDiDati[i]["title"],
          titolo_originale: ArrayDiDati[i]["original_title"],
          lingua: ArrayDiDati[i]["original_language"],
          voto: votoStellina
        };
        var html = template(context);
        $("main").append(html);

      };

    } else if (type =="tv") {
      for (var i = 0; i < ArrayDiDati.length; i++) {
        // trasformo in voto in numero e lo divido per 2 e dopo lo arrotondo al numero più vicino
        var votoStellina = Math.round( ( parseInt( ArrayDiDati[i]["vote_average"] ) / 2 ) );
        // sistema di sostituzione di numero con stellina piena
        if (votoStellina == 1) {
          votoStellina = "<img src='img/stellapiena.png' alt='Stellina'>"
        } else if (votoStellina == 2){
          votoStellina = "<img src='img/stellapiena.png' alt='Stellina'><img src='img/stellapiena.png' alt='Stellina'>"
        } else if (votoStellina == 3){
          votoStellina = "<img src='img/stellapiena.png' alt='Stellina'><img src='img/stellapiena.png' alt='Stellina'><img src='img/stellapiena.png' alt='Stellina'>"
        } else if (votoStellina == 4){
          votoStellina = "<img src='img/stellapiena.png' alt='Stellina'><img src='img/stellapiena.png' alt='Stellina'><img src='img/stellapiena.png' alt='Stellina'><img src='img/stellapiena.png' alt='Stellina'>"
        } else if (votoStellina == 5){
          votoStellina = "<img src='img/stellapiena.png' alt='Stellina'><img src='img/stellapiena.png' alt='Stellina'><img src='img/stellapiena.png' alt='Stellina'><img src='img/stellapiena.png' alt='Stellina'><img src='img/stellapiena.png' alt='Stellina'>"
        } else if (votoStellina == 0){
          votoStellina = "N/d"
        }
        var context = {
          titolo: ArrayDiDati[i]["name"],
          titolo_originale: ArrayDiDati[i]["original_name"],
          lingua: ArrayDiDati[i]["original_language"],
          voto: votoStellina
        };
        var html = template(context);
        $("main").append(html);

      };

    } //fine else if

  }; // fine funzione generaRicerca

}); // fine document ready
