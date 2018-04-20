/**
 * Created by cag on 01/02/18.
 */
angular.module('moose')
    .service('dataService', dataService)
    .service('addToCartService', addToCartService);
//getting products from api
function dataService($http, $q) {
    var defered = $q.defer();
	
	
	//to get products from api
    this.getStoreProducts = function(current_page, page_size, data) {
        var url = 'https://api.efood.real.de/api/v2/real/products/search?query=' + data + ':price-asc:category:1&currentPage=' + current_page + '&pageSize=' + page_size;
        console.log(url);
        var req = {
            method: 'GET',
            url: url,
			 headers: {
				//'Access-Control-Allow-Origin': '*'
				}
        }
        var data = $http(req).then(successCallback, errorCallback);
        return data;
    }
	
	
   //success call back of api
    function successCallback(res) {
        console.log(res);
        if (res.status == 200) {
            // console.log(res.data.products);
            defered.resolve(res.data);
            return res.data;
        }
    }
	
	
	 //error call back of api
    function errorCallback(response) {
        // console.log(response);
        defered.reject(response)
        return res.data;
    }
}

//to add products to cart and remove from cart and to calculate total price of products
function addToCartService($localStorage) {
    this.cartProducts = [];
    
	$localStorage.cartListName = "Add Name To Cart";
	this.cartName = $localStorage.cartListName;
	//to remove product from cart
    this.removeItemFromCart = function(index) {
        $localStorage.cartProducts.splice(index, 1);
    }
 
 //to calculate total price of products
    this.total = function() {
        var total = 0;
        angular.forEach($localStorage.cartProducts, function(item) {
            total += item.quantity * item.price;
        });
        return total;
    }
}