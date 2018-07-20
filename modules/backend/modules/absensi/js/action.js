$(function(){

	//save user
	$('.save-absensi').click(function(){
		savePost('saveForm', admin_url + 'absensi/save', admin_url + 'absensi');
	});

	//update user
	$('.update-absensi').click(function(){
		//savePost('saveForm', admin_url + 'users/update/' + window.location.pathname, admin_url + 'users');
		savePost('saveForm', admin_url + 'absensi/update', admin_url + 'absensi');
	});
});
