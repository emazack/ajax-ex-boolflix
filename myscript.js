
$(document).ready(function(){

  $("#bottone-ricerca").click(
    function(){
      $.ajax({
        url : "https://api.themoviedb.org/3/movie/550?api_key=e378742730fc784d9e5410ffaa7cd73e",
        method : "GET",
        success: function (data,stato) {

        },
        error : function (richiesta, stato, errore) {
          // quello che succede se c'è un errore. Ex:
          alert("E' avvenuto un errore. " + errore);
        }
      });
    }
  );

  // // gestione Handlebars:
  // // Prendo quello che è contenuto nello script selezionandolo tramite id
  // var source = $("#template-mex-inviato").html();
  // // ciò che ho preso lo do a Handlebars e glielo faccio smaneggiare
  // var template = Handlebars.compile(source);
  // // creo una variabile che contiene l'informazione completa del tamplate + il testo inserito dinamicamente
  // var html = template(testoInputObject);
  // // inserisco l'informazione del template "html" dove voglio io
  // $(".DoveVoglioIo").append(html);


});
