
$(document).ready(function(){

/////////// Gestione Handlebars //////////
// Prendo quello che è contenuto nello script selezionandolo tramite id e poi // ciò che ho preso lo do a Handlebars e glielo faccio smaneggiare
var source = $("#template-film").html();
var template = Handlebars.compile(source);


//////////// Gestione barra di ricerca al click ///////////////
  $("#bottone-ricerca").click(

    function(){
      // prendi il valore che si trova in input
      var queryInserita = $(".hdestra input").val();

      $.ajax({
        url : "https://api.themoviedb.org/3/search/movie",
        data:{
          api_key: "e99307154c6dfb0b4750f6603256716d",
          language: "it-IT",
          query: queryInserita
        },
        method : "GET",
        success: function (data,stato) {
          var risultati = data.results;
          for (var i = 0; i < risultati.length; i++) {
            var context = {
              titolo: risultati[i]["title"],
              titolo_originale: risultati[i]["original_title"],
              lingua: risultati[i]["original_language"],
              voto: risultati[i]["vote_average"],
            };
            var html = template(context);
            $("main").append(html);

          }
        },
        error : function (richiesta, stato, errore) {
          // quello che succede se c'è un errore. Ex:
          alert("E' avvenuto un errore. " + errore);
        }
      });
    }
  );


  // // creo una variabile che contiene l'informazione completa del tamplate + il testo inserito dinamicamente
  // var html = template(testoInputObject);
  // // inserisco l'informazione del template "html" dove voglio io
  // $(".DoveVoglioIo").append(html);


});
