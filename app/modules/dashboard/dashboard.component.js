angular
    .module('moose.dashboard')
    .component('mooseDashboard', {
        controller: DashboardController,
        templateUrl: 'app/modules/dashboard/dashboard.component.html'
    });

function DashboardController(dataService,addToCartService,$q,$state,$filter,$localStorage) {
    var ctrl = this;
    //intial values 
    ctrl.$onInit = function() {
		if($localStorage.cartProducts != undefined){
			ctrl.badge = $localStorage.cartProducts.length;;
		}
		ctrl.error = 0;
		 ctrl.prod = 0;
		ctrl.page = {
			currentPage : 1,
		    totalPages  : 0,
		    searchData  : "",
		    pageSize    : 10,
			offset      : 1
			
		}
				
        ctrl.getAllProducts(ctrl.page.currentPage,ctrl.page.pageSize,ctrl.page.searchData);
    };
	//calling API to get products
	ctrl.getAllProducts = function(current_page,page_size,data){
		  ctrl.page.searchData = "";
		  var promise =  dataService.getStoreProducts(current_page,page_size,data);
   		  $q.all([promise]).then(function(res) {
		  console.log("controller");	  
		  console.log(res[0].products == undefined); 
		  if(res[0].products == undefined){
			 	ctrl.prod = 1;	
                ctrl.products= [];				
		  } 
		  else {
			   ctrl.prod = 0;
			   ctrl.products=res[0].products;
			   ctrl.page.totalPages = res[0].pagination.totalPages; 
             
          }
	   });
   }
	//to go to previous page
	ctrl.previousPage = function(){
		ctrl.page.currentPage = ctrl.page.currentPage - 1;
		ctrl.page.offset = ctrl.page.currentPage ;
		if(ctrl.page.currentPage>0){
		    ctrl.getAllProducts(ctrl.page.currentPage,ctrl.page.pageSize,ctrl.page.searchData);
		}
	}
	
	//to go to next page
	ctrl.nextPage = function(){
		console.log(ctrl.page);
		ctrl.page.currentPage = ctrl.page.currentPage + 1;
		ctrl.page.offset = ctrl.page.currentPage ;
		ctrl.getAllProducts(ctrl.page.currentPage,ctrl.page.pageSize,ctrl.page.searchData);
		console.log(ctrl.page.currentPage);
		
	}
	
	//to add items to cart
	ctrl.addToCart = function(image_url,productprice,quantity,productcode,currency,code,name){
     	var results = $filter('filter')(addToCartService.cartProducts, {code : code}, true);
		if(results == 0){
  		   
			$localStorage.cartProducts.push({image:image_url,price:productprice,quantity:1,productcode:productcode,currency:currency,code:code,noOfProductes:quantity,name:name});
			addToCartService.cartProducts = $localStorage.cartProducts;
			
			ctrl.badge = $localStorage.cartProducts.length;
		} else 
			alert("Product already added to cart");
	}
	
	//to display cart
	ctrl.checkItemInCart = function(){
		$state.go('cart');
	}
	
	//for search
	ctrl.searchForProduct = function(){
		if(ctrl.page.searchData == '""' || ctrl.page.searchData == "undefined" ||ctrl.page.searchData == ''){
			//alert("Please enter product name to search");
			ctrl.error = 1;
		} else {
			ctrl.error = 0;
			ctrl.getAllProducts(ctrl.page.currentPage,ctrl.page.pageSize,ctrl.page.searchData);
		}
		
	}
	
	 ctrl.currentPage = function(pageno){
		if(pageno == null)
		 ctrl.page.currentPage = pageno;
		else {
		 ctrl.page.currentPage = pageno;	
		 ctrl.getAllProducts(pageno,ctrl.page.pageSize,ctrl.page.searchData);
		}
	 }
	

}