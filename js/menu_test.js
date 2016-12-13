/*menu.js*/
// The root URL for the RESTful services
var apiUrl = "http://localhost:8888/InClassCoffeebuzz_API/";

// Retrieve categories hen application starts
$(function(){
  getCategories();  
});


$(document).on("click", ".menuitem", function(e) {
   //alert('menuitem click'); 
   //alert('click: ' + $(this).data('identity'));
   e.preventDefault();
   getProductsByCategory($(this).data('identity'));
});

$(document).on("click", ".menuid", function(e) {
    //alert('click: ' + $(this).data('identity'));
    var id = $(this).data('identity');
    var category = $(this).data('category');
    console.log('id: ' + id + '  category: '+ category);
    getProductById(id, category);
});

//$("#test").ready(function(){
//    alert ('About load');
//    $("#test").empty();
//    
//});


function getCategories() {
	//console.log('findAllCategories');
	$.ajax({
		type: 'GET',
		url: apiUrl + 'category',
		dataType: "json", // data type of response
		success: renderCategoryList
	});
}

function getProductsByCategory(category) {
  //console.log('findProductByCategory: ' + category);
  //alert (apiUrl +  category);
  $.ajax({
    type: 'GET',
    url: apiUrl + category,
    dataType: "json",
//    success: renderproductsByCatList 
    success: function(data) {
      renderproductsByCatList(data, category);
    }
  });
}

function getProductById(id, category) {
  $.ajax({
    type: 'GET',
    url: apiUrl + '/' + category + '/' + id,
    dataType: "json",
    success: function(data) {
      renderproductById(data, category);
    }
  });
}


function renderCategoryList(data) {
	// JAX-RS serializes an empty list as null, and a 'collection of one' as an object (not an 'array of one')
	var list = data === null ? [] : (data.items instanceof Array ? data.items : [data.items]);

	//console.log(list);
	$('#categoryList div').remove();
	$.each(list, function(index, item) {
            $('#categoryList').append('<div class="col-md-4 col-sm-6"><a href="#" class="thumbnail menuitem" data-identity="' + item.category + '"><img src="img/menu/' + item.category + 
                                      '.jpg" alt='+item.category+'></a><h4>'+item.category+
                                      '</h4></div>');
            //console.log(item.category);

	});
        
}

function renderproductsByCatList(data, category) {
	// JAX-RS serializes an empty list as null, and a 'collection of one' as an object (not an 'array of one')
	var list = data === null ? [] : (data.items instanceof Array ? data.items : [data.items]);

	//console.log(list);
        console.log(category);
        var src = "img/menu/" + category + ".jpg";
        //console.log(src);
        $("#imgMenu").attr("src",src);
        
        
        $("#breadcrumb li").remove();
        $("#breadcrumb").append("<li><a href='menu.php'>Menu</a></li><li class='active'>"+ category+"</li>");
	$('#categoryList div').remove();
	$.each(list, function(index, item) {
            var link = "<a class='menuid' data-identity="+ item.id +" href='#' data-category=" +item.category +">";
            var img = "<img src='img/menu/"+ item.category + "/"+ item.id + ".jpg' alt='" +item.type +"'></a>";       
            //console.log(img);
            $('#categoryList').append("<div class='col-md-4 col-sm-6'><div class='thumbnail text-center'>"+link+img+"</div></div>");
            //console.log(item.category);
	});        
}

function renderproductById(data, category) {
	// JAX-RS serializes an empty list as null, and a 'collection of one' as an object (not an 'array of one')
	var list = data === null ? [] : (data.items instanceof Array ? data.items : [data.items]);

	console.log(list);
        //console.log(category);
        var id = list[0].id;
        var type = list[0].type;
        var img = '<img src="img/menu/'+ category + '/'+id+'.jpg" alt="' + type + '">';
        console.log(img);
        var desc = "<p>Lorem ipsum dolor sit amet, elit sagittis sociis, risus mauris nulla, ipsum nunc feugiat, fermentum ac hendrerit, massa amet erat fringilla ante volutpat.\n\
                   Mi at elementum pulvinar, pellentesque aliquet purus adipiscing egestas.</p>";
        //console.log('test: ' + type);
        
        $("#menu").empty();
        $("#breadcrumb").empty();
        $("#breadcrumb").append("<li><a href='menu.php'>Menu</a></li><li class='active'>"+ category +"</li><li class='active'>"+ type+"</li>");
        $("#menu").append('<div class="col-md-4">'+img+'</div><div class="col-md-8"><h3>'+type+'</h3>'+desc+'</div>');      
}