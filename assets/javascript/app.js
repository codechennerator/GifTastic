$(document).ready(function(){

var animals = ["badger","panda","elephant","cat","dog","red panda","dolphin","monkey"];

/*
	Step 1: Initial displays: buttons, button add form
	Step 2: Button functionality, Submit functionality
	Step 3: GIF functionality
*/


/*-----------------------------------Step 1: Initial displays: buttons, button add form----------------------------*/

function addButtons(){
	$('#buttonsContainer').empty();
	for (let i = 0; i<animals.length; i++){
		var $buttonEle = $('<button>').attr({'data-name':animals[i], 'class':'animalButton'}).text(animals[i]);
		$('#buttonsContainer').append($buttonEle);
	}
}

function addSearch(){
	var $formDiv = $('<form>');

	var $searchLabel = $('<label>').text('Add an animal').attr({'for':'addAnimal', 'class': 'col-12'});
	var $searchDiv = $('<input>').attr({'type':'search','id':'addAnimal'});
	var $submitAdd = $('<input>').attr({'type':'submit','id':'submitAnimal'});

	$formDiv.append($searchLabel, $searchDiv, $submitAdd);
	$('#searchContainer').append($formDiv);

}

function initializeDisplay(){
	addButtons();
	addSearch();
}

initializeDisplay();



/*-----------------------------------Step 2: Button functionality, Submit functionality ----------------------------*/

$('body').on('click','.animalButton',function(){

	$('#gifContainer').empty();

	
	var animalName = $(this).attr('data-name');
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        animalName + "&api_key=ShRrjid1c2DL38mpNX7Y7RsMNy0v0NiR&limit=10";

    $.ajax({
      url: queryURL,
      method: "GET"
    })
    // After the data comes back from the API
    .done(function(response) {
      // Storing an array of results in the results variable
     	var results = response.data;
     	console.log(results);

     	for (let i = 0; i<results.length; i++){
     		var $gifDiv = $('<div>').attr('class', 'gifHolder')
     		var rating = (results[i].rating).toUpperCase();
     		var ratingDiv = $('<p>').text("Rating: " + rating);
     		var gifDiv = $('<img>').attr({
     								'src': results[i].images.fixed_height_still.url,
     								'class':'gif',
     								'data-still': results[i].images.fixed_height_still.url,
     								'data-animate': results[i].images.fixed_height.url,
     								'data-state': 'still'
     								});
     		

     		$gifDiv.append(ratingDiv,gifDiv);
     		$('#gifContainer').append($gifDiv);

     	}
     	

    });

});


$('#submitAnimal').on('click', function(event){	
	event.preventDefault();
	if($('#addAnimal').val() != ''){
		var animalToAdd = $('#addAnimal').val().trim();
		animalToAdd = animalToAdd.toLowerCase();
		animals.push(animalToAdd);
		addButtons();

		$('#addAnimal').val('');
	}
});


/*-----------------------------------Step 3: GIF functionality ----------------------------*/

$('body').on('click', '.gif',function(){
	var gifState = $(this).attr('data-state');
	if (gifState == 'still'){
		$(this).attr('src',$(this).attr('data-animate'));
		$(this).attr('data-state','animate');
	}else if (gifState == 'animate'){
		$(this).attr('src',$(this).attr('data-still'));
		$(this).attr('data-state','still');
	}
});
	
});