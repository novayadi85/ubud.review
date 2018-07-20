$(function(){

	//save user
	$('.save-kelas').click(function(){
		savePost('saveForm', admin_url + 'kelas/save', admin_url + 'kelas');
	});

	//update user
	$('.update-kelas').click(function(){
		//savePost('saveForm', admin_url + 'users/update/' + window.location.pathname, admin_url + 'users');
		savePost('saveForm', admin_url + 'kelas/update', admin_url + 'kelas');
	});
});
