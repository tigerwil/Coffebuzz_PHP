// Main JavaScript Document
/*
	Description:  Coffee Buzz main javascript file
	Author:  Marc Williams
*/

/* =============== GO TO TOP ================= */
$('.gototop').click( function(e){
	e.preventDefault(); //stop from linking
	//alert('clicked');
	$('html, body').animate({
		scrollTop:$('body').offset().top
	},500);
});



// ============= SOCIAL ICONS ================
$('.social li a i').hover(
	// in handler
	function(){
		$(this).addClass('fa-spin');
		/*
		 <ul class="social">
		 	<li><a href="#"><i class="fa fa-facebook fa-2x fa-spin"></i></a></li>
		 </ul>
		
		*/
	},
	
	// out handler
	function(){
		$(this).removeClass('fa-spin');
		/*
		 <ul class="social">
		 	<li><a href="#"><i class="fa fa-facebook fa-2x"></i></a></li>
		 </ul>
		
		*/		
		
	}
);
