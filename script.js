var defKey = "f3c52c90-008b-4455-b175-2d43e6e996af";
var giphyKey = "jCojN0t1UlrJ7c9lCdhqS3UMkGvT9924";
var definitionBox = document.getElementById("definitionBox");

var definition = () => {
  var txt = $("#entryField").val();
  var apiURL = "https://www.dictionaryapi.com/api/v3/references/collegiate/json/" + txt +"?key=" + defKey;
    fetch (apiURL)
    .then((Response) => {
        return Response.json();
    })
    .then((data) => {
      displayDefinition(data);
      return data;
        })
};


// Display word definition
var displayDefinition = (data) => {
  
  $.each(data[0].shortdef, function(i, value){
    
    $("#definitionBox").append(value + '<br>')
  });

}
 


// Display Giphy 
var giphy = () => {
  var giphyTXT = $("#entryField").val();
  var giphyURL = "https://api.giphy.com/v1/gifs/search?api_key="+ giphyKey + "&q=" + giphyTXT + "&limit=25&offset=0&rating=g&lang=en";
  fetch (giphyURL)
  .then((Response) => {
    return Response.json();
  })
  .then((json) => {
    var src = json.data[0].images.fixed_height.url;
    var gifHTML = $(`<img/>`).attr('src', src);
    $("#gifBox").html(gifHTML);
  })
}




// Word search listener
$("#searchBtn").on("click",(event) => {
  event.preventDefault();
  definitionBox.innerHTML = "";
  definition(event)
  giphy(event);
});







