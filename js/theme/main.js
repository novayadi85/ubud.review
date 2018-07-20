//strict mode enabled
"use strict";


$(window).on("load",function(){

	//Filtering with isotope
	var $grid = $('.grid').isotope({
		// options
		itemSelector: '.grid-item',
		layoutMode: 'masonry',
		percentPosition: true
	});

	// filter items on button click
	$('.filter-button-group').on( 'click', 'button', function() {
		var filterValue = $(this).attr('data-filter');
		$grid.isotope({ filter: filterValue });
	});    
});


$(document).on("ready",function(){

	//Smooth scrolling
	smoothScroll.init({
		selector: '[data-scroll]',
		selectorHeader: null, 
		speed: 1000,
		easing: 'easeInQuint', 
		offset: 20, 
		callback: function ( anchor, toggle ){}
	});


	//stellar paralax effect
	$(window).stellar({
		horizontalScrolling: false,
		verticalScrolling: true,
		horizontalOffset: 0,
		verticalOffset: 0,
		responsive: true,
		scrollProperty: 'scroll',
		positionProperty: 'transform',
		parallaxBackgrounds: true,
		parallaxElements: true,
		hideDistantElements: true,

		hideElement: function($elem) { $elem.hide(); },
		showElement: function($elem) { $elem.show(); }
	});


	//animated nav button
	$(".custom_butt").on('click',function(){
		$(this).toggleClass("change");
	});


	//animation on scroll
	new WOW().init();


	//magnific popup
	$('.grid').each(function() { 
		$(this).magnificPopup({
			delegate: 'a', 
			type: 'image',
			gallery: {
				enabled:true
			}
		});
	});


	/* --counter up
	-------------------------------------*/
	$('.counter').counterUp({
		delay: 10,
		time: 1500
	});
	

	//tooltip
	$('[data-toggle="tooltip"]').tooltip();


	//owl carousel
	$("#comment_slider").owlCarousel({
		navigation : true,
		slideSpeed : 500,
		paginationSpeed : 500,
		items: 3,
		singleItem: true,
		autoPlay: true,
		autoHeight: false,
		dots: true

		// itemsDesktop : false,
		// itemsDesktopSmall : false,
		// itemsTablet: false,
		// itemsMobile : false
	});

	//owl carousel
	$(".owl-slider-header").owlCarousel({
		loop:true,
		margin:10,
		nav:false,
		items: 1,
		singleItem: true,
		autoPlay: true,
		autoHeight: false,
		height: "740px",
		dots: false
	});

	$(".owl-carousel.carousel").each(function(){
		var id = $(this).closest("section").attr("id");
		var count = $(this).data("items");
		$(this).owlCarousel({
			navigation : false,
			pagination : false,
			slideSpeed : 500,
			paginationSpeed : 500,
			items: count,
			singleItem: false,
			autoPlay: true,
			autoHeight: false,
			itemsDesktop : [1600, 4],
			itemsDesktopSmall : [1200, 3],
			itemsTablet: [1000, 2],
			itemsMobile : [600, 1],
			navContainer: '#' + id+ ' .customNav',
			dots: false,
			navText : ['<i class="fa fa-angle-left" aria-hidden="true"></i>','<i class="fa fa-angle-right" aria-hidden="true"></i>'],
			loop: true,
			rewind: true,
		});
	  });

	/*-- fullscreen youtube video bg
	--------------------------------- --*/
	if($('body').find(".player").length >= 1){
		$(".player").mb_YTPlayer();
	}
	else{
		$(".loading").hide();
		setTimeout(function(){
			tesAnim(".showFirst");
		},500);
		setTimeout(function(){
			tesAnim2(".hideFirst");
		},500);
	}
 	
	
	$('.player').on("YTPUnstarted",function(e){
	   var currentTime = e.time;
	   $('.loading').show();
	   console.log("unstart");
	});
	function k() {
        var t = $("#ticket-adult").val(),
            i = $("#ticket-children").val(),
            r = $("#ticket-infants").val(),
            n = $("#qty-result");
        n.val(parseInt(t, 10) + parseInt(i, 10) + parseInt(r, 10));
        $("#qty-result-text").text(n.val())
    }

	function tesAnim2(el){
		var x = 'zoomIn';
		$(el).addClass(x + ' animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
			$(this).removeClass("hideFirst");
		});
	}
	
	function tesAnim(el){
		var x = 'zoomIn';
		$(el).addClass(x + ' animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
			$(this).removeClass("showFirst");
			setTimeout(function(){
				tesAnim2(".hideFirst");
			},500);
		});
	}
	
	$('.player').on("YTPReady",function(e){
		var currentTime = e.time;
		$(".loading").hide();
		setTimeout(function(){
			tesAnim(".showFirst");
		},500);
		
	});
	
	$('.stretcher-item').on("mouseover",function(e){
		$('.stretcher-item').addClass("inactive");
		$(this).addClass("active");
	});
	
	$('.stretcher-item').on("mouseleave",function(e){
		$('.stretcher-item').removeClass("inactive").removeClass("active");
	});
	

	$('body').on('mousewheel DOMMouseScroll', function(e){
		if(typeof e.originalEvent.detail == 'number' && e.originalEvent.detail !== 0) {
			if(e.originalEvent.detail > 0) {
			  $(".store-over").slideDown();
			  $(".store-over").addClass("over");
			} else if(e.originalEvent.detail < 0){
				$(".store-over").slideUp();
				$(".store-over").removeClass("over");
			}
		  } else if (typeof e.originalEvent.wheelDelta == 'number') {
			if(e.originalEvent.wheelDelta < 0) {
				$(".store-over").slideDown();
				$(".store-over").addClass("over");
			} else if(e.originalEvent.wheelDelta > 0) {
				$(".store-over").slideUp();
				$(".store-over").removeClass("over");
			}
		  }
	});

	var filterSort = '.filter-sort li';
	$(filterSort).on('click', function(){
		"use strict";
		$(filterSort).removeClass('active');
		$(this).addClass('active');
		var sorting = $(this).data("sort");
		if (sorting == "lowhighFl"){
			sortLowHigh();
		} else if (sorting == "highlowFl"){
			sortHighLow();
		} else if (sorting == "earliestFl"){
			sortEarlier();
		} else if (sorting == "highlowStar"){
			sortStars();
		} else if (sorting == "highlowView"){
			sortViews();
		}
	});

	$('#uncheckToursType').on('click', function(){
		$(".trentry").removeClass("f3hidden");
		$('#filter-type-checkbox :checkbox:enabled').prop('checked', false);

	});

	if($( "#slider-range" ).length > 0){
		$( "#slider-range" ).slider({
			range: true,
			min: 0,
			max: 1000,
			values: [ 0, 750 ],
			slide: function( event, ui ) {
			$( "#range-min" ).val( "$" + ui.values[ 0 ] );
			$( "#range-max" ).val( "$" + ui.values[ 1 ] );
			$(".range-price-value").trigger("change");
			}
		});

		$(".range-price-value").on('change', function(){
			var price = $(this).val();
			$(this).prev("span").html(price);
		});
	}
	  
	 // $( "#slider-range-value-lower-1").find("span").html($( "#slider-range" ).slider( "values", 0 ));
	//  $( "#slider-range-value-upper-1").find("span").html($( "#slider-range" ).slider( "values", 1 ));
	
	var w = "<span class='day'>d<\/span> <span class='month'>M<\/span> <span class='year'>yy<\/span>",
        h = "#dateArrival input",
        e = "#dateDeparture input",
        b = "#dateArrival .date-value",
		t = "#dateDeparture .date-value";
	if($(h).length > 0){
		$(h).datepicker({
			minDate: "D",
			dateFormat: w,
			onSelect: function(n) {
				$(b).html($(h).val());
				$(t).html(n);
				var i = $(t).find(".day"),
					r = i.html();
				i.html(parseInt(r) + 1)
			},
			onClose: function() {
				var n = $(this).datepicker("getDate");
				n.setDate(n.getDate() + 1);
				$(e).datepicker("option", "minDate", n)
			}
		});
	}	
	if($(e).length > 0){
		$(e).datepicker({
			minDate: "D+1",
			dateFormat: w,
			onSelect: function(n) {
				$(t).html(n);
				$(t).html($(e).val())
			}
		});
	}
	if($(".datepicker").length > 0){
		$(".datepicker").datepicker("setDate", "today");
		$(b).html($(h).val());
		$(t).html($(e).val());
		k();
		var o = $(".guests");
		var s = $(".guests .guest-list");
		$(".guests .result").on("click", function(n) {
			n.stopPropagation();
			o.toggleClass("show");
			o.hasClass("show") ? s.fadeIn() : s.fadeOut()
		});
		$(".qty-apply").on("click", function() {
			s.fadeOut();
			o.removeClass("show")
		});
		$(".qty-plus").add(".qty-minus").on("click", function(n) {
			var u, t;
			n.preventDefault();
			var f = $(this),
				o = f.attr("data-field"),
				r = $("input#" + o),
				i = parseInt(r.data("value"), 10),
				e = r.data("tickettype");
			isNaN(i) || (u = !1, t = 0, f.hasClass("qty-plus") && i < 12 && (t = i + 1, u = !0), f.hasClass("qty-minus") && i > 0 && (t = i - 1, u = !0), u && (r.data("value", t), $(e).val(e + "-" + t), r.val(t), k()))
		})
	}

	if($(".sidebar .sticky-nav").length){
		var offset = $(".sidebar .sticky-nav").offset();
		var max = $(".tabs-days").height();
		console.log(offset.top + max);
		var topPadding = 100;
		$(window).scroll(function() {
			if ($(window).scrollTop() > offset.top && $(window).scrollTop() <= offset.top + max) {
				$(".sidebar .sticky-nav").stop().animate({
					marginTop: $(window).scrollTop() - offset.top + topPadding
				});
			} else {
				$(".sidebar .sticky-nav").stop().animate({
					marginTop: 0
				});
			};
		});
	}
	
});

/*range slider*/
