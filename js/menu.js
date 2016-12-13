/* menu.js JavaScript file 
 * This file will consume our Restful Api services for
 * Coffeebuzz
 */

//The root URL for the RESTful Services
//REST:  REpresentational State Tranfer

var apiURL = "http://localhost:8888/SlimDemo_API/";


//Retrieve categories when application starts
$(function(){
    getCategories();   
});

//Menu Item click event
$(document).on("click", ".menuitem", function(e){
    e.preventDefault();
    //alert('menu item click');   
    var category = $(this).data('identity');
    //alert(category);
    getProductsByCategory(category);
    
});

$(document).on("click", ".menuid", function(e){
    e.preventDefault();
    //alert('menu item click');  
    var id = $(this).data('identity');
    var category = $(this).data('category');
    //alert('id: ' + id + ' category: ' + category);
     getProductById(id, category);
    
});




function getCategories(){
    //console.log('getCategories');
    $.ajax({
        type:'GET',
        url: apiURL + 'category',
        dataType:"json",
        success: renderCategoryList
    });
}//end of getCategories function

function getProductsByCategory(category){
    $.ajax({
        type:'GET',
        //http://localhost:8888/InClassCoffeebuzz_API/coffee
        //http://localhost:8888/InClassCoffeebuzz_API/muffins
        url: apiURL + category, 
        dataType:"json",
        success: function(data){
            renderProductsByCategoryList(data, category);
        }
                
                
    });
}//End of getProductsByCategory function


function getProductById(id, category) {
  $.ajax({
    type: 'GET',
    url: apiURL + '/' + category + '/' + id,
    dataType: "json",
    success: function(data) {
      renderProductById(data, category);
    }
  });
}//End of getProductById



function renderCategoryList(data){
  //console.log(data.items);
   var list = data.items;
   //console.log(list);
   
   //remove the div within categoryList so that it does not repeat on 
   //refresh
   $("#categoryList div").remove();
   
   //loop each item within list and recreate the HTML dynamically
   $.each(list, function(index,item){
       //console.log('id: '+ item.id + ' category: ' + item.category);
       $("#categoryList").append('<div class="col-md-4 col-sm-6">' +
                	          '<a data-identity="' + item.category + '" href="#" class="thumbnail menuitem">' +
                                    '<img src="img/menu/' + item.category 
                                    +'.jpg" alt="' + item.category + 
                                    '" class="img-responsive menu">' +
                                '</a>'+
                                '<h4>' + item.category + '</h4>' +
                                '</div>');
   });
}

function renderProductsByCategoryList(data,category){
   var list = data.items;
   //console.log(list);
   //console.log(category);
   var src = "img/menu/"+ category + ".jpg";
   //console.log(src);
   $("#imgMenu").attr("src", src);
   $("#categoryList div").remove();//clear out old html from this div
   
   //loop the list - creating new HTML 
   $.each(list, function(index,item){
       var link = "<a class='menuid' data-identity='"+ item.id + 
                  "' href='#' data-category='"+ item.category+"'>";
       var img = "<img src='img/menu/" + item.category + 
                 "/" + item.id + ".jpg' alt='" + item.type + "'></a>";
        //<img src='img/menu/coffee/1.jpg' alt='Espresso'>
       //$console.log(link+img);
       $("#categoryList").append('<div class="col-md-4 col-sm-6">'+
                                    '<div class="thumbnail text-center">' +
                                       link+img+
                                       '<h4>'+ item.type+ '</h4>'+
                                    '</div>' +
                                 '</div>');
       
       
   });
}//End of renderProductsByCategoryList function

function renderProductById(data, category) {
    var list = data.items;
    var id = list[0].id;
    var type = list[0].type;
    var img = '<img src="img/menu/'+ category + '/'+id+'.jpg" alt="' + type + '">';
    //console.log(img);
    var desc = "<p>Lorem ipsum dolor sit amet, elit sagittis sociis, risus mauris nulla, ipsum nunc feugiat, fermentum ac hendrerit, massa amet erat fringilla ante volutpat.\n\
          Mi at elementum pulvinar, pellentesque aliquet purus adipiscing egestas.</p>";
        
        $("#menu").empty();
      
        $("#menu").append('<div class="col-md-4">'+img+'</div><div class="col-md-8"><h3>'+type+'</h3>'+desc+'</div>');
     
}//End of renderproductById 

//test section
    //testing
     $(".delete").click(function(){
            var id = $(this).data('id');
            //alert(id);
            $.ajax({
                type: 'POST',
                url: 'test.php',
                data: {'id': id},
                success: function(data) {
                    //alert(data);
                    //document.location.reload(); 
                    $("#data").text(data);

                }
            });
   });