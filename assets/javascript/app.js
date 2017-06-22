$(document).ready(function() {
$('#myModal').modal({
  backdrop: 'static',
  keyboard: false
}); 
$('#myModal').modal('show');

  var fireBase = firebase.database();
  var playerOne = {
  	score: 0,
  	name: " ",
  	wins: 0  ,
  	losses: 0,
  	choice: ""
  }
  var playerTwo = {
  	score: 0,
  	name: " " ,
  	wins: 0 ,
  	losses: 0,
  	choice:   
  }
 $("#submitname").on("click", function(){
 	playerOne.name = $("#username").val().trim();
 	if(playerOne.name.length === 0 ) {
 		return false
 	}
 	else {
 		fireBase.ref().push({name: playerOne.name}, function(error) {
 		$('#myModal').modal("hide");
 		if (error !== null) {
                        return false;
                    }
                });
 
                $("#username").val("");
            }
 
            return false;
        });
 
$("#submitmsg").on("click", function() {
            var msg = $("#usermsg");
            var msgValue = msg.val().trim();
 
            if (msgValue.length === 0) {
                alert('Comments are required to continue!');
            } else {
                fireBase.ref().push({msg: msgValue}, function(error) {
                    if (error !== null) {
                        alert('Unable to push comments to Firebase!');
                    }
                });
 
                msg.val("");
            }
 
            return false;
        });
 
        fireBase.ref().on('child_added', function(snapshot) {
            // var uniqName = snapshot.name();
            var msg = snapshot.val().msg;
            var msgContainer = $('#msg-container');
 
            $('<div/>', {class: 'msg-container'})
                .html('<span class="label label-default">Message ' 
                    + playerOne.name + '</span>' + msg).appendTo(msgContainer);
 
            msgContainer.scrollTop(msgContainer.prop('scrollHeight'));
        });


	




})
