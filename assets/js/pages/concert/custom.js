(function($){

	"use strict";
	
	$(document).ready(function() {

		/* ---------------------------------------------- /*
			MAIN SLIDE SETUP & THUMBNAIL
		/* ---------------------------------------------- */
		
		$("#headerContent").load("../header.html");
		$("#footerContent").load("../footer.html");
		
		var $window = $(window);

		$('#concertIcon').attr("src","../assets/images/eventProfile/festival_profile.png");
		
		var map;
		var marker;

		$(".toggleGmap").click(function(e){
			var isExpanded 	= $(this).attr("aria-expanded");
			var latitude 	= $(this).attr("data-gmap-latitude");
			var longtitude 	= $(this).attr("data-gmap-longtitude");
			var myLatLng 	= { lat : parseFloat(latitude) , lng : parseFloat(longtitude) };
			
			if(isExpanded == "false") {
				if(map == undefined) {
					map = new google.maps.Map(document.getElementById('map'), {
						zoom: 17,
						center: myLatLng,
					    zoomControl: false,
						streetViewControl: false,
						mapTypeId:google.maps.MapTypeId.TERRAIN
			        });

			        marker = new google.maps.Marker({
			        	position: myLatLng, 
			        	map: map,
			        	title: 'Hello World!'
			        });
				} else {
					map.setCenter(new google.maps.LatLng(myLatLng));
					marker.setPosition(myLatLng);
				}
				
			}
		});
		
		
		var timer;
		var $window = $(window);

		$window.scroll(function () {			
			if ($(this).scrollTop() >= 500) {				
				$(".headerSticky").fadeIn(500);
			} else {			
				$(".headerSticky").fadeOut();
			}
		});

		$window.on('resize', function(e) {
			
			adjustStickyHeader();

			if($window.width() < 768) {
				if($("#eventBanner .descIcon ul li.clockLi").length <= 0){
					$("#eventBanner .descIcon ul li:last-child").before("<li class = 'p-t-5 clockLi'></li>");
					$(".clockSpan").removeClass("m-l-10");
					$(".clockLi").prepend($(".clockSpan"));
				}
			} else {
				if($("#eventBanner .descIcon ul li:nth-child(3) span.clockSpan").length <= 0){
					$("#eventBanner .descIcon ul li:nth-child(3) span").after($(".clockSpan"));
					$(".clockLi").remove();
					$(".clockSpan").addClass("m-l-10");
				}
			}
			
		}).resize();

		function adjustStickyHeader(){
			
			if($window.width() <= 768) {	
				console.log('640');
				$("#stickyTitle .inline").addClass("display-block");
				$("#stickyTitle").addClass("no-padding");
				$("#stickyTitle").removeClass("col-5");				
				$("#stickyTitle").addClass("no-padding");
				$(".stickyTitle").addClass("m-l-10");		
				$("#sticky-image").removeClass("col-2");
				$("#sticky-image").addClass("col-5");
				$("#sticky-image").show();
				$("#sticky-image").siblings().first().show();				
				$(".sticky-btn-buy").addClass("text-align-center");
				//$(".sticky-btn-buy").css("line-height","60px");
				$(".sticky-btn-buy button").parent().addClass("col-12");
				$("#locateBar").addClass("col-12 no-padding");
				$("#dateBar").addClass("col-12 no-padding");
				$("#timeBar").addClass("col-12 no-padding");
			/*} else if($window.width() <= 1024) {
				console.log('1024');
				$(".sticky-image").show();
				$(".stickyTitle .inline.display-block").removeClass("display-block");
				$(".sticky-btn-buy button").parent().removeClass("col-3");
				$(".sticky-image").siblings().first().show();
				$(".sticky-image").siblings().first().addClass("col-6");
				$(".sticky-btn-buy").css("line-height","40px");*/
			} else {
				console.log('> 640');
				$(".sticky-image").show();
				$(".stickyTitle .inline.display-block").removeClass("display-block");
				$("#locateBar").removeClass("col-12");
				$("#dateBar").removeClass("col-12");
				$("#timeBar").removeClass("col-12");
				// $("#sticky-image").addClass("padding_l_r_5px");
				$(".sticky-btn-buy").css("line-height","50px");
				/// $(".sticky-btn-buy button").parent().removeClass("col-3");
				// $(".sticky-image").siblings().first().removeClass("col-6");
				$(".sticky-image").siblings().first().show();
			}

		}

		adjustStickyHeader();

	});

})(jQuery);
var idOld ;
var marker, info;
var jsonObj = [
    {"id":"map","location":"The impactArena", "lat": "13.9115588", "lng": "100.548247","link":"<a href=\"javascript:adClick('https://www.google.com/maps/place/IMPACT+Arena/@13.9138301,100.5439796,16z/data=!4m12!1m6!3m5!1s0x0:0x5ade5eb90113ca18!2zSU1QQUNUIOC4qOC4ueC4meC4ouC5jOC5geC4quC4lOC4h-C4quC4tOC4meC4hOC5ieC4sg!8m2!3d13.911249!4d100.549673!3m4!1s0x0:0x98e04841a8c7a8b0!8m2!3d13.9115711!4d100.5482456?hl=th-TH');\">คลิ๊กเพื่อขอเส้นทาง</a>"}] //สถานที่จัดงาน
var lat, lng;
var marker, info;
function activeMap(rcvId) {	
	  var elements = document.getElementsByClassName("map")
    for (var i = 0; i < elements.length; i++){
        elements[i].style.display = "none";
    }
	  if(idOld!=rcvId){
		  console.log("if");
//		  $(rcvId).removeClass("dspNone");
	  	document.getElementById(rcvId).style.display = "block";
	  	idOld = rcvId;
	  }else{
		  console.log("else");
		  idOld = "";
	  }
	  $.each(jsonObj, function(i, item){
		  if(rcvId==item.id){
				lat = parseFloat(item.lat);
				lng = parseFloat(item.lng);
		  }
	  });
	  initMap(rcvId);
}
function initMap() {
	 $.each(jsonObj, function(i, item){
		var latlng = new google.maps.LatLng(item.lat, item.lng);
		var mapOptions = {
		  center: latlng,
		  zoom: 18,
		}
			
		var maps = new google.maps.Map(document.getElementById("map"),mapOptions);
		
		var marker = new google.maps.Marker({
		   position: new google.maps.LatLng(item.lat, item.lng),
		   map: maps,
		   title: item.location
		});

	  info = new google.maps.InfoWindow();

	  google.maps.event.addListener(marker, 'click', (function(marker, i) {
		return function() {
		  info.setContent(item.link);
		  info.open(maps, marker);
		}
	  })(marker, i));

	});
}
function adClick(ad) {
	window.open(ad);
}

function topfunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}