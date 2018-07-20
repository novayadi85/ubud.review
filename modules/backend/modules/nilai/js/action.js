$(function(){

	//save user
	$('.save-nilai').click(function(){
		savePost('saveForm', admin_url + 'nilai/save', admin_url + 'nilai');
	});

	//update user
	$('.update-nilai').click(function(){
		//savePost('saveForm', admin_url + 'users/update/' + window.location.pathname, admin_url + 'users');
		savePost('saveForm', admin_url + 'nilai/update', admin_url + 'nilai');
	});
});
