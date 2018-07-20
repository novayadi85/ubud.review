$(function(){

	//save user
	$('.save-user').click(function(){
		savePost('saveForm', admin_url + 'users/save', admin_url + 'siswa');
	});

	//update user
	$('.update-user').click(function(){
		//savePost('saveForm', admin_url + 'users/update/' + window.location.pathname, admin_url + 'users');
		savePost('saveForm', admin_url + 'siswa/update', admin_url + 'siswa');
	});
});
