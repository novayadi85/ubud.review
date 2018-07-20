$(function(){

	//save user
	$('.save-tagihan').click(function(){
		savePost('saveForm', admin_url + 'tagihan/save', admin_url + 'tagihan');
	});

	//update user
	$('.update-tagihan').click(function(){
		//savePost('saveForm', admin_url + 'users/update/' + window.location.pathname, admin_url + 'users');
		savePost('saveForm', admin_url + 'tagihan/update', admin_url + 'tagihan');
	});
});
