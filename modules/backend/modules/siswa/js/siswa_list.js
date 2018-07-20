var TableDatatablesAjax = function () {
    var userListHandle = function () {

        var grid = new Datatable();

        grid.init({
            src: $(".table_ajax"),
            onSuccess: function (grid, response) {

            },
            onError: function (grid) {

            },
            onDataLoad: function(grid) {

            },

            loadingMessage: 'Loading...',
            dataTable: {
				responsive: false,
				//"dom": "<'row'<'col-md-8 col-sm-12'i><'col-md-4 col-sm-12'<'table-group-actions pull-right'>>r>t<'row'<'col-md-8 col-sm-12'i><'col-md-4 col-sm-12'>>",
                "dom" : "lfrti",
				"bStateSave": true,
				"ordering": false,
				"info": true,
				"pagingType": "bootstrap_full_number", // pagination type(bootstrap, bootstrap_full_number or bootstrap_extended)
				"ajax": {
                    "url": admin_url + "users/get_users_list",
                },
				columns: [
					{data: 'checkbox'},
					{data: 'no'},
					{data: 'user'},
					{data: 'email'},
					{data: 'mobile'},
					{data: 'action'}
				],
                "order": [
                    [1, "asc"]
                ],
				"language": { // language settings
					"metronicGroupActions": "_TOTAL_ records selected:  ",
					"metronicAjaxRequestGeneralError": "Could not complete request. Please check your internet connection",
					"lengthMenu": "View _MENU_ records",
					"info": "Found total _TOTAL_ records",
					"infoEmpty": "No records found to show",
					"emptyTable": "No data available in table",
					"zeroRecords": "No matching records found",
					"paginate": {
						"previous": "Prev",
						"next": "Next",
						"last": "Last",
						"first": "First",
						"page": "Page",
						"pageOf": "of"
					}
				},

            }
        });

        grid.clearAjaxParams();
    }
    return {

        //main function to initiate the module
        init: function () {
            userListHandle();
        }

    };

}();

jQuery(document).ready(function() {
   TableDatatablesAjax.init();
});
