$(function(){

	//save user
	$('.save-mapel').click(function(){
		savePost('saveForm', admin_url + 'mapel/save', admin_url + 'mapel');
	});

	//update user
	$('.update-mapel').click(function(){
		//savePost('saveForm', admin_url + 'users/update/' + window.location.pathname, admin_url + 'users');
		savePost('saveForm', admin_url + 'mapel/update', admin_url + 'mapel');
	});
});
