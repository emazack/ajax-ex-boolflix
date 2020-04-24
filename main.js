$(document).ready(function(){

  var source = $("#template-film").html();
  var template = Handlebars.compile(source);

  $("#bottone-ricerca").click(
    function() {
      // cancello la pagina
      $("main").html("");
      // prendi il valore che si trova in input
      var queryInserita = $(".hdestra input").val();
      // prima chiama ajax per i film
      chiamataAjax("movie" , queryInserita, "it-IT");
      // seconda chiamata ajax per show tv
      chiamataAjax("tv" , queryInserita, "it-IT");
    } // fine funzione dentro click

  ); // fine click



  //////////////// FUNZIONI /////////////////

  // funzione per fare una chiamata ajax ed interrogare la API

  function chiamataAjax(type , queryParamenter, languageParameter) {

    $.ajax({
      url : "https://api.themoviedb.org/3/search/" + type,
      data: {
        api_key: "e99307154c6dfb0b4750f6603256716d",
        language: languageParameter,
        query: queryParamenter
      },
      method : "GET",
      success: function (data,stato) {
        var risultati = data.results;
        generaRicerca(risultati, type);

      },
      error : function (richiesta, stato, errore) {
        // quello che succede se c'è un errore. Ex:
        alert("E' avvenuto un errore. " + errore);
      }

    });

  }

  // fuzione per generare il risultato della ricerca di movie e tv

  function generaRicerca(ArrayDiDati, type) {
    if (type == "movie") {
      for (var i = 0; i < ArrayDiDati.length; i++) {
        var context = {
          titolo: ArrayDiDati[i]["title"],
          titolo_originale: ArrayDiDati[i]["original_title"],
          lingua: flagGenerator(ArrayDiDati[i]["original_language"]),
          voto: votoInStelle(ArrayDiDati[i]["vote_average"]),
          tipo: type,
          cover: generaCover(ArrayDiDati[i]["poster_path"]),
          sinossi: generaSinossi(ArrayDiDati[i]["overview"])
        };
        var html = template(context);
        $("main").append(html);

      };

    } else if (type =="tv") {
      for (var i = 0; i < ArrayDiDati.length; i++) {
        var context = {
          titolo: ArrayDiDati[i]["name"],
          titolo_originale: ArrayDiDati[i]["original_name"],
          lingua: flagGenerator(ArrayDiDati[i]["original_language"]),
          voto: votoInStelle(ArrayDiDati[i]["vote_average"]),
          tipo: type,
          cover: generaCover(ArrayDiDati[i]["poster_path"]),
          sinossi: generaSinossi(ArrayDiDati[i]["overview"])
        };
        var html = template(context);
        $("main").append(html);

      };

    } //fine else if

  }; // fine funzione generaRicerca


  // funzione per generare un voto in stelle in base 5 partendo da una base 10

  function votoInStelle(valutazioneBaseDieci) {
    var votoBase5 = Math.round( ( parseInt( valutazioneBaseDieci ) / 2 ) );
    var stelle = "";
    for (var i = 1; i <= 5 ; i++) {
      if (i <= votoBase5) {
        stelle += "★";
      } else {
        stelle += "☆";
      }

    };
    return stelle;
  }; // fine funzione voto in stelle


  // funzione per generare la bandiera in base alla nazione

  function flagGenerator(codiceLanguage) {
    images = ["it" , "en" , "de" , "es"];
    var imgGenerata;

    if(images.includes(codiceLanguage)) {
      imgGenerata = '<img src="img/' + codiceLanguage + '.png" alt="immagine" class="flags" >';
      return imgGenerata;
    }
    return codiceLanguage;
  }

  // funzione per inserire l'immagine copertina dello show/film

  function generaCover(endpointCover) {
    if (endpointCover != null) {
      endpointCover = "https://image.tmdb.org/t/p/w500/" + endpointCover
      return endpointCover;
    } else if (endpointCover === null) {
      endpointCover = "img/black.jpg";
      return endpointCover;
    }
  }

  // funzione per inserire la sinossi dell'elemento ricercato

  function generaSinossi(testoSinossi) {
    if (testoSinossi == "") {
      sinossiMancante = "Descrizione non disponibile"
      return sinossiMancante;
    } else {
      return testoSinossi;
    }
  }

}); // fine document ready
