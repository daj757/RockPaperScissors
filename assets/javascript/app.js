$(document).ready(function() {

	//Set up modal pop-up to collect players name

$('#myModal').modal({
  backdrop: 'static',
  keyboard: false
}); 

$('#myModal').modal('show');

//Set up global variables
 var ties = 0;
  var fireBase = firebase.database();
  var players = 0;
  var currentPlayer = 0;
  
  var playerOne = {
  	score: 0,
  	name: " ",
  	wins: 0  ,
  	losses: 0,
  	choice: " ",
  	msg: "",
  	
  }
  var playerTwo = {
  	score: 0,
  	name: " " ,
  	wins: 0 ,
  	losses: 0,
  	choice: " " ,
  	msg: "",
  	   
  }
 console.log(ties);
  var choice1 = false;
  var choice2 = false;
 var playerNumber = 0;
//Set initial amount of players to firebase
   
   fireBase.ref().set({
    players: players,
    
  });
fireBase.ref().update({"ties_Score": ties});
 //Collect name info from modal

 $("#submitname").on("click", function(){
 	event.preventDefault(); 

    playerName = $("#username").val().trim();
    
    if (playerName == ""){
    	return false
    }
    // logic for which player you are
    else if (players == 0) {
      // update players variables 
      fireBase.ref().update({
        'players': 1,
        'playerOne_name': playerName,
        
      });
      playerNumber = 1;
      
      $('#myModal').modal('hide');
      $("#nameSpace").text("Welcome to the RPS arena " + playerName + " make your choice...");
      // $('#gameMessage').empty();
      // $('#gameMessage').html('You can choose your move when ready');

    }
    else if (players == 1) {
      // sets players =2 in fb, which then updates local variable to 2
      fireBase.ref().update({
        'players': 2,
        'playerTwo_name': playerName,
       
      }); 
      playerNumber = 2;   
      
      $('#myModal').modal('hide');
      $("#nameSpace").text("Welcome to the RPS arena " + playerName + " make your choice...");
      // $('#gameMessage').empty();
      // $('#gameMessage').html('You can choose your move when ready');
    } 
 }); 

// Player choices

 $("#rock").on("click", function(){
 	if(playerNumber === 1) {
 		fireBase.ref().update({playerOne_choice: "rock"});
 		fireBase.ref().update({choice_1: "true"});
 		$("#nameSpace").text("You choose rock... waiting for opponent");
 	}
 	else if (playerNumber === 2) {
 		fireBase.ref().update({playerTwo_choice: "rock"});
 		fireBase.ref().update({choice_2: "true"});
 		$("#nameSpace").text("You choose rock... waiting for opponent");
 	}
 }) 

 $("#paper").on("click", function(){
 	if(playerNumber == 1) {
 		fireBase.ref().update({playerOne_choice: "paper"});
 		fireBase.ref().update({choice_1: "true"});
 		$("#nameSpace").text("You choose paper... waiting for opponent");
 	}
 	else if (playerNumber == 2) {
 		fireBase.ref().update({playerTwo_choice: "paper"});
 		fireBase.ref().update({choice_2: "true"});
 		$("#nameSpace").text("You choose paper... waiting for opponent");
 		
 	}
 }) 

 $("#scissors").on("click", function(){
 	if(playerNumber == 1) {
 		fireBase.ref().update({playerOne_choice: "scissors"});
 		fireBase.ref().update({choice_1: "true"});
 		$("#nameSpace").text("You choose scissors... waiting for opponent");
 	}
 	else if (playerNumber == 2) {
 		fireBase.ref().update({playerTwo_choice: "scissors"});
 		fireBase.ref().update({choice_2: "true"});
 		$("#nameSpace").text("You choose scissors... waiting for opponent");
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
 			fireBase.ref().update({'player1_msg':" "});
 			fireBase.ref().update({'player2_msg':" "})
                
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
    choice1 = snapshot.val().choice_1;
    choice2 = snapshot.val().choice_2;
    ties = snapshot.val().ties_Score;
    
    playerOne.number = snapshot.val().playerOne_number;
    playerTwo.number = snapshot.val().playerTwo_number;
    $('#player1_name').html(snapshot.val().player1_name);
    $('#player2_name').html(snapshot.val().player2_name);
    $('#p1Score').html(playerOne.name + " Wins: " + playerOne.wins);
    $('#p2Score').html(playerTwo.name + " Wins: " + playerTwo.wins);
    $('#p1Losses').html(playerOne.name + " Losses: " + playerOne.losses);
    $('#p2Losses').html(playerTwo.name + " Losses: " + playerTwo.losses);
    $('#msg-container').append(snapshot.val().player1_msg);
    $('#msg-container').append(snapshot.val().player2_msg);
    $("#tieDisplay").html("Ties: " + ties);
    if (choice1 == "true" && choice2 == "true") {
    	console.log("begins");
    	game(playerOne.choice, playerTwo.choice);
    }

    // error handling
    }), function (errorObject) {
      console.log("The read Failed: " + errorObject.code);
  };


// Game logic

function game(one, two){

    // A tie
	if(one === two) {
	resetChoices();
	ties++
	fireBase.ref().update({"ties_Score": ties});
	   if(playerNumber=== 1){
   		$("#nameSpace").text("It's a tie!")
   	
   	}
   		 else if(playerNumber===2){
   		$("#nameSpace").text("It's a tie!")
   		}
   
   }

   // Wins and losses

   else if(one === "rock", two === "paper"){
   	resetChoices();
   		if(playerNumber === 1){
   		$("#nameSpace").text("Opponent chose paper. You lose!")
   	}
   	   else if(playerNumber === 2){
   		$("#nameSpace").text("Opponent chose rock. You win!")
   		}
   		playerOne.losses ++
   		playerTwo.wins ++
   		fireBase.ref().update({"playerTwo_wins": playerTwo.wins});
   		fireBase.ref().update({"playerOne_losses": playerOne.losses});
   		
   }
   else if(one === "paper", two === "rock"){
   	resetChoices();
   		if(playerNumber === 1){
   		$("#nameSpace").text("Opponent chose rock. You win!")
   	}
   		else if(playerNumber === 2){
   		$("#nameSpace").text("Opponent chose paper. You lose!")
   	}
   		playerOne.wins ++
   		playerTwo.losses ++
   		fireBase.ref().update({"playerOne_wins": playerOne.wins});
   		fireBase.ref().update({"playerTwo_losses": playerTwo.losses});
   }
   else if(one === "paper", two === "scissors"){
   	resetChoices();
   		if(playerNumber === 1){
   		$("#nameSpace").text("Opponent chose scissors. You lose!")
   	}
   		else if(playerNumber === 2){
   		$("#nameSpace").text("Opponent chose paper. You win!")
   	}
   		playerTwo.wins ++
   		playerOne.losses ++
   		fireBase.ref().update({"playerTwo_wins": playerTwo.wins});
   		fireBase.ref().update({"playerOne_losses": playerOne.losses});
   }
   else if(one === "scissors", two === "paper"){
   resetChoices();	
   		if(playerNumber === 1){
   		$("#nameSpace").text("Opponent chose paper. You win!")
   	}
   		else if(playerNumber === 2){
   		$("#nameSpace").text("Opponent chose scissors. You lose!")
   	}
   		playerOne.wins ++
   		playerTwo.losses ++
   		fireBase.ref().update({"playerOne_wins": playerOne.wins});
   		fireBase.ref().update({"playerTwo_losses": playerTwo.losses});
   }
   else if(one === "rock", two === "scissors"){
   	resetChoices();
   		if(playerNumber === 1){
   		$("#nameSpace").text("Opponent chose scissors. You win!")
   	}
   		else if(playerNumber === 2){
   		$("#nameSpace").text("Opponent chose rock. You lose!")
   	}
   		playerOne.wins ++
   		playerTwo.losses ++
   		fireBase.ref().update({"playerOne_wins": playerOne.wins});
   		fireBase.ref().update({"playerTwo_losses": playerTwo.losses});
   }
   else if(one === "scissors", two === "rock"){
   resetChoices();	
   		if(playerNumber === 1){
   		$("#nameSpace").text("Opponent chose rock. You lose!")
   	}
   		else if(playerNumber === 2){
   		$("#nameSpace").text("Opponent chose scissors. You win!")
   	}
   		playerTwo.wins ++
   		playerOne.losses ++
   		fireBase.ref().update({"playerTwo_wins": playerTwo.wins});
   		fireBase.ref().update({"playerOne_losses": playerOne.losses});
   }
  
};
function resetChoices(){
	playerOne.choice = "";
	playerTwo.choice = "";
	fireBase.ref().update({choice_1: "false"});
  	fireBase.ref().update({choice_2: "false"});
}

});



