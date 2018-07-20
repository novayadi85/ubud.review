var ComponentsSelect2 = function() {

    var handleDemo = function() {
	$.fn.select2.defaults.set("theme", "bootstrap");

        var placeholder = "Select a State";

        $(".select2, .select2-multiple").select2({
            placeholder: placeholder,
            width: null
        });

      

    }

    return {
        init: function() {
            handleDemo();
        }
    };

}();

ComponentsSelect2.init();


$(function() {
	
	$("input.checkAll").each(function(){
		$(this).prop('checked', false);
	});
	
	$('input').on('ifChecked', function(event){
		if($(this).hasClass("checkAll")){
			$('input:checkbox').not(this).prop('checked', this.checked);
		}
	});
	$('input').on('ifUnchecked', function(event){
		if($(this).hasClass("checkAll")){
			$('input:checkbox').prop('checked', false);
		}
	});
	
    $('#btn-add').click(function(event){
        var controller = ($(this).attr("data-set"));
        var method = 'add';
        setTimeout(window.location = admin_url + controller + DS + method, 5000)
    });
	$('#btn-add-cat').click(function(event){
        var controller = ($(this).attr("data-set"));
        var method = 'addcategory';
        setTimeout(window.location = admin_url + controller + DS + method, 5000)
    });
	$('#btn-info').click(function(event){
        var controller = ($(this).attr("data-set"));
        var method = 'info';
        setTimeout(window.location = admin_url + controller + DS + method, 5000)
    });
	$('.btn-single-delete').click(function(event){
		return confirm('are you sure wanna delete this data?');
	});
	$('.btn-cancel-order').click(function(event){
		return confirm('are you sure wanna cancel this order?');
	});
    $('#btn-submit').click(function(event){
        this.form.submit();
    });
	$('#btn-import').click(function(event){
        var controller = ($(this).attr("data-set"));
        var method = 'import';
        setTimeout(window.location = admin_url + controller + DS + method, 5000)
    });
	
	//full feature
	$('#griview-data-table').dataTable();
	$('#griview-data-table1').dataTable();
	//custom feature
	$('#griview-data-table-custom').dataTable({
		"bPaginate": true,
		"bLengthChange": false,
		"bFilter": false,
		"bSort": true,
		"bInfo": true,
		"bAutoWidth": false
	});	
	
});

function listdelete(url){
	bootbox.confirm('are you sure wanna delete this data?',
		function(e){
			if(e){
				toastr.success('Ok');
				// setTimeout(window.location = url, 5000);

				$.ajax({
			        url: url,
			        method: 'GET',
					dataType:'json',
			        beforeSend:function(){
			            $('.overlay').show();
			            $('.loading-img').show();
			        },
			        success:function(data){
			            $('.overlay').hide();
			            $('.loading-img').hide();
			            if(data.response == "success"){
							toastr.success(data.message);
			                location.reload();
			            }else{
							toastr.error(data.message);
			            }
			        },
			        error:function(req, tstat, et){
			            $('.overlay').hide();
			            $('.loading-img').hide();
			            toastr.error('Server error, please try again later...');
			        }
			    });
			}else{
				toastr.error('Cancel');
			}
		}
	);
}

function savePost(idform, url, redirect){
	dataString = $("#" + idform).serialize();
	$.ajax({
		type: "POST",
		url: url,
		data: dataString,
		dataType: 'json',
		beforeSend:function(){
		},
		success: function (data) {
			if(data.response == "success"){
				toastr.success(data.message);
				if(redirect){
					window.setTimeout(function(){
						window.location = redirect
					}, 2000);
				}
				
				if(data.callback){
					if(typeof(data.callback) != 'undefined') {
						eval(data.callback).call(this,data);
					}
				}
				
				
			}else{
				toastr.error(data.message);
			}
			console.log(data);
		},
		error:function(req, tstat, et){
			console.log(req);
			console.log(tstat);
			console.log(et);
			toastr.error('Error');
			//alert('Error');
		}
	});
}
function savePostAndUplod(idform, url, redirect, file){
	var fd = new FormData();
	var file_data = document.getElementById(file).files[0]; 
	//var other_data = $('form').serialize(); // page_id=&category_id=15&method=upload&required%5Bcategory_id%5D=Category+ID
	var other_data = $('form').serializeArray();

	fd.append(file, file_data);
	$.each(other_data,function(key,input){
		fd.append(input.name,input.value);
	});

	$.ajax({
		url: url,
		data: fd,
		contentType: false,
		processData: false,
		type: 'POST',
		beforeSend:function(){
		},
		success: function (data) {
			if(data.response == "success"){
				toastr.success(data.message);
				if(redirect){
					window.setTimeout(function(){
						window.location = redirect
					}, 2000);
				}
			}else{
				toastr.error(data.message);
			}
			console.log(data);
		},
		error:function(req, tstat, et){
			console.log(req);
			console.log(tstat);
			console.log(et);
			toastr.error('Error');
			//alert('Error');
		}
	});
}

function convertPostAndUplodT(url, file){
	$.ajax({
		url: url,
		type: 'POST',
		data: {
			token:$('.position').val()
		},
		beforeSend:function(){
			$('.overlay').show();
			$('.loading-img').show();
		},
		success:function(data){
			$('#result').html(data);
			$('.overlay').hide();
			$('.loading-img').hide();
		},
		error:function(req, tstat, et){
			$('.overlay').hide();
			$('.loading-img').hide();
			alert('Error');
			console.log(req);
			console.log(tstat);
			console.log(et);
		}
	});
}

// handle upload xls document using javascript
function convertPostAndUplod(url, file){
	var fd = new FormData();
	var file_data = document.getElementById(file).files[0];
	var other_data = $('form').serializeArray();
	
	fd.append(file, file_data);
	$.each(other_data,function(key,input){
		fd.append(input.name,input.value);
	});

    $.ajax({
        url: url,
        data: fd,
        contentType: false,
        processData: false,
        type: 'POST',
        beforeSend:function(){
            $('.overlay').show();
            $('.loading-img').show();
        },
        success:function(data){
            $('.overlay').hide();
            $('.loading-img').hide();
            
            if(data.response == "success"){
                toastr.success(data.message);
                //$('#result').html(data.message);
                window.location = data.url;
            }else{
                toastr.error(data.message);
            }
            // console.log(data);
        },
        error:function(req, tstat, et){
            // console.log(req.responseText);
            // console.log(tstat);
            // console.log(et);
            $('.overlay').hide();
            $('.loading-img').hide();
            toastr.error('Server error, please try again later...');
        }
    });	
}


// handle upload feedback document from pajak using javascript
function saveHistory(url, file){
	var fd = new FormData();
	var file_data = document.getElementById(file).files[0];
	var other_data = $('form').serializeArray();
	
	fd.append(file, file_data);
	$.each(other_data,function(key,input){
		fd.append(input.name,input.value);
	});

    $.ajax({
        url: url,
        data: fd,
        contentType: false,
        processData: false,
        type: 'POST',
        beforeSend:function(){
            $('.overlay').show();
            $('.loading-img').show();
        },
        success:function(data){
            $('.overlay').hide();
            $('.loading-img').hide();

            console.log(data);
            
            if(data.response == "success"){
                toastr.success(data.message);
                location.reload();
            }else{
                toastr.error(data.message);
            }
            // console.log(data);
        },
        error:function(req, tstat, et){
            // console.log(req.responseText);
            // console.log(tstat);
            // console.log(et);
            $('.overlay').hide();
            $('.loading-img').hide();
            toastr.error('Server error, please try again later...');
        }
    });	
}
