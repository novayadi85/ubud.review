$(function(){

	//save user
	$('.save-ruangan').click(function(){
		savePost('saveForm', admin_url + 'ruangan/save', admin_url + 'ruangan');
	});

	//update user
	$('.update-ruangan').click(function(){
		//savePost('saveForm', admin_url + 'users/update/' + window.location.pathname, admin_url + 'users');
		savePost('saveForm', admin_url + 'ruangan/update', admin_url + 'ruangan');
	});
});
