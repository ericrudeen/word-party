var key ="f3c52c90-008b-4455-b175-2d43e6e996af";
// var btn = document.getElementById("entryField");
// var divDifBox = document.getElementById("definitionBox")
// var gifBox = document.getElementById("gifBox");
// var formEl = document.getElementById("form");


var definition = () => {
    var txt = $("#entryField").val();
    var apiURL = "https://www.dictionaryapi.com/api/v3/references/collegiate/json/" + txt +"?key=" + key;
    fetch (apiURL)
    .then((Response) => {
        return Response.json();
    })
    .then((data) => {

      var defHTML = `<p>${data[0].shortdef[0]}</p>`;
      $("#definitionBox").html(defHTML);

          // console.log(data);
          //  displayDif(data);
            return data;
        })

    // formSubmitHandler();
};



// Word search listener
$("#searchBtn").on("click",(event) => {
  event.preventDefault();
  definition(event)
});




// var displayDif = (data) => {
    
//    var def = `<p>${data.shortdef.value}</p>`;
//   //  divDifBox.textContent = data.shortdef[0];
//     divDifBox.innerHTML(def);
// }

// var formSubmitHandler = function (event) {
//     event.preventDefault();
  
//     var searchTerm = btn.value.trim();
  
//     if (searchTerm) {
//         definition(searchTerm);
  
//       divDifBox.textContent = ''; // DivDifEl
      
//     } else {
//       alert('OOPS!'); 
//     }

    
//   };
  





//   formEl.addEventListener("submit", formSubmitHandler);


// var definition = () =>{
// var key ="f3c52c90-008b-4455-b175-2d43e6e996af";
// var txt = $("#entryField").val();
// var apiURL = "https://www.dictionaryapi.com/api/v3/references/collegiate/json/" + txt +"?key=" + key;

// fetch(apiURL).then(
//   Response=>{
//     Response.json().then(
//       data=>{
//         console.log(dat);
//       }
//     )
//   }
// )
// };




