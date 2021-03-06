let defKey = "f3c52c90-008b-4455-b175-2d43e6e996af";
let giphyKey = "XHrYYSVO6qb5aOsRTIJaoCBtMqqC1oC1";
let definitionBox = document.querySelector("#definitionBox"); 
let giphyBox = document.querySelector("#gifBox");
let input = document.querySelector("#entryField")
let localStorageSearch = document.querySelector("#localStorage");


// Dictionary API **********
const definition = (txt) => {
  var txt = txt;
  const apiURL = "https://www.dictionaryapi.com/api/v3/references/collegiate/json/" + txt +"?key=" + defKey;
    fetch (apiURL)
    .then((Response) => {
        return Response.json();
    })
    .then((data) => {
      
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
    //adding the volume icon and sound
    var searchValue = $("#entryField").val();
    var def2HTML=`<i class="fas fa-volume-up fa-2x" onclick="playSound('${searchValue}')"></i>`;
    const defHTML = `<p>${data[0].hwi.prs[0].mw}</p>
                      <p><i><em>${data[0].fl}</em></i></p>
                      <hr>`;
                      
    $("#definitionBox").append(def2HTML, defHTML);

    $.each(data[0].shortdef, (i, value) => {
      // console.log();
    $("#definitionBox").append(`<li>` + value + '<br>');
    });
    giphy(data);
  }
  else{
    $("#definitionBox").html(`<h3 style="color:yellow;">Suggestion</h3>`+`<br>`);
    $.each(data, (i, value) => {

      $("#definitionBox").append(`<option onclick='selector(event)'>${value}</option><br>`);})
      
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

// Display localStorage **********
var searchText = () => {
  
  var searchValue = $("#entryField").val();
  localStorage.setItem("search", searchValue);
  var appendValue = localStorage.getItem("search")
  var partyText = "Making a Party with the Word: "
  $("#localStorage").append(`<p>` +partyText +appendValue + '</p>').attr("class", "ml-48 mr-48 pl-6 pr-6 pb-1 text-white bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-3xl text-center")
};


// Word search listener **********
$("#searchBtn").on("click",(event) => {
  event.preventDefault();
  localStorage.clear();
  localStorageSearch.innerHTML = "";
  searchText();
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



//play sound **********
function playSound(msg){
  var sound=new SpeechSynthesisUtterance();
  sound.text=msg
  window.speechSynthesis.speak(sound);
}
 

// Get select option text then auto-complete search box **********
function selector(event) {
  const displayText = event.target.text;
  input.value = displayText;
};




