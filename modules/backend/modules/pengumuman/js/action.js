$(function(){

	//save user
	$('.save-pengumuman').click(function(){
		savePost('saveForm', admin_url + 'pengumuman/save', admin_url + 'pengumuman');
	});

	//update user
	$('.update-pengumuman').click(function(){
		//savePost('saveForm', admin_url + 'users/update/' + window.location.pathname, admin_url + 'users');
		savePost('saveForm', admin_url + 'pengumuman/update', admin_url + 'pengumuman');
	});
});
