let defKey = "f3c52c90-008b-4455-b175-2d43e6e996af";
let giphyKey = "XHrYYSVO6qb5aOsRTIJaoCBtMqqC1oC1";
let definitionBox = document.querySelector("#definitionBox"); 
let giphyBox = document.querySelector("#gifBox");
let input = document.querySelector("#entryField")


// Dictionary API **********
const definition = (txt) => {
  var txt = txt;
  const apiURL = "https://www.dictionaryapi.com/api/v3/references/collegiate/json/" + txt +"?key=" + defKey;
    fetch (apiURL)
    .then((Response) => {
        return Response.json();
    })
    .then((data) => {
      console.log(data);
      displayDefinition(data);
      return data;
        });
};


// Display word definition **********
const displayDefinition = (data) => {

  /**
   * Check if the word can be defined as the smallest sequence of 
   * phonemes uttered in isolation with objective or practical meaning.
   */
  if (data.length > 1) {
  if (data[0].fl){
    const defHTML = `<p>${data[0].hwi.prs[0].mw}</p>
                      <p><i><em>${data[0].fl}</em></i></p>
                      <hr>`;
    $("#definitionBox").html(defHTML);

    $.each(data[0].shortdef, (i, value) => {

    $("#definitionBox").append(`<li>` + value + '<br>');
    });
    giphy(data);
  }
  else{
    $("#definitionBox").html(`<h3 style="color:yellow;">Suggestion</h3>`+`<br>`);
    $.each(data, (i, value) => {

      $("#definitionBox").append(`<option>` + value + '<br>');})
  }
}
else {
  $("#definitionBox").html(`<h3 style="color:yellow;">Nothing Found</h3>`+`<br>`);
}

};


// Display Giphy **********
const giphy = (data) => {
 
  const giphyTXT = input.value;
  const giphyURL = "https://api.giphy.com/v1/gifs/search?api_key="+ giphyKey + "&q=" + giphyTXT + "&limit=25&offset=0&rating=g&lang=en";
  fetch (giphyURL)
  .then((Response) => {
    return Response.json();
  })
  .then((json) => {

    // Get random GIF **********
    const src = json.data[Math.floor(1+Math.random()*10)].images.fixed_height.url;
    const gifHTML = $(`<img/>`).attr('src', src);
    $("#gifBox").html(gifHTML);
  });
};


// Word search listener **********
$("#searchBtn").on("click",(event) => {
  event.preventDefault();
  definitionBox.innerHTML = "";
  giphyBox.innerHTML = "";
  let txt = input.value;

  // Accept only alphabets in textbox **********
  let alphabet = /^\s*[A-Za-z]+\s*$/;

  if (txt.match(alphabet)) {
    definition(txt);
  } 
  else {
    $("#definitionBox").html(`<h3 style="color:yellow;">Oops! Must contain letters</h3>`);
    
  };
});





