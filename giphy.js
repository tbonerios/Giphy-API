       var animals = ["cat", "bird", "dog", "pig", "horse", "fish", "monkey", "rhino", "snake", "elephant", "reptile", "mammal"];

       function displayAnimalInfo() {

           var animal = $(this).attr("data-name");

           var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
               animal + "&api_key=dc6zaTOxFJmzC&limit=10";

           $.ajax({
               url: queryURL,
               method: "GET"
           })

           .done(function(response) {

               var results = response.data;

               for (var i = 0; i < results.length; i++) {

                   if (results[i].rating !== "r" && results[i].rating !== "pg-13") {

                       var animalDiv = $("<div>");

                       var rating = results[i].rating;

                       var p = $("<p>").text("Rating: " + rating);

                       var animalImage = $("<img>");

                       animalImage.attr("src", results[i].images.fixed_height.url);
                       animalImage.attr("data-still",results[i].images.fixed_height_still.url);
                       animalImage.attr("data-animate",results[i].images.fixed_height.url);
                       animalImage.attr("data-state", "still");
                       animalImage.addClass("image");

                       animalDiv.append(p);
                       animalDiv.append(animalImage);


                       $("#gifs-appear-here").prepend(animalDiv);
                   }
               }
           });
       }

       function renderButtons() {


           $("#buttons-view").empty();


           for (var i = 0; i < animals.length; i++) {


               var a = $("<button>");

               a.addClass("animal");

               a.attr("data-name", animals[i]);

               a.text(animals[i]);

               $("#buttons-view").append(a);
           }
       }

       $("#add-animal").on("click", function(event) {
           event.preventDefault();

           var animal = $("#animal-input").val().trim();

           animals.push(animal);


           renderButtons();
       });


       $(document).on("click", ".animal", displayAnimalInfo);

       renderButtons();



       $(document).on("click", ".image", function(){
    var state = $(this).attr('data-state');
    if ( state == 'still'){
        $(this).attr('src', $(this).data('animate'));
        $(this).attr('data-state', 'animate');
    }else{
        $(this).attr('src', $(this).data('still'));
        $(this).attr('data-state', 'still');
    }
  });




