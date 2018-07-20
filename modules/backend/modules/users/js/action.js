$(document).on('ready', function() {
	$("#input-file").fileinput({
		browseClass: "btn btn-primary btn-block",
		showCaption: false,
		showRemove: false,
		showUpload: false
	});
});

$(function(){
	//save user
	$('.save-user').click(function(){
		savePostAndUplod('saveForm', admin_url + 'users/save', admin_url + 'users',"input-file");
	});
	
	//update user
	$('.update-user').click(function(){
		//savePost('saveForm', admin_url + 'users/update/' + window.location.pathname, admin_url + 'users');
		savePostAndUplod('saveForm', admin_url + 'users/update', admin_url + 'users',"input-file");
	});	
});