angular
    .module('moose.header', ['ngStorage'])
    .component('mooseHeader', {
        controller: HeaderController,
        templateUrl: 'app/modules/header/header.component.html'
    });

function HeaderController(dataService,addToCartService,$q,$state,$localStorage){

	var ctrl = this;

    ctrl.$onInit=function() {
		ctrl.total = 0;
		ctrl.getCartProducts();
		ctrl.showData = false;
		
	
	}
	//to display products in cart
	ctrl.getCartProducts = function(){
		ctrl.cartListName = $localStorage.cartListName;
		if($localStorage.cartProducts != undefined){
			ctrl.prducts = $localStorage.cartProducts
		} else 
			ctrl.prducts = addToCartService.cartProducts
		ctrl.total = addToCartService.total();
	  	if(ctrl.prducts.length==0)
		 ctrl.displayCart = 0;
		  else 
			  ctrl.displayCart = 1;        
	}
	
	//to remove item from cart
	ctrl.removeItemFromCart = function(index){
		addToCartService.removeItemFromCart(index);
		ctrl.getCartProducts();
	}
		
    //to go to home page
	ctrl.homePage = function(){
		$state.go('product');
	}
	
	//to decrease the quantity of product to buy
	ctrl.decQuantity = function(i,itemQuantity){
		if(itemQuantity > 1){
			itemQuantity =  parseInt(itemQuantity) - 1;
			$localStorage.cartProducts[i].quantity = itemQuantity;
			console.log(itemQuantity);
			ctrl.getCartProducts();
		}
		
	}
	
	//to decrease the quantity of product to buy
	ctrl.incQuantity = function(i,itemQuantity){
		itemQuantity  =  parseInt(itemQuantity) + 1;
		$localStorage.cartProducts[i].quantity = itemQuantity;
		console.log(itemQuantity);
		ctrl.getCartProducts();
	}
	
	//to update the name of cart
	ctrl.update = function(){
		ctrl.showData = true;
	}
	//to save name of the cart
	ctrl.save = function(){
		ctrl.cartListName = ctrl.modifieddata;
		$localStorage.cartListName =  ctrl.cartListName;
		addToCartService.cartName = ctrl.cartListName;
		ctrl.showData = false;
		console.log($localStorage.cartListName);
	}
	//to hide div
	ctrl.cancel = function(){
		ctrl.showData = false;
	}
	
	//for doing payment
	ctrl.checkOutPage = function(){
		alert("Need to implement");
		//$localStorage.cartProducts = [];
		//addToCartService.cartProducts = [];
		//$state.go('product');
	}
	
	
	
}
