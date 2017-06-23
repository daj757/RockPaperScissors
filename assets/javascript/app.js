$(document).ready(function() {

	//Set up modal pop-up to collect players name

$('#myModal').modal({
  backdrop: 'static',
  keyboard: false
}); 

$('#myModal').modal('show');

//Set up global variables
 
  var fireBase = firebase.database();
  var players = 0;
  var currentPlayer = 0;
  var playerNumber = 0;
  var playerOne = {
  	score: 0,
  	name: " ",
  	wins: 0  ,
  	losses: 0,
  	ties: 0 ,
  	choice: " ",
  	msg: ""
  }
  var playerTwo = {
  	score: 0,
  	name: " " ,
  	wins: 0 ,
  	losses: 0,
  	ties: 0,
  	choice: " " ,
  	msg: ""    
  }
//Set initial amount of players to firebase
   
   fireBase.ref().set({
    players: players,
    
  });

 //Collect name info from modal

 $("#submitname").on("click", function(){
 	event.preventDefault(); 

    playerName = $("#username").val().trim();
    
    if (playerName == ""){
    	return false
    }
    // logic for which player you are
    else if (players === 0) {
      // update players variables 
      fireBase.ref().update({
        'players': 1,
        'player1_name': playerName,
      });
      playerNumber = 1;
      $('#myModal').modal('hide');
      $("#nameSpace").text("Welcome to the RPS arena " + playerName + " make your choice...")
      // $('#gameMessage').empty();
      // $('#gameMessage').html('You can choose your move when ready');

    }
    else if (players === 1) {
      // sets players =2 in fb, which then updates local variable to 2
      fireBase.ref().update({
        'players': 2,
        'player2_name': playerName,
      });    
      playerNumber = 2;  
      $('#myModal').modal('hide');
      $("#nameSpace").text("Welcome to the RPS arena " + playerName + " make your choice...")
      // $('#gameMessage').empty();
      // $('#gameMessage').html('You can choose your move when ready');
    } 
 }); 

// Player choices

 $("#rock").on("click", function(){
 	if(players == 1) {
 		fireBase.ref().update({playerOne_choice: "rock"});
 	}
 	else if (players == 2) {
 		fireBase.ref().update({playerTwo_choice: "rock"});
 	}
 }) 

 $("#paper").on("click", function(){
 	if(players == 1) {
 		fireBase.ref().update({playerOne_choice: "paper"});
 	}
 	else if (players == 2) {
 		fireBase.ref().update({playerTwo_choice: "paper"});
 	}
 }) 

 $("#scissors").on("click", function(){
 	if(players == 1) {
 		fireBase.ref().update({playerOne_choice: "scissors"});
 	}
 	else if (players == 2) {
 		fireBase.ref().update({playerTwo_choice: "scissors"});
 	}
 }) 

 // Chat functionality 
 
$("#submitmsg").on("click", function() {

	event.preventDefault();
            var msg = $("#usermsg");
            var msgValue = msg.val().trim();
 
            if (msgValue.length == 0) {
                return false;

            } else {

        
         var chatMsg = playerName + ': ' + msgValue + '<br>';

    // append chat text to firebase
    if (playerNumber === 1) {
      fireBase.ref().update({'player1_msg': chatMsg});
    } else if (playerNumber === 2) {
      fireBase.ref().update({'player2_msg': chatMsg});
    }
  
 			msg.val('')
                
            }
          return false;
           
        });
 

fireBase.ref().on("value", function(snapshot) {
    // continuously update global variable "players" on users' page
    players = snapshot.val().players;
    playerOne.name = snapshot.val().playerOne_name;
    playerOne.choice = snapshot.val().playerOne_choice;
    playerTwo.name = snapshot.val().playerTwo_name;
    playerTwo.choice = snapshot.val().playerTwo_choice; 
    choicesMade = snapshot.val().choicesMade;
    
    // when both players choose, run game
    if (choicesMade == 2) {
      game(player1.choice, player2.choice);
    }

    $('#player1_name').html(snapshot.val().player1_name);
    $('#player2_name').html(snapshot.val().player2_name);
    $('#player1_score').html(snapshot.val().player1_score);
    $('#player2_score').html(snapshot.val().player2_score);
    $('#msg-container').append(snapshot.val().player1_msg);
    $('#msg-container').append(snapshot.val().player2_msg);

    // error handling
    }), function (errorObject) {
      console.log("The read Failed: " + errorObject.code);
  };


function game(one, two){
console.log("starts");
};

});



