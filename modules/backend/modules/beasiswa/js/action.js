$(function(){

	//save user
	$('.save-beasiswa').click(function(){
		savePost('saveForm', admin_url + 'beasiswa/save', admin_url + 'beasiswa');
	});

	//update user
	$('.update-beasiswa').click(function(){
		//savePost('saveForm', admin_url + 'users/update/' + window.location.pathname, admin_url + 'users');
		savePost('saveForm', admin_url + 'beasiswa/update', admin_url + 'beasiswa');
	});
});
