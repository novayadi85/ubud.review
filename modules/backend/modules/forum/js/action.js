$(function(){

	//save user
	$('.save-forum').click(function(){
		savePost('saveForm', admin_url + 'forum/save', admin_url + 'forum');
	});

	//update user
	$('.update-forum').click(function(){
		//savePost('saveForm', admin_url + 'users/update/' + window.location.pathname, admin_url + 'users');
		savePost('saveForm', admin_url + 'forum/update', admin_url + 'forum');
	});
});
