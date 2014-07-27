$(document).ready(function(){
	// call the socket.io
	var socket 		= io.connect();

	var $userName 	= $('#user-name');
	var joinButton 	= $('#join-btn');
	var userName;

	joinButton.on('click', function(e){
		e.preventDefault();
		socket.emit('newUser', $userName.val(), function(data){
			if(data){
            	username = $userName.val();   
            	console.log(username);
             }else{ 
               console.log("already taken");    
             }
		});	
	});

	// show all current users
	socket.on('showUsers', function(data){
		// gets the client socket id
		var ids = socket.io.engine.id;
		console.log(ids);
		$('.users-list').html("");
		$.each(data['users'], function(key, value){

		if(value['id'] != ids ){
			console.log(data['id']);
			$('.users-list').append('<li><button class="btn btn-success connect-to-btn" data-id='+value['id']+' > Connect To : '+key+'</button></li>');
		}
		else{
			console.log(data['id']);
		}
		});
	});

	// delegate the event to ul because the button is dynamically created
	$('.users-list').on('click', '.connect-to-btn',function(){
		var userId = $(this).data('id');
		
		socket.emit('connectToUserX', {opponentId: userId, opponentName: username});
	});

	socket.on('attemptConnection', function(data){
		alert(data['username']+" wants to connect");
	});
});
