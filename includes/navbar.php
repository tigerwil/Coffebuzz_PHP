<?php
//Dynamically build the menu system using an array of labels, urls and icons

$home = array(
    'page'=> 'Home',
    'url'=>'/Coffeebuzz_PHP/index.php',
    'icon'=>'home'
);

$menu = array(
    'page'=> 'Menu',
    'url'=>'/Coffeebuzz_PHP/menu.php',
    'icon'=>'cutlery'
);

$contact = array(
    'page'=> 'Contact',
    'url'=>'/Coffeebuzz_PHP/contact.php',
    'icon'=>'phone'
);

$about = array(
    'page'=> 'About',
    'url'=>'/Coffeebuzz_PHP/about.php',
    'icon'=>'info-sign'
);

//build multi-dimension 
$pages = array(
    'Home'=>$home,
    'Menu'=>$menu,
    'Contact'=>$contact,
    'About'=>$about
);

//var_dump($pages);

//Find out which page user is viewing
$this_page = $_SERVER['REQUEST_URI'];
//$this_page = substr(basename($_SERVER['PHP_SELF']),0,-4);

//echo $this_page;

//Check for root of website
if($this_page == '/Coffeebuzz_PHP/'){
    $this_page = '/Coffeebuzz_PHP/index.php';
}
//Loop the array and print the list items
foreach($pages as $page=>$list){
    $url = $list['url'];
    $icon = $list['icon'];
    echo '<li><a ';
    
    if($this_page == $url){
        echo 'class="current" ';
    }
    echo "href=\"$url\"><span class=\"glyphicon glyphicon-$icon\"></span> $page</a></li>";
}

//<li><a class="current" href="index.php"><span class="glyphicon glyphicon-home"></span> Home</a></li>
//<li><a href="menu.php"><span class="glyphicon glyphicon-cutlery"></span> Menu</a></li>
//<li><a href="contact.php"><span class="glyphicon glyphicon-phone"></span> Contact</a></li>
//<li><a href="about.php"><span class="glyphicon glyphicon-info-sign"></span> About</a></li>