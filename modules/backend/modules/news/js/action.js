$(function(){

	//save user
	$('.save-news').click(function(){
		savePost('saveForm', admin_url + 'news/save', admin_url + 'news');
	});

	//update user
	$('.update-news').click(function(){
		//savePost('saveForm', admin_url + 'users/update/' + window.location.pathname, admin_url + 'users');
		savePost('saveForm', admin_url + 'news/update', admin_url + 'news');
	});
});
