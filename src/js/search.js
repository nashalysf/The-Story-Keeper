$(document).ready(function() {
    var item, tile, author, publisher, bookLink, bookImg;
    var outputList = document.getElementById("list-output");
    var bookUrl = "https://www.googleapis.com/books/v1/volumes?q=";
    var apiKey = "key=AIzaSyDtXC7kb6a7xKJdm_Le6_BYoY5biz6s8Lw";
    var placeHldr = '<img src="./assets/img/placeholder.png">';
    var searchData;
  

    $("#search").click(function() {
      outputList.innerHTML = ""; 
       searchData = $("#search-box").val();
       if(searchData === "" || searchData === null) {
         displayError();
       }
      else {

         $.ajax({
            url: bookUrl + searchData,
            dataType: "json",
            success: function(response) {
              console.log(response)
              if (response.totalItems === 0) {
                alert("Try again. No results.")
              }
              else {
                $("#title").animate({'margin-top': '5px'}, 1000); 
                $(".book-list").css("visibility", "visible");
                displayResults(response);
              }
            },
            error: function () {
              alert("Something went wrong... <br>"+"Try again!");
            }
          });
        }
        $("#search-box").val(""); 
     });
  

     function displayResults(response) {
        for (var i = 0; i < response.items.length; i+=2) {
          item = response.items[i];
          title1 = item.volumeInfo.title;
          author1 = item.volumeInfo.authors;
          publisher1 = item.volumeInfo.publisher;
          bookLink1 = item.volumeInfo.previewLink;
          bookIsbn = item.volumeInfo.industryIdentifiers[1].identifier
          bookImg1 = (item.volumeInfo.imageLinks) ? item.volumeInfo.imageLinks.thumbnail : placeHldr ;
  
          item2 = response.items[i+1];
          title2 = item2.volumeInfo.title;
          author2 = item2.volumeInfo.authors;
          publisher2 = item2.volumeInfo.publisher;
          bookLink2 = item2.volumeInfo.previewLink;
          bookIsbn2 = item2.volumeInfo.industryIdentifiers[1].identifier
          bookImg2 = (item2.volumeInfo.imageLinks) ? item2.volumeInfo.imageLinks.thumbnail : placeHldr ;
  
          outputList.innerHTML += '<div class="searcharea">' +
                                  formatOutput(bookImg1, title1, author1, publisher1, bookLink1, bookIsbn) +
                                  formatOutput(bookImg2, title2, author2, publisher2, bookLink2, bookIsbn2) +
                                  '</div>';
  
          console.log(outputList);
        }
     }
  
    
     function formatOutput(bookImg, title, author, publisher, bookLink, bookIsbn) {
       var viewMyBooks = 'mybooks.html?isbn='+bookIsbn;
       var viewUrl = 'book.html?isbn='+bookIsbn;
       var htmlCard = `
       <div class="searcharea-output-section">
         <div class="searchcards" style="">
           <div class="row no-gutters">
             <div class="col-md-4">
               <img src="${bookImg}" class="card-img" alt="">
             </div>
             <div class="col-md-8">
               <div class="card-body">
                 <h5 class="card-title">${title}</h5>
                 <p class="card-text">Author: ${author}</p>
                 <p class="card-text">Publisher: ${publisher}</p><br />
                 <a href="${viewMyBooks}" class="addbooksbtn">Add to My Books</a><br /><br />
                 <a target="_blank" href="${viewUrl}" class="addbooksbtn">View Book</a>
               </div>
             </div>
           </div>
         </div>
       </div>`
       return htmlCard;
     }
  
     function displayError() {
       alert("Please enter something you would like to search.")
     }
  
  });

  //HANDLEBARS

  // Our Favorites
  function fill_template() {
    var data = {
        title: "Our Favorites",
        list: [
            {name: "JavaScript and JQuery by Jon Duckett"},
            {name: "Learning Web Design by Jennifer Robbins"},
            {name: "Learn to Code HTML and CSS by Shay Howe"},
            {name: "JavaScript for Kids by Nick Morgan"}
        ]
    };
    var template = Handlebars.compile(document.querySelector("#template").innerHTML);
    var filled = template(data, {
        noEscape: true
    })
    document.querySelector("#output").innerHTML = filled;
}

// Trending
function fill_template2() {
  var data = {
      title: "Trending",
      list: [
          {name: "How To Bake Everything by Maraminoff, Amy Matthew"},
          {name: "Fashion and Its Social Agendas by Diana Crane"},
          {name: "Funny You Should Ask by Elissa Sussman"},
          {name: "Planetary Health by Samuel Myers, Howard Frumkin"}
      ]
  };
  var template2 = Handlebars.compile(document.querySelector("#template").innerHTML);
  var filled = template2(data, {
      noEscape: true
  })
  document.querySelector("#output").innerHTML = filled;
}

// Weekly Picks
function fill_template3() {
  var data = {
      title: "Weekly Picks",
      list: [
          {name: "Funny: The Book by David Misch"},
          {name: "Furiously Happy by Jenny Lawson"},
          {name: "Funny You Should Ask by Elissa Sussman"},
          {name: "Dangerously Funny by David Bianculli"}
      ]
  };
  var template3 = Handlebars.compile(document.querySelector("#template").innerHTML);
  var filled = template3(data, {
      noEscape: true
  })
  document.querySelector("#output").innerHTML = filled;
}